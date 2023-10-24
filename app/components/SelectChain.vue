<template>
  <ui-listbox v-model="selectedChain" :options="chains" :get-value="o => o">
    <template #selected="{ value }">
      <chain-representation v-if="value" :chain="value" />
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
