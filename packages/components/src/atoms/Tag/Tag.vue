<script setup lang="ts">
import { computed, useSlots } from "vue";

type TagSize = "S" | "M";
type TagVariant = "neutral" | "overlay";

const props = withDefaults(
  defineProps<{
    label?: string;
    size?: TagSize;
    variant?: TagVariant;
  }>(),
  {
    label: "",
    size: "M",
    variant: "overlay",
  },
);

const slots = useSlots();
const shouldRenderLabel = computed(() => typeof props.label === "string" && props.label.length > 0);
const hasDefaultSlot = computed(() => Boolean(slots.default));
</script>

<template>
  <span class="mi-tag" :class="[`mi-tag--${size}`, `mi-tag--${variant}`]">
    <span v-if="shouldRenderLabel" class="mi-tag__label">{{ label }}</span>
    <span v-else-if="hasDefaultSlot" class="mi-tag__label">
      <slot />
    </span>
  </span>
</template>

<style scoped>
.mi-tag {
  --mi-tag-padding-y: 3px;
  --mi-tag-padding-x: 10px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--mi-size-button-xs-height);
  padding: var(--mi-tag-padding-y) var(--mi-tag-padding-x);
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-pill);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-code-body);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-code-body);
  line-height: var(--mi-line-height-body-1);
}

.mi-tag--S {
  --mi-tag-padding-y: 2px;
  --mi-tag-padding-x: 8px;

  min-height: 22px;
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-tag--neutral {
  background: var(--mi-color-surface-muted);
}

.mi-tag--overlay {
  background: var(--mi-color-surface-glass);
  backdrop-filter: blur(8px);
}

.mi-tag__label {
  display: inline-flex;
  align-items: center;
}
</style>
