<template>
  <HeadlessRadioGroup v-model="value" class="tw-input tw-bg-opacity-0 tw-relative tw-p-1 tw-flex tw-gap-1">
    <HeadlessRadioGroupLabel v-if="label">
      {{ label }}
    </HeadlessRadioGroupLabel>

    <HeadlessRadioGroupOption
      v-for="option in options"
      v-slot="{ active, checked, disabled }"
      :key="getKey(option)"
      :value="getValue(option)"
      class="tw-border tw-text-r1 tw-border-r4 tw-border-opacity-0 tw-rounded-lg tw-duration-150 tw-opacity-soft hover:tw-bg-r3 ui-checked:tw-bg-r3 ui-checked:tw-text-r0 ui-checked:tw-border-opacity-soft hover:ui-checked:tw-border-opacity-full ui-active:tw-opacity-full tw-px-2 tw-py-0.5 tw-h-full tw-flex tw-items-center tw-cursor-pointer !tw-outline-none ui-disabled:tw-opacity-muted ui-disabled:tw-pointer-events-none"
    >
      <slot v-bind="{ option, active, checked, disabled }">
        <span>{{ JSON.stringify(option) }}</span>
      </slot>
    </HeadlessRadioGroupOption>
  </HeadlessRadioGroup>
</template>

<script setup lang="ts" generic="TValue extends string | number | boolean | Record<string, any> | undefined, TOption">
interface Props {
  label?: string
  options: TOption[]
  getValue: (o: TOption) => TValue
  getKey?: (o: TOption) => string
}

withDefaults(defineProps<Props>(), {
  getKey: (o: TOption) => JSON.stringify(o),
})

const value = defineModel<TValue>()
</script>
