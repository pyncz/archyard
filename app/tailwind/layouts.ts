import plugin from 'tailwindcss/plugin'

export const layoutsPlugin = plugin(({ addUtilities }) => {
  addUtilities({
    '.flex-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '.flex-center-x': {
      display: 'flex',
      justifyContent: 'center',
    },
    '.flex-center-y': {
      display: 'flex',
      alignItems: 'center',
    },
  })
})
