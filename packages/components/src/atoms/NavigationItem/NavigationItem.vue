<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    icon?: unknown;
    label: string;
    selected?: boolean;
    collapsed?: boolean;
    href?: string;
    className?: string;
  }>(),
  {
    selected: false,
    collapsed: false,
    href: undefined,
    className: "",
  },
);

const emit = defineEmits<{
  click: [];
}>();

const slots = useSlots();
const tag = computed(() => (props.href ? "a" : "button"));
const hasIcon = computed(() => Boolean(slots.icon) || Boolean(props.icon));
</script>

<template>
  <component
    :is="tag"
    :href="href"
    :type="href ? undefined : 'button'"
    class="mi-nav-item"
    :class="[
      className,
      {
        'is-selected': selected,
        'is-iconless': !hasIcon,
      },
    ]"
    :title="collapsed ? label : undefined"
    @click="emit('click')"
  >
    <span v-if="hasIcon" class="mi-nav-item__icon-wrap">
      <span class="mi-nav-item__icon-box">
        <slot name="icon">
          <component :is="icon" />
        </slot>
      </span>
    </span>
    <span v-if="!collapsed" class="mi-nav-item__label">
      {{ label }}
    </span>
    <span v-if="!collapsed" class="mi-nav-item__right">
      <slot name="right" />
    </span>
  </component>
</template>

<style scoped>
.mi-nav-item {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0;
  border: 0;
  background: transparent;
  cursor: pointer;
  border-radius: var(--mi-radius-m);
  text-decoration: none;
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;
}

.mi-nav-item__icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--mi-size-hairline) calc(var(--mi-spacing-8) + var(--mi-size-hairline));
  color: var(--mi-color-text-secondary);
}

.mi-nav-item__icon-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--mi-spacing-24);
  height: var(--mi-spacing-24);
}

.mi-nav-item__label {
  flex: 1 1 auto;
  min-width: 0;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mi-nav-item__right {
  display: inline-flex;
  align-items: center;
  margin-inline: var(--mi-spacing-8);
}

.mi-nav-item:hover {
  background: var(--mi-color-base-generic);
}

.mi-nav-item.is-selected {
  background: var(--mi-color-brand-base-selection);
}

.mi-nav-item.is-selected .mi-nav-item__icon-wrap,
.mi-nav-item.is-selected .mi-nav-item__label {
  color: var(--mi-color-brand-text-brand);
}
</style>
