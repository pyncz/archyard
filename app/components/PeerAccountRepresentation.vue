<template>
  <div class="tw-modal tw-duration-300 tw-pointer-events-none hover:tw-opacity-muted tw-px-4 tw-py-2">
    <address-representation class="tw-pt-1.5" :address="data.name" />
    <p class="tw-text-r2 tw-text-7/8">
      {{ label }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  data: { name: string; value: number }
}>()

const label = computed(() => {
  return `${props.data.value} ${props.data.value > 1 ? 'Transactions' : 'Transaction'}`
})
</script>
