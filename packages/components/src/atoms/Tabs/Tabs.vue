<script setup lang="ts">
export interface TabItem {
  id: string;
  label: string;
  icon?: unknown;
  disabled?: boolean;
  counter?: number;
  widthToken?: string;
}

type TabSize = "M" | "L" | "XL";
type TabVariant = "underline" | "pills";

const props = withDefaults(
  defineProps<{
    items: TabItem[];
    activeTab: string;
    size?: TabSize;
    variant?: TabVariant;
    className?: string;
  }>(),
  {
    size: "M",
    variant: "underline",
    className: "",
  },
);

const emit = defineEmits<{
  change: [id: string];
}>();

const handleClick = (id: string, disabled?: boolean) => {
  if (disabled) return;
  emit("change", id);
};
</script>

<template>
  <div
    class="mi-tabs"
    :class="[
      `mi-tabs--${variant}`,
      `mi-tabs--${size}`,
      className,
    ]"
    role="tablist"
  >
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      role="tab"
      class="mi-tabs__tab"
      :class="[
        item.id === activeTab ? 'is-active' : '',
        item.disabled ? 'is-disabled' : '',
      ]"
      :aria-selected="item.id === activeTab"
      :disabled="item.disabled"
      :style="item.widthToken ? { width: item.widthToken } : undefined"
      @click="handleClick(item.id, item.disabled)"
    >
      <span v-if="item.icon" class="mi-tabs__icon">
        <component :is="item.icon" />
      </span>
      <span class="mi-tabs__label">{{ item.label }}</span>
      <span v-if="item.counter != null" class="mi-tabs__counter">
        {{ item.counter }}
      </span>
      <span v-if="variant === 'underline' && item.id === activeTab" class="mi-tabs__indicator" />
    </button>
  </div>
</template>

<style scoped>
.mi-tabs {
  display: flex;
  align-items: center;
  gap: 0;
}

.mi-tabs--underline {
  border-bottom: 1px solid var(--mi-color-line-generic);
}

.mi-tabs--pills {
  gap: var(--mi-spacing-8);
}

.mi-tabs__tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  border: 0;
  background: transparent;
  cursor: pointer;
  color: var(--mi-color-text-secondary);
  transition: color 150ms ease, background-color 150ms ease, opacity 150ms ease;
  white-space: nowrap;
}

.mi-tabs--underline .mi-tabs__tab {
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
}

.mi-tabs--underline.mi-tabs--L .mi-tabs__tab {
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
}

.mi-tabs--underline.mi-tabs--XL .mi-tabs__tab {
  padding: var(--mi-spacing-12) var(--mi-spacing-xl);
}

.mi-tabs--pills .mi-tabs__tab {
  height: var(--mi-size-cart-related-filter-height);
  padding: var(--mi-spacing-6) var(--mi-spacing-12);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-complementary);
}

.mi-tabs__tab.is-active {
  color: var(--mi-color-text-primary);
}

.mi-tabs--pills .mi-tabs__tab.is-active {
  background: var(--mi-color-brand-base-brand-secondary);
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-tabs__tab:not(.is-disabled):hover {
  color: var(--mi-color-text-primary);
}

.mi-tabs--pills .mi-tabs__tab:not(.is-disabled):hover {
  background: var(--mi-color-base-generic-hover);
}

.mi-tabs__tab.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.mi-tabs__label {
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-tabs--L .mi-tabs__label {
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-tabs--XL .mi-tabs__label {
  font-family: var(--mi-font-family-body-3);
  font-size: var(--mi-font-size-body-3);
  line-height: var(--mi-line-height-body-3);
}

.mi-tabs__icon {
  display: inline-flex;
  align-items: center;
}

.mi-tabs__counter {
  padding: var(--mi-spacing-2) var(--mi-spacing-4);
  border-radius: var(--mi-radius-pill);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-secondary);
}

.mi-tabs__tab.is-active .mi-tabs__counter {
  background: var(--mi-color-base-brand);
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-tabs__indicator {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: var(--mi-size-tabs-active-line-height);
  background: var(--mi-color-base-brand);
}
</style>
