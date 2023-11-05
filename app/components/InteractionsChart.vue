<template>
  <div v-if="address" class="tw-w-full tw-flex-1 tw-flex tw-flex-col">
    <div class="tw-relative tw-flex-1 tw-duration-300">
      <div v-if="!aggregatedTxs.size" class="tw-py-12 tw-px-4 tw-text-center tw-text-r3">
        <p v-if="isPending">
          Loading...
        </p>
        <p v-else-if="!transactions?.length">
          No transfer transactions on {{ chainInfo.chainName }}!
        </p>
        <p v-else>
          No interactions with other addresses!
        </p>
      </div>

      <template v-else>
        <section v-if="isXsScreen" class="tw-space-y-1">
          <h1>Favorite interactions</h1>
          <div class="tw-space-y-1">
            <peer-account-representation
              v-for="d of sortedData"
              :key="d.name"
              with-copy
              class="before:tw-shadow-sm"
              :data="d"
            />
          </div>
        </section>
        <bubble-chart
          v-else
          v-slot="{ throttledHighlightedData, copied }"
          :data="sortedData"
          :get-value="d => d.value"
          :get-label="d => `${d.value}`"
          class="tw-cover tw-pt-6"
        >
          <div class="tw-absolute tw-inset-x-0 tw-pointer-events-none tw-duration-100 tw-z-[1] tw-top-0 tw-flex-center-y tw-flex-col">
            <transition
              appear
              appear-active-class="tw-duration-100"
              mode="out-in"
              enter-from-class="tw-opacity-0"
              enter-active-class="tw-duration-100"
              enter-to-class="tw-opacity-full"
              leave-from-class="tw-opacity-full"
              leave-active-class="tw-duration-100"
              leave-to-class="tw-opacity-0"
            >
              <hint-message v-if="copied" class="tw-mb-1 tw--mt-4 tw-max-w-xs tw-mx-auto">
                <template #icon>
                  <Icon name="iconoir:copy" />
                </template>
                Copied!
              </hint-message>
              <hint-message v-else class="tw-mb-1 tw--mt-4 tw-max-w-xs tw-mx-auto">
                <template #icon>
                  <Icon name="iconoir:copy" />
                </template>
                Click on the circle to copy address.
              </hint-message>
            </transition>

            <transition
              enter-from-class="tw-opacity-0 tw-translate-y-2 tw-scale-90"
              enter-to-class="tw-opacity-full tw-translate-y-0 tw-scale-100"
              leave-from-class="tw-opacity-full tw-translate-y-0 tw-scale-100"
              leave-to-class="tw-opacity-0 tw-translate-y-4 tw-scale-90"
            >
              <peer-account-representation
                v-if="throttledHighlightedData"
                class="tw-max-w-full md:tw-max-w-sm"
                :data="throttledHighlightedData"
              />
            </transition>
          </div>
        </bubble-chart>
      </template>
    </div>

    <div class="tw-fixed tw-bottom-0 tw-py-8 tw-px-4 tw-inset-x-0 tw-flex-center tw-flex-col tw-gap-3 tw-text-center">
      <transition
        appear
        enter-from-class="tw-opacity-0 tw-translate-y-8"
        enter-active-class="tw-duration-150 tw-delay-150"
        enter-to-class="tw-opacity-full tw-translate-y-0"
        leave-from-class="tw-opacity-full tw-translate-y-0"
        leave-active-class="tw-duration-150"
        leave-to-class="tw-opacity-0 tw-translate-y-8"
      >
        <div
          v-if="!isPending"
          class="tw-modal before:tw-duration-300 tw-ease-out tw-rounded-full tw-flex-center-y before:tw-opacity-full hover:before:tw-opacity-muted tw-animate-spread [animation-duration:500ms]"
        >
          <div
            v-if="total !== null && count !== null"
            class="tw-opacity-0 tw-w-0 tw-animate-unfold [animation-delay:0.5s]"
          >
            <count-representation class="tw-animate-fadein tw-text-r1 tw-w-16 tw-px-2" label="total">
              {{ total }}
            </count-representation>
          </div>

          <transition
            mode="out-in"
            enter-from-class="tw-opacity-0"
            enter-active-class="tw-duration-300"
            enter-to-class="tw-opacity-full"
            leave-from-class="tw-opacity-full"
            leave-active-class="tw-duration-500"
            leave-to-class="tw-opacity-0"
          >
            <button
              v-if="hasNextPage"
              class="tw-button tw-whitespace-pre-wrap tw-button-primary tw-rounded-full tw-h-12"
              :disabled="isFetching"
              @click="fetchNextPage()"
            >
              Fetch
              <span class="tw-hidden xs:tw-inline">{{ nextPageSize }}</span>
              older txs
            </button>
            <div v-else class="tw-relative tw-h-12 tw-rounded-full tw-px-4 tw-py-2 tw-flex-center tw-bg-r2 tw-text-r3">
              All fetched!
            </div>
          </transition>

          <div
            v-if="total !== null && count !== null"
            class="tw-opacity-0 tw-w-0 tw-animate-unfold [animation-delay:0.5s]"
          >
            <count-representation class="tw-animate-fadein tw-text-r1 tw-w-16 tw-px-2" label="fetched">
              {{ count }}
            </count-representation>
          </div>
        </div>
      </transition>
      <error-message :error="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { address } = useAddress()
const settings = useSettings()

const chain = useChain()
const chainInfo = useChainConfig(chain)

const limit = 100

const breakpoints = useTailwindBreakpoints()
const isXsScreen = breakpoints.smaller('xs')

const {
  data: transactions,
  total,
  count,
  nextPageSize,
  error,
  isPending,
  isFetching,
  hasNextPage,
  fetchNextPage,
} = useTransactions(
  address,
  chain,
  () => settings.value.filter,
  'tx_responses',
  { limit },
)

const counterpartyFilter = computed(() => {
  return settings.value.filter === 'received'
    ? 'sender'
    : 'recipient'
})

const aggregatedTxs = useAggregatedData(
  transactions,
  (txRes) => {
    const keys = new Set<string>()
    for (const log of txRes.logs) {
      for (const event of log.events) {
        if (event.type !== 'transfer') {
          continue
        }

        for (const { key, value } of event.attributes) {
          if (counterpartyFilter.value === key) {
            keys.add(value)
          }
        }
      }
    }
    return Array.from(keys)
  },
  txRes => txRes.txhash,
)

const data = computed(() => {
  const nodes: { name: string; value: number }[] = []
  for (const [addr, txs] of Array.from(aggregatedTxs.value)) {
    nodes.push({ name: addr, value: txs.length })
  }
  return nodes
})

const sortedData = computed(() => {
  return data.value.sort((a, b) => a.value > b.value ? -1 : a.value < b.value ? 1 : 0)
})
</script>
