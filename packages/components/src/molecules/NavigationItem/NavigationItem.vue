<script setup lang="ts">
import { computed, useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    label: string;
    icon?: unknown;
    selected?: boolean;
    collapsed?: boolean;
    href?: string;
    rightContent?: unknown;
    className?: string;
  }>(),
  {
    icon: undefined,
    selected: false,
    collapsed: false,
    href: undefined,
    rightContent: undefined,
    className: "",
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const slots = useSlots();

const tagName = computed(() => (props.href ? "a" : "button"));
const hasIcon = computed(() => Boolean(slots.icon) || Boolean(props.icon));
const hasRight = computed(() => !props.collapsed && (Boolean(slots.right) || Boolean(props.rightContent)));

const rootClassName = computed(() => [
  "mi-navigation-item",
  {
    "is-selected": props.selected,
    "is-collapsed": props.collapsed,
  },
  props.className,
]);

const handleClick = (event: MouseEvent) => {
  emit("click", event);
};
</script>

<template>
  <component
    :is="tagName"
    v-bind="href ? { href } : { type: 'button' }"
    :class="rootClassName"
    :title="collapsed ? label : undefined"
    @click="handleClick"
  >
    <span
      v-if="hasIcon"
      class="mi-navigation-item__icon-slot"
    >
      <span class="mi-navigation-item__icon-box">
        <slot name="icon">
          <component :is="icon" v-if="icon" />
        </slot>
      </span>
    </span>

    <span
      v-if="!collapsed"
      class="mi-navigation-item__label"
    >
      {{ label }}
    </span>

    <span
      v-if="hasRight"
      class="mi-navigation-item__right"
    >
      <slot name="right">
        <component :is="rightContent" v-if="rightContent" />
      </slot>
    </span>
  </component>
</template>

<style scoped>
.mi-navigation-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0;
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 150ms ease;
}

.mi-navigation-item:hover {
  background: var(--mi-color-base-generic);
}

.mi-navigation-item.is-selected {
  background: var(--mi-color-brand-base-selection);
}

.mi-navigation-item__icon-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 1px 9px;
  color: var(--mi-color-text-secondary);
}

.mi-navigation-item.is-selected .mi-navigation-item__icon-slot {
  color: var(--mi-color-brand-primary);
}

.mi-navigation-item__icon-box {
  display: flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  box-sizing: content-box;
  padding: 10px;
}

.mi-navigation-item__label {
  min-width: 0;
  flex: 1 1 auto;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mi-navigation-item.is-selected .mi-navigation-item__label {
  color: var(--mi-color-brand-primary);
}

.mi-navigation-item__right {
  display: flex;
  margin-right: var(--mi-spacing-8);
  margin-left: var(--mi-spacing-8);
  align-items: center;
  flex-shrink: 0;
}
</style>
