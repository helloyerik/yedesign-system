<script setup lang="ts">
import { ref } from "vue";
import { PhCaretLeft, PhCaretRight } from "@phosphor-icons/vue";
import NavigationItem from "../NavigationItem/NavigationItem.vue";

export interface AsideHeaderItem {
  id: string;
  label: string;
  icon?: unknown;
  rightContent?: unknown;
}

export interface AsideHeaderGroup {
  items: AsideHeaderItem[];
}

const props = withDefaults(
  defineProps<{
    logo?: unknown;
    serviceName?: string;
    topItems?: AsideHeaderItem[];
    middleGroups?: AsideHeaderGroup[];
    bottomItems?: AsideHeaderItem[];
    selectedId?: string;
    collapsible?: boolean;
    defaultCollapsed?: boolean;
  }>(),
  {
    logo: undefined,
    serviceName: "Service Name",
    topItems: () => [],
    middleGroups: () => [],
    bottomItems: () => [],
    selectedId: undefined,
    collapsible: true,
    defaultCollapsed: false,
  },
);

const emit = defineEmits<{
  select: [id: string];
  logoClick: [];
  collapseChange: [collapsed: boolean];
}>();

const collapsed = ref(props.defaultCollapsed);

const toggleCollapsed = () => {
  collapsed.value = !collapsed.value;
  emit("collapseChange", collapsed.value);
};
</script>

<template>
  <aside
    class="mi-aside-header"
    :class="{ 'is-collapsed': collapsed }"
  >
    <div class="mi-aside-header__logo-row">
      <div class="mi-aside-header__logo-cell">
        <button
          v-if="$slots.logo || logo"
          type="button"
          class="mi-aside-header__logo-button"
          aria-label="Открыть поздравление"
          @click="emit('logoClick')"
        >
          <slot name="logo">
            <component :is="logo" v-if="logo" />
          </slot>
        </button>

        <div
          v-else
          class="mi-aside-header__logo-fallback"
        />
      </div>

      <span
        v-if="!collapsed"
        class="mi-aside-header__service-name"
      >
        {{ serviceName }}
      </span>
    </div>

    <div
      v-if="topItems.length"
      class="mi-aside-header__section"
    >
      <NavigationItem
        v-for="item in topItems"
        :key="item.id"
        :label="item.label"
        :selected="selectedId === item.id"
        :collapsed="collapsed"
        class-name="mi-aside-header__nav-item"
        @click="emit('select', item.id)"
      >
        <template #icon>
          <component :is="item.icon" v-if="item.icon" />
        </template>
      </NavigationItem>
    </div>

    <div
      v-for="(group, groupIndex) in middleGroups"
      :key="groupIndex"
      class="mi-aside-header__section"
    >
      <div class="mi-aside-header__group-divider-wrap">
        <div class="mi-aside-header__group-divider" />
      </div>

      <NavigationItem
        v-for="item in group.items"
        :key="item.id"
        :label="item.label"
        :selected="selectedId === item.id"
        :collapsed="collapsed"
        class-name="mi-aside-header__nav-item"
        @click="emit('select', item.id)"
      >
        <template #icon>
          <component :is="item.icon" v-if="item.icon" />
        </template>
      </NavigationItem>
    </div>

    <div class="mi-aside-header__spacer" />

    <div
      v-if="bottomItems.length"
      class="mi-aside-header__section"
    >
      <NavigationItem
        v-for="item in bottomItems"
        :key="item.id"
        :label="item.label"
        :selected="selectedId === item.id"
        :collapsed="collapsed"
        class-name="mi-aside-header__nav-item"
        @click="emit('select', item.id)"
      >
        <template #icon>
          <component :is="item.icon" v-if="item.icon" />
        </template>
        <template #right>
          <component :is="item.rightContent" v-if="item.rightContent" />
        </template>
      </NavigationItem>
    </div>

    <button
      v-if="collapsible"
      type="button"
      class="mi-aside-header__collapse-toggle"
      @click="toggleCollapsed"
    >
      <PhCaretRight
        v-if="collapsed"
        :size="12"
        weight="fill"
      />
      <PhCaretLeft
        v-else
        :size="12"
        weight="fill"
      />
    </button>
  </aside>
</template>

<style scoped>
.mi-aside-header {
  display: flex;
  width: 236px;
  height: 100%;
  flex-direction: column;
  flex-shrink: 0;
  overflow: hidden;
  border-right: 1px solid var(--mi-color-line-generic-solid);
  background: var(--mi-color-base-background);
  transition: width 200ms ease;
}

.mi-aside-header.is-collapsed {
  width: 62px;
}

.mi-aside-header__logo-row {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding-top: var(--mi-spacing-8);
}

.mi-aside-header__logo-cell {
  display: flex;
  align-items: center;
  padding: 1px 9px;
}

.mi-aside-header__logo-button,
.mi-aside-header__logo-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 3px;
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
}

.mi-aside-header__logo-button {
  cursor: pointer;
}

.mi-aside-header__logo-fallback::before {
  display: block;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: var(--mi-color-brand-primary);
  content: "";
}

.mi-aside-header__service-name {
  min-width: 0;
  color: var(--mi-color-text-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-aside-header__section {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.mi-aside-header__nav-item {
  width: 100%;
  border-radius: 0;
}

.mi-aside-header__group-divider-wrap {
  display: flex;
  height: 19px;
  align-items: center;
}

.mi-aside-header__group-divider {
  width: 100%;
  height: 1px;
  background: var(--mi-color-line-brand);
}

.mi-aside-header__spacer {
  flex: 1 1 auto;
}

.mi-aside-header__collapse-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  padding: 4px 0;
  border: 0;
  border-top: 1px solid var(--mi-color-line-brand);
  background: transparent;
  color: var(--mi-color-text-secondary);
  cursor: pointer;
  transition: background-color 150ms ease;
}

.mi-aside-header__collapse-toggle:hover {
  background: var(--mi-color-base-generic);
}
</style>
