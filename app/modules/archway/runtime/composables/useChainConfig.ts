import { getChainConfig } from '../utils'

/**
 * Returns
 * @param chainId
 * @returns RPC URL ref for specified chain
 */
export const useChainConfig = (
  chainId: MaybeRefOrGetter<ChainId | undefined>,
) => {
  const config = computed(() => {
    const id = toValue(chainId)
    if (id) {
      return getChainConfig(id)
    }
  })

  return config
}
