<script setup lang="ts">
const route = useRoute()
const selectedAlbum = useAlbum()
const isOpen = useSearch()

const notes = ref(route.query.notes ?? '')
const rating = ref(route.query.rating ?? 0)

const screenshotTaken = ref('')

async function takeServerScreenshot() {
  const data = await $fetch('/api/screenshot', {
    query: {
      artist: selectedAlbum.value.artist,
      album: selectedAlbum.value.album,
      date: selectedAlbum.value.date,
      cover: selectedAlbum.value.cover,
      rating: rating.value,
      notes: notes.value,
    },
  })
  screenshotTaken.value = data
}

const ratings = [
  { label: '😠' }, // hate it
  { label: '😐' }, // meh
  { label: '😊' }, // like it
  { label: '😍' }, // love it
]

function selectRating(index: number) {
  rating.value = index
}
</script>

<template>
  <div>
    <SearchOverlay />
    <div id="screenshot">
      <UCard class="my-4">
        <div class="flex">
          <Placeholder
            class="w-56 h-56 cursor-pointer border-2"
            v-if="!route.query.cover && !selectedAlbum.cover"
            @click="isOpen = true"
          />
          <img
            :src="
              typeof route.query.cover === 'string'
                ? route.query.cover
                : route.query.cover?.[0] || (selectedAlbum.cover ?? '')
            "
            alt="album artwork"
            v-else
            class="w-56 h-56 rounded-lg"
          />
          <section class="ml-5">
            <h2 class="text-3xl font-bold">
              {{ route.query.artist || (selectedAlbum.artist ?? '') }}
            </h2>
            <h3 class="text-xl font-semibold">
              {{ route.query.album || selectedAlbum.album }}
            </h3>
            <p class="text-gray-500">
              {{ route.query.date || selectedAlbum.date }}
            </p>
            <UTextarea
              v-model="notes"
              placeholder="Write your review..."
              class="mt-4"
              :padded="false"
              variant="none"
            />
          </section>
        </div>
        <UTabs
          :items="ratings"
          @change="selectRating"
          class="mt-10"
          :default-index="Number(route.query.rating) || 0"
        />
      </UCard>
    </div>
    <section class="flex gap-4">
      <UButton label="Take Server Screenshot" @click="takeServerScreenshot" />
    </section>
    <div v-if="screenshotTaken" class="mt-4">
      <img :src="screenshotTaken" alt="screenshot of above site" />
    </div>
  </div>
</template>
