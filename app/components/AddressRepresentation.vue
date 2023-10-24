<template>
  <div>
    <p class="tw-font-mono tw-text-7/8">
      {{ formattedAddress }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  address: string
}>()

const formattedAddress = useTrim(() => props.address, { start: 12, end: 5 })
</script>
