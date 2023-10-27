<template>
  <HeadlessRadioGroup v-model="value">
    <HeadlessRadioGroupLabel v-if="label">
      {{ label }}
    </HeadlessRadioGroupLabel>
    <HeadlessRadioGroupOption
      v-for="option in options"
      v-slot="{ checked }"
      :key="getKey(option)"
      :value="getValue(option)"
    >
      <slot v-bind="{ option, checked }">
        {{ JSON.stringify(option) }}
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
