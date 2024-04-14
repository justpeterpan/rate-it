<script setup lang="ts">
import type { Results } from '~/server/api/cover'
const selectedAlbum = useAlbum()
const isOpen = useSearch()

const searchQuery = ref('')
const searchResults = ref<Results>()

function replaceImageUrl(url: string) {
  return url.replace('100x100bb', '600x600bb')
}

async function search() {
  const data = await $fetch('/api/cover/', {
    method: 'GET',
    params: {
      search: searchQuery.value,
    },
  })
  searchResults.value = data
}

function clearSearch() {
  searchQuery.value = ''
  searchResults.value = undefined
}

function selectAlbum(item: Results[0]) {
  selectedAlbum.value = {
    artist: item.artistName,
    album: item.collectionName,
    date: new Date(item.releaseDate).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    cover: replaceImageUrl(item.artworkUrl100),
  }
  isOpen.value = false
  clearSearch()
}
</script>

<template>
  <div>
    <UModal v-model="isOpen">
      <div class="p-4">
        <section class="flex gap-4">
          <UInput
            v-model="searchQuery"
            name="q"
            placeholder="Search..."
            icon="i-heroicons-magnifying-glass-20-solid"
            autocomplete="off"
            :ui="{ icon: { trailing: { pointer: '' } } }"
            class="flex-grow-[2]"
          >
            <template #trailing>
              <UButton
                v-show="searchQuery !== ''"
                color="gray"
                variant="link"
                icon="i-heroicons-x-mark-20-solid"
                :padded="false"
                @click="clearSearch"
              />
            </template>
          </UInput>
          <UButton @click="search">search</UButton>
        </section>
        <ul class="grid grid-cols-3 gap-2 my-4" v-if="searchResults?.length">
          <li v-for="item in searchResults" :key="item.collectionId">
            <img
              :src="replaceImageUrl(item.artworkUrl100)"
              alt="cover"
              class="rounded-lg cursor-pointer"
              @click="selectAlbum(item)"
            />
          </li>
        </ul>
      </div>
    </UModal>
  </div>
</template>
