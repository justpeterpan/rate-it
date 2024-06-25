// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  experimental: {
    headNext: true,
  },
  runtimeConfig: {
    dev: '',
    url: '',
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
  future: {
    compatibilityVersion: 4,
  },
  modules: ['@nuxt/ui'],
})
