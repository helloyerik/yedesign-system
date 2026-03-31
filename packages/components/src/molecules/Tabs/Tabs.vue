<script setup lang="ts">
import { computed } from "vue";

type TabSize = "M" | "L" | "XL";
type TabVariant = "underline" | "pills";

export interface TabItem {
  id: string;
  label: string;
  icon?: unknown;
  disabled?: boolean;
  counter?: number;
  widthToken?: string;
}

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
  tabChange: [id: string];
}>();

const rootClassName = computed(() => [
  "mi-tabs",
  `mi-tabs--${props.variant}`,
  props.className,
]);

const tabSizeClassName = computed(() => `mi-tabs__tab--${props.size}`);

const handleTabChange = (id: string, disabled?: boolean) => {
  if (!disabled) {
    emit("tabChange", id);
  }
};
</script>

<template>
  <div :class="rootClassName" role="tablist">
    <button
      v-for="item in items"
      :key="item.id"
      type="button"
      role="tab"
      class="mi-tabs__tab"
      :class="[
        tabSizeClassName,
        {
          'is-active': item.id === activeTab,
          'is-disabled': item.disabled,
          'mi-tabs__tab--with-counter': item.counter != null,
        },
      ]"
      :style="item.widthToken ? { width: item.widthToken } : undefined"
      :aria-selected="item.id === activeTab"
      :disabled="item.disabled"
      @click="handleTabChange(item.id, item.disabled)"
    >
      <span v-if="item.icon" class="mi-tabs__icon">
        <component :is="item.icon" />
      </span>

      <span class="mi-tabs__label">{{ item.label }}</span>

      <span
        v-if="item.counter != null"
        class="mi-tabs__counter"
      >
        {{ item.counter }}
      </span>

      <span
        v-if="variant === 'underline' && item.id === activeTab"
        aria-hidden="true"
        class="mi-tabs__indicator"
      />
    </button>
  </div>
</template>

<style scoped>
.mi-tabs {
  display: flex;
}

.mi-tabs--underline {
  border-bottom: 1px solid var(--mi-color-line-brand);
}

.mi-tabs--pills {
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-tabs__tab {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: var(--mi-spacing-8);
  border: 0;
  background: transparent;
  cursor: pointer;
  white-space: nowrap;
  transition: color 150ms ease, background-color 150ms ease, opacity 150ms ease;
}

.mi-tabs__tab--M {
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-tabs__tab--L {
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-tabs__tab--XL {
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  font-family: var(--mi-font-family-body-3);
  font-size: var(--mi-font-size-body-3);
  font-weight: var(--mi-font-weight-body-3);
  line-height: var(--mi-line-height-body-3);
}

.mi-tabs--pills .mi-tabs__tab {
  height: 30px;
  padding: 6px var(--mi-spacing-12);
  border-radius: var(--mi-radius-m);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-tabs--underline .mi-tabs__tab {
  color: var(--mi-color-text-secondary);
}

.mi-tabs--underline .mi-tabs__tab:hover:not(:disabled) {
  color: var(--mi-color-text-primary);
}

.mi-tabs--underline .mi-tabs__tab.is-active {
  color: var(--mi-color-text-primary);
}

.mi-tabs--pills .mi-tabs__tab {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-complementary);
}

.mi-tabs--pills .mi-tabs__tab:hover:not(:disabled) {
  color: var(--mi-color-text-primary);
}

.mi-tabs--pills .mi-tabs__tab.is-active {
  background: var(--mi-color-brand-secondary);
  color: var(--mi-color-text-contrast);
}

.mi-tabs__tab.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-tabs__icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.mi-tabs__counter {
  border-radius: 999px;
  padding: 1px 5px;
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  font-weight: var(--mi-font-weight-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-tabs--underline .mi-tabs__counter {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-secondary);
}

.mi-tabs--underline .mi-tabs__tab.is-active .mi-tabs__counter {
  background: var(--mi-color-brand-primary);
  color: #fff;
}

.mi-tabs--pills .mi-tabs__counter {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-secondary);
}

.mi-tabs__indicator {
  pointer-events: none;
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: var(--mi-color-brand-primary);
}
</style>
