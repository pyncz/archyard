<template>
  <ui-listbox
    v-model="selectedChain"
    :options="chains"
    :get-value="o => o"
    class="tw-w-36"
  >
    <template #selected="{ value }">
      <chain-representation v-if="value" :chain="value" class="tw-truncate" />
    </template>
    <template #option="{ option }">
      <chain-representation :chain="option" />
    </template>
  </ui-listbox>
</template>

<script setup lang="ts">
const { chains } = useSupportedChains()
const selectedChain = useChain()
</script>
