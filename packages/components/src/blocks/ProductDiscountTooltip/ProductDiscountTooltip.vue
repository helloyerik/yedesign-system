<script setup lang="ts">
import Tooltip from "../../atoms/Tooltip/Tooltip.vue";

const props = withDefaults(
  defineProps<{
    title?: string;
    description?: string;
    linkLabel?: string;
    trigger?: HTMLElement | null;
  }>(),
  {
    title: "Уцененный товар",
    description:
      "Причина уценки: После сервисного центра - По результатам проведенной диагностики заявленные дефекты не подтвердились, аппарат исправлен и полностью соответствует заявленным техническим характеристикам, незначительные следы эксплуатации, гарантия 1 год.",
    linkLabel: "Подробнее",
    trigger: null,
  },
);

const emit = defineEmits<{
  "link-click": [];
}>();
</script>

<template>
  <Tooltip position="bottom" width-variant="fixed" :trigger="trigger">
    <div class="mi-product-discount-tooltip">
      <p class="mi-product-discount-tooltip__title">{{ title }}</p>
      <p class="mi-product-discount-tooltip__text">{{ description }}</p>
      <button
        v-if="linkLabel"
        type="button"
        class="mi-product-discount-tooltip__link"
        @click="emit('link-click')"
      >
        {{ linkLabel }}
      </button>
    </div>
  </Tooltip>
</template>

<style scoped>
.mi-product-discount-tooltip {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-4);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  white-space: pre-wrap;
}

.mi-product-discount-tooltip__title {
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-product-discount-tooltip__link {
  align-self: flex-start;
  border: 0;
  padding: 0;
  background: transparent;
  color: var(--mi-color-brand-text-link);
  cursor: pointer;
}

.mi-product-discount-tooltip__link:hover {
  text-decoration: underline;
}
</style>
