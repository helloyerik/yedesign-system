<script setup lang="ts">
import { PhHouse, PhListMagnifyingGlass, PhShoppingCart, PhHeart, PhUser } from "@phosphor-icons/vue";

type MobileTabKey = "home" | "catalog" | "cart" | "favorites" | "profile";

interface TabItem {
  key: MobileTabKey;
  label: string;
  icon: unknown;
}

const props = withDefaults(
  defineProps<{
    activeTab?: MobileTabKey;
    cartCount?: number;
    showLabels?: boolean;
    tabs?: TabItem[];
    className?: string;
  }>(),
  {
    activeTab: "home",
    cartCount: 0,
    showLabels: false,
    tabs: () => [
      { key: "home", label: "Главная", icon: PhHouse },
      { key: "catalog", label: "Каталог", icon: PhListMagnifyingGlass },
      { key: "cart", label: "Корзина", icon: PhShoppingCart },
      { key: "favorites", label: "Избранное", icon: PhHeart },
      { key: "profile", label: "Профиль", icon: PhUser },
    ],
    className: "",
  },
);

const emit = defineEmits<{
  select: [key: MobileTabKey];
}>();
</script>

<template>
  <div class="mi-mobile-tabbar" :class="className">
    <div class="mi-mobile-tabbar__grid">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        type="button"
        class="mi-mobile-tabbar__item"
        :class="{ 'is-active': tab.key === activeTab }"
        :aria-label="tab.label"
        @click="emit('select', tab.key)"
      >
        <span class="mi-mobile-tabbar__icon-slot">
          <component :is="tab.icon" :size="24" :color="tab.key === activeTab ? 'var(--mi-color-brand-text-brand)' : 'var(--mi-color-text-secondary)'" />
          <span
            v-if="tab.key === 'cart' && cartCount > 0"
            class="mi-mobile-tabbar__badge"
          >
            {{ cartCount }}
          </span>
        </span>
        <span v-if="showLabels" class="mi-mobile-tabbar__label">
          {{ tab.label }}
        </span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.mi-mobile-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: var(--mi-color-surface-panel);
  border-top: 1px solid var(--mi-color-line-generic);
}

.mi-mobile-tabbar__grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.mi-mobile-tabbar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--mi-spacing-2);
  height: var(--mi-spacing-7xl);
  background: transparent;
  border: 0;
  cursor: pointer;
}

.mi-mobile-tabbar__icon-slot {
  position: relative;
  width: var(--mi-spacing-6xl);
  height: var(--mi-spacing-6xl);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mi-mobile-tabbar__badge {
  position: absolute;
  top: calc(-1 * var(--mi-spacing-2));
  right: calc(-1 * var(--mi-spacing-4));
  border-radius: var(--mi-radius-pill);
  background: var(--mi-color-text-danger);
  color: var(--mi-color-brand-text-brand-contrast);
  padding: 0 var(--mi-spacing-4);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-mobile-tabbar__label {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-mobile-tabbar__item.is-active .mi-mobile-tabbar__label {
  color: var(--mi-color-brand-text-brand);
}
</style>
