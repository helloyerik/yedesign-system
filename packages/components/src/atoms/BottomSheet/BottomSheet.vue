<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import ButtonIcon from "../ButtonIcon/ButtonIcon.vue";
import { lockBodyScroll } from "../../utils/bodyScrollLock";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    fullScreen?: boolean;
    maxHeightOffset?: number;
    minHeightOffset?: number;
    sheetClassName?: string;
    bodyClassName?: string;
    headerClassName?: string;
  }>(),
  {
    title: "",
    closeOnBackdrop: true,
    closeOnEscape: true,
    fullScreen: false,
    maxHeightOffset: 0,
    minHeightOffset: 0,
    sheetClassName: "",
    bodyClassName: "",
    headerClassName: "",
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
  if (event.key === "Escape" && props.closeOnEscape && props.modelValue) {
    close();
  }
};

const sheetStyle = computed(() => ({
  ...(props.maxHeightOffset > 0
    ? { "--mi-bottom-sheet-max-height": `calc(100dvh - ${props.maxHeightOffset}px)` }
    : {}),
  ...(props.minHeightOffset > 0
    ? { "--mi-bottom-sheet-min-height": `calc(100dvh - ${props.minHeightOffset}px)` }
    : {}),
}));

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
    <div v-if="isMounted" class="mi-bottom-sheet" role="dialog" aria-modal="true">
      <button
        class="mi-bottom-sheet__overlay"
        :class="{ 'is-closing': isClosing }"
        type="button"
        aria-label="Закрыть нижний лист"
        @click="closeOnBackdrop ? close() : undefined"
      />

      <div
        class="mi-bottom-sheet__panel"
        :class="[
          sheetClassName,
          {
            'is-fullscreen': fullScreen,
            'is-closing': isClosing,
          },
        ]"
        :style="sheetStyle"
        @animationend="
          (event) => {
            if (event.target !== event.currentTarget || !isClosing) return;
            isMounted = false;
            isClosing = false;
          }
        "
      >
        <div class="mi-bottom-sheet__handle-wrap">
          <div class="mi-bottom-sheet__handle" />
        </div>

        <div class="mi-bottom-sheet__header" :class="headerClassName">
          <div class="mi-bottom-sheet__header-spacer" />
          <div class="mi-bottom-sheet__title-wrap">
            <h1 class="mi-bottom-sheet__title">{{ title }}</h1>
          </div>
          <div class="mi-bottom-sheet__close-wrap">
            <ButtonIcon size="L" variant="ghost" @click="close">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
              </svg>
            </ButtonIcon>
          </div>
        </div>

        <div class="mi-bottom-sheet__scroll">
          <div class="mi-bottom-sheet__body" :class="bodyClassName">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mi-bottom-sheet {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.mi-bottom-sheet__overlay {
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  background: var(--mi-color-overlay-backdrop);
  animation: dialogOverlayIn var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-bottom-sheet__overlay.is-closing {
  animation: dialogOverlayOut var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-bottom-sheet__panel {
  position: relative;
  display: flex;
  width: 100%;
  max-height: calc(100dvh - var(--mi-size-bottom-sheet-max-offset));
  flex-direction: column;
  overflow: hidden;
  border-top-left-radius: var(--mi-radius-2xl);
  border-top-right-radius: var(--mi-radius-2xl);
  background: var(--mi-color-surface-panel);
  box-shadow: var(--mi-shadow-modal);
  animation: bottomSheetIn var(--mi-motion-bottom-sheet-enter-duration) var(--mi-motion-bottom-sheet-enter-easing) both;
}

.mi-bottom-sheet__panel.is-closing {
  animation: bottomSheetOut var(--mi-motion-bottom-sheet-enter-duration) var(--mi-motion-bottom-sheet-exit-easing) both;
}

.mi-bottom-sheet__panel.is-fullscreen {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.mi-bottom-sheet__panel[style*="--mi-bottom-sheet-max-height"] {
  max-height: var(--mi-bottom-sheet-max-height);
}

.mi-bottom-sheet__panel[style*="--mi-bottom-sheet-min-height"] {
  min-height: var(--mi-bottom-sheet-min-height);
}

.mi-bottom-sheet__handle-wrap {
  display: flex;
  width: 100%;
  justify-content: center;
  padding: var(--mi-size-bottom-sheet-handle-padding-top) var(--mi-spacing-12) var(--mi-size-bottom-sheet-handle-padding-bottom);
}

.mi-bottom-sheet__handle {
  width: var(--mi-size-bottom-sheet-handle-width);
  height: var(--mi-size-bottom-sheet-handle-height);
  border-radius: var(--mi-radius-pill);
  background: var(--mi-color-misk-scroll-handle);
}

.mi-bottom-sheet__header {
  display: flex;
  width: 100%;
  align-items: center;
  padding: var(--mi-spacing-4);
}

.mi-bottom-sheet__header-spacer,
.mi-bottom-sheet__close-wrap {
  display: flex;
  width: var(--mi-size-bottom-sheet-header-control);
  height: var(--mi-size-bottom-sheet-header-control);
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
}

.mi-bottom-sheet__title-wrap {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  justify-content: center;
  padding: var(--mi-spacing-4) 0;
}

.mi-bottom-sheet__title {
  margin: 0;
  color: var(--mi-color-text-primary);
  text-align: center;
  font-family: var(--mi-font-family-header-1);
  font-size: var(--mi-font-size-header-1);
  font-weight: var(--mi-font-weight-header-1);
  line-height: var(--mi-line-height-header-1);
}

.mi-bottom-sheet__scroll {
  min-height: 0;
  flex: 1 1 auto;
  overflow-y: auto;
  overscroll-behavior: contain;
  touch-action: pan-y;
}

.mi-bottom-sheet__body {
  width: 100%;
}

@keyframes bottomSheetIn {
  from {
    transform: translateY(100%);
  }

  to {
    transform: translateY(0);
  }
}

@keyframes bottomSheetOut {
  from {
    transform: translateY(0);
  }

  to {
    transform: translateY(100%);
  }
}
</style>
