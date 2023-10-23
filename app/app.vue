<template>
  <main class="tw-container tw-w-screen tw-min-h-screen tw-py-12 tw-flex-center">
    <div>
      Hey
      <select v-model="chain">
        <option value="archway-1">
          mainnet
        </option>
        <option value="constantine-3">
          testnet
        </option>
      </select>
      <Connect :chain="chain" />
    </div>
    <div class="tw-max-w-sm">
      {{ address }}
    </div>
  </main>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Archyard',
  ogTitle: 'Archyard',
  description: 'View your favorite interactions on Archway network',
  ogDescription: 'View your favorite interactions on Archway network',
  ogImage: `${getBaseUrl()}/img/og.jpg`,
  twitterCard: 'summary_large_image',
})

const { chain: connectedChain, address } = useSharedSigningClient({ restore: true })

// Init value is restored from prev connection, mainnet as default
const chain = ref<ChainId>(connectedChain.value ?? 'archway-1')
</script>
