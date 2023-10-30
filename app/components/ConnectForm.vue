<template>
  <section v-if="!isConnected" class="tw-text-center">
    <h2 class="tw-max-w-[16rem] tw-mx-auto">
      Or <span class="tw-bg-clip-text tw-text-transparent tw-bg-[linear-gradient(40deg,rgb(var(--accent-0)),rgb(var(--accent-1)))]">connect</span> to pick it up automatically
    </h2>
    <div class="tw-space-y-4">
      <div class="tw-space-y-2">
        <wallet-button
          :disabled="isLoading"
          class="[--accent-0:125_216_255] tw-w-full tw-group/button"
          @click="connect(selectedChain, 'keplr')"
        >
          <span class="tw-inline-flex tw-duration-300 group-hover/button:tw-scale-105">
            <img
              src="/img/wallets/keplr.svg"
              alt="Keplr Wallet logo"
              class="tw-animate-closup [animation-delay:400ms] [animation-duration:600ms]"
            >
          </span>
        </wallet-button>
        <wallet-button
          :disabled="isLoading"
          class="[--accent-0:117_227_174] tw-w-full tw-group/button"
          @click="connect(selectedChain, 'leap')"
        >
          <span class="tw-inline-flex tw-duration-300 group-hover/button:tw-scale-105">
            <img
              src="/img/wallets/leap.svg"
              alt="Leap Wallet logo"
              class="tw-animate-closup [animation-delay:1000ms] [animation-duration:600ms]"
            >
          </span>
        </wallet-button>
        <button
          :disabled="isLoading"
          class="tw-button tw-button-primary tw-w-full tw-whitespace-pre"
          @click="connect(selectedChain)"
        >
          Connect
          <span class="tw-hidden min-[240px]:tw-inline">me already!</span>
        </button>
      </div>
      <error-message :error="error" />
    </div>
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
