<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  useSlots,
  watch,
  type ComponentPublicInstance,
} from "vue";
import { Teleport } from "vue";
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

export type DropdownMenuItems = Array<DropdownMenuItem | DropdownMenuItem[]>;
type Placement = "bottom-start" | "bottom-end";
type Variant = "default" | "compact-list";

const props = withDefaults(
  defineProps<{
    items: DropdownMenuItems;
    disabled?: boolean;
    placement?: Placement;
    className?: string;
    menuClassName?: string;
    variant?: Variant;
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
const open = ref(false);
const triggerRef = ref<HTMLElement | null>(null);
const menuRef = ref<HTMLDivElement | null>(null);
const pos = ref({ top: 0, left: 0, maxHeight: 0 });
const verticalPlacement = ref<"top" | "bottom">("bottom");

const groups = computed(() => {
  const result: DropdownMenuItem[][] = [];
  let currentGroup: DropdownMenuItem[] = [];

  for (const item of props.items) {
    if (Array.isArray(item)) {
      if (currentGroup.length) result.push(currentGroup);
      result.push(item);
      currentGroup = [];
      continue;
    }

    currentGroup.push(item);
  }

  if (currentGroup.length) result.push(currentGroup);
  return result;
});

const isCompactList = computed(() => props.variant === "compact-list");
const menuBaseClassName = computed(() =>
  isCompactList.value
    ? "mi-dropdown-menu__menu mi-dropdown-menu__menu--compact"
    : "mi-dropdown-menu__menu",
);

const toggle = () => {
  if (!props.disabled) {
    open.value = !open.value;
  }
};

const close = () => {
  open.value = false;
};

const setTriggerRef = (element: Element | ComponentPublicInstance | null) => {
  triggerRef.value = element instanceof HTMLElement ? element : null;
};

const updatePosition = () => {
  if (!open.value || !triggerRef.value || !menuRef.value) return;

  const margin = 8;
  const offset = 4;
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
  pos.value = {
    top,
    left,
    maxHeight: Math.max(120, shouldOpenTop ? spaceAbove - offset : spaceBelow - offset),
  };
};

watch(open, async (isOpen) => {
  if (!isOpen) return;
  await nextTick();
  updatePosition();
});

const handleDocumentClick = (event: MouseEvent) => {
  const target = event.target as Node;
  if (menuRef.value?.contains(target) || triggerRef.value?.contains(target)) return;
  close();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") close();
};

const handleScroll = () => close();
const handleResize = () => {
  if (open.value) updatePosition();
};

onMounted(() => {
  document.addEventListener("mousedown", handleDocumentClick);
  document.addEventListener("keydown", handleKeydown);
  window.addEventListener("scroll", handleScroll, true);
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleDocumentClick);
  document.removeEventListener("keydown", handleKeydown);
  window.removeEventListener("scroll", handleScroll, true);
  window.removeEventListener("resize", handleResize);
});

const onItemClick = (item: DropdownMenuItem) => {
  if (item.disabled) return;
  item.onClick?.();
  close();
};

const hasCustomSwitcher = computed(() => Boolean(slots.switcher));
const switcherSlotProps = computed(() => ({
  onClick: toggle,
  open: open.value,
  triggerRef: setTriggerRef,
}));
</script>

<template>
  <span class="mi-dropdown-menu" :class="className">
    <slot
      v-if="hasCustomSwitcher"
      name="switcher"
      v-bind="switcherSlotProps"
    />

    <button
      v-else
      :ref="setTriggerRef"
      type="button"
      :disabled="disabled"
      class="mi-dropdown-menu__trigger"
      :class="{ 'is-disabled': disabled }"
      @click="toggle"
    >
      <PhDotsThreeVertical :size="16" weight="bold" />
    </button>

    <Teleport to="body">
      <div
        v-if="open"
        ref="menuRef"
        :class="[menuBaseClassName, menuClassName]"
        :style="{
          top: `${pos.top}px`,
          left: `${pos.left}px`,
          maxHeight: pos.maxHeight > 0 ? `${pos.maxHeight}px` : undefined,
          transformOrigin: verticalPlacement === 'top' ? 'bottom' : 'top',
        }"
      >
        <div v-for="(group, groupIndex) in groups" :key="groupIndex">
          <div
            v-if="groupIndex > 0"
            class="mi-dropdown-menu__divider"
            :class="{ 'mi-dropdown-menu__divider--compact': isCompactList }"
          />

          <component
            :is="item.href ? 'a' : 'button'"
            v-for="item in group"
            :key="item.id"
            v-bind="item.href ? { href: item.href } : { type: 'button' }"
            :disabled="!item.href && item.disabled ? true : undefined"
            class="mi-dropdown-menu__item"
            :class="[
              isCompactList ? 'mi-dropdown-menu__item--compact' : 'mi-dropdown-menu__item--default',
              {
                'is-disabled': item.disabled,
                'is-danger': item.theme === 'danger',
                'has-description': Boolean(item.description),
              },
            ]"
            @click="onItemClick(item)"
          >
            <span
              v-if="item.icon || item.reserveIconSpace"
              class="mi-dropdown-menu__icon-slot"
            >
              <component :is="item.icon" v-if="item.icon" />
            </span>

            <div v-if="item.description" class="mi-dropdown-menu__text-group">
              <span class="mi-dropdown-menu__label" :class="item.labelClassName">{{ item.label }}</span>
              <span class="mi-dropdown-menu__description">{{ item.description }}</span>
            </div>

            <span
              v-else
              class="mi-dropdown-menu__label"
              :class="item.labelClassName"
            >
              {{ item.label }}
            </span>
          </component>
        </div>
      </div>
    </Teleport>
  </span>
