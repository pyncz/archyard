<template>
  <p v-if="error" class="tw-font-mono tw-text-red-500 tw-text-sm tw-bg-red-100 tw-p-4 tw-rounded">
    {{ error.message ?? error.toString() }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  error?: any
}>()
</script>
