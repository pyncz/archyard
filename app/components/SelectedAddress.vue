<template>
  <div v-if="address">
    <address-representation :address="address" />
    <button @click="reset">
      <Icon name="iconoir:cancel" />
    </button>
  </div>
</template>

<script setup lang="ts">
const { address, resetFormAddress } = useAddress()
const { isConnected, disconnect } = useSharedSigningClient()

const reset = () => {
  resetFormAddress()

  // If address was set via wallet connection, disconnect
  if (isConnected) {
    disconnect()
  }
}
</script>
