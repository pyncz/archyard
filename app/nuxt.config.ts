// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  css: ['~/assets/styles/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    vue: {
      script: {
        defineModel: true,
      },
    },
  },

  modules: [
    'nuxt-headlessui',
    'nuxt-icon',

    // performance
    '@nuxtjs/critters',
    '@nuxtjs/fontaine',
  ],

  // Custom module config. See ./modules/archway/index.ts
  archway: {
    chains: ['constantine-3', 'archway-1'],
  },
})
