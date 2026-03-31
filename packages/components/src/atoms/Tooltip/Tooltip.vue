<script setup lang="ts">
import { computed, ref, watch, watchEffect } from "vue";

type TooltipPosition = "top" | "bottom" | "left" | "right";
type TooltipWidthVariant = "fixed" | "hug";

const props = withDefaults(
  defineProps<{
    className?: string;
    position?: TooltipPosition;
    autoPosition?: boolean;
    trigger?: HTMLElement | null;
    arrowOffset?: number;
    widthVariant?: TooltipWidthVariant;
    autoArrow?: boolean;
  }>(),
  {
    className: "",
    position: "bottom",
    autoPosition: false,
    trigger: null,
    arrowOffset: 0,
    widthVariant: "fixed",
    autoArrow: true,
  },
);

const tooltipRef = ref<HTMLDivElement | null>(null);
const resolvedPosition = ref<TooltipPosition>(props.position);
const computedArrowOffset = ref(0);

const getRootCssPx = (tokenName: string, fallback: number) => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const tokenValue = window.getComputedStyle(document.documentElement).getPropertyValue(tokenName);
  const parsed = Number.parseFloat(tokenValue);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const getOptimalPosition = (
  triggerRect: DOMRect,
  tooltipRect: { width: number; height: number },
  viewportWidth: number,
  viewportHeight: number,
): TooltipPosition => {
  const spaceTop = triggerRect.top;
  const spaceBottom = viewportHeight - triggerRect.bottom;
  const spaceLeft = triggerRect.left;
  const spaceRight = viewportWidth - triggerRect.right;
  const arrowHeight = getRootCssPx("--mi-size-tooltip-arrow-height", 9);

  const tooltipHeight = tooltipRect.height + arrowHeight;
  const tooltipWidth = tooltipRect.width + arrowHeight;

  if (spaceBottom >= tooltipHeight) return "bottom";
  if (spaceTop >= tooltipHeight) return "top";
  if (spaceRight >= tooltipWidth) return "right";
  if (spaceLeft >= tooltipWidth) return "left";

  return spaceBottom >= spaceTop ? "bottom" : "top";
};

const updatePosition = () => {
  if (!props.autoPosition || !props.trigger || !tooltipRef.value) {
    resolvedPosition.value = props.position;
    return;
  }

  const triggerRect = props.trigger.getBoundingClientRect();
  const tooltipRect = tooltipRef.value.getBoundingClientRect();

  resolvedPosition.value = getOptimalPosition(
    triggerRect,
    {
      width: tooltipRect.width,
      height: tooltipRect.height,
    },
    window.innerWidth,
    window.innerHeight,
  );
};

const updateArrowOffset = () => {
  if (!props.autoArrow || !props.trigger || !tooltipRef.value) {
    computedArrowOffset.value = props.arrowOffset;
    return;
  }

  const triggerRect = props.trigger.getBoundingClientRect();
  const tooltipRect = tooltipRef.value.getBoundingClientRect();

  if (tooltipRect.width === 0 || tooltipRect.height === 0) {
    computedArrowOffset.value = props.arrowOffset;
    return;
  }

  const triggerCenterX = triggerRect.left + triggerRect.width / 2;
  const triggerCenterY = triggerRect.top + triggerRect.height / 2;
  const tooltipCenterX = tooltipRect.left + tooltipRect.width / 2;
  const tooltipCenterY = tooltipRect.top + tooltipRect.height / 2;

  const rawOffset =
    resolvedPosition.value === "left" || resolvedPosition.value === "right"
      ? triggerCenterY - tooltipCenterY
      : triggerCenterX - tooltipCenterX;

  const arrowWidth = getRootCssPx("--mi-size-tooltip-arrow-width", 19);
  const safePadding = getRootCssPx("--mi-spacing-12", 12);

  const maxOffset =
    resolvedPosition.value === "left" || resolvedPosition.value === "right"
      ? Math.max(0, tooltipRect.height / 2 - arrowWidth / 2 - safePadding)
      : Math.max(0, tooltipRect.width / 2 - arrowWidth / 2 - safePadding);

  computedArrowOffset.value = Math.min(Math.max(rawOffset, -maxOffset), maxOffset);
};

const refreshMeasurements = () => {
  updatePosition();
  updateArrowOffset();
};

watch(
  () => props.position,
  (nextPosition) => {
    if (!props.autoPosition) {
      resolvedPosition.value = nextPosition;
    }
    updateArrowOffset();
  },
);

