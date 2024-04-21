<template>
  <div class="flex flex-row gap-1 mt-4">
    <ClientOnly>
      <transition-group name="fade" tag="div" class="flex flex-row gap-1">
        <StarRating
          :full="star > fullStars ? false : true"
          v-for="star in totalStars"
          :key="star"
          :style="{ width: '40px', height: '40px' }"
        />
      </transition-group>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  rating: number
}>()

const fullStars = computed(() => Math.floor(props.rating))
const totalStars = computed(
  () => fullStars.value + (props.rating % 1 !== 0 ? 1 : 0)
)
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
