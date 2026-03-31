<script setup lang="ts">
import { computed } from "vue";
import { PhCheckCircle, PhWarning } from "@phosphor-icons/vue";

export type ToastVariant = "success" | "error";
export type ToastAppearance = "default" | "light";

const props = withDefaults(
  defineProps<{
    message: string;
    variant: ToastVariant;
    buttonLabel?: string;
    appearance?: ToastAppearance;
  }>(),
  {
    buttonLabel: undefined,
    appearance: "default",
  },
);

const emit = defineEmits<{
  buttonClick: [event: MouseEvent];
}>();

const isLight = computed(() => props.appearance === "light");
const IconComponent = computed(() => (props.variant === "success" ? PhCheckCircle : PhWarning));
const iconColor = computed(() =>
  props.variant === "success" ? "var(--mi-color-status-success)" : "var(--mi-color-status-warning)",
);

const onButtonClick = (event: MouseEvent) => {
  event.stopPropagation();
  emit("buttonClick", event);
};
</script>

<template>
  <div
    class="mi-toast"
    :class="{
      'mi-toast--light': isLight,
      'mi-toast--default': !isLight,
    }"
  >
    <div class="mi-toast__icon-wrap">
      <component :is="IconComponent" :size="20" weight="fill" :color="iconColor" />
    </div>

    <div class="mi-toast__content">
      <p class="mi-toast__message">{{ message }}</p>
    </div>

    <button
      v-if="buttonLabel"
      type="button"
      class="mi-toast__button"
      @click="onButtonClick"
    >
      <span class="mi-toast__button-label">{{ buttonLabel }}</span>
    </button>
  </div>
</template>

<style scoped>
.mi-toast {
  display: flex;
  width: 100%;
  min-height: 60px;
  align-items: center;
  gap: var(--mi-spacing-12);
  padding: var(--mi-spacing-16);
}

.mi-toast--default {
  border-radius: var(--mi-radius-l);
  background: rgb(0 0 0 / 85%);
}

.mi-toast--light {
  border: 1px solid var(--mi-color-line-brand);
  border-radius: var(--mi-radius-xl);
  background: var(--mi-color-base-background);
  box-shadow: var(--mi-shadow-modal);
}

.mi-toast__icon-wrap {
  display: flex;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.mi-toast__content {
  min-width: 0;
  flex: 1 1 auto;
}

.mi-toast__message {
  text-align: left;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-toast--default .mi-toast__message {
  color: var(--mi-color-text-inverse);
}

.mi-toast--light .mi-toast__message {
  color: var(--mi-color-text-primary);
}

.mi-toast__button {
  display: inline-flex;
  height: 28px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: var(--mi-spacing-8);
  padding: 0 var(--mi-spacing-12);
  border: 0;
  border-radius: var(--mi-radius-s);
  cursor: pointer;
  outline: none;
  transition: opacity 150ms ease;
}

.mi-toast__button:hover {
  opacity: 0.8;
}

.mi-toast--default .mi-toast__button {
  background: var(--mi-color-base-background);
}

.mi-toast--light .mi-toast__button {
  background: var(--mi-color-base-generic);
}

.mi-toast__button-label {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}
</style>
