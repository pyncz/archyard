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
          class="tw-absolute tw-inset-0"
        >
          <div v-if="highlightedData" class="tw-absolute tw-top-0 tw-bg-white">
            {{ highlightedData }}
          </div>
        </bubble-chart>
      </template>
    </div>

    <div>
      <div class="tw-flex-center-y tw-gap-4">
        <button
          v-if="hasNextPage"
          :disabled="isFetching"
          @click="fetchNextPage()"
        >
          Fetch {{ nextPageSize }} older txs
        </button>
        <div v-else>
          All fetched!
        </div>

        <div v-if="total !== null">
          <p>{{ total }} total</p>
          <p>{{ count }} fetched</p>
        </div>
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
  isFetching,
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
