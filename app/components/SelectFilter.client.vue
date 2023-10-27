<template>
  <ui-radio
    v-slot="{ option, checked }"
    v-model="settings.filter"
    :options="filters"
    :get-value="o => o"
  >
    <select-filter-option
      :class="{ 'bg-blue-200': checked }"
      :value="option"
    />
  </ui-radio>
</template>

<script setup lang="ts">
import { filters } from '../types'
const settings = useSettings()
</script>
