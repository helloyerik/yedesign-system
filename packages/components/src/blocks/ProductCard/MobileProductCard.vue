<script setup lang="ts">
import { computed } from "vue";
import { PhHeart, PhScales, PhShoppingCart, PhStar } from "@phosphor-icons/vue";
import type { ProductCardLabel } from "./ProductCard.vue";

const props = withDefaults(
  defineProps<{
    image: string;
    title: string;
    rating?: number | string;
    reviewCount?: number | string;
    reviewLabel?: string;
    currentPrice: string;
    originalPrice?: string;
    discount?: string;
    labels?: ProductCardLabel[];
  }>(),
  {
    rating: undefined,
    reviewCount: undefined,
    reviewLabel: undefined,
    originalPrice: undefined,
    discount: undefined,
    labels: () => [],
  },
);

const hasRating = computed(() => props.rating != null && props.reviewCount != null);
const resolvedReviewLabel = computed(() => {
  if (!hasRating.value) return "";
  if (props.reviewLabel) return props.reviewLabel;
  if (typeof props.reviewCount === "number") {
    return `${props.reviewCount} отзыв${props.reviewCount >= 5 ? "ов" : props.reviewCount >= 2 ? "а" : ""}`;
  }
  return String(props.reviewCount);
});

const labelClassName = (variant: ProductCardLabel["variant"]) => {
  switch (variant) {
    case "bonus":
      return "mi-mobile-product-card__label--bonus";
    case "info":
      return "mi-mobile-product-card__label--info";
    case "misc":
      return "mi-mobile-product-card__label--misc";
    default:
      return "";
  }
};
</script>

<template>
  <div class="mi-mobile-product-card">
    <div v-if="labels.length > 0" class="mi-mobile-product-card__labels">
      <div
        v-for="(label, index) in labels"
        :key="index"
        class="mi-mobile-product-card__label"
        :class="labelClassName(label.variant)"
      >
        <p class="mi-mobile-product-card__label-text">{{ label.text }}</p>
        <svg
          v-if="label.variant === 'bonus'"
          class="mi-mobile-product-card__gift-icon"
          width="12"
          height="12"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M9.04232 5.26675C9.37369 5.26675 9.64232 4.99812 9.64232 4.66675C9.64232 4.33538 9.37369 4.06675 9.04232 4.06675V4.66675V5.26675ZM4.08398 4.66675V4.06675C3.75261 4.06675 3.48398 4.33538 3.48398 4.66675H4.08398ZM4.08398 11.6667H3.48398C3.48398 11.9981 3.75261 12.2667 4.08398 12.2667V11.6667ZM5.9069 6.92934C5.57553 6.92934 5.3069 7.19797 5.3069 7.52934C5.3069 7.86071 5.57553 8.12934 5.9069 8.12934V7.52934V6.92934ZM9.04232 4.66675V4.06675H4.08398V4.66675V5.26675H9.04232V4.66675ZM4.08398 4.66675H3.48398V11.6667H4.08398H4.68398V4.66675H4.08398ZM4.08398 11.6667V12.2667C4.85439 12.2667 5.66146 12.2901 6.35904 12.2784C7.06789 12.2665 7.75646 12.2191 8.35802 12.0591C8.96744 11.897 9.53102 11.6076 9.93335 11.0824C10.3345 10.5587 10.5173 9.87631 10.5173 9.04175H9.91732H9.31732C9.31732 9.70717 9.17205 10.1029 8.98071 10.3527C8.79059 10.6009 8.4974 10.7803 8.04953 10.8994C7.5938 11.0206 7.02456 11.067 6.33887 11.0785C5.64193 11.0903 4.91775 11.0667 4.08398 11.0667V11.6667ZM9.91732 9.04175H10.5173C10.5173 8.44038 10.3197 7.94685 9.93439 7.58855C9.57041 7.25006 9.09811 7.08819 8.64885 7.00456C8.19487 6.92005 7.70005 6.90425 7.23594 6.90649C7.00182 6.90762 6.76719 6.91351 6.54465 6.91891C6.31964 6.92438 6.10743 6.92934 5.9069 6.92934V7.52934V8.12934C6.12433 8.12934 6.35091 8.12397 6.57379 8.11856C6.79915 8.11308 7.02151 8.10754 7.24173 8.10648C7.6863 8.10433 8.08959 8.12107 8.42925 8.18429C8.77361 8.24839 8.99045 8.34943 9.1172 8.4673C9.22264 8.56535 9.31732 8.72162 9.31732 9.04175H9.91732Z"
            fill="var(--mi-color-brand-primary)"
          />
          <path
            d="M4.08333 1.75C3.76117 1.75 3.5 2.01117 3.5 2.33334C3.5 2.6555 3.76117 2.91667 4.08333 2.91667V1.75ZM9.04167 2.91667C9.36384 2.91667 9.625 2.6555 9.625 2.33333C9.625 2.01116 9.36384 1.75 9.04167 1.75V2.91667ZM4.08333 2.91667H9.04167V1.75H4.08333V2.91667Z"
            fill="var(--mi-color-brand-primary)"
          />
        </svg>
      </div>
    </div>

    <div class="mi-mobile-product-card__main">
      <div class="mi-mobile-product-card__image-box">
        <img :alt="title" class="mi-mobile-product-card__image" :src="image" />
      </div>
      <div class="mi-mobile-product-card__content">
        <p class="mi-mobile-product-card__title">{{ title }}</p>
        <div v-if="hasRating" class="mi-mobile-product-card__rating-row">
          <span class="mi-mobile-product-card__rating-value">{{ rating }}</span>
          <PhStar :size="16" weight="fill" color="var(--mi-color-status-warning)" />
          <span class="mi-mobile-product-card__rating-label">{{ resolvedReviewLabel }}</span>
        </div>
      </div>
    </div>

    <div class="mi-mobile-product-card__divider" />

    <div class="mi-mobile-product-card__footer">
      <div class="mi-mobile-product-card__pricing">
        <div v-if="originalPrice || discount" class="mi-mobile-product-card__old-price-row">
          <span v-if="originalPrice" class="mi-mobile-product-card__old-price">{{ originalPrice }}</span>
          <span v-if="discount" class="mi-mobile-product-card__discount">{{ discount }}</span>
        </div>
        <span class="mi-mobile-product-card__current-price">{{ currentPrice }}</span>
      </div>

      <div class="mi-mobile-product-card__actions">
        <div class="mi-mobile-product-card__meta-actions">
          <div class="mi-mobile-product-card__meta-icon-wrap">
            <PhScales :size="24" color="var(--mi-color-text-secondary)" />
          </div>
          <div class="mi-mobile-product-card__meta-icon-wrap">
            <PhHeart :size="24" color="var(--mi-color-text-secondary)" />
          </div>
        </div>
        <div class="mi-mobile-product-card__cart-action">
          <PhShoppingCart :size="20" color="rgb(255 255 255 / 85%)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-mobile-product-card {
  display: flex;
  width: 320px;
  flex-shrink: 0;
  flex-direction: column;
  border-radius: var(--mi-radius-l);
  background: var(--mi-color-base-background);
  cursor: pointer;
}

