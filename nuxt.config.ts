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

  modules: ['@nuxt/ui'],
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in',
    },
  },
})
