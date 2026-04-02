<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    imageSrc: string;
    variant?: "default" | "tall";
    className?: string;
  }>(),
  {
    variant: "default",
    className: "",
  },
);
</script>

<template>
  <div
    class="mi-promo-banner"
    :class="[className, `mi-promo-banner--${variant}`]"
  >
    <img class="mi-promo-banner__image" :src="imageSrc" alt="" />
  </div>
</template>

<style scoped>
.mi-promo-banner {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: var(--mi-radius-l);
  box-shadow: var(--mi-shadow-card);
}

.mi-promo-banner--default {
  aspect-ratio: 325 / 240;
}

.mi-promo-banner--tall {
  height: calc(var(--mi-spacing-8xl) + var(--mi-spacing-5xl));
}

.mi-promo-banner__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
