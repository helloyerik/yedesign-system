<script setup lang="ts">
import paths from "./productUiPaths";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar.vue";
import StarRating from "../../atoms/StarRating/StarRating.vue";

defineProps<{
  userName: string;
  date: string;
  rating: number;
  text: string;
}>();
</script>

<template>
  <div class="mi-review-item">
    <div class="mi-review-item__user-row">
      <UserAvatar />
      <div class="mi-review-item__user-name-wrap">
        <p class="mi-review-item__user-name">{{ userName }}</p>
      </div>
      <div class="mi-review-item__meta">
        <div class="mi-review-item__date-wrap">
          <p class="mi-review-item__date">{{ date }}</p>
        </div>
        <StarRating :rating="rating" :size="20" />
      </div>
    </div>

    <div class="mi-review-item__text-wrap">
      <p class="mi-review-item__text">{{ text }}</p>
    </div>

    <div class="mi-review-item__thumbs">
      <div class="mi-review-item__thumb-button">
        <div class="mi-review-item__thumb-icon">
          <svg class="mi-review-item__thumb-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path :d="paths.paa4680" fill="var(--mi-color-text-secondary)" />
          </svg>
        </div>
      </div>
      <div class="mi-review-item__thumb-button">
        <div class="mi-review-item__thumb-icon">
          <svg class="mi-review-item__thumb-svg" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
            <path :d="paths.p25a2a100" fill="var(--mi-color-text-secondary)" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-review-item {
  display: flex;
  width: 100%;
  flex-shrink: 0;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--mi-spacing-16);
  background: var(--mi-color-base-background);
}

.mi-review-item__user-row {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--mi-spacing-12);
}

.mi-review-item__user-name-wrap {
  min-width: 0;
  flex: 1 0 0;
}

.mi-review-item__user-name {
  color: var(--mi-color-text-complementary);
  white-space: pre-wrap;
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  font-weight: var(--mi-font-weight-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-review-item__meta {
  display: flex;
  min-width: 0;
  flex: 1 0 0;
  align-items: center;
  justify-content: flex-end;
  gap: var(--mi-spacing-16);
}

.mi-review-item__date-wrap {
  flex-shrink: 0;
}

.mi-review-item__date {
  color: var(--mi-color-text-secondary);
  white-space: nowrap;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-review-item__text-wrap {
  width: 100%;
  min-width: 100%;
}

.mi-review-item__text {
  color: var(--mi-color-text-primary);
  white-space: pre-wrap;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-review-item__thumbs {
  display: flex;
  height: 28px;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-review-item__thumb-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: var(--mi-radius-m);
}

.mi-review-item__thumb-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.mi-review-item__thumb-svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
