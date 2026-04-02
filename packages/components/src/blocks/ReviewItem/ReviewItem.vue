<script setup lang="ts">
import { PhThumbsUp, PhThumbsDown } from "@phosphor-icons/vue";
import UserAvatar from "../../atoms/UserAvatar/UserAvatar.vue";
import StarRating from "../../atoms/StarRating/StarRating.vue";

const props = withDefaults(
  defineProps<{
    userName: string;
    date: string;
    rating: number;
    text: string;
    showFeedback?: boolean;
    className?: string;
  }>(),
  {
    showFeedback: true,
    className: "",
  },
);
</script>

<template>
  <div class="mi-review-item" :class="className">
    <div class="mi-review-item__header">
      <UserAvatar />
      <div class="mi-review-item__user">
        {{ userName }}
      </div>
      <div class="mi-review-item__meta">
        <span class="mi-review-item__date">{{ date }}</span>
        <StarRating :rating="rating" :size="20" />
      </div>
    </div>
    <div class="mi-review-item__text">
      {{ text }}
    </div>
    <div v-if="showFeedback" class="mi-review-item__feedback">
      <button type="button" class="mi-review-item__feedback-btn" aria-label="Thumbs up">
        <PhThumbsUp :size="20" />
      </button>
      <button type="button" class="mi-review-item__feedback-btn" aria-label="Thumbs down">
        <PhThumbsDown :size="20" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.mi-review-item {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-16);
  width: 100%;
  background: var(--mi-color-surface-panel);
}

.mi-review-item__header {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-12);
  width: 100%;
}

.mi-review-item__user {
  flex: 1 1 auto;
  color: var(--mi-color-text-complementary);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-review-item__meta {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-16);
}

.mi-review-item__date {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-review-item__text {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  white-space: pre-wrap;
}

.mi-review-item__feedback {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-review-item__feedback-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--mi-spacing-3xl);
  height: var(--mi-spacing-3xl);
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  color: var(--mi-color-text-secondary);
  cursor: pointer;
  padding: 0;
}
</style>
