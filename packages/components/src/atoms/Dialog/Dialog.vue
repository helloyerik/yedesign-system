<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useSlots, watch } from "vue";
import { Teleport } from "vue";
import ButtonIcon from "../ButtonIcon/ButtonIcon.vue";
import { lockBodyScroll } from "../../utils/bodyScrollLock";

type DialogWidth = "S" | "M" | "L";
type DialogVariant = "Primary" | "Secondary";

const props = withDefaults(
  defineProps<{
    modelValue: boolean;
    title?: string;
    width?: DialogWidth;
    variant?: DialogVariant;
    closeOnBackdrop?: boolean;
    closeOnEscape?: boolean;
    showFooter?: boolean;
    bodyClassName?: string;
    contentClassName?: string;
    headerClassName?: string;
    footerClassName?: string;
    secondaryAutoHeight?: boolean;
    footerBordered?: boolean;
    closeButtonClassName?: string;
    closeButtonVariant?: "ghost" | "secondary";
  }>(),
  {
    title: "",
    width: "S",
    variant: "Secondary",
    closeOnBackdrop: true,
    closeOnEscape: true,
    showFooter: false,
    bodyClassName: "",
    contentClassName: "",
    headerClassName: "",
    footerClassName: "",
    secondaryAutoHeight: false,
    footerBordered: true,
    closeButtonClassName: "",
    closeButtonVariant: "ghost",
  },
);

const emit = defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();

const slots = useSlots();
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

const widthClass = computed(() => `mi-dialog__content--${props.width}`);
const variantClass = computed(() => `mi-dialog__content--${props.variant.toLowerCase()}`);
const isSecondary = computed(() => props.variant === "Secondary");
const isPrimary = computed(() => props.variant === "Primary");
const hasCustomFooter = computed(() => Boolean(slots.footer));
const secondaryBodyClass = computed(() =>
  props.bodyClassName || "mi-dialog__body--secondary-default",
);

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
    <div v-if="isMounted" class="mi-dialog" role="dialog" aria-modal="true">
      <button
        class="mi-dialog__overlay"
        :class="{ 'is-closing': isClosing }"
        type="button"
        aria-label="Закрыть диалог"
        @click="closeOnBackdrop ? close() : undefined"
      />

      <div
        class="mi-dialog__content"
        :class="[widthClass, variantClass, contentClassName, { 'is-closing': isClosing }]"
        @animationend="
          (event) => {
            if (event.target !== event.currentTarget || !isClosing) return;
            isMounted = false;
            isClosing = false;
          }
        "
      >
        <div
          class="mi-dialog__header"
          :class="[
            isSecondary ? 'mi-dialog__header--secondary' : 'mi-dialog__header--primary',
            headerClassName,
          ]"
        >
          <h1 v-if="title" class="mi-dialog__title">{{ title }}</h1>

          <ButtonIcon
            size="S"
            :variant="closeButtonVariant"
            :class="closeButtonClassName"
            @click="close"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
            </svg>
          </ButtonIcon>
        </div>

        <div
          class="mi-dialog__body"
          :class="[
            isSecondary ? secondaryBodyClass : bodyClassName,
            {
              'mi-dialog__body--secondary': isSecondary,
              'mi-dialog__body--secondary-auto': isSecondary && secondaryAutoHeight,
              'mi-dialog__body--primary': isPrimary,
            },
          ]"
        >
          <slot />
        </div>

        <div
          v-if="showFooter"
          class="mi-dialog__footer"
          :class="[footerClassName, { 'mi-dialog__footer--borderless': !footerBordered }]"
        >
          <slot v-if="hasCustomFooter" name="footer" />
          <div v-else class="mi-dialog__footer-actions">
            <button type="button" class="mi-dialog__footer-button mi-dialog__footer-button--secondary">
              Cancel
            </button>
            <button type="button" class="mi-dialog__footer-button mi-dialog__footer-button--primary">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mi-dialog {
  position: fixed;
  inset: 0;
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--mi-spacing-16);
}

