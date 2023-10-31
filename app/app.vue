<template>
  <div class="tw-w-screen tw-min-h-screen tw-pb-12 tw-flex tw-flex-col">
    <transition
      enter-from-class="tw-scale-150 tw-opacity-0 tw-translate-y-1/2"
      enter-to-class="tw-scale-100 tw-opacity-full tw-translate-y-0"
      leave-from-class="tw-scale-100 tw-opacity-full tw-translate-y-0"
      leave-to-class="tw-scale-150 tw-opacity-0 tw-translate-y-1/2"
    >
      <div v-show="!address" class="tw-duration-1000 tw-ease-out tw-fixed tw-inset-0 tw-z-muted tw-bg-[radial-gradient(90%_75%_at_50%_100%,_rgb(255_164_113_/_0.3),_rgb(255_164_113_/_0)_100%)]" />
    </transition>

    <div class="tw-px-4 xs:tw-px-6 sm:tw-container tw-flex-1 tw-flex tw-flex-col">
      <header class="tw-min-h-[4.625rem] tw-border-b tw-border-r4 md:tw-border-none tw-py-6 md:tw-py-4 tw-grid tw-gap-2 tw-grid-cols-2 lg:tw-grid-cols-3 sm:tw-items-center">
        <div class="tw-flex tw-justify-start tw-col-start-2 sm:tw-col-start-1 sm:tw-row-start-2 lg:tw-row-start-1">
          <ClientOnly>
            <transition
              mode="out-in"
              enter-from-class="tw-opacity-0 tw--translate-y-2"
              enter-active-class="tw-duration-300"
              enter-to-class="tw-opacity-full tw-translate-y-0"
              leave-from-class="tw-opacity-full tw-translate-y-0"
              leave-active-class="tw-duration-300"
              leave-to-class="tw-opacity-0 tw--translate-y-4"
            >
              <selected-address />
            </transition>
          </ClientOnly>
        </div>
        <div class="tw-flex sm:tw-justify-center tw-pb-1 tw-row-start-1 sm:tw-col-span-2 lg:tw-col-span-1 tw-col-start-1 lg:tw-col-start-2">
          <transition
            mode="out-in"
            enter-from-class="tw-opacity-0 tw--translate-y-2"
            enter-active-class="tw-duration-300"
            enter-to-class="tw-opacity-full tw-translate-y-0"
            leave-from-class="tw-opacity-full tw-translate-y-0"
            leave-active-class="tw-duration-300"
            leave-to-class="tw-opacity-0 tw--translate-y-4"
          >
            <app-logo v-show="address" :short="isXsScreen" class="tw-h-8" />
          </transition>
        </div>
        <div class="tw-flex tw-flex-col xs:tw-flex-row tw-flex-wrap sm:tw-justify-end tw-gap-2 tw-row-start-2 tw-col-span-2 sm:tw-col-span-1 lg:tw-row-start-1 lg:tw-col-start-3">
          <ClientOnly>
            <transition
              mode="out-in"
              enter-from-class="tw-opacity-0 tw--translate-y-2"
              enter-active-class="tw-duration-300"
              enter-to-class="tw-opacity-full tw-translate-y-0"
              leave-from-class="tw-opacity-full tw-translate-y-0"
              leave-active-class="tw-duration-300"
              leave-to-class="tw-opacity-0 tw--translate-y-4"
            >
              <div v-if="address" class="tw-w-full xs:tw-w-auto">
                <select-filter class="tw-w-full" />
              </div>
            </transition>
          </ClientOnly>
          <select-chain class="max-xs:tw-w-full" />
        </div>
      </header>

      <div class="tw-py-8 tw-flex-1 tw-flex-center tw-flex-col">
        <ClientOnly>
          <template #fallback>
            <div class="tw-animate-fadein">
              <app-logo class="tw-h-12" />
            </div>
          </template>

          <transition
            mode="out-in"
            enter-from-class="tw-opacity-0"
            enter-to-class="tw-opacity-full"
            leave-from-class="tw-opacity-full"
            leave-to-class="tw-opacity-0"
          >
            <interactions-chart v-if="address" class="tw-duration-150" />
            <div v-else class="tw-w-full tw-space-y-6 tw-duration-150">
              <div class="tw-space-y-2 tw-text-center tw-max-w-xs tw-flex-center-y tw-flex-col tw-mx-auto">
                <app-logo class="tw-h-12 tw-animate-fadein" />
                <p class="tw-text-r2 tw-text-sm tw-leading-sm">
                  Specify address and view your favourite transfer recipients and senders!
                </p>
              </div>
              <div class="tw-gap-6 sm:tw-gap-0 tw-flex tw-flex-col sm:tw-flex-row tw-pb-8 tw-max-w-sm sm:tw-max-w-lg md:tw-max-w-xl tw-mx-auto sm:tw-justify-center sm:tw-divide-x sm:tw-divide-r4 sm:[--px:theme(spacing.8)] md:[--px:theme(spacing.12)]">
                <address-form class="tw-pr-[--px] tw-flex-1 sm:tw-py-6" />
                <connect-form class="tw-pl-[--px] tw-flex-1 sm:tw-py-6" />
              </div>
            </div>
          </transition>
        </ClientOnly>
      </div>
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

const breakpoints = useTailwindBreakpoints()
const isXsScreen = breakpoints.smaller('xs')

const { restoreConnection } = useSharedSigningClient()
onMounted(restoreConnection)
</script>
