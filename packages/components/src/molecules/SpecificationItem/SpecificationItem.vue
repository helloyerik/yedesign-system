<script setup lang="ts">
import { PhCopy } from "@phosphor-icons/vue";

withDefaults(
  defineProps<{
    label: string;
    value: string;
    copyable?: boolean;
    isLink?: boolean;
  }>(),
  {
    copyable: false,
    isLink: false,
  },
);
</script>

<template>
  <div class="mi-specification-item">
    <div class="mi-specification-item__left">
      <span class="mi-specification-item__label">{{ label }}</span>
      <div class="mi-specification-item__divider" />
    </div>

    <div class="mi-specification-item__right">
      <span
        class="mi-specification-item__value"
        :class="{ 'is-link': isLink }"
      >
        {{ value }}
      </span>
      <PhCopy
        v-if="copyable"
        :size="16"
        color="var(--mi-color-text-hint)"
      />
    </div>
  </div>
</template>

<style scoped>
.mi-specification-item {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--mi-spacing-8);
  padding-block: 4px;
}

.mi-specification-item__left {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-specification-item__label {
  white-space: nowrap;
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-specification-item__divider {
  height: var(--mi-spacing-12);
  flex: 1 1 auto;
  border-bottom: 1px dashed var(--mi-color-line-brand);
}

.mi-specification-item__right {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.mi-specification-item__value {
  white-space: nowrap;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-specification-item__value.is-link {
  color: var(--mi-color-brand-text-link);
}
</style>
