// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    headNext: true,
  },

  runtimeConfig: {
    dev: '',
    cover: '',
    cloudflare: {
      download: '',
      endpoint: '',
      credentials: {
        key: '',
        secret: '',
      },
    },
  },

  modules: ['@nuxt/ui'],
})
