<script setup lang="ts">
import { computed, ref } from "vue";
import { PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";
import NavigationItem from "../../atoms/NavigationItem/NavigationItem.vue";

interface NavItem {
  id: string;
  label: string;
  icon: unknown;
  rightContent?: unknown;
}

interface NavGroup {
  items: NavItem[];
}

const props = withDefaults(
  defineProps<{
    logo?: unknown;
    serviceName?: string;
    topItems?: NavItem[];
    subheaderItems?: NavItem[];
    middleGroups?: NavGroup[];
    menuItems?: NavItem[];
    bottomItems?: NavItem[];
    footerItems?: NavItem[];
    selectedId?: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    compact?: boolean;
    defaultCompact?: boolean;
    hideCollapseButton?: boolean;
    headerDecoration?: boolean;
    customBackgroundClassName?: string;
  }>(),
  {
    logo: undefined,
    serviceName: "Service Name",
    topItems: () => [],
    subheaderItems: () => [],
    middleGroups: () => [],
    menuItems: () => [],
    bottomItems: () => [],
    footerItems: () => [],
    selectedId: undefined,
    collapsible: true,
    defaultCollapsed: false,
    compact: undefined,
    defaultCompact: undefined,
    hideCollapseButton: false,
    headerDecoration: false,
    customBackgroundClassName: "",
  },
);

const emit = defineEmits<{
  select: [id: string];
  "logo-click": [];
  "update:compact": [value: boolean];
  "change-compact": [value: boolean];
}>();

const collapsed = ref(props.defaultCompact ?? props.defaultCollapsed);

const isCompact = computed(() => (typeof props.compact === "boolean" ? props.compact : collapsed.value));
const showCollapseButton = computed(() => props.collapsible && !props.hideCollapseButton);
const resolvedSubheaderItems = computed(() => (props.subheaderItems.length ? props.subheaderItems : props.topItems));
const resolvedFooterItems = computed(() => (props.footerItems.length ? props.footerItems : props.bottomItems));
const resolvedMenuItems = computed(() => props.menuItems);
const resolvedGroups = computed(() => props.middleGroups);

const asideStyle = computed(() => ({
  "--mi-aside-header-size": isCompact.value
    ? "var(--mi-aside-width-collapsed)"
    : "var(--mi-aside-width-expanded)",
}));

const setCompact = (value: boolean) => {
  if (typeof props.compact !== "boolean") {
    collapsed.value = value;
  }
  emit("update:compact", value);
  emit("change-compact", value);
};
</script>

<template>
  <aside
    class="mi-aside-header"
    :class="{ 'is-collapsed': isCompact }"
    :style="asideStyle"
  >
    <div v-if="$slots.background" class="mi-aside-header__background" :class="customBackgroundClassName">
      <slot name="background" />
    </div>

    <div class="mi-aside-header__content">
      <div class="mi-aside-header__top" :class="{ 'is-decorated': headerDecoration }">
        <div class="mi-aside-header__logo">
          <div class="mi-aside-header__logo-wrap">
            <button
              v-if="logo"
              type="button"
              class="mi-aside-header__logo-button"
              aria-label="Logo"
              @click="emit('logo-click')"
            >
              <slot name="logo">
                <component :is="logo" />
              </slot>
            </button>
            <div v-else class="mi-aside-header__logo-placeholder" />
          </div>
          <span v-if="!isCompact" class="mi-aside-header__service">
            {{ serviceName }}
          </span>
        </div>

        <div v-if="resolvedSubheaderItems.length" class="mi-aside-header__subheader">
          <NavigationItem
            v-for="item in resolvedSubheaderItems"
            :key="item.id"
            :icon="item.icon"
            :label="item.label"
            :selected="item.id === selectedId"
            :collapsed="isCompact"
            class-name="mi-aside-header__nav-item"
            @click="emit('select', item.id)"
          />
        </div>
      </div>

      <div v-if="resolvedMenuItems.length" class="mi-aside-header__section">
        <div class="mi-aside-header__divider" />
        <NavigationItem
          v-for="item in resolvedMenuItems"
          :key="item.id"
          :icon="item.icon"
          :label="item.label"
          :selected="item.id === selectedId"
          :collapsed="isCompact"
          class-name="mi-aside-header__nav-item"
          @click="emit('select', item.id)"
        />
      </div>

      <div v-for="(group, index) in resolvedGroups" :key="index" class="mi-aside-header__section">
        <div class="mi-aside-header__divider" />
        <NavigationItem
          v-for="item in group.items"
          :key="item.id"
          :icon="item.icon"
          :label="item.label"
          :selected="item.id === selectedId"
          :collapsed="isCompact"
          class-name="mi-aside-header__nav-item"
          @click="emit('select', item.id)"
        />
      </div>

      <div class="mi-aside-header__spacer" />

      <div v-if="resolvedFooterItems.length" class="mi-aside-header__section">
        <NavigationItem
          v-for="item in resolvedFooterItems"
          :key="item.id"
          :icon="item.icon"
          :label="item.label"
          :selected="item.id === selectedId"
          :collapsed="isCompact"
          class-name="mi-aside-header__nav-item"
          @click="emit('select', item.id)"
        >
          <template #right>
            <component v-if="item.rightContent" :is="item.rightContent" />
          </template>
        </NavigationItem>
      </div>

      <button
        v-if="showCollapseButton"
        type="button"
        class="mi-aside-header__toggle"
        @click="setCompact(!isCompact)"
      >
        <PhCaretRight v-if="isCompact" :size="'var(--mi-spacing-12)'" weight="fill" />
        <PhCaretLeft v-else :size="'var(--mi-spacing-12)'" weight="fill" />
      </button>
    </div>
  </aside>
</template>

<style scoped>
.mi-aside-header {
  --mi-aside-width-collapsed: calc(var(--mi-spacing-7xl) - var(--mi-spacing-2));
  --mi-aside-width-expanded: calc(
    var(--mi-spacing-8xl) + var(--mi-spacing-8xl) + var(--mi-spacing-4xl) + var(--mi-spacing-12)
  );

  display: flex;
  flex-direction: column;
  width: var(--mi-aside-width-expanded);
  height: 100%;
  background: var(--mi-color-surface-panel);
  border-right: 1px solid var(--mi-color-line-generic-solid);
  transition: width 200ms ease;
  flex-shrink: 0;
  overflow: hidden;
  position: relative;
}

.mi-aside-header.is-collapsed {
  width: var(--mi-aside-width-collapsed);
}

.mi-aside-header__background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.mi-aside-header__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.mi-aside-header__top {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-8);
  padding-bottom: var(--mi-spacing-8);
}

