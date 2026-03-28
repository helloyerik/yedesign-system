<script setup lang="ts">
import { computed, useSlots } from "vue";

type ButtonVariant = "primary" | "brand-secondary" | "secondary" | "outline" | "text-only";
type ButtonSize = "L" | "M" | "S" | "XS";
type ButtonWidth = "hug" | "full";
type ButtonType = "button" | "submit" | "reset";

const props = withDefaults(
  defineProps<{
    label?: string;
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    disabled?: boolean;
    width?: ButtonWidth;
    type?: ButtonType;
    className?: string;
  }>(),
  {
    label: undefined,
    variant: "primary",
    size: "M",
    isLoading: false,
    disabled: false,
    width: "hug",
    type: "button",
    className: "",
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const slots = useSlots();

const isDisabled = computed(() => props.disabled || props.isLoading);
const shouldRenderLabel = computed(() => typeof props.label === "string" && props.label.length > 0);
const hasLeftIcon = computed(() => Boolean(slots.leftIcon));
const hasRightIcon = computed(() => Boolean(slots.rightIcon));

const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit("click", event);
  }
};
</script>

<template>
  <button
    class="mi-button"
    :class="[
      `mi-button--${variant}`,
      `mi-button--${size}`,
      `mi-button--${width}`,
      {
        'is-disabled': isDisabled,
      },
      className,
    ]"
    :disabled="isDisabled"
    :type="type"
    @click="handleClick"
  >
    <span v-if="isLoading" class="mi-button__spinner" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        <circle
          class="mi-button__spinner-track"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          :stroke-width="4"
        />
        <path
          class="mi-button__spinner-head"
          fill="currentColor"
          d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4Zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647Z"
        />
      </svg>
    </span>

    <template v-else>
      <span v-if="hasLeftIcon" class="mi-button__icon">
        <slot name="leftIcon" />
      </span>

      <span class="mi-button__label">
        <span v-if="shouldRenderLabel">{{ label }}</span>
        <slot v-else />
      </span>

      <span v-if="hasRightIcon" class="mi-button__icon">
        <slot name="rightIcon" />
      </span>
    </template>
  </button>
</template>

<style scoped>
.mi-button {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--mi-spacing-8);
  width: fit-content;
  border: 1px solid transparent;
  padding: 0;
  outline: none;
  user-select: none;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 200ms ease,
    border-color 200ms ease,
    color 200ms ease,
    opacity 200ms ease,
    transform 200ms ease;
}

.mi-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-button:not(:disabled):active {
  transform: scale(var(--mi-motion-button-press-scale));
}

.mi-button.is-disabled {
  cursor: not-allowed;
  pointer-events: none;
}

.mi-button--L {
  height: var(--mi-size-button-l-height);
  padding-inline: var(--mi-spacing-16);
  border-radius: var(--mi-radius-xl);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  font-weight: var(--mi-font-weight-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-button--M {
  height: var(--mi-size-button-m-height);
  padding-inline: var(--mi-spacing-16);
  padding-block: var(--mi-spacing-12);
  border-radius: var(--mi-radius-xl);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-button--S {
  height: var(--mi-size-button-s-height);
  padding-inline: var(--mi-spacing-12);
  padding-block: var(--mi-spacing-8);
  border-radius: var(--mi-radius-l);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-button--XS {
  height: var(--mi-size-button-xs-height);
  padding-inline: var(--mi-spacing-12);
  padding-block: var(--mi-spacing-8);
  border-radius: var(--mi-radius-m);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-button--full {
  width: 100%;
}

.mi-button__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mi-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.mi-button__icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.mi-button--S .mi-button__icon :deep(svg),
.mi-button--XS .mi-button__icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.mi-button__spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: mi-button-spin 700ms linear infinite;
}

.mi-button__spinner svg {
  width: var(--mi-size-button-spinner);
  height: var(--mi-size-button-spinner);
}

.mi-button__spinner-track {
  opacity: 0.25;
}

.mi-button__spinner-head {
  opacity: 0.75;
}

.mi-button--primary {
  background: var(--mi-color-brand-base-brand);
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-button--primary:hover:not(:disabled) {
  background: var(--mi-color-brand-base-brand-hover);
}

.mi-button--primary.is-disabled {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-secondary);
}

.mi-button--brand-secondary {
  background: var(--mi-color-brand-base-brand-secondary);
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-button--brand-secondary:hover:not(:disabled) {
  background: var(--mi-color-brand-base-brand-secondary-hover);
}

.mi-button--brand-secondary.is-disabled {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-hint);
}

.mi-button--secondary {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-primary);
}

.mi-button--secondary:hover:not(:disabled) {
  background: var(--mi-color-base-subtle-hover);
}

.mi-button--secondary:active:not(:disabled) {
  background: var(--mi-color-base-subtle-active);
}

.mi-button--secondary.is-disabled {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-secondary);
}

.mi-button--outline {
  background: transparent;
  border-color: var(--mi-color-line-generic);
  color: var(--mi-color-text-primary);
}

.mi-button--outline:hover:not(:disabled) {
  background: var(--mi-color-base-generic);
}

.mi-button--outline:active:not(:disabled) {
  background: var(--mi-color-base-subtle-hover);
}

.mi-button--outline.is-disabled {
  background: var(--mi-color-base-generic);
  border-color: transparent;
  color: var(--mi-color-text-secondary);
}

.mi-button--text-only {
  background: transparent;
  border-color: transparent;
  color: var(--mi-color-text-primary);
}

.mi-button--text-only:hover:not(:disabled) {
  background: transparent;
}

.mi-button--text-only:active:not(:disabled) {
  background: transparent;
}

.mi-button--text-only.is-disabled {
  background: transparent;
  color: var(--mi-color-text-hint);
}

@keyframes mi-button-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
