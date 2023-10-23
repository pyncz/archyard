import type { Config } from 'tailwindcss'

// @ts-ignore next
import maskImagePlugin from '@pyncz/tailwind-mask-image'
import { utilsPlugin, layoutsPlugin } from './tailwind'

const sansSerif = [
  'ui-sans-serif',
  'system-ui',
  '-apple-system',
  'sans-serif',
]

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
export default {
  mode: 'jit',
  prefix: 'tw-',
  safelist: [
    'light-mode',
    'dark-mode',
  ],
  content: [
    './**/*.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        md: '2rem',
        lg: '2.5rem',
      },
    },
  },
  plugins: [
    maskImagePlugin,
    layoutsPlugin,
    utilsPlugin,
  ],
} satisfies Config
