<script setup lang="ts">
import html2canvas from 'html2canvas'
const selectedAlbum = useAlbum()
const isOpen = useSearch()

const notes = ref('')
const screenshot = ref()

function captureContent() {
  html2canvas(screenshot.value).then((canvas) => {
    const data = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream')

    const link = document.createElement('a')
    link.href = data
    link.download = 'screenshot.png'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log(data)
  })
}

const ratings = [
  { label: 'hate it' },
  { label: 'meh' },
  { label: 'like it' },
  { label: 'love it' },
]

function selectRating(index: number) {
  const rating = ratings[index]

  console.log(rating.label)
}
</script>

<template>
  <div>
    <SearchOverlay />

    <UCard class="my-4" ref="screenshot">
      <div class="flex">
        <Placeholder
          class="w-56 h-56 cursor-pointer border-2"
          v-if="!selectedAlbum.cover"
          @click="isOpen = true"
        />
        <img
          :src="selectedAlbum.cover"
          alt="album artwork"
          v-else
          class="w-56 h-56"
        />
        <section class="ml-5" v-if="selectedAlbum.cover">
          <h2 class="text-3xl font-bold">{{ selectedAlbum.artist }}</h2>
          <h3 class="text-xl font-semibold">{{ selectedAlbum.album }}</h3>
          <p class="text-gray-500">{{ selectedAlbum.date }}</p>
          <UTextarea v-model="notes" placeholder="Review..." class="mt-4" />
        </section>
      </div>
      <UTabs :items="ratings" @change="selectRating" class="mt-10" />
    </UCard>
    <UButton
      label="Download Review"
      @click="captureContent"
      v-if="selectedAlbum.artist"
    />
  </div>
</template>
