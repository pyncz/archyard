<template>
  <div class="tw-w-screen tw-min-h-screen tw-pb-12 tw-flex tw-flex-col">
    <div class="tw-container tw-flex-1 tw-flex tw-flex-col">
      <header class="tw-py-4 tw-justify-end tw-flex tw-flex-col">
        <select-chain />
        <selected-address />
        <select-filter />
      </header>
      <main class="tw-py-12 tw-flex-1 tw-flex-center tw-flex tw-flex-col">
        <ClientOnly>
          <template #fallback>
            <div>
              Loading...
            </div>
          </template>

          <interactions-chart v-if="address" />
          <div v-else>
            <address-form />
            <connect-form />
          </div>
        </ClientOnly>
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

const { restoreConnection } = useSharedSigningClient()
onMounted(restoreConnection)
</script>
