<template>
  <div
    @click="$emit('pickColor', props.color)"
    class="rounded-full min-w-12 h-12 transition-[width] duration-500 ease-in-out appearance-none"
    :class="[
      selectedColor === props.color
        ? 'w-full bg-white'
        : `w-12 ${bgColors[props.color]}`,
    ]"
  >
    <input
      v-if="selectedColor === `${props.color}`"
      type="range"
      min="0"
      max="255"
      v-model="colorRange"
      class="p-2 rounded-full min-w-12 h-12 bg-gradient-to-r from-white transition-[width] duration-500 ease-in-out appearance-none"
      :class="[
        selectedColor === `${props.color}`
            ? `w-full ${gradientColors[color as keyof typeof gradientColors]}`
          : 'w-12',
      ]"
    />
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    color?: string
    selectedColor: string
  }>(),
  {
    color: 'violet',
  }
)
const emit = defineEmits(['pickColor'])
const colorRange = defineModel()

const gradientColors = {
  green: 'to-green-300',
  violet: 'to-violet-300',
  lime: 'to-lime-300',
  yellow: 'to-yellow-300',
  blue: 'to-blue-300',
  sky: 'to-sky-300',
}

const bgColors: Record<string, string> = {
  green: 'bg-green-300',
  violet: 'bg-violet-300',
  lime: 'bg-lime-300',
  yellow: 'bg-yellow-300',
  blue: 'bg-blue-300',
  sky: 'bg-sky-300',
}
</script>

<style>
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 32px;
  height: 32px;
  border-radius: 100%;
  background: rgba(255, 255, 255, 0.9);
  border: 4px solid black;
  cursor: pointer;
}
</style>
