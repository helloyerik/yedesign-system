<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Tooltip from "../Tooltip/Tooltip.vue";

type ButtonIconSize = "S" | "M" | "L" | "XL";
type ButtonIconVariant = "ghost" | "secondary";

const props = withDefaults(
  defineProps<{
    size?: ButtonIconSize;
    variant?: ButtonIconVariant;
    disabled?: boolean;
    color?: string;
    tooltip?: string;
  }>(),
  {
    size: "M",
    variant: "ghost",
    disabled: false,
    color: undefined,
    tooltip: "",
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const buttonRef = ref<HTMLButtonElement | null>(null);
const tooltipWrapperRef = ref<HTMLDivElement | null>(null);
const isTooltipVisible = ref(false);
const tooltipWidth = ref(0);
const tooltipPosition = ref<{ left: number; top: number } | null>(null);

const sizeClass = computed(() => `mi-button-icon--${props.size}`);
const variantClass = computed(() => `mi-button-icon--${props.variant}`);
const resolvedColor = computed(() =>
  props.disabled ? "var(--mi-color-text-hint)" : props.color ?? "var(--mi-color-text-secondary)",
);

const updateTooltipPlacement = () => {
  if (!buttonRef.value || !props.tooltip) {
    return;
  }

  const rect = buttonRef.value.getBoundingClientRect();
  const viewportWidth = window.innerWidth;
  const margin = 20;
  const center = rect.left + rect.width / 2;
  const half = tooltipWidth.value ? tooltipWidth.value / 2 : 0;

  tooltipPosition.value = {
    left: Math.min(Math.max(center, margin + half), viewportWidth - margin - half),
    top: rect.bottom + 4,
  };
};

const showTooltip = () => {
  if (!props.tooltip || props.disabled || !buttonRef.value) {
    return;
  }

  isTooltipVisible.value = true;
  updateTooltipPlacement();
};

const hideTooltip = () => {
  isTooltipVisible.value = false;
};

const handleClick = (event: MouseEvent) => {
  if (!props.disabled) {
    emit("click", event);
  }
};

const handleScroll = () => {
  hideTooltip();
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

watch(isTooltipVisible, async (visible) => {
  if (!visible) {
    return;
  }

  await nextTick();

  const width = tooltipWrapperRef.value?.getBoundingClientRect().width ?? 0;
  if (width) {
    tooltipWidth.value = width;
  }

  updateTooltipPlacement();
});
</script>

<template>
  <button
    ref="buttonRef"
    type="button"
    class="mi-button-icon"
    :class="[sizeClass, variantClass, { 'is-disabled': disabled }]"
    :disabled="disabled"
    :style="{ color: resolvedColor }"
    @click="handleClick"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <span class="mi-button-icon__glyph" aria-hidden="true">
      <slot />
    </span>
  </button>

  <Teleport v-if="isTooltipVisible && tooltipPosition" to="body">
    <div
      class="mi-button-icon__tooltip-portal"
      :style="{
        left: `${tooltipPosition.left}px`,
        top: `${tooltipPosition.top}px`,
        transform: 'translateX(-50%)',
      }"
    >
      <div
        ref="tooltipWrapperRef"
        class="mi-button-icon__tooltip-measure"
      >
        <Tooltip position="bottom" width-variant="hug" :trigger="buttonRef">
          <p class="mi-button-icon__tooltip-text">{{ tooltip }}</p>
        </Tooltip>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
@use "../../styles/mixins/press-effect" as *;

.mi-button-icon {
  @include press-effect();

  --mi-button-icon-size: var(--mi-size-button-icon-m);
  --mi-button-icon-padding: var(--mi-spacing-8);
  --mi-button-icon-radius: var(--mi-radius-l);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  width: var(--mi-button-icon-size);
  height: var(--mi-button-icon-size);
  padding: var(--mi-button-icon-padding);
  border: 0;
  border-radius: var(--mi-button-icon-radius);
  background: transparent;
  cursor: pointer;
  transition:
    background-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease,
    filter 160ms ease;
}

.mi-button-icon--S {
  --mi-button-icon-size: var(--mi-size-button-icon-s);
  --mi-button-icon-padding: var(--mi-spacing-4);
  --mi-button-icon-radius: var(--mi-radius-m);
}

.mi-button-icon--M {
  --mi-button-icon-size: var(--mi-size-button-icon-m);
  --mi-button-icon-padding: var(--mi-spacing-8);
  --mi-button-icon-radius: var(--mi-radius-l);
}

.mi-button-icon--L {
  --mi-button-icon-size: var(--mi-size-button-icon-l);
  --mi-button-icon-padding: var(--mi-spacing-12);
  --mi-button-icon-radius: var(--mi-radius-l);
}

.mi-button-icon--XL {
  --mi-button-icon-size: var(--mi-size-button-icon-xl);
  --mi-button-icon-padding: var(--mi-spacing-16);
  --mi-button-icon-radius: var(--mi-radius-xl);
}

.mi-button-icon--ghost:hover:not(:disabled) {
  background: var(--mi-color-base-generic);
}

.mi-button-icon--secondary {
  background: var(--mi-color-base-generic);
}

.mi-button-icon--secondary:hover:not(:disabled) {
  background: var(--mi-color-base-generic-hover);
}

.mi-button-icon:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-button-icon.is-disabled {
  cursor: not-allowed;
  opacity: 0.5;
  filter: grayscale(1);
}

.mi-button-icon__glyph {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--mi-size-button-icon-glyph);
  height: var(--mi-size-button-icon-glyph);
}

.mi-button-icon__glyph :deep(svg) {
  width: var(--mi-size-button-icon-glyph);
  height: var(--mi-size-button-icon-glyph);
}

.mi-button-icon__tooltip-portal {
  position: fixed;
  z-index: 200;
}

.mi-button-icon__tooltip-measure {
  width: fit-content;
}

.mi-button-icon__tooltip-text {
  margin: 0;
  color: var(--mi-color-text-primary);
  white-space: nowrap;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}
</style>
