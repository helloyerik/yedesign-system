<script setup lang="ts">
import { computed } from "vue";
import Button from "../Button/Button.vue";

type ButtonVariant = "primary" | "brand-secondary" | "secondary" | "secondary-info" | "outline" | "text-only";
type ButtonSize = "L" | "M" | "S" | "XS";

interface ChipsOption {
  id: string;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    options: Array<string | ChipsOption>;
    value?: string;
    activeVariant?: ButtonVariant;
    inactiveVariant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
  }>(),
  {
    value: "",
    activeVariant: "brand-secondary",
    inactiveVariant: "secondary",
    size: "S",
    className: "",
  },
);

const emit = defineEmits<{
  "update:value": [value: string];
  change: [value: string];
}>();

const normalizedOptions = computed<ChipsOption[]>(() =>
  props.options.map((option) =>
    typeof option === "string"
      ? { id: option, label: option }
      : { id: option.id, label: option.label, disabled: option.disabled },
  ),
);

const onSelect = (id: string) => {
  if (id === props.value) return;
  emit("update:value", id);
  emit("change", id);
};
</script>

<template>
  <div class="mi-chips" :class="className">
    <Button
      v-for="option in normalizedOptions"
      :key="option.id"
      :label="option.label"
      :variant="option.id === value ? activeVariant : inactiveVariant"
      :size="size"
      :disabled="option.disabled"
      @click="onSelect(option.id)"
    />
  </div>
</template>

<style scoped>
.mi-chips {
  display: flex;
  flex-wrap: wrap;
  gap: var(--mi-spacing-8);
  align-items: center;
}
</style>
