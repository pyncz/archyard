import { getChainConfig } from '../utils'

/**
 * Returns
 * @param chainId
 * @returns RPC URL ref for specified chain
 */
export const useChainConfig = <T extends ChainId | undefined>(
  chainId: MaybeRefOrGetter<T>,
) => {
  const config = computed(() => {
    const id = toValue(chainId)
    return getChainConfig(id)
  })

  return config
}
