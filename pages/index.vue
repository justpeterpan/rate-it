<template>
  <div class="flex flex-col gap-1">
    <button class="flex bg-white text-black p-4 rounded-xl w-full">
      Select a template ↴
    </button>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1">
      <NuxtLink to="configurator?template=mnml">
        <TemplateMnml
          :album="{
            rating: '4',
            artist: 'Burial',
            title: 'Awakening',
            date: '06.06.2022',
            review: 'Masterpiece',
          }"
        />
      </NuxtLink>
    </div>
  </div>
</template>
