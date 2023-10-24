<template>
  <div>
    <!-- TODO: Add chain icon -->
    <p class="tw-font-mono tw-text-7/8">
      {{ chainConfig?.chainName }}
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  chain: ChainId
}>()

const chainConfig = useChainConfig(() => props.chain)
</script>
