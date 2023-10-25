import { createSharedComposable, useLocalStorage } from '@vueuse/core'

export const useAddress = createSharedComposable(() => {
  // Address to use for data fetching
  const address = useLocalStorage<string | null>('address', null)

  // Address user is connected with, to use by default
  const {
    address: connectedAddress,
    isConnected,
    disconnect,
  } = useSharedSigningClient()

  // Address filled via AddressForm component
  const formAddress = ref<string>('')
  const setFormAddress = (v?: string) => {
    formAddress.value = v ?? ''
  }
  const resetFormAddress = () => setFormAddress()

  const resetAddress = () => {
    address.value = null
    resetFormAddress()

    // If address was set via wallet connection, disconnect
    if (isConnected) {
      disconnect()
    }
  }

  // Whenever address is changed (through connection or form submit),
  // update the target address and store it in the localStorage
  watch(() => connectedAddress.value || formAddress.value, (newAddress) => {
    address.value = newAddress ?? null
  })

  return {
    address: shallowReadonly(address),
    resetAddress,

    setFormAddress,
    resetFormAddress,
  }
})
