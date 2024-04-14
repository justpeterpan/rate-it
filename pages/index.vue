<script setup lang="ts">
import { toPng } from 'html-to-image'

const selectedAlbum = useAlbum()
const isOpen = useSearch()

const notes = ref('')
const screenshot = ref()

function captureContent() {
  toPng(screenshot.value)
    .then((canvas) => {
      const link = document.createElement('a')
      link.download = 'review.png'
      link.href = canvas
      link.click()
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error)
    })
}

function shareReview() {
  toPng(screenshot.value)
    .then((canvas) => {
      console.log(canvas)
      const filesArray = [
        new File([canvas], 'meme.jpg', {
          type: 'image/jpeg',
          lastModified: new Date().getTime(),
        }),
      ]
      const shareData = {
        files: filesArray,
      }
      navigator.share(shareData)
    })
    .catch((error) => {
      console.error('oops, something went wrong!', error)
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
  if (rating.label === 'love it') {
    console.log('yay')
  }
}
</script>

<template>
  <div>
    <SearchOverlay />
    <div ref="screenshot">
      <UCard class="my-4">
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
            class="w-56 h-56 rounded-lg"
          />
          <section class="ml-5" v-if="selectedAlbum.cover">
            <h2 class="text-3xl font-bold">{{ selectedAlbum.artist }}</h2>
            <h3 class="text-xl font-semibold">{{ selectedAlbum.album }}</h3>
            <p class="text-gray-500">{{ selectedAlbum.date }}</p>
            <UTextarea
              v-model="notes"
              placeholder="Write your review..."
              class="mt-4"
              :padded="false"
              variant="none"
            />
          </section>
        </div>
        <UTabs :items="ratings" @change="selectRating" class="mt-10" />
      </UCard>
    </div>
    <section class="flex gap-4">
      <UButton
        label="Download Review"
        @click="captureContent"
        v-if="selectedAlbum.artist"
      />
      <UButton
        label="Share Review"
        @click="shareReview"
        v-if="selectedAlbum.artist"
      />
    </section>
  </div>
</template>
