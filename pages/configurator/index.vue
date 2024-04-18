<script setup lang="ts">
const selectedColor = ref('violet')
const colorRangeValue = ref(255)
const calculatedOpacity = computed(() => colorRangeValue.value / 255)
const colorGreen = ref('134, 239, 172')

const textColors: Record<string, string> = {
  green: 'text-green-300',
  violet: 'text-violet-300',
  lime: 'text-lime-300',
  yellow: 'text-yellow-300',
  blue: 'text-blue-300',
  sky: 'text-sky-300',
}

const bgColors: Record<string, string> = {
  green: 'bg-green-300',
  violet: 'bg-violet-300',
  lime: 'bg-lime-300',
  yellow: 'bg-yellow-300',
  blue: 'bg-blue-300',
  sky: 'bg-sky-300',
}

function selectColor(color: string) {
  selectedColor.value = color
}
</script>
<template>
  <div class="grid grid-cols-2 min-h-screen gap-1">
    <div
      class="bg-white rounded-xl flex flex-col transition duration-500 ease-in-out"
    >
      <TemplateMnml
        config
        :bg="selectedColor"
        :opacity-rgba="calculatedOpacity"
      />
    </div>
    <div class="bg-white rounded-xl flex flex-col p-20">
      <h1 class="text-7xl font-extrabold">New Album Review</h1>
      <section class="flex flex-row mt-10 cursor-pointer">
        <div
          @click="selectColor('green')"
          class="rounded-full min-w-12 h-12 transition-[width] duration-500 ease-in-out appearance-none"
          :class="[
            selectedColor === 'green' ? 'w-full bg-white' : 'w-12 bg-green-300',
          ]"
        >
          <input
            v-if="selectedColor === 'green'"
            type="range"
            min="0"
            max="255"
            v-model="colorRangeValue"
            class="rounded-full min-w-12 h-12 bg-gradient-to-r from-white to-green-300 transition-[width] duration-500 ease-in-out appearance-none"
            :class="[selectedColor === 'green' ? 'w-full ' : 'w-12 ']"
          />
        </div>
        <div
          class="rounded-full min-w-12 h-12 transition-[width] duration-500 ease-in-out"
          :class="[
            selectedColor === 'violet'
              ? 'w-full bg-white'
              : 'w-12 bg-violet-300',
          ]"
          @click="selectColor('violet')"
        >
          <input
            v-if="selectedColor === 'violet'"
            type="range"
            min="0"
            max="255"
            v-model="colorRangeValue"
            class="rounded-full min-w-12 h-12 bg-gradient-to-r from-white to-violet-300 transition-[width] duration-500 ease-in-out appearance-none"
            :class="[selectedColor === 'violet' ? 'w-full ' : 'w-12 ']"
          />
        </div>
        <div
          class="rounded-full min-w-12 h-12 bg-lime-300 transition-[width] duration-500 ease-in-out"
          :class="[selectedColor === 'lime' ? 'w-full ' : 'w-12 ']"
          @click="selectColor('lime')"
        />
        <div
          class="rounded-full min-w-12 h-12 bg-yellow-300 transition-[width] duration-500 ease-in-out"
          :class="[selectedColor === 'yellow' ? 'w-full ' : 'w-12 ']"
          @click="selectColor('yellow')"
        />
        <div
          class="rounded-full min-w-12 h-12 bg-blue-300 transition-[width] duration-500 ease-in-out"
          :class="[selectedColor === 'blue' ? 'w-full' : 'w-12']"
          @click="selectColor('blue')"
        />
        <div
          class="rounded-full min-w-12 h-12 bg-sky-300 transition-[width] duration-500 ease-in-out"
          :class="[selectedColor === 'sky' ? 'w-full' : 'w-12']"
          @click="selectColor('sky')"
        />
      </section>
    </div>
  </div>
</template>

<style>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background: white;
  border: 2px solid black;
  cursor: pointer;
}
</style>
