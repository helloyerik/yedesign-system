<script setup lang="ts">
import { computed } from "vue";
import { brandLogoPaths } from "./paths";

const props = withDefaults(
  defineProps<{
    ariaLabel?: string;
    width?: number | string;
    height?: number | string;
    mobile?: boolean;
    clickable?: boolean;
  }>(),
  {
    ariaLabel: "MI",
    width: undefined,
    height: undefined,
    mobile: false,
    clickable: false,
  },
);

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const normalizeDimension = (value?: number | string) => {
  if (value == null || value === "") {
    return undefined;
  }

  return typeof value === "number" ? `${value}px` : value;
};

const logoStyle = computed(() => ({
  width:
    normalizeDimension(props.width) ??
    (props.mobile ? "var(--mi-size-brand-logo-mobile-width)" : "var(--mi-size-brand-logo-width)"),
  height:
    normalizeDimension(props.height) ??
    (props.mobile
      ? "var(--mi-size-brand-logo-mobile-height)"
      : "var(--mi-size-brand-logo-height)"),
}));

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};
</script>

<template>
  <component
    :is="clickable ? 'button' : 'div'"
    class="mi-brand-logo"
    :class="{ 'is-clickable': clickable }"
    :style="logoStyle"
    :type="clickable ? 'button' : undefined"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <svg class="mi-brand-logo__svg" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 226.667 36">
      <path :d="brandLogoPaths.p3ddd1f00" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.p244a6d80" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.p1ecd6880" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.p37763000" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.p220c1980" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.p321ac600" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.p2fbc5200" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.pdf88c80" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.p23c94a80" fill="var(--mi-color-base-brand)" />
      <path :d="brandLogoPaths.pe4cd100" fill="var(--mi-color-base-brand)" />
    </svg>
  </component>
</template>

<style scoped>
.mi-brand-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  padding: 0;
  border: 0;
  background: transparent;
}

.mi-brand-logo.is-clickable {
  cursor: pointer;
}

.mi-brand-logo:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
  border-radius: var(--mi-radius-s);
}

.mi-brand-logo__svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
