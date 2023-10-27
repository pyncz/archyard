<template>
  <HeadlessListbox v-model="value">
    <HeadlessListboxLabel v-if="label">
      {{ label }}
    </HeadlessListboxLabel>
    <HeadlessListboxButton>
      <slot name="selected" v-bind="{ value }">
        {{ value }}
      </slot>
    </HeadlessListboxButton>
    <HeadlessListboxOptions>
      <HeadlessListboxOption
        v-for="option in options"
        :key="getKey(option)"
        :value="getValue(option)"
      >
        <slot name="option" v-bind="{ option }">
          {{ JSON.stringify(option) }}
        </slot>
      </HeadlessListboxOption>
    </HeadlessListboxOptions>
  </HeadlessListbox>
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
