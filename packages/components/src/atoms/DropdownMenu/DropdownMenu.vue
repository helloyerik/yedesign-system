<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from "vue";
import { PhDotsThreeVertical } from "@phosphor-icons/vue";

export interface DropdownMenuItem {
  id: string;
  label: string;
  description?: string;
  icon?: unknown;
  reserveIconSpace?: boolean;
  labelClassName?: string;
  onClick?: () => void;
  theme?: "normal" | "danger";
  disabled?: boolean;
  href?: string;
}

export type DropdownMenuItems = (DropdownMenuItem | DropdownMenuItem[])[];
type DropdownMenuPlacement = "bottom-start" | "bottom-end";
type DropdownMenuVariant = "default" | "compact-list";

const props = withDefaults(
  defineProps<{
    items: DropdownMenuItems;
    disabled?: boolean;
    placement?: DropdownMenuPlacement;
    className?: string;
    menuClassName?: string;
    variant?: DropdownMenuVariant;
  }>(),
  {
    disabled: false,
    placement: "bottom-end",
    className: "",
    menuClassName: "",
    variant: "default",
  },
);

const slots = useSlots();
const isOpen = ref(false);
const triggerRef = ref<HTMLButtonElement | null>(null);
const menuRef = ref<HTMLDivElement | null>(null);
const menuPosition = ref({ top: 0, left: 0, maxHeight: 0 });
const verticalPlacement = ref<"top" | "bottom">("bottom");

const isCompactList = computed(() => props.variant === "compact-list");

const groups = computed(() => {
  const result: DropdownMenuItem[][] = [];
  let current: DropdownMenuItem[] = [];

  props.items.forEach((item) => {
    if (Array.isArray(item)) {
      if (current.length) result.push(current);
      result.push(item);
      current = [];
      return;
    }
    current.push(item);
  });

  if (current.length) result.push(current);
  return result;
});

const menuBaseClass = computed(() =>
  isCompactList.value ? "mi-dropdown-menu--compact" : "mi-dropdown-menu--default",
);

const getCssPxVar = (name: string, fallback: number) => {
  if (typeof window === "undefined") return fallback;
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const value = Number.parseFloat(raw);
  return Number.isNaN(value) ? fallback : value;
};

const updatePosition = async () => {
  if (!triggerRef.value || !menuRef.value) return;

  await nextTick();

  const margin = getCssPxVar("--mi-spacing-4", 4);
  const offset = getCssPxVar("--mi-spacing-4", 4);
  const minHeight = getCssPxVar("--mi-spacing-24", 24) * 5;
  const rect = triggerRef.value.getBoundingClientRect();
  const menuRect = menuRef.value.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  const spaceBelow = viewportHeight - rect.bottom - margin;
  const spaceAbove = rect.top - margin;
  const shouldOpenTop = spaceBelow < menuRect.height && spaceAbove > spaceBelow;

  const top = shouldOpenTop
    ? Math.max(margin, rect.top - menuRect.height - offset)
    : rect.bottom + offset;

  const rawLeft = props.placement === "bottom-start" ? rect.left : rect.right - menuRect.width;
  const left = Math.min(
    Math.max(margin, rawLeft),
    Math.max(margin, viewportWidth - menuRect.width - margin),
  );

  verticalPlacement.value = shouldOpenTop ? "top" : "bottom";
  menuPosition.value = {
    top,
    left,
    maxHeight: Math.max(minHeight, shouldOpenTop ? spaceAbove - offset : spaceBelow - offset),
  };
};

const openMenu = async () => {
  if (props.disabled) return;
  isOpen.value = true;
  await updatePosition();
};

const closeMenu = () => {
  isOpen.value = false;
};

const toggleMenu = () => {
  if (props.disabled) return;
  if (isOpen.value) {
    closeMenu();
    return;
  }
  openMenu();
};

const handleOutsideClick = (event: MouseEvent) => {
  const target = event.target as Node | null;
  if (!target) return;
  if (menuRef.value?.contains(target) || triggerRef.value?.contains(target)) return;
  closeMenu();
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape") closeMenu();
};

const handleScroll = () => {
  closeMenu();
};

const bindListeners = () => {
  document.addEventListener("mousedown", handleOutsideClick);
  document.addEventListener("keydown", handleKeyDown);
  window.addEventListener("scroll", handleScroll, true);
  window.addEventListener("resize", updatePosition);
};

const unbindListeners = () => {
  document.removeEventListener("mousedown", handleOutsideClick);
  document.removeEventListener("keydown", handleKeyDown);
  window.removeEventListener("scroll", handleScroll, true);
  window.removeEventListener("resize", updatePosition);
};

watch(isOpen, (open) => {
  if (open) {
    bindListeners();
    updatePosition();
    return;
  }
  unbindListeners();
});

onMounted(() => {
  if (isOpen.value) bindListeners();
});

