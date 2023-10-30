<template>
  <div v-if="address" class="tw-w-full tw-flex-1 tw-flex tw-flex-col">
    <div class="tw-relative tw-flex-1 tw-duration-300">
      <div v-if="isLoading">
        Loading...
      </div>
      <div v-else-if="!transactions?.length">
        No transfer transactions on {{ chainInfo.chainName }}!
      </div>
      <div v-else-if="!aggregatedTxs.size">
        No interactions with other addresses!
      </div>

      <template v-else>
        <section v-if="isXsScreen" class="tw-space-y-1">
          <h1>Favorite interactions</h1>
          <div class="tw-space-y-1">
            <peer-account-representation
              v-for="d of sortedData"
              :key="d.name"
              class="before:tw-shadow-sm"
              :data="d"
            />
          </div>
        </section>
        <bubble-chart
          v-else
          v-slot="{ highlightedData }"
          :data="sortedData"
          :get-value="d => d.value"
          :get-group="d => d.name"
          :get-label="d => d.value.toString()"
          class="tw-cover"
        >
          <transition
            enter-from-class="tw-opacity-0 tw--translate-y-4 tw-scale-90"
            enter-to-class="tw-opacity-full tw-translate-y-0 tw-scale-100"
            leave-from-class="tw-opacity-full tw-translate-y-0 tw-scale-100"
            leave-to-class="tw-opacity-0 tw-translate-y-4 tw-scale-90"
          >
            <div
              v-if="highlightedData"
              class="tw-absolute tw-pointer-events-none tw-duration-150 tw-z-[1] tw-top-0 tw-inset-x-0 tw-flex-center-x"
            >
              <peer-account-representation
                class="tw-max-w-sm"
                :data="highlightedData"
              />
            </div>
          </transition>
        </bubble-chart>
      </template>
    </div>

    <div class="tw-fixed tw-bottom-0 tw-py-8 tw-px-4 tw-inset-x-0 tw-flex-center tw-flex-col tw-gap-3 tw-text-center">
      <div class="tw-modal before:tw-duration-300 before:tw-rounded-full tw-flex-center-y before:tw-animate-spread before:[animation-duration:150ms] before:[animation-delay:1s] before:tw-opacity-soft hover:before:tw-opacity-full">
        <count-representation
          v-if="total !== null && count !== null"
          class="tw-text-r1 tw-w-16 tw-px-2"
          label="total"
        >
          {{ total }}
        </count-representation>

        <button
          v-if="hasNextPage"
          class="tw-button tw-whitespace-pre-wrap tw-button-primary tw-rounded-full tw-h-12"
          @click="fetchNextPage()"
        >
          Fetch
          <span class="tw-hidden xs:tw-inline">{{ nextPageSize }}</span>
          older txs
        </button>
        <div v-else class="tw-h-12 tw-rounded-full tw-px-4 tw-py-2 tw-flex-center tw-bg-r2 tw-text-r3">
          All fetched!
        </div>

        <count-representation
          v-if="total !== null && count !== null"
          class="tw-text-r1 tw-w-16 tw-px-2"
          label="fetched"
        >
          {{ count }}
        </count-representation>
      </div>
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
  hasNextPage,
  isLoading,
  fetchNextPage,
} = useTransactions(
  address,
  chain,
  () => settings.value.filter,
  'tx_responses',
  { limit },
)

const aggregatedTxs = useAggregatedData(
  transactions,
  (txRes) => {
    const keys = new Set<string>()
    for (const event of txRes.logs[0].events) {
      if (event.type !== 'transfer') {
        continue
      }

      for (const { key, value } of event.attributes) {
        if (['recipient', 'sender'].includes(key) && value !== address.value) {
          keys.add(value)
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
