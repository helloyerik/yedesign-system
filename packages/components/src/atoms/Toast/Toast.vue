<script setup lang="ts">
import { PhCheckCircle, PhWarning } from "@phosphor-icons/vue";

type ToastVariant = "success" | "error";
type ToastAppearance = "default" | "light";

const props = withDefaults(
  defineProps<{
    message: string;
    variant: ToastVariant;
    appearance?: ToastAppearance;
    buttonLabel?: string;
    className?: string;
  }>(),
  {
    appearance: "default",
    buttonLabel: "",
    className: "",
  },
);

const emit = defineEmits<{
  "button-click": [];
}>();

const iconComponent = {
  success: PhCheckCircle,
  error: PhWarning,
}[props.variant];

const iconColor = props.variant === "success"
  ? "var(--mi-color-text-positive-heavy)"
  : "var(--mi-color-text-warning)";
</script>

<template>
  <div
    class="mi-toast"
    :class="[
      className,
      `mi-toast--${appearance}`,
    ]"
  >
    <span class="mi-toast__icon">
      <component :is="iconComponent" :size="20" :color="iconColor" weight="fill" />
    </span>
    <p class="mi-toast__message">{{ message }}</p>
    <button
      v-if="buttonLabel"
      type="button"
      class="mi-toast__button"
      @click="emit('button-click')"
    >
      {{ buttonLabel }}
    </button>
  </div>
</template>

<style scoped>
.mi-toast {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-12);
  padding: var(--mi-spacing-16);
  border-radius: var(--mi-radius-l);
  min-height: var(--mi-size-toast-min-height);
}

.mi-toast--default {
  background: var(--mi-color-toast-bg);
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-toast--light {
  background: var(--mi-color-surface-panel);
  color: var(--mi-color-text-primary);
  border: 1px solid var(--mi-color-line-generic);
  box-shadow: var(--mi-shadow-modal);
}

.mi-toast__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mi-toast__message {
  flex: 1 1 auto;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-toast__button {
  border: 0;
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
  border-radius: var(--mi-radius-s);
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-primary);
  height: var(--mi-size-button-xs-height);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  cursor: pointer;
  transition: opacity 150ms ease;
}

.mi-toast__button:hover {
  opacity: 0.85;
}

.mi-toast--default .mi-toast__button {
  background: var(--mi-color-label-misc-bg);
  color: var(--mi-color-brand-text-brand-contrast);
}
</style>
