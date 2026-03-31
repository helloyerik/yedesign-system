<script setup lang="ts">
import { computed } from "vue";
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

const rootClassName = computed(() =>
  [
    "mi-in-cart-button",
    `mi-in-cart-button--${props.width}`,
    props.className,
  ]
    .filter(Boolean)
    .join(" "),
);

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<template>
  <button
    type="button"
    :class="rootClassName"
    @click="handleClick"
  >
    <span class="mi-in-cart-button__label">{{ label }}</span>
    <PhCaretRight class="mi-in-cart-button__icon" :size="16" weight="regular" />
  </button>
</template>

<style scoped>
.mi-in-cart-button {
  display: flex;
  height: var(--mi-size-button-m-height);
  align-items: center;
  justify-content: center;
  gap: var(--mi-spacing-8);
  border: 1px solid var(--mi-color-brand-base-brand);
  border-radius: var(--mi-radius-xl);
  background: transparent;
  padding-inline: var(--mi-spacing-16);
  color: var(--mi-color-brand-base-brand);
  cursor: pointer;
}

.mi-in-cart-button--full {
  width: 100%;
}

.mi-in-cart-button--hug {
  width: fit-content;
  max-width: 100%;
}

.mi-in-cart-button__label {
  color: var(--mi-color-brand-base-brand);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-in-cart-button__icon {
  flex: 0 0 auto;
  color: var(--mi-color-brand-base-brand);
}
</style>
