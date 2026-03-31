<script setup lang="ts">
import { computed, defineComponent, h } from "vue";
import { PhCaretDown, PhCheck } from "@phosphor-icons/vue";
import DropdownMenu, { type DropdownMenuItem } from "../../molecules/DropdownMenu/DropdownMenu.vue";

export type SelectVariant = "default" | "compact" | "textOnly";
export interface SelectOption {
  value: string;
  label?: string;
  description?: string;
}

const SelectedMarkIcon = defineComponent({
  name: "MiSelectSelectedMarkIcon",
  setup() {
    return () => h(PhCheck, { size: 14, weight: "bold", class: "mi-select__selected-icon" });
  },
});

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
    showSelectedMark: true,
    className: "",
    placeholder: "Выберите...",
    dropdownMenuClassName: "",
  },
);

const emit = defineEmits<{
  "update:value": [value: string];
  change: [value: string];
}>();

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
  if (props.variant === "compact") return "mi-select__trigger--compact";
  if (props.variant === "textOnly") return "mi-select__trigger--textOnly";
  return "mi-select__trigger--default";
});

const textClass = computed(() =>
  props.variant === "default" ? "mi-select__text--body-2" : "mi-select__text--body-1",
);

const menuItems = computed<DropdownMenuItem[]>(() =>
  normalizedOptions.value.map((option) => ({
    id: option.value,
    label: option.label || option.value,
    description: option.description,
    icon: props.showSelectedMark && option.value === props.value ? SelectedMarkIcon : undefined,
    reserveIconSpace: props.showSelectedMark,
    labelClassName:
      props.showSelectedMark && option.value === props.value ? "mi-select__menu-label--selected" : undefined,
    onClick: () => {
      emit("update:value", option.value);
      emit("change", option.value);
    },
  })),
);
</script>

<template>
  <div class="mi-select">
    <DropdownMenu
      placement="bottom-start"
      :items="menuItems"
      :menu-class-name="dropdownMenuClassName"
    >
      <template #switcher="{ onClick, triggerRef }">
        <button
          :ref="triggerRef"
          type="button"
          class="mi-select__trigger"
          :class="[triggerClass, textClass, className]"
          @click.stop="onClick"
        >
          <span class="mi-select__value">{{ displayedValue }}</span>
          <PhCaretDown :size="caretSize" :weight="caretWeight" class="mi-select__caret" />
        </button>
      </template>
    </DropdownMenu>
  </div>
</template>

<style scoped>
.mi-select {
  width: 100%;
}

.mi-select__trigger {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--mi-spacing-8);
  cursor: pointer;
}

.mi-select__trigger--default {
  height: var(--mi-size-select-height);
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-m);
  background: transparent;
  padding-inline: var(--mi-spacing-16);
}

.mi-select__trigger--compact {
  height: var(--mi-size-select-compact-height);
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-s);
  background: var(--mi-color-base-light);
  padding-inline: var(--mi-spacing-8);
}

.mi-select__trigger--textOnly {
  border: 0;
  background: transparent;
  padding-inline: 0;
}

.mi-select__trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-select__value {
  display: inline-block;
  min-width: 0;
  max-width: 100%;
  flex: 1 1 auto;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mi-select__text--body-2 {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-select__text--body-1 {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-select__caret {
  flex: 0 0 auto;
  color: var(--mi-color-text-secondary);
}

.mi-select :deep(.mi-select__menu-label--selected) {
  color: var(--mi-color-text-brand);
}

.mi-select :deep(.mi-select__selected-icon) {
  color: var(--mi-color-text-brand);
}
</style>
