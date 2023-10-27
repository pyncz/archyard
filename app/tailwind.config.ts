import type { Config } from 'tailwindcss'

// @ts-expect-error next
import maskImagePlugin from '@pyncz/tailwind-mask-image'
import headlessUiPlugin from '@headlessui/tailwindcss'
import { layoutsPlugin, utilsPlugin } from './tailwind'

import { co, fill } from './tailwind/helpers'

// Read more about tailwindcss configuration: https://tailwindcss.com/docs/configuration
export default {
  mode: 'jit',
  prefix: 'tw-',
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
    colors: {
      black: co('--black'),
      white: co('--white'),
      accent: co('--accent'),
      current: 'currentcolor',
      state: {
        error: co('--text-error'),
      },
    },
    textColor: ({ theme }) => ({
      ...theme('colors'),
      ...fill(4, i => co(`--text-${i}`), i => `r${i}`),
    }),
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      ...fill(4, i => co(`--bg-${i}`), i => `r${i}`),
      state: {
        error: co('--bg-error'),
      },
    }),
    borderColor: ({ theme }) => theme('textColor'),
    fill: ({ theme }) => theme('textColor'),
    stroke: ({ theme }) => theme('borderColor'),
    lineHeight: {
      1: '1',
      xs: '1.1',
      sm: '1.15',
      md: '1.5',
      inherit: 'inherit',
    },
    opacity: {
      0: '0',
      muted: '0.5',
      full: '1',
    },
    extend: {
      screens: {
        xs: '400px',
      },
      fontSize: {
        '3/4': '0.75em',
        '7/8': '0.875em',
        'em': '1em',
      },
    },
  },
  plugins: [
    headlessUiPlugin,

    // custom plugins
    maskImagePlugin,
    layoutsPlugin,
    utilsPlugin,
  ],
} satisfies Config
