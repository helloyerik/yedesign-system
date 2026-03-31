<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, useSlots, watch } from "vue";
import { PhCaretRight } from "@phosphor-icons/vue";

type ProductLabelColorScheme = "success" | "warning" | "info" | "supplier";

const props = withDefaults(
  defineProps<{
    text: string;
    colorScheme: ProductLabelColorScheme;
    showCaret?: boolean;
    tooltipContainer?: HTMLElement | null;
  }>(),
  {
    showCaret: false,
    tooltipContainer: null,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const slots = useSlots();
const labelRef = ref<HTMLDivElement | null>(null);
const tooltipRef = ref<HTMLDivElement | null>(null);
const isHoverCapable = ref(true);
const isTooltipVisible = ref(false);
const tooltipLeft = ref<number | null>(null);
const tooltipTop = ref<number | null>(null);

let hideTimeout: ReturnType<typeof setTimeout> | null = null;
let showTimeout: ReturnType<typeof setTimeout> | null = null;

const hasTooltip = computed(() => Boolean(slots.tooltip));

const schemeClassName = computed(() => `mi-product-label--${props.colorScheme}`);
const caretColor = computed(() => {
  switch (props.colorScheme) {
    case "success":
      return "var(--mi-color-text-positive)";
    case "warning":
      return "var(--mi-color-text-warning-heavy)";
    case "info":
    case "supplier":
      return "var(--mi-color-text-info)";
    default:
      return "var(--mi-color-text-secondary)";
  }
});

const showTooltip = () => {
  if (!hasTooltip.value || !isHoverCapable.value) return;
  if (hideTimeout) {
    clearTimeout(hideTimeout);
    hideTimeout = null;
  }
  showTimeout = setTimeout(() => {
    isTooltipVisible.value = true;
  }, 80);
};

const hideTooltip = () => {
  if (!hasTooltip.value || !isHoverCapable.value) return;
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }
  hideTimeout = setTimeout(() => {
    isTooltipVisible.value = false;
  }, 160);
};

const handleClick = (event: MouseEvent) => {
  if (!isHoverCapable.value && hasTooltip.value) {
    isTooltipVisible.value = !isTooltipVisible.value;
  }
  emit("click", event);
};

const updateTooltipPosition = () => {
  if (!labelRef.value || !tooltipRef.value || !isTooltipVisible.value) return;

  const rect = labelRef.value.getBoundingClientRect();
  const tooltipRect = tooltipRef.value.getBoundingClientRect();
  const padding = 20;

  let leftBoundary = padding;
  let rightBoundary = window.innerWidth - padding;

  if (props.tooltipContainer) {
    const containerRect = props.tooltipContainer.getBoundingClientRect();
    leftBoundary = containerRect.left + padding;
    rightBoundary = containerRect.right - padding;
  }

  const labelCenter = rect.left + rect.width / 2;
  const idealLeft = labelCenter - tooltipRect.width / 2;
  const clampedLeft = Math.min(
    Math.max(idealLeft, leftBoundary),
    rightBoundary - tooltipRect.width,
  );

  tooltipLeft.value = clampedLeft;
  tooltipTop.value = rect.bottom + 4;
};

watch(isTooltipVisible, async (visible) => {
  if (!visible) return;
  await nextTick();
  updateTooltipPosition();
});

onMounted(() => {
  const media = window.matchMedia("(hover: hover) and (pointer: fine)");
  const updateHoverMode = () => {
    isHoverCapable.value = media.matches;
  };
  updateHoverMode();

  if (typeof media.addEventListener === "function") {
    media.addEventListener("change", updateHoverMode);
  } else {
    media.addListener(updateHoverMode);
  }

  const handleScroll = () => {
    isTooltipVisible.value = false;
  };
  window.addEventListener("scroll", handleScroll, { passive: true });

  onBeforeUnmount(() => {
    if (typeof media.removeEventListener === "function") {
      media.removeEventListener("change", updateHoverMode);
    } else {
      media.removeListener(updateHoverMode);
    }
    window.removeEventListener("scroll", handleScroll);
    if (hideTimeout) clearTimeout(hideTimeout);
    if (showTimeout) clearTimeout(showTimeout);
  });
});
</script>

<template>
  <div
    ref="labelRef"
    class="mi-product-label"
    :class="[schemeClassName, { 'mi-product-label--with-caret': showCaret }]"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @click="handleClick"
  >
    <p class="mi-product-label__text">{{ text }}</p>
    <PhCaretRight
      v-if="showCaret"
      :size="12"
      :color="caretColor"
      class="mi-product-label__caret"
    />
  </div>

  <Teleport v-if="isTooltipVisible && hasTooltip && tooltipLeft != null && tooltipTop != null" to="body">
    <div
      ref="tooltipRef"
      class="mi-product-label__tooltip"
      :style="{
        left: `${tooltipLeft}px`,
        top: `${tooltipTop}px`,
      }"
    >
      <slot name="tooltip" :trigger-ref="labelRef" />
    </div>
  </Teleport>
</template>

<style scoped>
.mi-product-label {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex-shrink: 0;
  border-radius: var(--mi-radius-xs);
  cursor: pointer;
  user-select: none;
}

.mi-product-label--with-caret {
  height: var(--mi-spacing-20);
  padding-left: var(--mi-spacing-8);
  padding-right: 4px;
}

.mi-product-label:not(.mi-product-label--with-caret) {
  gap: 4px;
  padding: 1px var(--mi-spacing-8);
}

.mi-product-label__text {
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-product-label--success {
  background: var(--mi-color-base-semantic-positive-light, rgb(41 154 98 / 15%));
  color: var(--mi-color-text-positive);
}

.mi-product-label--info,
.mi-product-label--supplier {
  background: var(--mi-color-base-semantic-info-light);
  color: var(--mi-color-text-info);
}

.mi-product-label--warning {
  background: var(--mi-color-base-semantic-warning-light);
  color: var(--mi-color-text-warning-heavy);
}

.mi-product-label__tooltip {
  position: fixed;
  z-index: 50;
  animation: mi-product-label-fade-in 160ms ease-out;
}

@keyframes mi-product-label-fade-in {
  from {
    opacity: 0;
    transform: translateY(-2px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
