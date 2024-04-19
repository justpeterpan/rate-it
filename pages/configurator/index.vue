<script setup lang="ts">
const isOpen = useSearch()
const selectedAlbum = useAlbum()
const selectedColor = ref('violet')
const colorRangeValue = ref(255)
const calculatedOpacity = computed(() => colorRangeValue.value / 255)
const colors = ['green', 'violet', 'lime', 'yellow', 'blue', 'sky']
const albumReview = ref('')

console.log('selectedAlbum', selectedAlbum.value)

function selectColor(color: string) {
  selectedColor.value = color
}
</script>
<template>
  <div>
    <SearchOverlay />
    <div
      class="grid grid-flow-row sm:grid-flow-col sm:grid-cols-2 min-h-screen gap-1"
    >
      <div
        class="bg-white rounded-xl flex flex-col transition duration-500 ease-in-out"
      >
        <TemplateMnml
          config
          :bg="selectedColor"
          :opacity-rgba="calculatedOpacity"
          :album="{
            artist: selectedAlbum.artist ?? 'artist',
            title: selectedAlbum.album ?? 'title',
            date: selectedAlbum.date ?? '01.01.1970',
            rating: 5,
            review: albumReview || 'your review',
            image:
              selectedAlbum.cover ??
              'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/0c/71/680c7107-f7c2-6e55-8ea9-09b935620654/5056321637703.png/600x600bb.jpg',
          }"
        />
      </div>
      <div class="bg-neutral-100 rounded-xl flex flex-col p-20">
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
      </div>
    </div>
  </div>
</template>
