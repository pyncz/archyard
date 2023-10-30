<template>
  <ui-radio
    v-slot="{ option }"
    v-model="settings.filter"
    :options="filters"
    :get-value="o => o"
  >
    <select-filter-option :value="option" />
  </ui-radio>
</template>

<script setup lang="ts">
import { filters } from '../types'
const settings = useSettings()
</script>
