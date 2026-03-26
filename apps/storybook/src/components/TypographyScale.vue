<script setup lang="ts">
export type TypographyItem = {
  name: string;
  token?: string;
  size: string;
  lineHeight: string;
  fontWeight?: string;
  fontFamily?: string;
  sample: string;
};

defineProps<{
  items: TypographyItem[];
}>();
</script>

<template>
  <div class="type-scale">
    <article v-for="item in items" :key="item.name" class="type-scale__row">
      <div class="type-scale__meta">
        <p class="type-scale__name">{{ item.name }}</p>
        <code v-if="item.token" class="type-scale__token">{{ item.token }}</code>
      </div>
      <code class="type-scale__spec">{{ item.size }} / {{ item.lineHeight }}</code>
      <p
        class="type-scale__sample"
        :style="{
          fontSize: item.size,
          lineHeight: item.lineHeight,
          fontWeight: item.fontWeight,
          fontFamily: item.fontFamily,
        }"
      >
        {{ item.sample }}
      </p>
    </article>
  </div>
</template>

<style scoped>
.type-scale {
  display: grid;
  gap: 0;
}

.type-scale__row {
  display: grid;
  grid-template-columns: minmax(180px, 240px) 120px minmax(320px, 1fr);
  gap: var(--mi-spacing-16);
  align-items: center;
  padding: var(--mi-spacing-12) 0;
  border-bottom: 1px solid var(--mi-color-line-generic);
}

.type-scale__meta {
  display: grid;
  gap: var(--mi-spacing-4);
}

.type-scale__name,
.type-scale__sample {
  margin: 0;
}

.type-scale__name {
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  font-weight: var(--mi-font-weight-body-2);
}

.type-scale__token,
.type-scale__spec {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-mono);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.type-scale__sample {
  min-width: 0;
}

@media (max-width: 900px) {
  .type-scale__row {
    grid-template-columns: 1fr;
    gap: var(--mi-spacing-8);
  }
}
</style>