watchEffect((onCleanup) => {
  if (typeof window === "undefined") {
    return;
  }

  refreshMeasurements();

  const shouldObserve = props.autoPosition || props.autoArrow;
  if (!shouldObserve) {
    return;
  }

  const onViewportChange = () => refreshMeasurements();
  const frameId = window.requestAnimationFrame(refreshMeasurements);

  window.addEventListener("resize", onViewportChange);
  window.addEventListener("scroll", onViewportChange, true);

  let resizeObserver: ResizeObserver | null = null;
  if (typeof ResizeObserver !== "undefined") {
    resizeObserver = new ResizeObserver(onViewportChange);

    if (tooltipRef.value) {
      resizeObserver.observe(tooltipRef.value);
    }

    if (props.trigger) {
      resizeObserver.observe(props.trigger);
    }
  }

  onCleanup(() => {
    window.cancelAnimationFrame(frameId);
    window.removeEventListener("resize", onViewportChange);
    window.removeEventListener("scroll", onViewportChange, true);
    resizeObserver?.disconnect();
  });
});

const isHorizontal = computed(
  () => resolvedPosition.value === "left" || resolvedPosition.value === "right",
);
const finalArrowOffset = computed(() => (props.autoArrow ? computedArrowOffset.value : props.arrowOffset));
const arrowTransform = computed(() =>
  isHorizontal.value
    ? `translateY(${finalArrowOffset.value}px)`
    : `translateX(${finalArrowOffset.value}px)`,
);
</script>

<template>
  <div
    ref="tooltipRef"
    class="mi-tooltip"
    :class="[
      className,
      `mi-tooltip--${resolvedPosition}`,
      {
        'mi-tooltip--hug': widthVariant === 'hug',
        'mi-tooltip--fixed': widthVariant === 'fixed',
      },
    ]"
    role="tooltip"
  >
    <div
      v-if="resolvedPosition === 'bottom' || resolvedPosition === 'right'"
      class="mi-tooltip__arrow"
      :class="`mi-tooltip__arrow--${resolvedPosition}`"
      :style="{ transform: arrowTransform }"
      aria-hidden="true"
    >
      <svg viewBox="0 0 19 9" fill="none" preserveAspectRatio="none">
        <path d="M9.5 9C9.5 9 12.6667 0 19 0H0C6.33333 0 9.5 9 9.5 9Z" fill="currentColor" />
      </svg>
    </div>

    <div class="mi-tooltip__surface">
      <div class="mi-tooltip__content">
        <slot />
      </div>
    </div>

    <div
      v-if="resolvedPosition === 'top' || resolvedPosition === 'left'"
      class="mi-tooltip__arrow"
      :class="`mi-tooltip__arrow--${resolvedPosition}`"
      :style="{ transform: arrowTransform }"
      aria-hidden="true"
    >
      <svg viewBox="0 0 19 9" fill="none" preserveAspectRatio="none">
        <path d="M9.5 9C9.5 9 12.6667 0 19 0H0C6.33333 0 9.5 9 9.5 9Z" fill="currentColor" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.mi-tooltip {
  display: inline-flex;
  align-items: center;
  width: fit-content;
  color: var(--mi-color-base-light);
  filter: drop-shadow(var(--mi-shadow-tooltip));
}

.mi-tooltip--top,
.mi-tooltip--bottom {
  flex-direction: column;
}

.mi-tooltip--left,
.mi-tooltip--right {
  flex-direction: row;
}

.mi-tooltip__surface {
  min-width: var(--mi-size-tooltip-min-width);
  border-radius: var(--mi-radius-m);
  overflow: hidden;
  background: var(--mi-color-base-light);
}

.mi-tooltip--hug .mi-tooltip__surface {
  min-width: 0;
  width: fit-content;
}

.mi-tooltip__content {
  padding: var(--mi-spacing-16);
}

.mi-tooltip__arrow {
  position: relative;
  z-index: 1;
  flex: 0 0 var(--mi-size-tooltip-arrow-width);
  width: var(--mi-size-tooltip-arrow-width);
  height: var(--mi-size-tooltip-arrow-height);
  color: var(--mi-color-base-light);
}

.mi-tooltip__arrow--bottom {
  margin-bottom: calc(var(--mi-size-tooltip-arrow-overlap) * -1);
}

.mi-tooltip__arrow--bottom svg {
  transform: rotate(180deg);
}

.mi-tooltip__arrow--top {
  margin-top: calc(var(--mi-size-tooltip-arrow-overlap) * -1);
  transform-origin: center center;
}

.mi-tooltip__arrow--left {
  margin-left: calc(var(--mi-size-tooltip-arrow-overlap) * -1);
}

.mi-tooltip__arrow--left svg {
  transform: rotate(90deg);
}

.mi-tooltip__arrow--right {
  margin-right: calc(var(--mi-size-tooltip-arrow-overlap) * -1);
}

.mi-tooltip__arrow--right svg {
  transform: rotate(-90deg);
}

.mi-tooltip__arrow svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
