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
    <error-message :error="error" />
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
