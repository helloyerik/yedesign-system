<script setup lang="ts">
import Tooltip from "../../atoms/Tooltip/Tooltip.vue";

interface PriceRow {
  label: string;
  value: string;
  strike?: boolean;
}

interface DiscountRow {
  label: string;
  discount: string;
  value: string;
}

const props = withDefaults(
  defineProps<{
    title: string;
    priceRows: PriceRow[];
    discountRow?: DiscountRow;
    totalLabel?: string;
    totalValue?: string;
    trigger?: HTMLElement | null;
  }>(),
  {
    trigger: null,
    discountRow: undefined,
    totalLabel: "",
    totalValue: "",
  },
);
</script>

<template>
  <Tooltip position="bottom" width-variant="fixed" :trigger="trigger">
    <div class="mi-product-price-tooltip">
      <p class="mi-product-price-tooltip__title">{{ title }}</p>
      <div class="mi-product-price-tooltip__rows">
        <div
          v-for="row in priceRows"
          :key="row.label"
          class="mi-product-price-tooltip__row"
        >
          <span class="mi-product-price-tooltip__label">{{ row.label }}</span>
          <span
            class="mi-product-price-tooltip__value"
            :class="{ 'is-strike': row.strike }"
          >
            {{ row.value }}
          </span>
        </div>
        <div v-if="discountRow" class="mi-product-price-tooltip__row">
          <span class="mi-product-price-tooltip__label">
            {{ discountRow.label }} <span class="mi-product-price-tooltip__discount">{{ discountRow.discount }}</span>
          </span>
          <span class="mi-product-price-tooltip__value mi-product-price-tooltip__value--success">
            {{ discountRow.value }}
          </span>
        </div>
        <div v-if="totalLabel && totalValue" class="mi-product-price-tooltip__row">
          <span class="mi-product-price-tooltip__label">{{ totalLabel }}</span>
          <span class="mi-product-price-tooltip__value mi-product-price-tooltip__value--primary">
            {{ totalValue }}
          </span>
        </div>
      </div>
    </div>
  </Tooltip>
</template>

<style scoped>
.mi-product-price-tooltip {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-8);
}

.mi-product-price-tooltip__title {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-product-price-tooltip__rows {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-4);
}

.mi-product-price-tooltip__row {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-product-price-tooltip__label {
  flex: 1 1 auto;
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-product-price-tooltip__value {
  flex: 1 1 auto;
  text-align: right;
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-product-price-tooltip__value.is-strike {
  text-decoration: line-through;
}

.mi-product-price-tooltip__value--success {
  color: var(--mi-color-text-positive-heavy);
}

.mi-product-price-tooltip__value--primary {
  color: var(--mi-color-text-primary);
}

.mi-product-price-tooltip__discount {
  color: var(--mi-color-brand-text-brand);
}
</style>
