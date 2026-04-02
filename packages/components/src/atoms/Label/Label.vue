<script setup lang="ts">
import { computed, ref } from "vue";
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

const isTooltipVisible = ref(false);

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

const showTooltip = () => {
  if (!props.tooltip) return;
  isTooltipVisible.value = true;
};

const hideTooltip = () => {
  isTooltipVisible.value = false;
};
</script>

<template>
  <div
    class="mi-product-label"
    :class="className"
    :style="{
      '--mi-product-label-bg': colors.bg,
      '--mi-product-label-text': colors.text,
    }"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @click="emit('click')"
  >
    <span class="mi-product-label__text">{{ text }}</span>
    <PhCaretRight
      v-if="showCaret"
      class="mi-product-label__caret"
      :size="'var(--mi-spacing-12)'"
    />
    <div v-if="tooltip && isTooltipVisible" class="mi-product-label__tooltip">
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
  padding: var(--mi-spacing-2) var(--mi-spacing-8);
  border-radius: var(--mi-radius-xs);
  background: var(--mi-product-label-bg);
  color: var(--mi-product-label-text);
  cursor: pointer;
  user-select: none;
  position: relative;
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
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
}

.mi-product-label__tooltip-text {
  min-width: var(--mi-size-tooltip-min-width);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}
</style>
