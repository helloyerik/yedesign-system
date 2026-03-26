<script setup lang="ts">
import { computed } from "vue";
import { starPaths } from "./paths";

const props = withDefaults(
  defineProps<{
    rating: number;
    size?: number;
  }>(),
  {
    size: 20,
  },
);

const fullStars = computed(() => Math.floor(props.rating));
const hasPartial = computed(() => props.rating % 1 > 0);
const emptyStars = computed(() => 5 - fullStars.value - (hasPartial.value ? 1 : 0));
const isLarge = computed(() => props.size >= 28);
const viewBoxSize = computed(() => (isLarge.value ? 28 : 20));
const starPath = computed(() => (isLarge.value ? starPaths.p286c45c0 : starPaths.p3dd11600));
const starSizeStyle = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
}));
</script>

<template>
  <div class="mi-star-rating" :class="{ 'mi-star-rating--large': isLarge }" aria-label="Rating">
    <div
      v-for="index in fullStars"
      :key="`full-${index}`"
      class="mi-star-rating__star"
      :style="starSizeStyle"
    >
      <svg class="mi-star-rating__svg" fill="none" preserveAspectRatio="none" :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`">
        <path :d="starPath" fill="var(--mi-color-text-warning)" />
      </svg>
    </div>

    <div
      v-if="hasPartial && isLarge"
      class="mi-star-rating__star"
      :style="starSizeStyle"
    >
      <svg class="mi-star-rating__svg" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <path :d="starPaths.p1a980500" fill="var(--mi-color-text-warning)" />
        <path :d="starPaths.p1ca5d000" fill="var(--mi-color-line-generic-solid)" fill-rule="evenodd" clip-rule="evenodd" />
        <path :d="starPaths.p1e6c3880" fill="var(--mi-color-line-generic-solid)" />
        <path :d="starPaths.p1fa5b480" fill="var(--mi-color-line-generic-solid)" />
      </svg>
    </div>

    <div
      v-else-if="hasPartial"
      class="mi-star-rating__star"
      :style="starSizeStyle"
    >
      <svg class="mi-star-rating__svg" fill="none" preserveAspectRatio="none" :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`">
        <path :d="starPath" fill="var(--mi-color-text-warning)" />
      </svg>
    </div>

    <div
      v-for="index in emptyStars"
      :key="`empty-${index}`"
      class="mi-star-rating__star"
      :style="starSizeStyle"
    >
      <svg class="mi-star-rating__svg" fill="none" preserveAspectRatio="none" :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`">
        <path :d="starPath" fill="var(--mi-color-line-generic-solid)" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.mi-star-rating {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-4);
}

.mi-star-rating--large {
  padding: var(--mi-spacing-4);
}

.mi-star-rating__star {
  position: relative;
  flex: 0 0 auto;
  overflow: clip;
}

.mi-star-rating__svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
