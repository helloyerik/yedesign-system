<script setup lang="ts">
export interface SegmentedOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    value: string;
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
  change: [value: string];
}>();

const handleChange = (value: string, disabled?: boolean) => {
  if (!disabled) {
    emit("change", value);
  }
};
</script>

<template>
  <div
    role="radiogroup"
    class="mi-segmented"
    :class="[{ 'is-full-width': fullWidth }, className]"
  >
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      role="radio"
      class="mi-segmented__option"
      :class="[
        {
          'is-active': option.value === value,
          'is-disabled': option.disabled,
          'is-full-width': fullWidth,
        },
      ]"
      :aria-checked="option.value === value"
      :disabled="option.disabled"
      @click="handleChange(option.value, option.disabled)"
    >
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.mi-segmented {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 3px;
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-generic);
}

.mi-segmented.is-full-width {
  width: 100%;
}

.mi-segmented__option {
  height: 30px;
  padding: 0 var(--mi-spacing-8);
  border: 0;
  border-radius: var(--mi-radius-s);
  background: transparent;
  color: var(--mi-color-text-secondary);
  cursor: pointer;
  transition: color 150ms ease, background-color 150ms ease, opacity 150ms ease;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-segmented__option.is-full-width {
  display: flex;
  flex: 1 1 0;
  justify-content: center;
}

.mi-segmented__option:hover:not(:disabled) {
  color: var(--mi-color-text-primary);
}

.mi-segmented__option.is-active {
  background: var(--mi-color-base-background);
  color: var(--mi-color-text-primary);
}

.mi-segmented__option.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
</style>
