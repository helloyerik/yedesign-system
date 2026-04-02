<script setup lang="ts">
import { ref } from "vue";
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
    middleGroups?: NavGroup[];
    bottomItems?: NavItem[];
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
  "logo-click": [];
}>();

const collapsed = ref(props.defaultCollapsed);
</script>

<template>
  <aside
    class="mi-aside-header"
    :class="{ 'is-collapsed': collapsed }"
  >
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
      <span v-if="!collapsed" class="mi-aside-header__service">
        {{ serviceName }}
      </span>
    </div>

    <div v-if="topItems.length" class="mi-aside-header__section">
      <NavigationItem
        v-for="item in topItems"
        :key="item.id"
        :icon="item.icon"
        :label="item.label"
        :selected="item.id === selectedId"
        :collapsed="collapsed"
        class-name="mi-aside-header__nav-item"
        @click="emit('select', item.id)"
      />
    </div>

    <div v-for="(group, index) in middleGroups" :key="index" class="mi-aside-header__section">
      <div class="mi-aside-header__divider" />
      <NavigationItem
        v-for="item in group.items"
        :key="item.id"
        :icon="item.icon"
        :label="item.label"
        :selected="item.id === selectedId"
        :collapsed="collapsed"
        class-name="mi-aside-header__nav-item"
        @click="emit('select', item.id)"
      />
    </div>

    <div class="mi-aside-header__spacer" />

    <div v-if="bottomItems.length" class="mi-aside-header__section">
      <NavigationItem
        v-for="item in bottomItems"
        :key="item.id"
        :icon="item.icon"
        :label="item.label"
        :selected="item.id === selectedId"
        :collapsed="collapsed"
        class-name="mi-aside-header__nav-item"
        @click="emit('select', item.id)"
      >
        <template #right>
          <component v-if="item.rightContent" :is="item.rightContent" />
        </template>
      </NavigationItem>
    </div>

    <button
      v-if="collapsible"
      type="button"
      class="mi-aside-header__toggle"
      @click="collapsed = !collapsed"
    >
      <PhCaretRight v-if="collapsed" :size="'var(--mi-spacing-12)'" weight="fill" />
      <PhCaretLeft v-else :size="'var(--mi-spacing-12)'" weight="fill" />
    </button>
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
}

.mi-aside-header.is-collapsed {
  width: var(--mi-aside-width-collapsed);
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
