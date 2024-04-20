<template>
  <div>
    <div>
      <figure>
        <img
          :src="
            props.album.image ??
            'https://is1-ssl.mzstatic.com/image/thumb/Music126/v4/68/0c/71/680c7107-f7c2-6e55-8ea9-09b935620654/5056321637703.png/600x600bb.jpg'
          "
          alt=""
        />
      </figure>
      <section class="">
        <h2 class="">
          {{ props.album.artist }}
        </h2>
        <h3 class="">{{ props.album.title }}</h3>
        <h4 class="">
          {{ props.album.date }}
        </h4>
        <div class="">"{{ props.album.review }}"</div>
        <RatingSlider :rating="Number(props.album.rating)" />
      </section>
    </div>
    <div v-if="!props.config" class="">Default</div>
  </div>
</template>

<script lang="ts" setup>
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
      rating: '4',
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
</script>
