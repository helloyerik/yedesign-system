<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count: number;
    activeIndex: number;
  }>(),
  {
    count: 0,
    activeIndex: 0,
  },
);
</script>

<template>
  <div class="mi-dot-pagination" aria-label="Pagination">
    <span
      v-for="index in props.count"
      :key="index"
      class="mi-dot-pagination__dot"
      :class="{ 'is-active': index - 1 === props.activeIndex }"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.mi-dot-pagination {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--mi-spacing-8);
  width: 100%;
  min-height: var(--mi-size-dot-pagination-dot);
  padding-inline: var(--mi-spacing-16);
}

.mi-dot-pagination__dot {
  width: var(--mi-size-dot-pagination-dot);
  height: var(--mi-size-dot-pagination-dot);
  border-radius: 999px;
  background: rgb(0 0 0 / 0.15);
  transition: background-color 200ms ease;
}

.mi-dot-pagination__dot.is-active {
  background: var(--mi-color-text-hint);
}
</style>
