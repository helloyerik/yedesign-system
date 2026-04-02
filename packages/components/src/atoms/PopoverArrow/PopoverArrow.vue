<script setup lang="ts">
withDefaults(
  defineProps<{
    className?: string;
  }>(),
  {
    className: "",
  },
);
</script>

<template>
  <svg
    class="mi-popover-arrow"
    :class="className"
    viewBox="0 0 19 9"
    fill="none"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path d="M9.5 9C9.5 9 12.6667 0 19 0H0C6.33333 0 9.5 9 9.5 9Z" fill="currentColor" />
  </svg>
</template>

<style scoped>
.mi-popover-arrow {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
