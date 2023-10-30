<template>
  <div class="tw-text-center tw-leading-1">
    <p class="tw-font-medium">
      <slot />
    </p>
    <slot name="label">
      <small v-if="label" class="tw-block tw-text-3/4 tw-leading-1 tw-opacity-muted">
        {{ label }}
      </small>
    </slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
}>()
</script>
