<script setup lang="ts">
export interface StoreItemProps {
  name: string;
  hours: string;
  label: string;
  filled: number;
  type: "progress" | "warning";
  showDivider?: boolean;
}

withDefaults(defineProps<StoreItemProps>(), {
  showDivider: false,
});
</script>

<template>
  <div class="mi-store-item">
    <div class="mi-store-item__address-column">
      <div v-if="showDivider" aria-hidden="true" class="mi-store-item__divider" />
      <div class="mi-store-item__address-cell">
        <p class="mi-store-item__name">{{ name }}</p>
        <p class="mi-store-item__hours">{{ hours }}</p>
      </div>
    </div>

    <div class="mi-store-item__availability-column">
      <div v-if="showDivider" aria-hidden="true" class="mi-store-item__divider" />
      <div
        v-if="type === 'warning'"
        class="mi-store-item__warning"
      >
        <p class="mi-store-item__warning-label">{{ label }}</p>
      </div>
      <div v-else class="mi-store-item__progress">
        <div
          v-for="(_, index) in 10"
          :key="index"
          class="mi-store-item__progress-segment"
          :style="index < filled ? { backgroundColor: 'rgb(50 186 118 / 15%)' } : undefined"
        />
        <p class="mi-store-item__progress-label">{{ label }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-store-item {
  display: flex;
  width: 100%;
  align-items: flex-start;
}

.mi-store-item__address-column {
  position: relative;
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  padding-block: 11px;
}

.mi-store-item__availability-column {
  position: relative;
  display: flex;
  width: 120px;
  height: 68px;
  flex-shrink: 0;
  align-items: center;
  padding-block: 11px;
}

@media (min-width: 768px) {
  .mi-store-item__availability-column {
    width: 180px;
  }
}

.mi-store-item__divider {
  position: absolute;
  inset: 0;
  pointer-events: none;
  border-bottom: 1px solid var(--mi-color-line-brand);
}

.mi-store-item__address-cell {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--mi-spacing-8);
}

.mi-store-item__name {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: 700;
  line-height: var(--mi-line-height-body-2);
}

.mi-store-item__hours {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-store-item__progress {
  position: relative;
  display: flex;
  width: 100%;
  height: 20px;
  align-items: center;
  overflow: clip;
  border-radius: var(--mi-radius-xs);
  background: var(--mi-color-base-generic);
}

.mi-store-item__progress-segment {
  min-width: 0;
  flex: 1 0 0;
  height: 20px;
}

.mi-store-item__progress-label {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: 16px;
}

.mi-store-item__warning {
  display: flex;
  width: 100%;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: var(--mi-radius-xs);
  background: rgb(255 190 92 / 15%);
}

.mi-store-item__warning-label {
  color: var(--mi-color-text-warning-heavy);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}
</style>
