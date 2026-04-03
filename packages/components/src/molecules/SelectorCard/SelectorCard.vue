<script setup lang="ts">
type SelectorCardVariant = "brand" | "primary";
type SelectorCardSize = "M" | "L";
type SelectorCardState = "default" | "hover" | "active";

const props = withDefaults(
  defineProps<{
    title: string;
    description?: string;
    checked?: boolean;
    disabled?: boolean;
    variant?: SelectorCardVariant;
    size?: SelectorCardSize;
    state?: SelectorCardState;
  }>(),
  {
    description: "",
    checked: false,
    disabled: false,
    variant: "primary",
    size: "M",
    state: "default",
  },
);

const emit = defineEmits<{
  "update:checked": [value: boolean];
  change: [value: boolean];
}>();

const toggle = () => {
  if (props.disabled || props.checked) return;
  emit("update:checked", true);
  emit("change", true);
};
</script>

<template>
  <button
    class="mi-selector-card"
    type="button"
    role="radio"
    :aria-checked="checked"
    :disabled="disabled"
    :class="[
      `mi-selector-card--${variant}`,
      `mi-selector-card--${size}`,
      {
        'is-checked': checked,
        'is-disabled': disabled,
        'is-hovered': state === 'hover',
        'is-active': state === 'active',
      },
    ]"
    @click="toggle"
  >
    <div class="mi-selector-card__info">
      <p class="mi-selector-card__title">{{ title }}</p>
      <p v-if="description" class="mi-selector-card__description">{{ description }}</p>
    </div>
    <span class="mi-selector-card__radio" aria-hidden="true">
      <span v-if="checked" class="mi-selector-card__dot" />
    </span>
  </button>
</template>

<style scoped>
.mi-selector-card {
  display: flex;
  align-items: flex-start;
  gap: var(--mi-spacing-12);
  width: 100%;
  padding: var(--mi-spacing-12);
  border-radius: var(--mi-radius-xl);
  border: 1px solid var(--mi-color-line-generic);
  background: var(--mi-color-base-light);
  text-align: left;
  cursor: pointer;
  transition: border-color 160ms ease, background-color 160ms ease;
}

.mi-selector-card--L {
  padding: var(--mi-spacing-16);
}

.mi-selector-card:hover:not(.is-disabled),
.mi-selector-card.is-hovered:not(.is-disabled) {
  border-color: var(--mi-color-line-generic-hover);
  background: var(--mi-color-base-generic);
}

.mi-selector-card:active:not(.is-disabled),
.mi-selector-card.is-active:not(.is-disabled) {
  border-color: var(--mi-color-line-generic-active);
  background: var(--mi-color-base-generic-medium);
}

.mi-selector-card.is-checked.mi-selector-card--brand {
  border-color: var(--mi-color-base-brand);
}

.mi-selector-card.is-checked.mi-selector-card--primary {
  border-color: var(--mi-color-line-generic-active);
}

.mi-selector-card.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.mi-selector-card__info {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-4);
  flex: 1 1 auto;
  min-width: 0;
  padding-inline: var(--mi-spacing-4);
}

.mi-selector-card__title {
  margin: 0;
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
  font-weight: 700;
  color: var(--mi-color-text-primary);
}

.mi-selector-card__description {
  margin: 0;
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
  color: var(--mi-color-text-secondary);
}

.mi-selector-card__radio {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  border: 1.5px solid var(--mi-color-line-generic-active);
  background: var(--mi-color-base-light);
  flex: 0 0 auto;
  transition: border-color 160ms ease;
}

.mi-selector-card--brand.is-checked .mi-selector-card__radio {
  border-color: var(--mi-color-base-brand);
}

.mi-selector-card--primary.is-checked .mi-selector-card__radio {
  border-color: var(--mi-color-line-generic-active);
}

.mi-selector-card__dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--mi-color-text-primary);
}

.mi-selector-card--brand .mi-selector-card__dot {
  background: var(--mi-color-base-brand);
}
</style>
