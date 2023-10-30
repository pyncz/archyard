<template>
  <p v-if="error" class="tw-text-state-error tw-text-sm">
    {{ error.message ?? error.toString() }}
  </p>
</template>

<script setup lang="ts">
defineProps<{
  error?: any
}>()
</script>
