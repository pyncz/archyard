<template>
  <div v-if="address" class="tw-inline-flex tw-gap-2.5 tw-overflow-hidden">
    <button
      class="tw-control tw-text-lg"
      :title="isConnected ? 'Disconnect' : 'Back'"
      @click="resetAddress"
    >
      <Icon v-if="isConnected" name="iconoir:cancel" />
      <Icon v-else name="iconoir:arrow-left" />
    </button>
    <div class="tw-py-0.5 tw-overflow-hidden">
      <address-representation :address="address" />
      <small class="tw-inline-flex tw-text-r3 tw-leading-sm">{{ isConnected ? 'Connected' : 'Selected' }}</small>
    </div>
  </div>
</template>

<script setup lang="ts">
const { address, resetAddress } = useAddress()
const { isConnected } = useSharedSigningClient()
</script>
