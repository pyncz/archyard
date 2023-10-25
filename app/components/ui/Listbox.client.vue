<template>
  <HeadlessListbox v-model="value">
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

<script setup lang="ts" generic="TValue extends string | number | boolean | object | null | undefined, TOption">
interface Props {
  options: TOption[]
  getValue: (o: TOption) => TValue
  getKey?: (o: TOption) => string
}

withDefaults(defineProps<Props>(), {
  getKey: (o: TOption) => JSON.stringify(o),
})

const value = defineModel<TValue>()
</script>
