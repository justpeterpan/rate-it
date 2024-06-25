<template>
  <div
    class="bg-white dark:bg-neutral-800 rounded-xl transition duration-500 ease-in-out min-h-screen"
  >
    <component
      id="screenshot"
      :is="currentTemplate"
      config
      :bg="bgColor"
      :opacity-rgba="opacity"
      :album="{
        artist: artist,
        title: album,
        date: date,
        rating: rating,
        review: review,
        image:
          cover ??
          'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/0c/71/680c7107-f7c2-6e55-8ea9-09b935620654/5056321637703.png/600x600bb.jpg',
      }"
    />
  </div>
</template>

<script lang="ts" setup>
import type { LocationQueryValue } from 'vue-router'

import TemplateDefault from '~/components/TemplateDefault.vue'
import TemplateMnml from '~/components/TemplateMnml.vue'

const route = useRoute()

const album = ref(isStringQuery(route.query.album))
const artist = ref(isStringQuery(route.query.artist))
const bgColor = ref(isStringQuery(route.query.bgColor) || 'violet')
const cover = ref(isStringQuery(route.query.cover))
const date = ref(isStringQuery(route.query.date))
const opacity = ref(Number(isStringQuery(route.query.opacity)) || -1.5)
const rating = ref(isStringQuery(route.query.rating))
const review = ref(isStringQuery(route.query.review))

function isStringQuery(
  query: LocationQueryValue | LocationQueryValue[]
): string {
  if (!query) return ''
  if (typeof query === 'string') return query
  return query[0] ?? ''
}

const currentTemplate = computed(() => {
  if (route.query.template === 'mnml') {
    return TemplateMnml
  }
  if (route.query.template === 'default') {
    return TemplateDefault
  }
  return TemplateDefault
})
</script>

<!-- http://localhost:3000/screenshot/?album=R%20U%20Still%20Down?%20(Remember%20Me)&artist=2Pac&date=25.11.1997&cover=https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/d3/d4/51/d3d451cf-bfb8-3d0b-5ee9-1cba1f9b557a/00012414162823.rgb.jpg/600x600bb.jpg&bgColor=violet&rating=5&review=Masterpiece&opacity=0.5&template=mnml -->
