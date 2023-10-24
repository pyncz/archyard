export const useSupportedChains = () => {
  const chains = useRuntimeConfig().public.chains

  const supportsChain = <T extends string | undefined | null>(chainId?: T) => {
    return chainId && chains.includes(chainId)
  }

  const useSupportedChain = (chainId: MaybeRefOrGetter<string | null>) => {
    return computed(() => {
      const unwrapped = toValue(chainId)
      return supportsChain(unwrapped) ? unwrapped as ChainId : null
    })
  }

  return {
    chains: chains as ChainId[],
    useSupportedChain,
    supportsChain,
  }
}
