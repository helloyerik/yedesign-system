<script setup lang="ts">
withDefaults(
  defineProps<{
    imageSrc: string;
    variant?: "default" | "variant-b";
  }>(),
  {
    variant: "default",
  },
);
</script>

<template>
  <div
    class="mi-promo-banner-side"
    :class="{ 'mi-promo-banner-side--variant-b': variant === 'variant-b' }"
  >
    <img
      alt=""
      class="mi-promo-banner-side__image"
      :src="imageSrc"
    />
  </div>
</template>

<style scoped>
.mi-promo-banner-side {
  position: relative;
  width: 100%;
  aspect-ratio: 325 / 240;
  overflow: hidden;
  border-radius: var(--mi-radius-l);
  box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
}

.mi-promo-banner-side--variant-b {
  height: 177.724px;
  aspect-ratio: auto;
}

.mi-promo-banner-side__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
