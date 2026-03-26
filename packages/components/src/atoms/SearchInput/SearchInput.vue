<script setup lang="ts">
import { PhMagnifyingGlass } from "@phosphor-icons/vue";

type SearchInputWidth = "hug" | "full";
type SearchInputSurface = "generic" | "plain";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    width?: SearchInputWidth;
    surface?: SearchInputSurface;
    disabled?: boolean;
  }>(),
  {
    modelValue: "",
    placeholder: "{Placeholder}",
    width: "hug",
    surface: "generic",
    disabled: false,
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
  keydown: [event: KeyboardEvent];
}>();

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const onKeydown = (event: KeyboardEvent) => {
  emit("keydown", event);
};
</script>

<template>
  <label
    class="mi-search-input"
    :class="[
      `mi-search-input--${surface}`,
      {
        'mi-search-input--full': width === 'full',
        'is-disabled': disabled,
      },
    ]"
  >
    <span class="mi-search-input__icon" aria-hidden="true">
      <PhMagnifyingGlass :size="20" />
    </span>
    <input
      class="mi-search-input__control"
      type="text"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-label="placeholder"
      @input="onInput"
      @keydown="onKeydown"
    />
  </label>
</template>

<style scoped>
.mi-search-input {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  width: fit-content;
  height: 36px;
  padding: var(--mi-spacing-8) var(--mi-spacing-16);
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-generic);
}

.mi-search-input--plain {
  background: transparent;
}

.mi-search-input--full {
  width: 100%;
}

.mi-search-input.is-disabled {
  opacity: 0.5;
}

.mi-search-input:focus-within {
  border-color: var(--mi-color-line-generic-active);
}

.mi-search-input__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 20px;
  width: 20px;
  height: 20px;
  color: var(--mi-color-text-secondary);
}

.mi-search-input__icon svg {
  width: 20px;
  height: 20px;
}

.mi-search-input__control {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  outline: 0;
  background: transparent;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-search-input__control::placeholder {
  color: var(--mi-color-text-secondary);
}
</style>
