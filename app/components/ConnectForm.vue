<template>
  <section v-if="!isConnected" class="tw-flex tw-gap-3">
    <div>
      <button
        :disabled="isLoading"
        @click="connect(selectedChain, 'keplr')"
      >
        Keplr
      </button>
      <button
        :disabled="isLoading"
        @click="connect(selectedChain, 'leap')"
      >
        Leap
      </button>
      <button
        :disabled="isLoading"
        @click="connect(selectedChain)"
      >
        Connect me with something already
      </button>
    </div>
    <p v-if="error" class="tw-font-mono tw-text-red-500 tw-text-sm tw-bg-red-100 tw-p-4 tw-rounded">
      {{ error }}
    </p>
  </section>
</template>

<script setup lang="ts">
const selectedChain = useChain()

const {
  connect,
  error,
  isLoading,
  isConnected,
} = useSharedSigningClient()
</script>
