<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    width?: number | string;
    height?: number | string;
    borderRadius?: number | string;
    circle?: boolean;
    animated?: boolean;
  }>(),
  {
    width: undefined,
    height: undefined,
    borderRadius: undefined,
    circle: false,
    animated: true,
  },
);

const normalizeDimension = (value?: number | string) => {
  if (value == null || value === "") {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
};

const skeletonStyle = computed(() => ({
  width: props.circle ? normalizeDimension(props.height ?? props.width) : normalizeDimension(props.width),
  height: normalizeDimension(props.height ?? (props.circle ? props.width : undefined)),
  borderRadius: props.circle ? "50%" : normalizeDimension(props.borderRadius),
}));
</script>

<template>
  <div
    class="mi-skeleton"
    :class="{
      'is-circle': circle,
      'is-animated': animated,
    }"
    :style="skeletonStyle"
    aria-hidden="true"
  />
</template>

<style scoped>
.mi-skeleton {
  display: block;
  width: 100%;
  min-width: 0;
  background: var(--mi-color-base-generic);
}

.mi-skeleton.is-circle {
  border-radius: 50%;
}

.mi-skeleton.is-animated {
  animation: mi-skeleton-pulse var(--mi-motion-skeleton-pulse-duration) ease-in-out infinite;
}

@keyframes mi-skeleton-pulse {
  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }
}
</style>
