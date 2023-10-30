<template>
  <div>
    <!-- Render just css-truncated address on small screens -->
    <p class="tw-hidden sm:tw-block tw-font-mono tw-leading-1 tw-text-7/8">
      {{ formattedAddress }}
    </p>
    <p class="tw-font-mono tw-leading-1 tw-text-7/8 sm:tw-hidden tw-truncate">
      {{ address }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  address: string
}>()

const formattedAddress = useFormatAddress(() => props.address)
</script>
