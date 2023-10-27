<template>
  <div v-if="address">
    <div>
      Favorite interactions
      <address-representation :address="address" />
    </div>

    <div :class="{ 'tw-opacity-muted': isPending }">
      Here will be d3 chart
      <div v-if="transactions">
        <div v-for="txRes of transactions" :key="txRes.txhash">
          {{ txRes.txhash }}
        </div>
      </div>
    </div>

    <div>
      <div class="tw-flex-center-y tw-gap-4">
        <button :disabled="hasNextPage" @click="fetchNextPage()">
          Fetch {{ limit }} older txs
        </button>
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

const limit = 100

const {
  data: transactions,
  total,
  count,
  error,
  hasNextPage,
  isPending,
  fetchNextPage,
} = useTransactions(
  address,
  chain,
  () => settings.value.filter,
  'tx_responses',
  { limit },
)

const data = useAggregatedData(
  transactions,
  (txRes) => {
    const keys = new Set<string>()
    for (const message of txRes.tx.body.messages) {
    // associate addresses that sent message to the user
      if (message.from_address !== address.value) {
        keys.add(message.from_address)
      }
      // associate addresses the user sent message to
      if (message.to_address !== address.value) {
        keys.add(message.to_address)
      }
    }
    return Array.from(keys)
  },
  txRes => txRes.txhash,
)
</script>
