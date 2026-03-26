<script setup lang="ts">
import Radio from "./Radio.vue";

type RadioSize = "M" | "L";
type RadioDirection = "horizontal" | "vertical";

interface RadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: string;
    options: RadioGroupOption[];
    size?: RadioSize;
    direction?: RadioDirection;
    disabled?: boolean;
  }>(),
  {
    size: "M",
    direction: "vertical",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  change: [value: string];
}>();

const selectValue = (value: string) => {
  emit("update:modelValue", value);
  emit("change", value);
};
</script>

<template>
  <div class="mi-radio-group" :class="`mi-radio-group--${direction}`" role="radiogroup">
    <Radio
      v-for="option in options"
      :key="option.value"
      :checked="modelValue === option.value"
      :disabled="disabled || option.disabled"
      :size="size"
      @change="selectValue(option.value)"
    >
      {{ option.label }}
    </Radio>
  </div>
</template>

<style scoped>
.mi-radio-group {
  display: flex;
  gap: var(--mi-spacing-12);
}

.mi-radio-group--vertical {
  flex-direction: column;
}

.mi-radio-group--horizontal {
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
