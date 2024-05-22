<script setup lang="ts">
import TemplateDefault from '~/components/TemplateDefault.vue'
import TemplateMnml from '~/components/TemplateMnml.vue'

const route = useRoute()

const colors = ['green', 'violet', 'lime', 'yellow', 'blue', 'sky']

// state
const isOpen = useSearch()
const selectedAlbum = useAlbum()

const colorRangeValue = defineModel('colorRangeValue', { default: 255 })
const albumReview = defineModel('albumReview', { default: '' })
const rating = defineModel({ default: '5' })

const selectedColor = ref('violet')
const isLoading = ref(false)
const calculatedOpacity = computed(() => colorRangeValue.value / 255)

const screenshot = ref('')
const isShareModalOpen = defineModel('isShareModalOpen', { default: false })
const currentTemplateValue = ref('default')

const currentTemplate = computed(() => {
  if (route.query.template === 'mnml') {
    currentTemplateValue.value = 'mnml'
    return TemplateMnml
  }
  if (route.query.template === 'default') {
    return TemplateDefault
  }
  return TemplateDefault
})

function selectColor(color: string) {
  selectedColor.value = color
}

async function shareReview() {
  isLoading.value = true
  const data = await $fetch('/api/screenshot/', {
    query: {
      album: selectedAlbum.value.album,
      artist: selectedAlbum.value.artist,
      bgColor: selectedColor.value,
      cover: selectedAlbum.value.cover,
      date: selectedAlbum.value.date,
      opacity: calculatedOpacity.value,
      rating: rating.value,
      review: albumReview.value,
      template: currentTemplateValue.value,
      theme: 'light',
    },
  })
  screenshot.value = data
  isShareModalOpen.value = true
  isLoading.value = false
}
</script>
<template>
  <div>
    <SearchOverlay />
    <div
      class="grid grid-flow-row sm:grid-flow-col sm:grid-cols-2 min-h-screen gap-1"
    >
      <!-- template -->
      <div class="bg-white rounded-xl transition duration-500 ease-in-out">
        <component
          :is="currentTemplate"
          config
          :bg="selectedColor"
          :opacity-rgba="calculatedOpacity"
          :album="{
            artist: selectedAlbum.artist ?? 'artist',
            title: selectedAlbum.album ?? 'title',
            date: selectedAlbum.date ?? '01.01.1970',
            rating: rating,
            review: albumReview || 'your review',
            image:
              selectedAlbum.cover ??
              'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/0c/71/680c7107-f7c2-6e55-8ea9-09b935620654/5056321637703.png/600x600bb.jpg',
          }"
        />
      </div>
      <!-- configuration -->
      <div class="bg-neutral-100 rounded-xl flex flex-col p-5">
        <h1 class="text-7xl font-extrabold">New Album Review</h1>
        <div
          class="flex mt-10 h-12 w-full bg-white rounded-full justify-between items-center px-5 cursor-pointer"
          @click="isOpen = true"
        >
          <div>search album</div>
          <div class="text-2xl">⊕</div>
        </div>
        <div class="flex flex-row mt-10 cursor-pointer">
          <ColorSlider
            v-for="color of colors"
            :key="color"
            :color="color"
            :selected-color="selectedColor"
            @pick-color="selectColor"
            v-model="colorRangeValue"
          />
        </div>
        <div class="flex flex-col mt-10">
          <textarea
            spellcheck="false"
            name="review"
            maxlength="100"
            cols="2"
            rows="5"
            class="resize-none rounded-3xl py-5 px-5 h-20"
            v-model="albumReview"
          ></textarea>
        </div>
        <div class="flex flex-col mt-10">
          <input
            type="range"
            name="rating"
            id="rating"
            :min="1"
            :max="5"
            step=".5"
            v-model="rating"
            class="appearance-none w-full bg-white rounded-full outline-none p-2"
          />
          <RatingSlider :rating="Number(rating)" />
          <UToggle size="2xl" class="mt-10" />
        </div>
        <UButton
          class="sticky bottom-2 left-0 bg-neutral-900 text-white p-4 rounded-full mt-10 hover:bg-neutral-500 hover:text-white justify-center transition duration-500 ease-in-out"
          :loading="isLoading"
          @click="shareReview"
        >
          Share Review
        </UButton>
      </div>
    </div>
    <div>
      <UModal
        v-model="isShareModalOpen"
        :ui="{
          margin: 'sm:my-0',
          width: 'sm:w-[430px]',
          overlay: { background: 'bg-gray-800/95' },
        }"
      >
        <img
          :src="screenshot"
          alt="screenshot of review"
          v-if="screenshot"
          class="w-[430px] h-[678px] rounded-lg"
        />
      </UModal>
    </div>
  </div>
</template>
