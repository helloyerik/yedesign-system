<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { PhCaretRight } from "@phosphor-icons/vue";
import Tooltip from "../Tooltip/Tooltip.vue";

type LabelScheme = "success" | "warning" | "info" | "supplier";

const props = withDefaults(
  defineProps<{
    text: string;
    colorScheme: LabelScheme;
    showCaret?: boolean;
    tooltip?: string;
    className?: string;
  }>(),
  {
    showCaret: false,
    tooltip: "",
    className: "",
  },
);

const emit = defineEmits<{
  click: [];
}>();

const labelRef = ref<HTMLDivElement | null>(null);
const tooltipRef = ref<HTMLDivElement | null>(null);
const isTooltipVisible = ref(false);
const isTooltipExiting = ref(false);
const isHoverCapable = ref(true);
const tooltipLeft = ref<number | null>(null);
const showTimeout = ref<number | null>(null);
const hideTimeout = ref<number | null>(null);

const colors = computed(() => {
  switch (props.colorScheme) {
    case "success":
      return {
        bg: "var(--mi-color-base-semantic-positive-light)",
        text: "var(--mi-color-text-positive-heavy)",
      };
    case "warning":
      return {
        bg: "var(--mi-color-base-semantic-warning-light)",
        text: "var(--mi-color-text-warning-heavy)",
      };
    case "info":
    case "supplier":
      return {
        bg: "var(--mi-color-base-semantic-info-light)",
        text: "var(--mi-color-text-info)",
      };
    default:
      return {
        bg: "var(--mi-color-base-generic)",
        text: "var(--mi-color-text-primary)",
      };
  }
});

const clearShowTimeout = () => {
  if (showTimeout.value) {
    clearTimeout(showTimeout.value);
    showTimeout.value = null;
  }
};

const clearHideTimeout = () => {
  if (hideTimeout.value) {
    clearTimeout(hideTimeout.value);
    hideTimeout.value = null;
  }
};

const updateTooltipPosition = () => {
  if (!labelRef.value || !props.tooltip) return;
  const rect = labelRef.value.getBoundingClientRect();
  const tooltipWidthToken = getComputedStyle(document.documentElement)
    .getPropertyValue("--mi-size-tooltip-min-width")
    .trim();
  const fallbackWidth = Number.parseFloat(tooltipWidthToken) || 280;
  const tooltipWidth = tooltipRef.value?.getBoundingClientRect().width || fallbackWidth;
  const padding = 20;
  const viewportWidth = window.innerWidth;

  const labelCenter = rect.left + rect.width / 2;
  const idealLeft = labelCenter - tooltipWidth / 2;
  const clampedLeft = Math.min(
    Math.max(idealLeft, padding),
    viewportWidth - padding - tooltipWidth,
  );

  tooltipLeft.value = clampedLeft - rect.left;
};

const showTooltip = () => {
  if (!props.tooltip || !isHoverCapable.value) return;
  clearHideTimeout();
  isTooltipExiting.value = false;
  showTimeout.value = window.setTimeout(() => {
    isTooltipVisible.value = true;
  }, 80);
};

const hideTooltip = () => {
  if (!props.tooltip || !isHoverCapable.value) return;
  clearShowTimeout();
  isTooltipExiting.value = true;
  hideTimeout.value = window.setTimeout(() => {
    isTooltipVisible.value = false;
    isTooltipExiting.value = false;
  }, 160);
};

const handleClick = () => {
  if (!isHoverCapable.value && props.tooltip) {
    isTooltipExiting.value = false;
    isTooltipVisible.value = !isTooltipVisible.value;
  }
  emit("click");
};

const handleScroll = () => {
  if (!isTooltipVisible.value) return;
  isTooltipVisible.value = false;
  isTooltipExiting.value = false;
};

onMounted(() => {
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  const update = () => {
    isHoverCapable.value = media.matches;
  };
  update();
  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", update);
  } else {
    media.addListener(update);
  }
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  clearShowTimeout();
  clearHideTimeout();
  window.removeEventListener("scroll", handleScroll);
});

watch(isTooltipVisible, (visible) => {
  if (!visible) return;
  updateTooltipPosition();
});

watch(tooltipRef, () => {
  if (isTooltipVisible.value) {
    updateTooltipPosition();
  }
});
</script>

<template>
  <div
    class="mi-product-label"
    ref="labelRef"
    :class="[className, { 'mi-product-label--caret': showCaret }]"
    :style="{
      '--mi-product-label-bg': colors.bg,
      '--mi-product-label-text': colors.text,
    }"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @click="handleClick"
  >
    <span class="mi-product-label__text">{{ text }}</span>
    <PhCaretRight
      v-if="showCaret"
      class="mi-product-label__caret"
      :size="'var(--mi-size-icon-12)'"
    />
    <div
      v-if="tooltip && isTooltipVisible"
      ref="tooltipRef"
      class="mi-product-label__tooltip"
      :class="{ 'is-exiting': isTooltipExiting }"
      :style="{
        left: tooltipLeft !== null ? `${tooltipLeft}px` : '50%',
        transform: tooltipLeft !== null ? 'translateX(0)' : 'translateX(-50%)',
      }"
    >
      <Tooltip position="bottom" width-variant="fixed">
        <div class="mi-product-label__tooltip-text">{{ tooltip }}</div>
      </Tooltip>
    </div>
  </div>
</template>

<style scoped>
.mi-product-label {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-4);
  padding: var(--mi-size-hairline) var(--mi-spacing-8);
  border-radius: var(--mi-radius-xs);
  background: var(--mi-product-label-bg);
  color: var(--mi-product-label-text);
  cursor: pointer;
  user-select: none;
  position: relative;
}

.mi-product-label--caret {
  height: var(--mi-spacing-xl);
  padding-left: var(--mi-spacing-8);
  padding-right: var(--mi-spacing-4);
  gap: var(--mi-spacing-2);
}

.mi-product-label__text {
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  color: inherit;
}

.mi-product-label__caret {
  color: inherit;
}

.mi-product-label__tooltip {
  position: absolute;
  top: calc(100% + var(--mi-spacing-4));
  z-index: 50;
  animation: labelTooltipIn 80ms ease-out;
}

.mi-product-label__tooltip.is-exiting {
  animation: labelTooltipOut 160ms ease-out;
}

.mi-product-label__tooltip-text {
  min-width: var(--mi-size-tooltip-min-width);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

@keyframes labelTooltipIn {
  from {
    opacity: 0;
    transform: translateY(var(--mi-spacing-2));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes labelTooltipOut {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(var(--mi-spacing-2));
  }
}
</style>
