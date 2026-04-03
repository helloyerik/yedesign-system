<script setup lang="ts">
import { useSlots } from "vue";

type SwitchSize = "M" | "L";
type SwitchLabelPosition = "left" | "right";

const props = withDefaults(
  defineProps<{
    checked?: boolean;
    size?: SwitchSize;
    disabled?: boolean;
    label?: string;
    labelPosition?: SwitchLabelPosition;
  }>(),
  {
    checked: false,
    size: "M",
    disabled: false,
    label: "",
    labelPosition: "right",
  },
);

const emit = defineEmits<{
  "update:checked": [value: boolean];
  change: [value: boolean];
}>();

const slots = useSlots();

const toggle = () => {
  if (props.disabled) return;
  const nextValue = !props.checked;
  emit("update:checked", nextValue);
  emit("change", nextValue);
};
</script>

<template>
  <label
    class="mi-switch"
    :class="[
      `mi-switch--${size}`,
      {
        'is-checked': checked,
        'is-disabled': disabled,
        'mi-switch--label-left': labelPosition === 'left',
      },
    ]"
  >
    <button
      class="mi-switch__track"
      type="button"
      role="switch"
      :aria-checked="checked"
      :disabled="disabled"
      @click="toggle"
    >
      <span class="mi-switch__thumb" />
    </button>
    <span v-if="label || slots.default" class="mi-switch__label">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.mi-switch {
  --mi-switch-track-width: 36px;
  --mi-switch-track-height: 20px;
  --mi-switch-thumb-size: 16px;
  --mi-switch-thumb-offset: 16px;
  --mi-switch-label-family: var(--mi-font-family-body-1);
  --mi-switch-label-size: var(--mi-font-size-body-1);
  --mi-switch-label-weight: var(--mi-font-weight-body-1);
  --mi-switch-label-line-height: var(--mi-line-height-body-1);

  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  cursor: pointer;
}

.mi-switch--label-left {
  flex-direction: row-reverse;
}

.mi-switch--L {
  --mi-switch-track-width: 42px;
  --mi-switch-track-height: 24px;
  --mi-switch-thumb-size: 20px;
  --mi-switch-thumb-offset: 18px;
  --mi-switch-label-family: var(--mi-font-family-body-2);
  --mi-switch-label-size: var(--mi-font-size-body-2);
  --mi-switch-label-weight: var(--mi-font-weight-body-2);
  --mi-switch-label-line-height: var(--mi-line-height-body-2);
}

.mi-switch.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.mi-switch__track {
  position: relative;
  width: var(--mi-switch-track-width);
  height: var(--mi-switch-track-height);
  padding: 0;
  border: 0;
  border-radius: 999px;
  background: rgb(0 0 0 / 0.15);
  cursor: pointer;
  transition: background-color 200ms ease;
}

.mi-switch__track:hover:not(:disabled) {
  background: rgb(0 0 0 / 0.25);
}

.mi-switch__track:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-switch__track:disabled {
  cursor: not-allowed;
}

.mi-switch.is-checked .mi-switch__track {
  background: var(--mi-color-base-brand);
}

.mi-switch.is-checked .mi-switch__track:hover:not(:disabled) {
  background: var(--mi-color-base-brand-hover);
}

.mi-switch__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: var(--mi-switch-thumb-size);
  height: var(--mi-switch-thumb-size);
  border-radius: 999px;
  background: var(--mi-color-base-light);
  box-shadow: 0 1px 3px rgb(0 0 0 / 0.2);
  transition: transform 200ms ease;
}

.mi-switch.is-checked .mi-switch__thumb {
  transform: translateX(var(--mi-switch-thumb-offset));
}

.mi-switch__label {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-switch-label-family);
  font-size: var(--mi-switch-label-size);
  font-weight: var(--mi-switch-label-weight);
  line-height: var(--mi-switch-label-line-height);
}
</style>