</template>

<style scoped>
.mi-dropdown-menu {
  display: inline-flex;
}

.mi-dropdown-menu__trigger {
  display: flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  color: var(--mi-color-text-secondary);
  cursor: pointer;
  transition: background-color 160ms ease, color 160ms ease, opacity 160ms ease;
}

.mi-dropdown-menu__trigger:hover:not(:disabled) {
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-primary);
}

.mi-dropdown-menu__trigger.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-dropdown-menu__menu {
  position: fixed;
  z-index: 10020;
  min-width: 160px;
  overflow-y: auto;
  border: 1px solid var(--mi-color-line-brand);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-background);
  padding-block: 2px;
  box-shadow: var(--mi-shadow-tooltip);
  animation: mi-dropdown-fade-in 80ms ease-in-out;
}

.mi-dropdown-menu__menu--compact {
  min-width: 192px;
  overflow: hidden;
  border: 0;
  padding: 4px;
  box-shadow: var(--mi-shadow-tooltip);
}

.mi-dropdown-menu__divider {
  height: 1px;
  margin: 2px var(--mi-spacing-8);
  background: var(--mi-color-line-brand);
}

.mi-dropdown-menu__divider--compact {
  margin: 4px;
}

.mi-dropdown-menu__item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--mi-spacing-8);
  border: 0;
  background: transparent;
  color: var(--mi-color-text-primary);
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 160ms ease, opacity 160ms ease;
}

.mi-dropdown-menu__item:hover:not(.is-disabled) {
  background: var(--mi-color-base-generic);
}

.mi-dropdown-menu__item.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-dropdown-menu__item--default {
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
}

.mi-dropdown-menu__item--default.has-description {
  border-radius: var(--mi-radius-s);
  padding: 9px var(--mi-spacing-8);
}

.mi-dropdown-menu__item--compact {
  border-radius: var(--mi-radius-xs);
  padding: 9px var(--mi-spacing-8);
}

.mi-dropdown-menu__item.is-danger,
.mi-dropdown-menu__item.is-danger .mi-dropdown-menu__label {
  color: var(--mi-color-text-danger);
}

.mi-dropdown-menu__icon-slot {
  display: flex;
  width: 14px;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.mi-dropdown-menu__icon-slot :deep(svg) {
  width: 14px;
  height: 14px;
}

.mi-dropdown-menu__text-group {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 2px;
}

.mi-dropdown-menu__label {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-dropdown-menu__description {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  font-weight: var(--mi-font-weight-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

@keyframes mi-dropdown-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
