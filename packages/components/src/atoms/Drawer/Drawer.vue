<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { PhX } from "@phosphor-icons/vue";
import { lockBodyScroll } from "../../utils/bodyScrollLock";

type Placement = "left" | "right" | "top" | "bottom";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    placement?: Placement;
    size?: number | "auto";
    hideVeil?: boolean;
    disableOutsideClick?: boolean;
    disableEscapeKeyDown?: boolean;
    className?: string;
  }>(),
  {
    title: "",
    placement: "right",
    size: 400,
    hideVeil: false,
    disableOutsideClick: false,
    disableEscapeKeyDown: false,
    className: "",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const isMounted = ref(props.modelValue);
const isClosing = ref(false);
let releaseBodyLock: (() => void) | null = null;

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};

watch(
  () => props.modelValue,
  (isOpen) => {
    if (isOpen) {
      isMounted.value = true;
      isClosing.value = false;
      return;
    }

    if (!isMounted.value) return;
    isClosing.value = true;
  },
  { immediate: true },
);

watch(
  isMounted,
  (mounted) => {
    if (typeof document === "undefined") return;

    if (mounted) {
      releaseBodyLock?.();
      releaseBodyLock = lockBodyScroll();
      return;
    }

    releaseBodyLock?.();
    releaseBodyLock = null;
  },
  { immediate: true },
);

const onKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && props.modelValue && !props.disableEscapeKeyDown) {
    close();
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyDown);
  releaseBodyLock?.();
  releaseBodyLock = null;
});

const rootClassName = computed(() => [
  "mi-drawer__panel",
  `mi-drawer__panel--${props.placement}`,
  { "is-closing": isClosing.value },
  props.className,
]);

const containerClassName = computed(() => [
  "mi-drawer",
  `mi-drawer--${props.placement}`,
]);

const panelStyle = computed<Record<string, string> | undefined>(() => {
  if (props.size === "auto") return undefined;

  const style: Record<string, string> = {};

  if (props.placement === "left" || props.placement === "right") {
    style.width = `${props.size}px`;
    return style;
  }

  style.height = `${props.size}px`;
  return style;
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isMounted" :class="containerClassName">
      <button
        v-if="!hideVeil"
        type="button"
        class="mi-drawer__veil"
        :class="{ 'is-closing': isClosing }"
        aria-label="Закрыть drawer"
        @click="disableOutsideClick ? undefined : close()"
      />

      <div
        :class="rootClassName"
        :style="panelStyle"
        @animationend="
          (event) => {
            if (event.target !== event.currentTarget || !isClosing) return;
            isMounted = false;
            isClosing = false;
          }
        "
      >
        <div v-if="title" class="mi-drawer__header">
          <span class="mi-drawer__title">{{ title }}</span>
          <button
            type="button"
            class="mi-drawer__close"
            aria-label="Close"
            @click="close"
          >
            <PhX :size="16" weight="regular" class="mi-drawer__close-icon" />
          </button>
        </div>

        <div class="mi-drawer__content">
          <slot />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mi-drawer {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
}

.mi-drawer--right {
  justify-content: flex-end;
}

.mi-drawer--left {
  justify-content: flex-start;
}

.mi-drawer--top {
  align-items: flex-start;
}

.mi-drawer--bottom {
  align-items: flex-end;
}

.mi-drawer__veil {
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  background: rgb(0 0 0 / 25%);
  opacity: 1;
  transition: opacity 250ms ease;
}

.mi-drawer__veil.is-closing {
  opacity: 0;
}

.mi-drawer__panel {
  position: relative;
  display: flex;
  max-width: 100%;
  max-height: 100%;
  flex-direction: column;
  background: var(--mi-color-base-background);
  box-shadow: var(--mi-shadow-modal);
}

.mi-drawer__panel--right {
  height: 100%;
  animation: mi-drawer-in-right 250ms ease-out both;
}

.mi-drawer__panel--right.is-closing {
  animation: mi-drawer-out-right 250ms ease-in both;
}

.mi-drawer__panel--left {
  height: 100%;
  animation: mi-drawer-in-left 250ms ease-out both;
}

.mi-drawer__panel--left.is-closing {
  animation: mi-drawer-out-left 250ms ease-in both;
}

.mi-drawer__panel--top {
  width: 100%;
  animation: mi-drawer-in-top 250ms ease-out both;
}

.mi-drawer__panel--top.is-closing {
  animation: mi-drawer-out-top 250ms ease-in both;
}

.mi-drawer__panel--bottom {
  width: 100%;
  animation: mi-drawer-in-bottom 250ms ease-out both;
}

.mi-drawer__panel--bottom.is-closing {
  animation: mi-drawer-out-bottom 250ms ease-in both;
}

.mi-drawer__header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--mi-color-line-brand);
  padding: var(--mi-spacing-xl) var(--mi-spacing-16);
}

.mi-drawer__title {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-header-1);
  font-size: var(--mi-font-size-header-1);
  font-weight: var(--mi-font-weight-header-1);
  line-height: var(--mi-line-height-header-1);
}

.mi-drawer__close {
  display: flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 999px;
  background: var(--mi-color-base-generic);
  cursor: pointer;
}

.mi-drawer__close-icon {
  color: var(--mi-color-text-secondary);
}

.mi-drawer__content {
  flex: 1 1 auto;
  overflow-y: auto;
}

@keyframes mi-drawer-in-right {
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
}

@keyframes mi-drawer-out-right {
  from { transform: translateX(0); }
  to { transform: translateX(100%); }
}

@keyframes mi-drawer-in-left {
  from { transform: translateX(-100%); }
  to { transform: translateX(0); }
}

@keyframes mi-drawer-out-left {
  from { transform: translateX(0); }
  to { transform: translateX(-100%); }
}

@keyframes mi-drawer-in-top {
  from { transform: translateY(-100%); }
  to { transform: translateY(0); }
}

@keyframes mi-drawer-out-top {
  from { transform: translateY(0); }
  to { transform: translateY(-100%); }
}

@keyframes mi-drawer-in-bottom {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}

@keyframes mi-drawer-out-bottom {
  from { transform: translateY(0); }
  to { transform: translateY(100%); }
}
</style>
