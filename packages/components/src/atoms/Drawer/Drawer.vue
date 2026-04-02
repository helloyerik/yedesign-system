<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { PhX } from "@phosphor-icons/vue";
import ButtonIcon from "../ButtonIcon/ButtonIcon.vue";
import { lockBodyScroll } from "../../utils/bodyScrollLock";

type DrawerPlacement = "left" | "right" | "top" | "bottom";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    placement?: DrawerPlacement;
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
  if (event.key === "Escape" && !props.disableEscapeKeyDown && props.modelValue) {
    close();
  }
};

const placementClass = computed(() => `mi-drawer--${props.placement}`);
const panelClass = computed(() => `mi-drawer__panel--${props.placement}`);
const sizeStyle = computed(() => {
  if (props.size === "auto") {
    return {};
  }

  if (props.placement === "left" || props.placement === "right") {
    return { width: `${props.size}px` };
  }

  return { height: `${props.size}px` };
});

onMounted(() => {
  window.addEventListener("keydown", onKeyDown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeyDown);
  releaseBodyLock?.();
  releaseBodyLock = null;
});
</script>

<template>
  <Teleport to="body">
    <div v-if="isMounted" class="mi-drawer" :class="placementClass" role="dialog" aria-modal="true">
      <button
        v-if="!hideVeil"
        class="mi-drawer__overlay"
        :class="{ 'is-closing': isClosing }"
        type="button"
        aria-label="Закрыть панель"
        @click="disableOutsideClick ? undefined : close()"
      />

      <div
        class="mi-drawer__panel"
        :class="[panelClass, className, { 'is-closing': isClosing }]"
        :style="sizeStyle"
        @animationend="
          (event) => {
            if (event.target !== event.currentTarget || !isClosing) return;
            isMounted = false;
            isClosing = false;
          }
        "
      >
        <div v-if="title" class="mi-drawer__header">
          <h1 class="mi-drawer__title">{{ title }}</h1>
          <ButtonIcon size="S" @click="close">
            <PhX :size="16" />
          </ButtonIcon>
        </div>

        <div class="mi-drawer__body">
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
  z-index: 1000;
  display: flex;
}

.mi-drawer--left {
  justify-content: flex-start;
}

.mi-drawer--right {
  justify-content: flex-end;
}

.mi-drawer--top {
  align-items: flex-start;
}

.mi-drawer--bottom {
  align-items: flex-end;
}

.mi-drawer__overlay {
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  background: var(--mi-color-overlay-backdrop);
  animation: drawerOverlayIn var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-drawer__overlay.is-closing {
  animation: drawerOverlayOut var(--mi-motion-dialog-enter-duration) var(--mi-motion-bottom-sheet-exit-easing) both;
}

.mi-drawer__panel {
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 100%;
  max-height: 100%;
  background: var(--mi-color-surface-panel);
  box-shadow: var(--mi-shadow-modal);
}

.mi-drawer__panel--left,
.mi-drawer__panel--right {
  height: 100%;
}

.mi-drawer__panel--top,
.mi-drawer__panel--bottom {
  width: 100%;
}

.mi-drawer__panel--left {
  animation: drawerInLeft var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-drawer__panel--right {
  animation: drawerInRight var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-drawer__panel--top {
  animation: drawerInTop var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-drawer__panel--bottom {
  animation: drawerInBottom var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-drawer__panel.is-closing.mi-drawer__panel--left {
  animation: drawerOutLeft var(--mi-motion-dialog-enter-duration) var(--mi-motion-bottom-sheet-exit-easing) both;
}

.mi-drawer__panel.is-closing.mi-drawer__panel--right {
  animation: drawerOutRight var(--mi-motion-dialog-enter-duration) var(--mi-motion-bottom-sheet-exit-easing) both;
}

.mi-drawer__panel.is-closing.mi-drawer__panel--top {
  animation: drawerOutTop var(--mi-motion-dialog-enter-duration) var(--mi-motion-bottom-sheet-exit-easing) both;
}

.mi-drawer__panel.is-closing.mi-drawer__panel--bottom {
  animation: drawerOutBottom var(--mi-motion-dialog-enter-duration) var(--mi-motion-bottom-sheet-exit-easing) both;
}

.mi-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--mi-spacing-16) var(--mi-spacing-xl);
  border-bottom: 1px solid var(--mi-color-line-generic);
  flex: 0 0 auto;
}

.mi-drawer__title {
  margin: 0;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-header-1);
  font-size: var(--mi-font-size-header-1);
  font-weight: var(--mi-font-weight-header-1);
  line-height: var(--mi-line-height-header-1);
}

.mi-drawer__body {
  flex: 1 1 auto;
  overflow-y: auto;
}

@keyframes drawerOverlayIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes drawerOverlayOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes drawerInLeft {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes drawerOutLeft {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}

@keyframes drawerInRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes drawerOutRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

@keyframes drawerInTop {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes drawerOutTop {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-100%);
  }
}

@keyframes drawerInBottom {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes drawerOutBottom {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
}
</style>