.mi-dialog__overlay {
  position: absolute;
  inset: 0;
  border: 0;
  padding: 0;
  background: var(--mi-color-overlay-backdrop);
  animation: dialogOverlayIn var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-dialog__overlay.is-closing {
  animation: dialogOverlayOut var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-dialog__content {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(100%, var(--mi-size-modal-s-width));
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  background: var(--mi-color-surface-panel);
  box-shadow: var(--mi-shadow-modal);
  animation: dialogContentIn var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
  transform-origin: center center;
}

.mi-dialog__content.is-closing {
  animation: dialogContentOut var(--mi-motion-dialog-enter-duration) var(--mi-motion-dialog-enter-easing) both;
}

.mi-dialog__content--S {
  width: min(100%, var(--mi-size-modal-s-width));
}

.mi-dialog__content--M {
  width: min(100%, var(--mi-size-modal-m-width));
}

.mi-dialog__content--L {
  width: min(100%, var(--mi-size-modal-l-width));
}

.mi-dialog__content--primary {
  border-radius: var(--mi-radius-2xl);
}

.mi-dialog__content--secondary {
  border-radius: var(--mi-radius-l);
}

.mi-dialog__header {
  z-index: 20;
  display: flex;
  width: 100%;
  flex-shrink: 0;
  flex-direction: row;
}

.mi-dialog__header--secondary {
  justify-content: flex-end;
  align-items: flex-start;
  gap: var(--mi-spacing-24);
  height: var(--mi-size-dialog-primary-header-height);
  padding-top: var(--mi-spacing-4);
  padding-right: var(--mi-spacing-4);
  padding-left: var(--mi-spacing-xl);
}

.mi-dialog__header--primary {
  justify-content: flex-start;
  align-items: center;
  gap: var(--mi-spacing-24);
  min-height: var(--mi-size-dialog-primary-header-height);
  padding: var(--mi-spacing-16) var(--mi-spacing-16) var(--mi-spacing-16) var(--mi-spacing-24);
}

.mi-dialog__title {
  flex: 1 1 auto;
  min-width: 0;
  margin: 0;
  overflow: hidden;
  color: var(--mi-color-text-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--mi-font-family-header-1);
  font-size: var(--mi-font-size-header-1);
  font-weight: var(--mi-font-weight-header-1);
  line-height: var(--mi-line-height-header-1);
}

.mi-dialog__body {
  z-index: 10;
  width: 100%;
  flex-shrink: 0;
}

.mi-dialog__body--secondary {
  display: flex;
  min-height: var(--mi-size-dialog-secondary-min-height);
  flex-direction: row;
  align-items: center;
}

.mi-dialog__body--secondary-default {
  background: var(--mi-color-brand-base-selection);
}

.mi-dialog__body--secondary-auto {
  min-height: 0;
}

.mi-dialog__body--primary {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mi-dialog__footer {
  z-index: 0;
  box-sizing: border-box;
  display: flex;
  width: 100%;
  min-height: var(--mi-size-dialog-footer-height);
  flex-shrink: 0;
  align-items: center;
  gap: var(--mi-spacing-8);
  border-top: 1px solid var(--mi-color-line-generic);
  padding: var(--mi-spacing-xl);
}

.mi-dialog__footer--borderless {
  border-top: 0;
}

.mi-dialog__footer-actions {
  display: flex;
  width: 100%;
  height: var(--mi-size-button-s-height);
  align-items: center;
  justify-content: flex-end;
  gap: var(--mi-spacing-8);
}

.mi-dialog__footer-button {
  display: inline-flex;
  height: var(--mi-size-button-s-height);
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--mi-radius-l);
  padding: 10px 16px;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
  cursor: pointer;
  outline: none;
  transition: background-color 160ms ease;
}

.mi-dialog__footer-button--secondary {
  background: transparent;
  color: var(--mi-color-text-primary);
}

.mi-dialog__footer-button--secondary:hover {
  background: var(--mi-color-base-generic);
}

.mi-dialog__footer-button--primary {
  background: var(--mi-color-base-brand);
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-dialog__footer-button--primary:hover {
  background: var(--mi-color-base-brand-hover);
}
</style>