.mi-aside-header__top.is-decorated {
  background: var(--mi-color-base-generic);
  border-bottom: 1px solid var(--mi-color-line-generic);
}

.mi-aside-header__logo {
  display: flex;
  align-items: center;
  padding-top: var(--mi-spacing-8);
}

.mi-aside-header__logo-wrap {
  display: flex;
  align-items: center;
  padding-inline: var(--mi-spacing-8);
}

.mi-aside-header__logo-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--mi-spacing-4);
  border-radius: var(--mi-radius-m);
  border: 0;
  background: transparent;
  cursor: pointer;
}

.mi-aside-header__logo-placeholder {
  width: var(--mi-spacing-4xl);
  height: var(--mi-spacing-4xl);
  border-radius: var(--mi-radius-pill);
  background: var(--mi-color-base-brand);
}

.mi-aside-header__service {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mi-aside-header__section {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.mi-aside-header__divider {
  height: 1px;
  margin-block: var(--mi-spacing-8);
  background: var(--mi-color-line-generic);
}

.mi-aside-header__subheader {
  display: flex;
  flex-direction: column;
}

.mi-aside-header__spacer {
  flex: 1 1 auto;
}

.mi-aside-header__toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-block: var(--mi-spacing-4);
  border: 0;
  border-top: 1px solid var(--mi-color-line-generic);
  background: transparent;
  cursor: pointer;
  color: var(--mi-color-text-secondary);
  transition: background-color 150ms ease;
}

.mi-aside-header__toggle:hover {
  background: var(--mi-color-base-generic);
}
</style>
