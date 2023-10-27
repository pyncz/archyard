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

const formattedAddress = useFormatAddress(() => props.address)
</script>
