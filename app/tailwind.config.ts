import type { Config } from 'tailwindcss'

// @ts-expect-error next
import maskImagePlugin from '@pyncz/tailwind-mask-image'
import headlessUiPlugin from '@headlessui/tailwindcss'
import plugin from 'tailwindcss/plugin'
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
      accent: {
        DEFAULT: co('--accent-0'),
        ...fill(3, i => co(`--accent-${i}`), i => `r${i}`),
      },
      current: 'currentcolor',
      state: {
        error: co('--text-error'),
      },
    },
    textColor: ({ theme }) => ({
      ...theme('colors'),
      ...fill(5, i => co(`--text-${i}`), i => `r${i}`),
      transparent: 'transparent',
    }),
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      ...fill(5, i => co(`--bg-${i}`), i => `r${i}`),
      state: {
        error: co('--bg-error'),
      },
    }),
    borderColor: ({ theme }) => theme('textColor'),
    fill: ({ theme }) => theme('textColor'),
    stroke: ({ theme }) => theme('borderColor'),
    lineHeight: {
      1: '1',
      xs: '1.15',
      sm: '1.25',
      md: '1.5',
      inherit: 'inherit',
    },
    opacity: {
      0: '0',
      faint: '0.2',
      muted: '0.5',
      soft: '0.8',
      full: '1',
    },
    zIndex: {
      muted: '-1',
    },
    animation: {
      fadein: 'fadein 500ms ease-in forwards',
      closup: 'closup 500ms ease-in forwards',
      spread: 'spread 500ms ease-out forwards',
    },
    keyframes: {
      fadein: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      closup: {
        '0%, 100%': { transform: 'scale(1)' },
        '50%': { transform: 'scale(1.1)' },
      },
      spread: {
        '0%': { inset: '0' },
        '100%': { inset: '-0.5rem' },
      },
    },
    extend: {
      borderRadius: {
        ui: '0.75rem',
      },
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

    plugin(({ addComponents, addVariant, addUtilities }) => {
      addUtilities({
        '.cover': {
          position: 'absolute',
          inset: '0',
        },
      })

      const uiElement = {
        '@apply tw-duration-150 hover:tw-duration-300': {},
        '@apply tw-border tw-border-[rgb(var(--border)_/_var(--tw-border-opacity))] tw-border-opacity-[0.2] focus-like:tw-border-opacity-soft': {},
        '@apply tw-ring-[3px] tw-ring-[rgb(var(--ring)_/_var(--tw-ring-opacity))] tw-ring-opacity-0 focus-like:tw-ring-opacity-faint': {},
        '@apply tw-h-10 tw-rounded-ui tw-px-4 tw-py-2 !tw-leading-1 tw-outline-none': {},
        '@apply disabled:tw-opacity-muted disabled:tw-pointer-events-none': {},
      }
      addComponents({
        '.control': {
          '@apply tw-duration-150 tw-circle-[1.25em] tw-flex-center tw-bg-r3 tw-text-r2 hover:tw-bg-r4 hover:tw-text-r1': {},
        },
        '.modal': {
          '@apply tw-relative before:tw-cover before:tw-border before:tw-border-r4 before:tw-shadow-lg before:tw-border-opacity-soft before:tw-bg-white before:tw-rounded-xl before:tw-z-muted': {},
        },
        '.button': {
          ...uiElement,
          '@apply [--ring:--accent-0] [--border:--accent-0]': {},
          '@apply tw-text-base tw-flex-center active:tw-scale-[0.975]': {},
          '@apply tw-relative before:tw-cover before:tw-bg-[radial-gradient(50%_50%_at_50%_100%,_rgb(var(--white)),_rgb(var(--white)_/_0))] before:tw-bg-[size:100%_200%] before:tw-bg-[position:0_0] before:hover:tw-bg-[position:0_100%] before:hover:tw-bg-[size:100%_300%] before:tw-duration-1000 before:hover:tw-duration-150 before:tw-opacity-muted': {},
        },
        '.input': {
          ...uiElement,
          '@apply [--ring:--accent-0] [--border:--text-2] hover:[--border:--text-1] focus-like:[--border:--accent-0] focus-like:tw-border-opacity-muted focus-like:hover:tw-border-opacity-soft': {},
          '@apply tw-bg-white tw-text-start tw-text-7/8 tw-text-r0 tw-truncate placeholder:tw-text-r4': {},
        },
        '.button-primary': {
          '@apply [--ring:--text-0] [--border:--text-0]': {},
          '@apply focus-visible:tw-ring-opacity-[0.15] tw-bg-black tw-text-white active:tw-bg-black before:tw-opacity-faint': {},
        },
      })

      addVariant('interact', ['&:hover', '&:focus'])
      addVariant('focus-like', ['&:focus-visible', '&:focus-within'])
    }),
  ],
} satisfies Config
