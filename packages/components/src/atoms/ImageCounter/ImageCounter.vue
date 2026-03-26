<script setup lang="ts">
const props = defineProps<{
  current: number;
  total: number;
}>();
</script>

<template>
  <div class="mi-image-counter">
    <span class="mi-image-counter__text">{{ props.current }}/{{ props.total }}</span>
  </div>
</template>

<style scoped>
.mi-image-counter {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--mi-size-image-counter-height);
  padding: 1px var(--mi-spacing-8);
  border-radius: 999px;
  background: var(--mi-color-base-generic);
}

.mi-image-counter__text {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}
</style>
