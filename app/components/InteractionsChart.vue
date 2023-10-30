<template>
  <div v-if="address" class="tw-w-full tw-flex-1 tw-flex tw-flex-col">
    <div>
      Favorite interactions
    </div>

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
        <div v-if="isXsScreen" class="tw-space-y-6">
          <template v-for="d of sortedData" :key="d.name">
            <div>
              Tx by {{ d.name }}
            </div>
          </template>
        </div>
        <bubble-chart
          v-else
          v-slot="{ highlightedData }"
          :data="sortedData"
          :get-value="d => d.value"
          :get-group="d => d.name"
          :get-label="d => d.value.toString()"
          class="tw-cover"
        >
          <div v-if="highlightedData" class="tw-absolute tw-top-0 tw-inset-x-0 tw-flex-center-x">
            <div class="tw-modal">
              test
              {{ highlightedData }}
            </div>
          </div>
        </bubble-chart>
      </template>
    </div>

    <div class="tw-fixed tw-bottom-0 tw-py-8 tw-px-4 tw-inset-x-0 tw-flex-center tw-flex-col tw-gap-3 tw-text-center">
      <div class="tw-modal before:tw-duration-300 before:tw-rounded-full tw-flex-center-y before:tw-z-muted before:tw-animate-spread before:[animation-duration:150ms] before:[animation-delay:1s] before:tw-opacity-soft hover:before:tw-opacity-full">
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
        <div v-else class="tw-h-12 tw-rounded-full tw-px-4 tw-py-2 tw-flex-center tw-bg-r3 tw-text-r2">
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
