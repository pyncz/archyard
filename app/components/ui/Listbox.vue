<template>
  <div class="tw-relative">
    <HeadlessListbox v-model="value">
      <HeadlessListboxLabel v-if="label">
        {{ label }}
      </HeadlessListboxLabel>

      <HeadlessListboxButton
        v-slot="{ open, disabled }"
        class="tw-relative tw-w-full tw-group/trigger tw-input tw-bg-opacity-0 tw-pr-8"
      >
        <slot name="selected" v-bind="{ value, open, disabled }">
          {{ value }}
        </slot>
        <div
          :class="{ 'tw-rotate-180': open }"
          class="tw-absolute tw-pointer-events-none tw-right-2 tw-top-1/2 tw--translate-y-1/2 tw-control group-hover/trigger:tw-bg-r4 group-hover/trigger:tw-text-r2"
        >
          <Icon name="iconoir:nav-arrow-down" />
        </div>
      </HeadlessListboxButton>

      <transition
        leave-active-class="tw-duration-100 tw-ease-in"
        leave-from-class="tw-opacity-full"
        leave-to-class="tw-opacity-0"
      >
        <HeadlessListboxOptions
          class="tw-absolute tw-space-y-1 tw-w-full tw-mt-1 tw-max-h-60 tw-overflow-auto tw-rounded-ui tw-bg-r2 tw-p-1 tw-shadow-lg tw-border tw-border-r4 !tw-outline-none tw-text-sm"
        >
          <HeadlessListboxOption
            v-for="option in options"
            v-slot="{ active, selected, disabled }"
            :key="getKey(option)"
            :value="getValue(option)"
            class="tw-px-3 tw-duration-150 tw-cursor-pointer tw-py-2 tw-rounded-lg tw-select-none tw-border tw-border-opacity-0 tw-opacity-soft tw-text-r1 tw-bg-r3 tw-border-r3 tw-bg-opacity-0 hover:tw-bg-opacity-full ui-disabled:tw-pointer-events-none ui-disabled:tw-opacity-muted ui-active:tw-opacity-full ui-active:tw-border-opacity-muted ui-selected:tw-text-accent-r0 ui-selected:tw-bg-accent-r2 ui-selected:tw-border-accent-r1 ui-selected:tw-border-opacity-muted ui-active:ui-selected:tw-border-opacity-soft"
          >
            <slot name="option" v-bind="{ option, active, selected, disabled }">
              <span>{{ JSON.stringify(option) }}</span>
            </slot>
          </HeadlessListboxOption>
        </HeadlessListboxOptions>
      </transition>
    </HeadlessListbox>
  </div>
</template>

<script setup lang="ts" generic="TValue extends string | number | boolean | Record<string, any> | undefined, TOption">
withDefaults(defineProps<Props>(), {
  getKey: (o: TOption) => JSON.stringify(o),
})

interface Props {
  label?: string
  options: TOption[]
  getValue: (o: TOption) => TValue
  getKey?: (o: TOption) => string
}

const value = defineModel<TValue>()
</script>