onBeforeUnmount(() => {
  unbindListeners();
});
</script>

<template>
  <span class="mi-dropdown" :class="className">
    <slot
      v-if="slots.trigger"
      name="trigger"
      :toggle="toggleMenu"
      :open="isOpen"
      :trigger-ref="triggerRef"
    />
    <button
      v-else
      ref="triggerRef"
      type="button"
      class="mi-dropdown__trigger"
      :disabled="disabled"
      @click="toggleMenu"
    >
      <PhDotsThreeVertical :size="'var(--mi-size-icon-16)'" weight="bold" />
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        ref="menuRef"
        class="mi-dropdown__menu"
        :class="[menuBaseClass, menuClassName]"
        :style="{
          top: `${menuPosition.top}px`,
          left: `${menuPosition.left}px`,
          maxHeight: menuPosition.maxHeight > 0 ? `${menuPosition.maxHeight}px` : undefined,
          transformOrigin: verticalPlacement === 'top' ? 'bottom' : 'top',
        }"
      >
        <div v-for="(group, groupIndex) in groups" :key="groupIndex">
          <div
            v-if="groupIndex > 0"
            class="mi-dropdown__divider"
            :class="{ 'mi-dropdown__divider--compact': isCompactList }"
          />
          <component
            :is="item.href ? 'a' : 'button'"
            v-for="item in group"
            :key="item.id"
            :href="item.href"
            :type="item.href ? undefined : 'button'"
            class="mi-dropdown__item"
            :class="[
              isCompactList ? 'mi-dropdown__item--compact' : 'mi-dropdown__item--default',
              item.disabled ? 'is-disabled' : '',
              item.theme === 'danger' ? 'is-danger' : '',
            ]"
            :disabled="item.disabled"
            @click="
              () => {
                if (item.disabled) return;
                item.onClick?.();
                closeMenu();
              }
            "
          >
            <span
              v-if="item.icon || item.reserveIconSpace"
              class="mi-dropdown__icon"
            >
              <slot name="icon" :item="item">
                <component v-if="item.icon" :is="item.icon" />
              </slot>
            </span>
            <span v-if="item.description" class="mi-dropdown__item-content">
              <span class="mi-dropdown__label" :class="item.labelClassName">
                {{ item.label }}
              </span>
              <span class="mi-dropdown__description">{{ item.description }}</span>
            </span>
            <span v-else class="mi-dropdown__label" :class="item.labelClassName">
              {{ item.label }}
            </span>
          </component>
        </div>
      </div>
    </Teleport>
  </span>
</template>

<style scoped>
.mi-dropdown {
  display: inline-flex;
}

.mi-dropdown__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--mi-size-dropdown-trigger);
  height: var(--mi-size-dropdown-trigger);
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  color: var(--mi-color-text-secondary);
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;
}

.mi-dropdown__trigger:hover:not(:disabled) {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-primary);
}

.mi-dropdown__trigger:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-dropdown__menu {
  position: fixed;
  z-index: 10020;
  overflow-y: auto;
  animation: dropdownFadeIn var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing);
}

.mi-dropdown-menu--default {
  min-width: var(--mi-size-dropdown-min-width);
  padding: var(--mi-spacing-2) 0;
  border-radius: var(--mi-radius-m);
  border: 1px solid var(--mi-color-line-generic);
  background: var(--mi-color-surface-panel);
  box-shadow: var(--mi-shadow-dropdown);
}

.mi-dropdown-menu--compact {
  min-width: calc(var(--mi-spacing-8xl) + var(--mi-spacing-8xl));
  padding: var(--mi-spacing-4);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-surface-panel);
  box-shadow: var(--mi-shadow-tooltip);
}

.mi-dropdown__divider {
  height: 1px;
  margin: var(--mi-spacing-2) var(--mi-spacing-8);
  background: var(--mi-color-line-generic);
}

.mi-dropdown__divider--compact {
  margin: var(--mi-spacing-4);
}

.mi-dropdown__item {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  width: 100%;
  border: 0;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease;
}

.mi-dropdown__item--default {
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
}

.mi-dropdown__item--compact {
  padding: var(--mi-spacing-8);
  border-radius: var(--mi-radius-xs);
}

.mi-dropdown__item:hover:not(.is-disabled) {
  background: var(--mi-color-base-generic);
}

.mi-dropdown__item.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.mi-dropdown__item.is-danger {
  color: var(--mi-color-text-danger);
}

.mi-dropdown__icon {
  width: var(--mi-size-button-icon-glyph);
  height: var(--mi-size-button-icon-glyph);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.mi-dropdown__icon :deep(svg) {
  width: var(--mi-size-button-icon-glyph);
  height: var(--mi-size-button-icon-glyph);
}

.mi-dropdown__item-content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--mi-spacing-2);
  min-width: 0;
}

.mi-dropdown__label {
  color: inherit;
}

.mi-dropdown__description {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
