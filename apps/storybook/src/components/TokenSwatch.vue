<script setup lang="ts">
defineProps<{
  name: string;
  token: string;
  value: string;
  description?: string;
}>();
</script>

<template>
  <article class="token-swatch">
    <div class="token-swatch__preview" :style="{ background: value }" />
    <div class="token-swatch__meta">
      <div class="token-swatch__text">
        <p class="token-swatch__name">{{ name }}</p>
        <p class="token-swatch__description">
          {{ description || token }}
        </p>
      </div>
    </div>
  </article>
</template>

<style scoped>
.token-swatch {
  display: flex;
  flex: 1 1 200px;
  min-width: 200px;
  max-width: 360px;
  height: 202px;
  flex-direction: column;
  align-items: flex-start;
  border-radius: var(--mi-radius-xl);
  overflow: hidden;
  background: var(--mi-color-base-light);
}

.token-swatch__preview {
  width: 100%;
  height: 142px;
}

.token-swatch__meta {
  display: flex;
  width: 100%;
  align-items: flex-start;
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  gap: var(--mi-spacing-8);
  background: var(--mi-color-base-generic);
}

.token-swatch__text {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-4);
  width: 100%;
}

.token-swatch__name {
  margin: 0;
  font-family: var(--mi-font-family-body-1-short);
  font-size: var(--mi-font-size-body-1-short);
  line-height: var(--mi-line-height-body-1-short);
  font-weight: 700;
  color: var(--mi-color-text-primary);
}

.token-swatch__description {
  margin: 0;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  color: var(--mi-color-text-complementary);
}
</style>
