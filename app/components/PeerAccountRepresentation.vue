<template>
  <div class="tw-modal tw-duration-300 tw-px-4 tw-py-2 tw-flex tw-gap-2">
    <button v-if="withCopy" class="tw-size-8 tw--ml-2 tw-flex-center tw-bg-r2 hover:tw-bg-r3 tw-duration-300 tw-rounded-lg tw-text-r2 hover:tw-text-r1" @click="copy()">
      <Icon v-if="copied" name="iconoir:check" />
      <Icon v-else name="iconoir:copy" />
    </button>
    <div class="tw-truncate">
      <address-representation class="tw-pt-1.5" :address="data.name" />
      <p class="tw-text-r2 tw-text-7/8">
        {{ label }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  data: { name: string; value: number }
  withCopy?: boolean
}>()

const label = computed(() => {
  return `${props.data.value} ${props.data.value > 1 ? 'Transfers' : 'Transfer'}`
})

const { copy, copied } = useClipboard({ source: () => props.data.name })
</script>
