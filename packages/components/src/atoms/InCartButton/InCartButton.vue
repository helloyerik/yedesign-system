<script setup lang="ts">
import { PhCaretRight } from "@phosphor-icons/vue";

type InCartButtonWidth = "full" | "hug";

const props = withDefaults(
  defineProps<{
    label?: string;
    width?: InCartButtonWidth;
    className?: string;
  }>(),
  {
    label: "В корзине",
    width: "full",
    className: "",
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<template>
  <button
    type="button"
    class="mi-in-cart-button"
    :class="[`mi-in-cart-button--${width}`, className]"
    @click="handleClick"
  >
    <span class="mi-in-cart-button__label">{{ label }}</span>
    <PhCaretRight class="mi-in-cart-button__icon" :size="'var(--mi-size-icon-16)'" />
  </button>
</template>

<style scoped>
.mi-in-cart-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--mi-spacing-8);
  height: var(--mi-size-in-cart-button-height);
  padding-inline: var(--mi-spacing-16);
  border-radius: var(--mi-radius-l);
  border: 1px solid var(--mi-color-base-brand);
  background: transparent;
  color: var(--mi-color-brand-text-brand);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease;
}

.mi-in-cart-button--full {
  width: 100%;
}

.mi-in-cart-button--hug {
  width: fit-content;
  max-width: 100%;
}

.mi-in-cart-button__label {
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-in-cart-button__icon {
  color: currentColor;
}
</style>
