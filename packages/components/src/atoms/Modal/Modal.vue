<script setup lang="ts">
import Dialog from "../Dialog/Dialog.vue";

defineProps<{
  modelValue: boolean;
  title?: string;
  width?: "S" | "M" | "L";
  variant?: "Primary" | "Secondary";
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
}>();

defineEmits<{
  "update:modelValue": [value: boolean];
  close: [];
}>();
</script>

<template>
  <Dialog
    :model-value="modelValue"
    :title="title"
    :width="width"
    :variant="variant"
    :close-on-backdrop="closeOnBackdrop"
    :close-on-escape="closeOnEscape"
    :show-footer="showFooter"
    :body-class-name="bodyClassName"
    :content-class-name="contentClassName"
    :header-class-name="headerClassName"
    :footer-class-name="footerClassName"
    :secondary-auto-height="secondaryAutoHeight"
    :footer-bordered="footerBordered"
    :close-button-class-name="closeButtonClassName"
    :close-button-variant="closeButtonVariant"
    @update:model-value="$emit('update:modelValue', $event)"
    @close="$emit('close')"
  >
    <slot />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Dialog>
</template>
