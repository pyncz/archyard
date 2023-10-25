import { VueQueryPlugin } from '@tanstack/vue-query'

export default defineNuxtPlugin({
  name: 'vue-query',
  async setup(nuxtApp) {
    nuxtApp.vueApp.use(VueQueryPlugin)
  },
})
