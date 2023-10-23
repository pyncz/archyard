<template>
  <div v-if="isConnected">
    <button @click="disconnect">
      Disconnect
    </button>
  </div>
  <div v-else class="tw-flex tw-gap-3">
    <button
      :disabled="isLoading || !props.chain"
      @click="connect(props.chain, 'keplr')"
    >
      Keplr
    </button>
    <button
      :disabled="isLoading || !props.chain"
      @click="connect(props.chain, 'leap')"
    >
      Leap
    </button>
    <button
      :disabled="isLoading || !props.chain"
      @click="connect(props.chain)"
    >
      Connect me with something already
    </button>
  </div>

  <p v-if="error" class="tw-font-mono tw-text-red-500 tw-text-sm tw-bg-red-100 tw-p-4 tw-rounded">
    {{ error }}
  </p>
</template>

<script setup lang="ts">
const props = defineProps<{
  chain: ChainId
}>()

const {
  connect,
  error,
  isLoading,
  isConnected,
  disconnect,
} = useSharedSigningClient()
</script>
