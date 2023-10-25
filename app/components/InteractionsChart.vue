<template>
  <div v-if="address">
    <div>
      Favorite interactions
      <address-representation :address="address" />
    </div>

    <div :class="{ 'tw-opacity-muted': isPending }">
      Here will be d3 chart
      <div v-if="data">
        <div v-for="txRes of data" :key="txRes.txhash">
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
const chain = useChain()

const limit = 100

const {
  data,
  total,
  count,
  error,
  hasNextPage,
  isPending,
  fetchNextPage,
} = useTransactions(address, chain, { limit })
</script>
