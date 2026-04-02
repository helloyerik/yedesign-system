<script setup lang="ts">
interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    options: SegmentedOption[];
    fullWidth?: boolean;
    className?: string;
  }>(),
  {
    fullWidth: false,
    className: "",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const select = (value: string, disabled?: boolean) => {
  if (disabled) return;
  emit("update:modelValue", value);
  emit("change", value);
};
</script>

<template>
  <div
    role="radiogroup"
    class="mi-segmented"
    :class="[className, { 'mi-segmented--full': fullWidth }]"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="radio"
      class="mi-segmented__option"
      :class="[
        {
          'is-active': option.value === modelValue,
          'is-disabled': option.disabled,
          'is-full': fullWidth,
        },
      ]"
      :aria-checked="option.value === modelValue"
      :disabled="option.disabled"
      @click="select(option.value, option.disabled)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.mi-segmented {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  padding: var(--mi-spacing-4);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-generic);
}

.mi-segmented--full {
  width: 100%;
}

.mi-segmented__option {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: var(--mi-size-button-xs-height);
  padding-inline: var(--mi-spacing-16);
  border: 0;
  border-radius: var(--mi-radius-s);
  background: transparent;
  cursor: pointer;
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;
}

.mi-segmented__option.is-full {
  flex: 1 1 auto;
}

.mi-segmented__option.is-active {
  background: var(--mi-color-surface-panel);
  color: var(--mi-color-text-primary);
}

.mi-segmented__option:not(.is-disabled):hover {
  color: var(--mi-color-text-primary);
}

.mi-segmented__option.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
