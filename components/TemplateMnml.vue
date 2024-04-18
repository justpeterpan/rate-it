<script setup lang="ts">
const props = defineProps({
  config: Boolean,
  bg: String,
  opacityRgba: Number,
})

const bgColors: Record<string, string> = {
  green: 'bg-green-300',
  violet: 'bg-violet-300',
  lime: 'bg-lime-300',
  yellow: 'bg-yellow-300',
  blue: 'bg-blue-300',
  sky: 'bg-sky-300',
}

const bgColorsRgb: Record<string, string> = {
  green: '134, 239, 172',
  violet: '196, 181, 253',
}
</script>

<template>
  <div
    class="flex flex-col text-black p-20 rounded-xl group relative transition duration-500 ease-in-out"
    :class="[
      { 'cursor-auto': props.config },
      props.config ? 'bg-white' : 'bg-white hover:bg-violet-300',
    ]"
  >
    <div
      class="flex flex-col p-10 border-2 border-black rounded-3xl transition duration-500 ease-in-out"
      :class="[{ 'group-hover:-translate-y-8': !props.config }]"
      :style="{
        backgroundColor: `rgba(${bgColorsRgb[bg]}, ${props.opacityRgba})`,
      }"
    >
      <figure>
        <img
          src="https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/0c/71/680c7107-f7c2-6e55-8ea9-09b935620654/5056321637703.png/600x600bb.jpg"
          alt=""
          class="rounded-3xl border-2 border-black grayscale group-hover:grayscale-0 transition duration-500 ease-in-out"
        />
      </figure>
      <section class="flex flex-col items-center">
        <h2 class="text-2xl uppercase mt-8 font-semibold">Burial</h2>
        <h3 class="text-2xl uppercase font-light">Antidawn</h3>
        <h4 class="text-xl uppercase font-extralight">06.01.2022</h4>
        <div class="text-lg pt-2 italic font-thin">"Masterpiece"</div>
        <div class="text-9xl font-thin">
          ****<span class="text-9xl font-thin text-neutral-300">*</span>
        </div>
      </section>
    </div>
    <div
      v-if="!props.config"
      class="text-2xl left-[44%] absolute -bottom-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-12 transition duration-500 ease-in-out"
    >
      MNML
    </div>
  </div>
</template>
