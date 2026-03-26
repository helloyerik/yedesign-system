<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";

export type SelectVariant = "default" | "compact" | "textOnly";
export interface SelectOption {
  value: string;
  label?: string;
  description?: string;
}

const props = withDefaults(
  defineProps<{
    value: string;
    options: Array<string | SelectOption>;
    variant?: SelectVariant;
    caretWeight?: "regular" | "fill";
    caretSize?: number;
    showSelectedMark?: boolean;
    className?: string;
    placeholder?: string;
    dropdownMenuClassName?: string;
  }>(),
  {
    variant: "default",
    caretWeight: "regular",
    caretSize: 16,
    showSelectedMark: false,
    className: "",
    placeholder: "Выберите...",
    dropdownMenuClassName: "",
  },
);

const emit = defineEmits<{
  "update:value": [value: string];
  change: [value: string];
}>();

const isOpen = ref(false);
const rootRef = ref<HTMLElement | null>(null);

const normalizedOptions = computed(() =>
  props.options.map((option) =>
    typeof option === "string"
      ? { value: option, label: option }
      : {
          value: option.value,
          label: option.label || option.value,
          description: option.description,
        },
  ),
);

const displayedValue = computed(() => props.value || props.placeholder);
const triggerClass = computed(() => {
  if (props.variant === "compact") {
    return "mi-select__trigger--compact";
  }

  if (props.variant === "textOnly") {
    return "mi-select__trigger--textOnly";
  }

  return "mi-select__trigger--default";
});

const textClass = computed(() =>
  props.variant === "default" ? "mi-select__text--body-2" : "mi-select__text--body-1",
);

const selectOption = (value: string) => {
  emit("update:value", value);
  emit("change", value);
  isOpen.value = false;
};

const onWindowPointerDown = (event: Event) => {
  const target = event.target as Node | null;

  if (target && rootRef.value?.contains(target)) {
    return;
  }

  isOpen.value = false;
};

const onWindowKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    isOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("pointerdown", onWindowPointerDown);
  window.addEventListener("keydown", onWindowKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("pointerdown", onWindowPointerDown);
  window.removeEventListener("keydown", onWindowKeydown);
});
</script>

<template>
  <div ref="rootRef" class="mi-select">
    <button
      type="button"
      class="mi-select__trigger"
      :class="[triggerClass, textClass, className]"
      @click.stop="isOpen = !isOpen"
    >
      <span class="mi-select__value">{{ displayedValue }}</span>
      <PhCaretDown :size="caretSize" :weight="caretWeight" class="mi-select__caret" />
    </button>

    <div v-if="isOpen" class="mi-select__menu" :class="dropdownMenuClassName" role="listbox">
      <button
        v-for="option in normalizedOptions"
        :key="option.value"
        type="button"
        class="mi-select__option"
        @click="selectOption(option.value)"
      >
        <span class="mi-select__option-content">
          <span class="mi-select__option-label" :class="textClass">{{ option.label }}</span>
          <span v-if="option.description" class="mi-select__option-description">{{ option.description }}</span>
        </span>
        <PhCheck
          v-if="showSelectedMark && option.value === value"
          :size="14"
          class="mi-select__check"
        />
      </button>
    </div>
  </div>
</template>

<style scoped>
.mi-select {
  position: relative;
  width: 100%;
}

.mi-select__trigger {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  width: 100%;
  cursor: pointer;
}

.mi-select__trigger--default {
  height: var(--mi-size-select-height);
  background: transparent;
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-m);
  padding-inline: var(--mi-spacing-16);
}

.mi-select__trigger--compact {
  height: var(--mi-size-select-compact-height);
  background: var(--mi-color-base-light);
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-s);
  padding-inline: var(--mi-spacing-8);
}

.mi-select__trigger--textOnly {
  background: transparent;
  border: 0;
  padding-inline: 0;
}

.mi-select__trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-select__value {
  flex: 1 1 auto;
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mi-select__text--body-2 {
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  color: var(--mi-color-text-primary);
}

.mi-select__text--body-1 {
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  color: var(--mi-color-text-primary);
}

.mi-select__caret {
  flex: 0 0 auto;
  color: var(--mi-color-text-secondary);
}

.mi-select__menu {
  position: absolute;
  top: calc(100% + var(--mi-spacing-8));
  left: 0;
  z-index: 10;
  width: 100%;
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-l);
  background: var(--mi-color-base-light);
  box-shadow: var(--mi-shadow-soft);
  padding: var(--mi-spacing-8);
}

.mi-select__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--mi-spacing-8);
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
  border-radius: var(--mi-radius-m);
  text-align: left;
}

.mi-select__option:hover {
  background: var(--mi-color-base-generic);
}

.mi-select__option-content {
  display: flex;
  flex: 1 1 auto;
  min-width: 0;
  flex-direction: column;
}

.mi-select__option-description {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-select__check {
  flex: 0 0 auto;
  color: var(--mi-color-text-primary);
}
</style>
