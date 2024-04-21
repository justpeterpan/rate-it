<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    config?: boolean
    bg?: string
    opacityRgba?: number
    album?: Album
  }>(),
  {
    config: false,
    bg: 'violet',
    album: () => ({
      artist: 'artist',
      title: 'title',
      date: 'release date',
      rating: '5',
      review: 'write your review',
      image: '',
    }),
  }
)

type Album = {
  artist?: string
  title?: string
  date?: string
  image?: string
  rating: string
  review?: string
}

const bgColorsRgb: Record<string, string> = {
  green: '134, 239, 172',
  violet: '196, 181, 253',
  lime: '190, 242, 100',
  yellow: '253, 224, 71',
  blue: '147, 197, 253',
  sky: '125, 211, 252',
}
</script>

<template>
  <div
    class="flex flex-col text-black p-8 rounded-xl group relative transition duration-500 ease-in-out items-center"
    :class="[
      { 'cursor-auto': props.config },
      props.config ? 'bg-white' : 'bg-white hover:bg-violet-300',
    ]"
  >
    <div
      class="flex flex-col p-10 border-2 border-black rounded-3xl transition duration-500 ease-in-out"
      :class="[{ 'group-hover:-translate-y-6': !props.config }]"
      :style="{
        backgroundColor: `rgba(${bgColorsRgb[bg]}, ${props.opacityRgba})`,
      }"
    >
      <figure>
        <img
          :src="
            props.album.image ??
            'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/0c/71/680c7107-f7c2-6e55-8ea9-09b935620654/5056321637703.png/600x600bb.jpg'
          "
          alt=""
          class="rounded-3xl border-2 border-black group-hover:grayscale-0 transition duration-500 ease-in-out"
          :class="[{ 'filter grayscale': !props.config }]"
        />
      </figure>
      <section class="flex flex-col items-center">
        <h2 class="text-2xl uppercase mt-8 font-semibold">
          {{ props.album.artist }}
        </h2>
        <h3 class="text-2xl uppercase font-light text-center">
          {{ props.album.title }}
        </h3>
        <h4 class="text-xl uppercase font-extralight">
          {{ props.album.date }}
        </h4>
        <div class="text-lg pt-2 italic font-thin">
          "{{ props.album.review }}"
        </div>
        <RatingSlider :rating="Number(props.album.rating)" />
      </section>
    </div>
    <div
      v-if="!props.config"
      class="text-2xl left-[44%] absolute -bottom-2 opacity-0 group-hover:opacity-100 group-hover:-translate-y-8 transition duration-500 ease-in-out"
    >
      MNML
    </div>
  </div>
</template>
