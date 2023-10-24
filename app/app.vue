<template>
  <div class="tw-w-screen tw-min-h-screen tw-pb-12 tw-flex tw-flex-col">
    <div class="tw-container tw-flex-1 tw-flex tw-flex-col">
      <header class="tw-py-4 tw-justify-end tw-flex tw-flex-col">
        <select-chain />
        <selected-address />
      </header>
      <main class="tw-py-12 tw-flex-1 tw-flex-center">
        <div v-if="!address">
          <address-form />
          <connect-form />
        </div>
        <interactions-chart v-else />
      </main>
    </div>
  </div>
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

const { address } = useAddress()

useSharedSigningClient({ restore: true })
</script>
