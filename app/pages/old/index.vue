<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
const route = useRoute()
const selectedAlbum = useAlbum()
const isOpen = useSearch()
const isLoading = ref(false)

const notes = ref(route.query.notes ?? '')
const rating = ref(route.query.rating ?? 0)
const errorMsg = ref('')

const screenshotTaken = ref('')

async function takeServerScreenshot() {
  isLoading.value = true
  const data = await $fetch('/api/screenshot/', {
    query: {
      artist: selectedAlbum.value.artist,
      album: selectedAlbum.value.album,
      date: selectedAlbum.value.date,
      cover: selectedAlbum.value.cover,
      rating: rating.value,
      notes: notes.value,
      theme: isDark.value ? 'dark' : 'light',
    },
  })
  screenshotTaken.value = data
  try {
    const image = await $fetch(data)
    const files = [
      new File([image as BlobPart], 'review.jpg', { type: 'image/jpeg' }),
    ]
    if (navigator.share) {
      navigator
        .share({
          files,
        })
        .catch((e) => {
          console.error(e)
          errorMsg.value = e
          isLoading.value = false
        })
    }
  } catch (e) {
    console.error(e)
    isLoading.value = false
  }
  isLoading.value = false
}

const ratings = [
  { label: 'hate it' }, // hate it
  { label: 'meh' }, // meh
  { label: 'like it' }, // like it
  { label: 'love it' }, // love it
]

function selectRating(index: number) {
  rating.value = index
}
</script>

<template>
  <div>
    <SearchOverlay />
    <div id="screenshot" class="p-1">
      <UCard class="@container">
        <div class="flex flex-col @md:flex-row gap-4">
          <Placeholder
            class="w-full @md:w-56 @md:h-56 cursor-pointer border-2"
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
            class="w-full @md:w-56 @md:h-56 rounded-lg"
          />
          <section class="">
            <h2 class="text-3xl font-bold">
              {{ route.query.artist || (selectedAlbum.artist ?? '') }}
            </h2>
            <h3 class="text-xl font-semibold">
              {{ route.query.album || (selectedAlbum.album ?? '') }}
            </h3>
            <p class="text-gray-500">
              {{ route.query.date || (selectedAlbum.date ?? '') }}
            </p>
            <UTextarea
              v-model="notes"
              placeholder="✎ Write your review..."
              class="mt-4"
              :padded="false"
              variant="none"
              :rows="1"
              :maxrows="5"
              autoresize
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
    <section class="@container p-1 mt-2">
      <div class="flex gap-2">
        <ClientOnly>
          <UButton
            :icon="
              isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
            "
            color="violet"
            variant="outline"
            aria-label="Theme"
            @click="isDark = !isDark"
          />
          <template #fallback>
            <div class="w-8 h-8" />
          </template>
        </ClientOnly>
        <UButton
          label="Share Review"
          @click="takeServerScreenshot"
          :loading="isLoading"
          class="flex-grow @md:flex-grow-0 justify-center"
        />
      </div>
    </section>
    <div v-if="screenshotTaken" class="mt-4 p-1 hidden md:block">
      <img :src="screenshotTaken" alt="screenshot of above site" />
    </div>
  </div>
</template>
