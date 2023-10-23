import { SigningArchwayClient } from '@archwayhq/arch3.js'
import { computedAsync, createSharedComposable, useAsyncState, useLocalStorage } from '@vueuse/core'
import type { Account, ChainInfo } from '../types'
import { getChainConfig } from '../utils'

const pickupConnection = async (embedded: any, chainId: string, rpc: string) => {
  const offlineSigner = await embedded.getOfflineSignerAuto(chainId)
  return {
    offlineSigner,
    client: await SigningArchwayClient.connectWithSigner(rpc, offlineSigner),
  }
}

const connectWithWallet = async (key: string, chainInfo: ChainInfo) => {
  const embedded = (window as any)[key]

  if (!embedded) {
    throw new Error(`No "${key}" wallet embedded! Please install "${key}" extension first`)
  }

  if (!embedded.experimentalSuggestChain) {
    throw new Error(`Cannot add requested chain! Please install the latest version of "${key}" extension`)
  }

  // define init props
  embedded.defaultOptions = {
    sign: {
      preferNoSetFee: true,
    },
  }
  // TODO: Handle changes in extension's keystorage, e.g.
  // window.addEventListener(`${key}_keystorechange`, reconnectWallet)

  await embedded.experimentalSuggestChain(chainInfo)
  await embedded.enable(chainInfo.chainId)

  return await pickupConnection(embedded, chainInfo.chainId, chainInfo.rpc)
}

interface UseSigningClientOptions {
  restore?: boolean
}

/**
 * Connect to an embedded Cosmos wallet
 * @options @see {@link UseSigningClientOptions}
 * @returns Async state refs with the Archway signing client
 */
export const useSigningClient = (options?: UseSigningClientOptions) => {
  const connectedWith = useLocalStorage<string | null>('connected-with', null)

  // string and not ChainId because localStorage key may be changed / added manually
  const storedChain = useLocalStorage<string | null>('chain', null)

  const { useSupportedChain } = useSupportedChains()
  const chain = useSupportedChain(storedChain) // storedChain but null if not supported

  // Connect
  const {
    state: clientPair,
    execute: executeConnection,
    isLoading: isConnecting,
    error: connectError,
  } = useAsyncState(
    async (
      chainId: ChainId,
      keys: string | string[] = ['keplr', 'leap'],
    ) => {
      const config = getChainConfig(chainId)
      const normalizedWalletOptions = typeof keys === 'string' ? [keys] : keys

      if (!normalizedWalletOptions.length) {
        throw new Error('Specify at least one wallet to connect with!')
      }

      // reset connection meta
      connectedWith.value = null
      storedChain.value = null

      for (const walletKey of normalizedWalletOptions) {
        try {
          const connectedClientPair = await connectWithWallet(walletKey, config)
          connectedWith.value = walletKey
          storedChain.value = config.chainId
          return connectedClientPair
        } catch (e) {
          console.error(e)
          // Silently try the next wallet from the allowed list,
          // but raise the exception if a certain wallet was specified
          if (normalizedWalletOptions.length === 1) {
            throw e
          }
        }
      }

      // if there was no suitable wallet embedded, throw an exception
      throw new Error(`No embedded wallet found! Please install one of the extentions below to use signing client:\n${
        normalizedWalletOptions.map(x => `\t- ${x}`).join('\n')
      }`)
    },
    null,
    { immediate: false },
  )

  const client = computed(() => clientPair.value?.client ?? null)
  const isConnected = computed(() => !!clientPair.value?.client)

  const connect = async (chainId: ChainId, keys?: string | string[]) => {
    return await executeConnection(0, chainId, keys)
  }

  const disconnect = () => {
    // actual disconnect
    clientPair.value?.client.disconnect()

    // reset state
    clientPair.value = null
    connectedWith.value = null
    storedChain.value = null
  }

  const accounts = computedAsync(async () => {
    if (clientPair.value) {
      return ((await clientPair.value.offlineSigner.getAccounts?.()) as Account[] | undefined) ?? null
    }
    return null
  }, null)

  const address = computed(() => accounts.value?.at(0)?.address ?? null)

  // Restore connection
  const {
    execute: executeRestoreConnection,
    isLoading: isRestoringConnection,
    error: restoreConnectionError,
  } = useAsyncState(
    async () => {
      // Try to restore the connection
      if (connectedWith.value && chain.value) {
        try {
          const config = getChainConfig(chain.value)
          if (config) {
            const connectedClientPair = await pickupConnection(
              (window as any)[connectedWith.value],
              chain.value,
              config.rpc,
            )
            clientPair.value = connectedClientPair
          }
        } catch (e) {
          console.error(e)

          // reconnection try failed, reset storage
          connectedWith.value = null
          storedChain.value = null
        }
      }
    },
    null,
    { immediate: options?.restore ?? false },
  )

  const restoreConnection = async () => {
    return await executeRestoreConnection(0)
  }

  // Combined state
  const isLoading = computed(() => isConnecting.value || isRestoringConnection.value)
  const error = computed(() => connectError.value ?? restoreConnectionError.value)

  return {
    client,
    connectedWith,
    disconnect,

    chain,
    accounts,
    address,

    connect,
    isConnected,
    isConnecting,
    connectError,

    restoreConnection,
    isRestoringConnection,
    restoreConnectionError,

    isLoading,
    error,
  }
}

export const useSharedSigningClient = createSharedComposable(useSigningClient)
