<script setup lang="ts">
import StarRating from "../../atoms/StarRating/StarRating.vue";

const props = withDefaults(
  defineProps<{
    rating: number;
    reviewCount: number;
    reviewLabel?: string;
    className?: string;
  }>(),
  {
    reviewLabel: "",
    className: "",
  },
);

const labelText = props.reviewLabel || `${props.reviewCount} отзывов`;
</script>

<template>
  <div class="mi-review-summary" :class="className">
    <div class="mi-review-summary__rating">
      <span class="mi-review-summary__value">{{ rating }}</span>
      <StarRating :rating="rating" :size="28" />
    </div>
    <div class="mi-review-summary__label">
      {{ labelText }}
    </div>
  </div>
</template>

<style scoped>
.mi-review-summary {
  display: flex;
  align-items: flex-end;
  gap: var(--mi-spacing-16);
}

.mi-review-summary__rating {
  display: inline-flex;
  align-items: flex-end;
  gap: var(--mi-spacing-8);
}

.mi-review-summary__value {
  color: var(--mi-color-text-complementary);
  font-family: var(--mi-font-family-display-2);
  font-size: var(--mi-font-size-display-2);
  line-height: var(--mi-line-height-display-2);
  font-weight: var(--mi-font-weight-display-2);
}

.mi-review-summary__label {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-subheader-3);
  font-size: var(--mi-font-size-subheader-3);
  line-height: var(--mi-line-height-subheader-3);
}
</style>
