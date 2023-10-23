import { ArchwayClient } from '@archwayhq/arch3.js'
import { computedAsync, noop } from '@vueuse/core'
import type { ClientOptions } from '../types'

type UseClientOptions = ClientOptions<ArchwayClient>

/**
 * Connect to the Archway blockchain
 * @param endpoint Optional string or Ref<string> with the RPC url
 * @param options @see {@link UseClientOptions}
 * @returns Async state refs with the Archway query client or null if rpc wasn't provided
 */
export const useClient = (
  endpoint: MaybeRefOrGetter<string | undefined>,
  options?: UseClientOptions,
) => {
  const {
    onConnected = noop,
    onError = noop,
  } = options ?? {}

  const isLoading = ref(false)
  const error = ref<unknown>(null)

  const client = computedAsync(
    async () => {
      error.value = null

      const rpcEndpoint = toValue(endpoint)
      const connectedTo = rpcEndpoint
        ? await ArchwayClient.connect(rpcEndpoint)
        : null
      connectedTo && onConnected(connectedTo)
      return connectedTo
    },
    null, // default value
    {
      evaluating: isLoading,
      onError: (e) => {
        onError(e)
        error.value = e
      },
    },
  )

  return {
    client,
    error,
    isLoading,
  }
}
