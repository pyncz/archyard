import plugin from 'tailwindcss/plugin'

const prefix = 'ui'

export const headlessUiPlugin = plugin(({ addVariant }) => {
  for (const state of ['open', 'checked', 'selected', 'active', 'disabled']) {
    // But for now, this will do:
    addVariant(`${prefix}-${state}`, [
        `&[data-headlessui-state~="${state}"]`,
        `:where([data-headlessui-state~="${state}"]) &`,
    ])

    addVariant(`${prefix}-not-${state}`, [
        `&[data-headlessui-state]:not([data-headlessui-state~="${state}"])`,
        `:where([data-headlessui-state]:not([data-headlessui-state~="${state}"])) &:not([data-headlessui-state])`,
    ])
  }

  addVariant(`${prefix}-focus-visible`, ':where([data-headlessui-focus-visible]) &:focus')
  addVariant(
      `${prefix}-not-focus-visible`,
      '&:focus:where(:not([data-headlessui-focus-visible] &))',
  )
})
