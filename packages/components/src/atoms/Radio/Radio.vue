<script setup lang="ts">
import { useSlots } from "vue";

type RadioSize = "M" | "L";

const props = withDefaults(
  defineProps<{
    checked?: boolean;
    disabled?: boolean;
    size?: RadioSize;
  }>(),
  {
    checked: false,
    disabled: false,
    size: "M",
  },
);

const emit = defineEmits<{
  "update:checked": [value: boolean];
  change: [value: boolean];
}>();

const slots = useSlots();

const toggle = () => {
  if (props.disabled || props.checked) return;
  emit("update:checked", true);
  emit("change", true);
};
</script>

<template>
  <label
    class="mi-radio"
    :class="[
      `mi-radio--${size}`,
      {
        'is-checked': checked,
        'is-disabled': disabled,
      },
    ]"
  >
    <button
      class="mi-radio__control"
      type="button"
      role="radio"
      :aria-checked="checked"
      :disabled="disabled"
      @click="toggle"
    >
      <span v-if="checked" class="mi-radio__dot" />
    </button>
    <span v-if="slots.default" class="mi-radio__label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.mi-radio {
  --mi-radio-outer-size: 16px;
  --mi-radio-dot-size: 8px;
  --mi-radio-gap: var(--mi-spacing-8);
  --mi-radio-label-family: var(--mi-font-family-body-1);
  --mi-radio-label-size: var(--mi-font-size-body-1);
  --mi-radio-label-weight: var(--mi-font-weight-body-1);
  --mi-radio-label-line-height: var(--mi-line-height-body-1);

  display: inline-flex;
  align-items: center;
  gap: var(--mi-radio-gap);
  cursor: pointer;
}

.mi-radio--L {
  --mi-radio-outer-size: 18px;
  --mi-radio-dot-size: 10px;
  --mi-radio-label-family: var(--mi-font-family-body-2);
  --mi-radio-label-size: var(--mi-font-size-body-2);
  --mi-radio-label-weight: var(--mi-font-weight-body-2);
  --mi-radio-label-line-height: var(--mi-line-height-body-2);
}

.mi-radio.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-radio__control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 var(--mi-radio-outer-size);
  width: var(--mi-radio-outer-size);
  height: var(--mi-radio-outer-size);
  padding: 0;
  border: 1.5px solid var(--mi-color-text-hint);
  border-radius: 999px;
  background: transparent;
  cursor: pointer;
  transition: border-color 160ms ease;
}

.mi-radio__control:hover:not(:disabled) {
  border-color: var(--mi-color-text-secondary);
}

.mi-radio__control:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-radio__control:disabled {
  cursor: not-allowed;
}

.mi-radio.is-checked .mi-radio__control {
  border-color: var(--mi-color-base-brand);
}

.mi-radio.is-checked .mi-radio__control:hover:not(:disabled) {
  border-color: var(--mi-color-base-brand-hover);
}

.mi-radio__dot {
  width: var(--mi-radio-dot-size);
  height: var(--mi-radio-dot-size);
  border-radius: 999px;
  background: var(--mi-color-base-brand);
}

.mi-radio__label {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-radio-label-family);
  font-size: var(--mi-radio-label-size);
  font-weight: var(--mi-radio-label-weight);
  line-height: var(--mi-radio-label-line-height);
}
</style>
