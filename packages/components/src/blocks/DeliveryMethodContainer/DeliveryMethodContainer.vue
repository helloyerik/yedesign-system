<script setup lang="ts">
import { PhMapPin, PhLightning, PhPackage, PhCaretRight } from "@phosphor-icons/vue";

interface DeliveryItem {
  id: string;
  label: string;
  highlight?: string;
  icon?: unknown;
}

const props = withDefaults(
  defineProps<{
    title?: string;
    items?: DeliveryItem[];
    showExpress?: boolean;
    promoText?: string;
    className?: string;
  }>(),
  {
    title: "Доставка и возврат",
    items: () => [
      { id: "pickup", label: "Самовывоз", highlight: "из 1 магазина", icon: PhMapPin },
      { id: "express", label: "Экспресс доставка", highlight: "за 2 часа", icon: PhLightning },
      { id: "delivery", label: "Доставка", highlight: "завтра", icon: PhPackage },
    ],
    showExpress: true,
    promoText: "Бесплатная доставка при заказе на сумму от 10 000 ₸",
    className: "",
  },
);
</script>

<template>
  <div class="mi-delivery" :class="className">
    <div class="mi-delivery__content">
      <p class="mi-delivery__title">{{ title }}</p>
      <div class="mi-delivery__list">
        <div
          v-for="item in items"
          :key="item.id"
          v-show="item.id !== 'express' || showExpress"
          class="mi-delivery__row"
        >
          <span class="mi-delivery__icon">
            <component :is="item.icon || PhPackage" />
          </span>
          <div class="mi-delivery__text">
            <span class="mi-delivery__label">{{ item.label }}</span>
            <span v-if="item.highlight" class="mi-delivery__highlight">{{ item.highlight }}</span>
          </div>
          <PhCaretRight class="mi-delivery__caret" :size="'var(--mi-spacing-16)'" />
        </div>
      </div>
      <div v-if="promoText" class="mi-delivery__promo">
        {{ promoText }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-delivery {
  width: 100%;
  border-radius: var(--mi-radius-l);
  background: var(--mi-color-surface-panel);
}

.mi-delivery__content {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-16);
  padding: var(--mi-spacing-16);
}

.mi-delivery__title {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-3);
  font-size: var(--mi-font-size-subheader-3);
  line-height: var(--mi-line-height-subheader-3);
}

.mi-delivery__list {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-12);
}

.mi-delivery__row {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-12);
}

.mi-delivery__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--mi-spacing-20);
  height: var(--mi-spacing-20);
  color: var(--mi-color-text-secondary);
}

.mi-delivery__text {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-4);
  flex: 1 1 auto;
}

.mi-delivery__label {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-delivery__highlight {
  color: var(--mi-color-brand-text-brand);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-delivery__caret {
  color: var(--mi-color-text-hint);
}

.mi-delivery__promo {
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-semantic-positive-light);
  color: var(--mi-color-text-positive-heavy);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}
</style>
