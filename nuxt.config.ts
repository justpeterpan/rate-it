// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  experimental: {
    headNext: true,
    typedPages: true,
  },

  runtimeConfig: {
    cover: process.env.NUXT_ITUNES_SEARCH_API,
  },

  modules: ["@nuxt/ui"],
})