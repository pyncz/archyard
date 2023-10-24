import { createSharedComposable } from '@vueuse/core'

export const useAddress = createSharedComposable(() => {
  // Address user is connected with, to use by default
  const { address: connectedAddress } = useSharedSigningClient()

  // Address filled via AddressForm component
  const formAddress = ref<string>('')
  const setFormAddress = (v?: string) => {
    formAddress.value = v ?? ''
  }
  const resetFormAddress = () => setFormAddress()

  // Address to use for data fetching
  const address = computed(() => connectedAddress.value || formAddress.value || null)

  return {
    address,
    setFormAddress,
    resetFormAddress,
  }
})
