<script setup lang="ts">
import Button from "../../atoms/Button/Button.vue";

defineProps<{
  title: string;
  description: string;
  actionLabel: string;
  icon?: unknown;
  className?: string;
}>();

const emit = defineEmits<{
  actionClick: [event: MouseEvent];
}>();
</script>

<template>
  <div class="mi-gift-item" :class="className">
    <div class="mi-gift-item__content">
      <div class="mi-gift-item__icon">
        <slot name="icon">
          <component :is="icon" v-if="icon" />
        </slot>
      </div>
      <div class="mi-gift-item__text">
        <p class="mi-gift-item__title">{{ title }}</p>
        <p class="mi-gift-item__description">{{ description }}</p>
      </div>
    </div>

    <Button
      :label="actionLabel"
      size="XS"
      variant="brand-secondary"
      width="hug"
      @click="emit('actionClick', $event)"
    />
  </div>
</template>

<style scoped>
.mi-gift-item {
  display: flex;
  width: 100%;
  height: 72px;
  align-items: center;
  justify-content: space-between;
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-generic);
  padding: var(--mi-spacing-16);
}

.mi-gift-item__content {
  display: flex;
  min-width: 0;
  align-items: center;
  gap: var(--mi-spacing-12);
}

.mi-gift-item__icon {
  flex-shrink: 0;
}

.mi-gift-item__text {
  display: flex;
  min-width: 0;
  flex-direction: column;
}

.mi-gift-item__title {
  display: flex;
  height: 20px;
  align-items: center;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  font-weight: var(--mi-font-weight-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-gift-item__description {
  display: flex;
  height: 16px;
  align-items: center;
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  font-weight: var(--mi-font-weight-caption-2);
  line-height: var(--mi-line-height-caption-2);
}
</style>
