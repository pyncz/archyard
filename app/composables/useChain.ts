import { createSharedComposable } from '@vueuse/core'

export const useChain = createSharedComposable(() => {
  const { chain: connectedChain } = useSharedSigningClient()

  // Init value is restored from prev connection, mainnet as default
  const chain = ref<ChainId>(connectedChain.value ?? 'archway-1')

  return chain
})
