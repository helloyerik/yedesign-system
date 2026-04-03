<script setup lang="ts">
import { computed, useSlots } from "vue";
import { PhCheck, PhMinus } from "@phosphor-icons/vue";

type CheckboxSize = "M" | "L" | "XL";
type CheckboxVariant = "brand" | "secondary";

const props = withDefaults(
  defineProps<{
    checked?: boolean;
    indeterminate?: boolean;
    disabled?: boolean;
    size?: CheckboxSize;
    variant?: CheckboxVariant;
  }>(),
  {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: "M",
    variant: "brand",
  },
);

const emit = defineEmits<{
  "update:checked": [value: boolean];
  change: [value: boolean];
}>();

const slots = useSlots();
const hasLabel = computed(() => Boolean(slots.default));

const toggle = () => {
  if (props.disabled) return;
  const nextValue = !props.checked;
  emit("update:checked", nextValue);
  emit("change", nextValue);
};
</script>

<template>
  <label
    class="mi-checkbox"
    :class="[
      `mi-checkbox--${size}`,
      `mi-checkbox--${variant}`,
      {
        'is-checked': checked,
        'is-indeterminate': indeterminate,
        'is-disabled': disabled,
        'has-label': hasLabel,
      },
    ]"
  >
    <button
      class="mi-checkbox__control"
      type="button"
      role="checkbox"
      :aria-checked="indeterminate ? 'mixed' : checked"
      :disabled="disabled"
      @click="toggle"
    >
      <PhMinus v-if="indeterminate" class="mi-checkbox__icon" :size="'var(--mi-checkbox-icon-size)'" weight="bold" aria-hidden="true" />
      <PhCheck v-else-if="checked" class="mi-checkbox__icon" :size="'var(--mi-checkbox-icon-size)'" weight="bold" aria-hidden="true" />
    </button>

    <span v-if="hasLabel" class="mi-checkbox__label">
      <slot />
    </span>
  </label>
</template>

<style scoped>
.mi-checkbox {
  --mi-checkbox-box-size: 16px;
  --mi-checkbox-radius: 3px;
  --mi-checkbox-icon-size: 12px;
  --mi-checkbox-gap: var(--mi-spacing-8);
  --mi-checkbox-font-family: var(--mi-font-family-body-1);
  --mi-checkbox-font-size: var(--mi-font-size-body-1);
  --mi-checkbox-font-weight: var(--mi-font-weight-body-1);
  --mi-checkbox-line-height: var(--mi-line-height-body-1);

  display: inline-flex;
  align-items: center;
  gap: var(--mi-checkbox-gap);
  cursor: pointer;
}

.mi-checkbox--L {
  --mi-checkbox-box-size: 18px;
  --mi-checkbox-radius: 4px;
  --mi-checkbox-icon-size: 14px;
  --mi-checkbox-font-family: var(--mi-font-family-body-2);
  --mi-checkbox-font-size: var(--mi-font-size-body-2);
  --mi-checkbox-font-weight: var(--mi-font-weight-body-2);
  --mi-checkbox-line-height: var(--mi-line-height-body-2);
}

.mi-checkbox--XL {
  --mi-checkbox-box-size: 20px;
  --mi-checkbox-radius: 4px;
  --mi-checkbox-icon-size: 16px;
  --mi-checkbox-gap: var(--mi-spacing-12);
  --mi-checkbox-font-family: var(--mi-font-family-body-2);
  --mi-checkbox-font-size: var(--mi-font-size-body-2);
  --mi-checkbox-font-weight: var(--mi-font-weight-body-2);
  --mi-checkbox-line-height: var(--mi-line-height-body-2);
}

.mi-checkbox.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-checkbox__control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 var(--mi-checkbox-box-size);
  width: var(--mi-checkbox-box-size);
  height: var(--mi-checkbox-box-size);
  padding: 0;
  border: 1px solid var(--mi-color-text-hint);
  border-radius: var(--mi-checkbox-radius);
  background: transparent;
  color: var(--mi-color-brand-text-brand-contrast);
  cursor: pointer;
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    color 160ms ease;
}

.mi-checkbox__control:hover:not(:disabled) {
  border-color: var(--mi-color-text-secondary);
}

.mi-checkbox__control:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-checkbox__control:disabled {
  cursor: not-allowed;
}

.mi-checkbox.is-checked.mi-checkbox--brand .mi-checkbox__control,
.mi-checkbox.is-indeterminate.mi-checkbox--brand .mi-checkbox__control {
  background: var(--mi-color-base-brand);
  border-color: var(--mi-color-base-brand);
}

.mi-checkbox.is-checked.mi-checkbox--brand .mi-checkbox__control:hover:not(:disabled),
.mi-checkbox.is-indeterminate.mi-checkbox--brand .mi-checkbox__control:hover:not(:disabled) {
  background: var(--mi-color-base-brand-hover);
  border-color: var(--mi-color-base-brand-hover);
}

.mi-checkbox.is-checked.mi-checkbox--secondary .mi-checkbox__control,
.mi-checkbox.is-indeterminate.mi-checkbox--secondary .mi-checkbox__control {
  background: var(--mi-color-brand-base-brand-secondary);
  border-color: var(--mi-color-brand-base-brand-secondary);
}

.mi-checkbox.is-checked.mi-checkbox--secondary .mi-checkbox__control:hover:not(:disabled),
.mi-checkbox.is-indeterminate.mi-checkbox--secondary .mi-checkbox__control:hover:not(:disabled) {
  background: var(--mi-color-brand-base-brand-secondary-hover);
  border-color: var(--mi-color-brand-base-brand-secondary-hover);
}

.mi-checkbox__icon {
  width: var(--mi-checkbox-icon-size);
  height: var(--mi-checkbox-icon-size);
}

.mi-checkbox__label {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-checkbox-font-family);
  font-size: var(--mi-checkbox-font-size);
  font-weight: var(--mi-checkbox-font-weight);
  line-height: var(--mi-checkbox-line-height);
}
</style>