.mi-mobile-product-card__labels {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: var(--mi-spacing-12);
  padding-bottom: 0;
}

.mi-mobile-product-card__label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 2px;
  flex-shrink: 0;
  border-radius: var(--mi-radius-xs);
  padding: 1px 4px;
}

.mi-mobile-product-card__label--bonus {
  background: rgb(230 23 113 / 20%);
  color: var(--mi-color-brand-primary);
}

.mi-mobile-product-card__label--info {
  background: var(--mi-color-base-semantic-info-light);
  color: var(--mi-color-text-info);
}

.mi-mobile-product-card__label--misc {
  background: rgb(107 132 153 / 15%);
  color: #495a69;
}

.mi-mobile-product-card__label-text {
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  font-weight: var(--mi-font-weight-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-mobile-product-card__gift-icon {
  flex-shrink: 0;
}

.mi-mobile-product-card__main {
  display: flex;
  align-items: flex-start;
  gap: var(--mi-spacing-12);
  padding: var(--mi-spacing-12);
}

.mi-mobile-product-card__image-box {
  position: relative;
  width: 84px;
  height: 84px;
  flex-shrink: 0;
}

.mi-mobile-product-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mi-mobile-product-card__content {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 6px;
}

.mi-mobile-product-card__title {
  color: var(--mi-color-text-complementary);
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-mobile-product-card__rating-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.mi-mobile-product-card__rating-value {
  color: var(--mi-color-text-complementary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-mobile-product-card__rating-label {
  color: var(--mi-color-text-hint);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-mobile-product-card__divider {
  width: 100%;
  height: 1px;
  background: var(--mi-color-line-brand);
}

.mi-mobile-product-card__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--mi-spacing-16) var(--mi-spacing-12);
}

.mi-mobile-product-card__pricing {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mi-mobile-product-card__old-price-row {
  display: flex;
  align-items: center;
  gap: 4px;
}

.mi-mobile-product-card__old-price {
  color: var(--mi-color-text-secondary);
  text-decoration: line-through;
  font-family: var(--mi-font-family-body-1-short);
  font-size: var(--mi-font-size-body-1-short);
  font-weight: var(--mi-font-weight-body-1-short);
  line-height: var(--mi-line-height-body-1-short);
}

.mi-mobile-product-card__discount {
  color: var(--mi-color-text-danger-heavy);
  font-family: var(--mi-font-family-body-1-short);
  font-size: var(--mi-font-size-body-1-short);
  font-weight: var(--mi-font-weight-body-1-short);
  line-height: var(--mi-line-height-body-1-short);
}

.mi-mobile-product-card__current-price {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-3);
  font-size: var(--mi-font-size-subheader-3);
  font-weight: var(--mi-font-weight-subheader-3);
  line-height: var(--mi-line-height-subheader-3);
}

.mi-mobile-product-card__actions {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-mobile-product-card__meta-actions {
  display: flex;
  align-items: center;
}

.mi-mobile-product-card__meta-icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--mi-spacing-8);
  border-radius: var(--mi-radius-m);
}

.mi-mobile-product-card__cart-action {
  display: inline-flex;
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-brand);
}
</style>
