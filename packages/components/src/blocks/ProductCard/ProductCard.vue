<script setup lang="ts">
import { computed } from "vue";
import { PhShoppingCart, PhGift } from "@phosphor-icons/vue";
import StarRating from "../../atoms/StarRating/StarRating.vue";

export interface ProductCardLabel {
  text: string;
  variant: "bonus" | "info" | "misc";
}

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
    showcase?: boolean;
    dotCount?: number;
    activeDot?: number;
  }>(),
  {
    rating: undefined,
    reviewCount: undefined,
    reviewLabel: "",
    originalPrice: "",
    discount: "",
    labels: () => [],
    showcase: false,
    dotCount: 5,
    activeDot: 0,
  },
);

const hasRating = computed(() => props.rating != null && props.reviewCount != null);
const resolvedReviewLabel = computed(() => {
  if (!hasRating.value) return "";
  if (props.reviewLabel) return props.reviewLabel;
  if (typeof props.reviewCount === "number") return String(props.reviewCount);
  return String(props.reviewCount);
});

const numericRating = computed(() => {
  if (props.rating == null) return 0;
  const parsed = typeof props.rating === "string" ? Number.parseFloat(props.rating) : props.rating;
  return Number.isFinite(parsed) ? parsed : 0;
});
</script>

<template>
  <div class="mi-product-card">
    <div v-if="labels.length" class="mi-product-card__labels">
      <div class="mi-product-card__labels-row">
        <div
          v-for="(label, index) in labels"
          :key="index"
          class="mi-product-card__label"
          :class="`mi-product-card__label--${label.variant}`"
        >
          <span class="mi-product-card__label-text">{{ label.text }}</span>
          <PhGift v-if="label.variant === 'bonus'" :size="12" class="mi-product-card__label-icon" />
        </div>
      </div>
    </div>

    <div class="mi-product-card__image-wrap">
      <img :src="image" :alt="title" class="mi-product-card__image" />
    </div>

    <div class="mi-product-card__details">
      <div class="mi-product-card__title">{{ title }}</div>
      <div v-if="hasRating" class="mi-product-card__rating">
        <span class="mi-product-card__rating-value">{{ rating }}</span>
        <StarRating :rating="numericRating" :size="12" class="mi-product-card__stars" />
        <span class="mi-product-card__rating-label">{{ resolvedReviewLabel }}</span>
      </div>
    </div>

    <div class="mi-product-card__divider" />

    <div class="mi-product-card__pricing">
      <div class="mi-product-card__prices">
        <div v-if="originalPrice || discount" class="mi-product-card__old">
          <span v-if="originalPrice" class="mi-product-card__old-price">{{ originalPrice }}</span>
          <span v-if="discount" class="mi-product-card__discount">{{ discount }}</span>
        </div>
        <div class="mi-product-card__current">{{ currentPrice }}</div>
      </div>
      <button type="button" class="mi-product-card__action mi-product-card__action--brand">
        <PhShoppingCart :size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.mi-product-card {
  position: relative;
  width: var(--mi-size-product-card-width);
  height: var(--mi-size-product-card-height);
  border-radius: var(--mi-radius-xl);
  background: var(--mi-color-base-generic-solid);
}

.mi-product-card__labels {
  position: absolute;
  left: 0;
  top: var(--mi-spacing-12);
  width: 100%;
  height: var(--mi-size-product-card-label-height);
  padding: 0 var(--mi-spacing-12);
}

.mi-product-card__labels-row {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-4);
}

.mi-product-card__label {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-2);
  height: var(--mi-size-product-card-label-height);
  padding: 1px var(--mi-spacing-4);
  border-radius: var(--mi-radius-xs);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-product-card__label--bonus {
  background: var(--mi-color-brand-base-selection);
  color: var(--mi-color-brand-text-brand);
}

.mi-product-card__label--info {
  background: var(--mi-color-base-semantic-positive-light);
  color: var(--mi-color-text-positive);
}

.mi-product-card__label--misc {
  background: var(--mi-color-label-misc-bg);
  color: var(--mi-color-text-secondary);
}

.mi-product-card__label-text {
  display: flex;
  align-items: center;
}

.mi-product-card__label-icon {
  flex: 0 0 auto;
}

.mi-product-card__image-wrap {
  position: absolute;
  left: 50%;
  top: var(--mi-size-product-card-image-top);
  width: var(--mi-size-product-card-image);
  height: var(--mi-size-product-card-image);
  transform: translateX(-50%);
  border-radius: var(--mi-radius-s);
  overflow: hidden;
}

.mi-product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mi-product-card__details {
  position: absolute;
  left: 0;
  top: var(--mi-size-product-card-details-top);
  width: 100%;
  height: var(--mi-size-product-card-details-height);
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-4);
  padding: 0 var(--mi-spacing-12);
}

.mi-product-card__title {
  color: var(--mi-color-text-complementary);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
  font-weight: var(--mi-font-weight-subheader-2);
}

.mi-product-card__rating {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-4);
}

.mi-product-card__rating-value {
  color: var(--mi-color-text-complementary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-product-card__rating-label {
  color: var(--mi-color-text-hint);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-product-card__divider {
  position: absolute;
  left: 0;
  top: var(--mi-size-product-card-divider-top);
  width: 100%;
  height: var(--mi-size-hairline-half);
  background: var(--mi-color-line-generic);
}

.mi-product-card__pricing {
  position: absolute;
  left: 0;
  top: var(--mi-size-product-card-pricing-top);
  width: 100%;
  height: var(--mi-size-product-card-pricing-height);
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: var(--mi-spacing-8);
  padding: 0 var(--mi-spacing-12);
}

.mi-product-card__prices {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.mi-product-card__old {
  display: flex;
  gap: var(--mi-spacing-4);
  align-items: center;
}

.mi-product-card__old-price {
  color: var(--mi-color-text-secondary);
  text-decoration: line-through;
  font-family: var(--mi-font-family-body-1-short);
  font-size: var(--mi-font-size-body-1-short);
  line-height: var(--mi-line-height-body-1-short);
}

.mi-product-card__discount {
  color: var(--mi-color-text-danger-heavy);
  font-family: var(--mi-font-family-body-1-short);
  font-size: var(--mi-font-size-body-1-short);
  line-height: var(--mi-line-height-body-1-short);
}

.mi-product-card__current {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-product-card__action {
  width: var(--mi-size-product-card-action);
  height: var(--mi-size-product-card-action);
  border-radius: var(--mi-radius-m);
  border: 0;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: opacity 150ms ease;
}

.mi-product-card__action--brand {
  background: var(--mi-color-base-brand);
  color: var(--mi-color-brand-text-brand-contrast);
}
</style>
