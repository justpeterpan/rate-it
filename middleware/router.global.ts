// https://github.com/nuxt/nuxt/issues/14316
// https://github.com/nuxt/nuxt/issues/14754
export default defineNuxtRouteMiddleware((to) => {
  if (to.fullPath.includes('+')) to.fullPath = to.fullPath.replace(/\+/g, '%20')
})
