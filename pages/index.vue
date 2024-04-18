<template>
  <div class="flex flex-col gap-1">
    <button class="flex bg-white text-black p-4 rounded-xl w-full">
      Select a template ↴
    </button>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-1">
      <NuxtLink to="configurator">
        <TemplateMnml />
      </NuxtLink>
      <div
        class="flex flex-col bg-white text-black p-20 rounded-xl cursor-pointer group relative hover:bg-green-300 transition duration-500 ease-in-out"
      >
        <h2>Template 2</h2>
        <p>Some text here</p>
      </div>
      <div class="flex flex-col bg-white text-black p-4 rounded-xl">
        <h2>Template 2</h2>
        <p>Some text here</p>
      </div>
    </div>
  </div>
</template>
