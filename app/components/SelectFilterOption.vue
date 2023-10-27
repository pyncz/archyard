<template>
  <span :title="data.title">
    {{ data.label }}
  </span>
</template>

<script setup lang="ts">
import type { FilterType } from '../types'

const props = defineProps<{
  value: FilterType
}>()

const { address } = useAddress()
const formattedAddress = useFormatAddress(address)

const data = computed(() => {
  if (props.value === 'received') {
    return {
      label: 'Received',
      title: formattedAddress.value
        ? `Show transactions sent to ${formattedAddress.value}`
        : 'Show transactions received',
    }
  } else {
    return {
      label: 'Sent',
      title: formattedAddress.value
        ? `Show transactions sent by ${formattedAddress.value}`
        : 'Show transactions sent',
    }
  }
})
</script>
