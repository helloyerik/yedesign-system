<script setup lang="ts">
import StarRating from "../../atoms/StarRating/StarRating.vue";

withDefaults(
  defineProps<{
    rating: number;
    reviewCount: number;
    reviewLabel?: string;
  }>(),
  {
    reviewLabel: undefined,
  },
);
</script>

<template>
  <div class="mi-review-summary">
    <div class="mi-review-summary__main">
      <div class="mi-review-summary__rating-wrap">
        <p class="mi-review-summary__rating">{{ rating }}</p>
      </div>
      <StarRating :rating="rating" :size="28" />
    </div>
    <div class="mi-review-summary__label-wrap">
      <p class="mi-review-summary__label">{{ reviewLabel ?? `${reviewCount} отзывов` }}</p>
    </div>
  </div>
</template>

<style scoped>
.mi-review-summary {
  display: flex;
  align-items: flex-end;
  gap: var(--mi-spacing-16);
}

.mi-review-summary__main {
  display: flex;
  align-items: flex-end;
  gap: var(--mi-spacing-8);
}

.mi-review-summary__rating {
  color: var(--mi-color-text-complementary);
  white-space: nowrap;
  font-family: var(--mi-font-family-display-2);
  font-size: var(--mi-font-size-display-2);
  font-weight: var(--mi-font-weight-display-2);
  line-height: var(--mi-line-height-display-2);
}

.mi-review-summary__label-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--mi-spacing-8);
  padding-block: 4px;
}

.mi-review-summary__label {
  color: var(--mi-color-text-secondary);
  white-space: nowrap;
  font-family: var(--mi-font-family-subheader-3);
  font-size: var(--mi-font-size-subheader-3);
  font-weight: var(--mi-font-weight-subheader-3);
  line-height: var(--mi-line-height-subheader-3);
}
</style>
