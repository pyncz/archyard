<template>
  <div class="[--bg:125_200_255] [--text:25_155_200] tw-text-[rgb(var(--text))] tw-bg-[rgb(var(--bg)_/_0.25)] tw-rounded-lg tw-text-7/8 tw-flex tw-gap-1 tw-p-1 tw-bg-accent-r2">
    <div class="tw-rounded-md tw-bg-[rgb(var(--bg)_/_0.35)] tw-size-6 tw-flex-center">
      <slot name="icon" />
    </div>
    <div class="tw-opacity-soft tw-px-1 tw-py-0.5 tw-leading-sm">
      <slot />
    </div>
  </div>
</template>
