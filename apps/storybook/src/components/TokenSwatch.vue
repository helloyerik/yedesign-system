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
    <div class="token-swatch__meta">
      <p class="token-swatch__name">{{ name }}</p>
      <code class="token-swatch__token">{{ token }}</code>
    </div>
    <p v-if="description" class="token-swatch__description">{{ description }}</p>
    <div class="token-swatch__preview">
      <div class="token-swatch__chip" :style="{ background: value }" />
    </div>
    <code class="token-swatch__value">{{ value }}</code>
  </article>
</template>

<style scoped>
.token-swatch {
  display: grid;
  grid-template-columns: minmax(220px, 280px) minmax(180px, 1fr) 120px auto;
  gap: var(--mi-spacing-16);
  align-items: center;
  padding: var(--mi-spacing-12) 0;
  border-bottom: 1px solid var(--mi-color-line-generic);
}

.token-swatch__chip {
  width: 100%;
  height: 32px;
  border-radius: var(--mi-radius-m);
  border: 1px solid color-mix(in srgb, var(--mi-color-text-primary) 10%, transparent);
}

.token-swatch__meta {
  display: grid;
  gap: var(--mi-spacing-4);
}

.token-swatch__name {
  margin: 0;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  font-weight: var(--mi-font-weight-body-2);
}

.token-swatch__token,
.token-swatch__value {
  font-family: var(--mi-font-family-mono);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
  color: var(--mi-color-text-secondary);
}

.token-swatch__description {
  margin: 0;
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  color: var(--mi-color-text-secondary);
}

.token-swatch__preview {
  display: flex;
  align-items: center;
}

@media (max-width: 900px) {
  .token-swatch {
    grid-template-columns: 1fr;
    gap: var(--mi-spacing-8);
    padding: var(--mi-spacing-12) 0;
  }
}
</style>
