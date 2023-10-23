import plugin from 'tailwindcss/plugin'

export const utilsPlugin = plugin(({ matchUtilities, theme }) => {
  const size = (value: string) => ({
    height: value,
    minHeight: value,
    width: value,
    minWidth: value,
  })

  matchUtilities(
    {
      size,
      circle: value => ({
        ...size(value),
        borderRadius: theme('borderRadius.full'),
      }),
    },
    { values: theme('height') },
  )
})
