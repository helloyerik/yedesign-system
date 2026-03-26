<script setup lang="ts">
defineProps<{
  name: string;
  token: string;
  value: string;
  previewWidth?: string;
}>();
</script>

<template>
  <article class="metric-row">
    <div class="metric-row__meta">
      <p class="metric-row__name">{{ name }}</p>
      <code class="metric-row__token">{{ token }}</code>
    </div>
    <div class="metric-row__preview">
      <div class="metric-row__bar" :style="{ width: previewWidth ?? value }" />
    </div>
    <code class="metric-row__value">{{ value }}</code>
  </article>
</template>

<style scoped>
.metric-row {
  display: grid;
  grid-template-columns: minmax(180px, 240px) 1fr auto;
  gap: var(--mi-spacing-16);
  align-items: center;
  padding: var(--mi-spacing-12) 0;
  border-bottom: 1px solid var(--mi-color-line-generic);
}

.metric-row__meta {
  display: grid;
  gap: var(--mi-spacing-4);
}

.metric-row__name {
  margin: 0;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  font-weight: var(--mi-font-weight-body-2);
}

.metric-row__token,
.metric-row__value {
  font-family: var(--mi-font-family-mono);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
  color: var(--mi-color-text-secondary);
}

.metric-row__preview {
  width: 100%;
}

.metric-row__bar {
  height: 16px;
  min-width: 16px;
  border-radius: var(--mi-radius-pill);
  background: linear-gradient(90deg, var(--mi-color-base-brand), color-mix(in srgb, var(--mi-color-base-brand) 55%, white));
}

@media (max-width: 900px) {
  .metric-row {
    grid-template-columns: 1fr;
    gap: var(--mi-spacing-8);
  }
}
</style>
