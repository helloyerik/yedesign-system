<script setup lang="ts">
import { PhCopy } from "@phosphor-icons/vue";

const props = withDefaults(
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

const emit = defineEmits<{
  copy: [];
}>();

const handleCopy = () => {
  emit("copy");
};
</script>

<template>
  <div class="mi-spec-item">
    <div class="mi-spec-item__label-wrap">
      <span class="mi-spec-item__label">{{ label }}</span>
      <span class="mi-spec-item__line" />
    </div>
    <div class="mi-spec-item__value-wrap">
      <span class="mi-spec-item__value" :class="{ 'is-link': isLink }">{{ value }}</span>
      <button
        v-if="copyable"
        type="button"
        class="mi-spec-item__copy"
        aria-label="Copy"
        @click="handleCopy"
      >
        <PhCopy :size="'var(--mi-spacing-l)'" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.mi-spec-item {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  width: 100%;
  padding-block: var(--mi-spacing-4);
}

.mi-spec-item__label-wrap {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  gap: var(--mi-spacing-8);
  min-width: 0;
}

.mi-spec-item__label {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  white-space: nowrap;
}

.mi-spec-item__line {
  flex: 1 1 auto;
  height: 1px;
  border-bottom: 1px dashed var(--mi-color-line-generic);
}

.mi-spec-item__value-wrap {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-4);
  white-space: nowrap;
}

.mi-spec-item__value {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-spec-item__value.is-link {
  color: var(--mi-color-brand-text-link);
}

.mi-spec-item__copy {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  padding: 0;
  color: var(--mi-color-text-hint);
  cursor: pointer;
}
</style>
