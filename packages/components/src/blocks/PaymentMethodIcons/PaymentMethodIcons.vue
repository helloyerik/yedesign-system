<script setup lang="ts">
interface PaymentIcon {
  id: string;
  label: string;
  src?: string;
  icon?: unknown;
}

const props = withDefaults(
  defineProps<{
    icons: PaymentIcon[];
    className?: string;
  }>(),
  {
    className: "",
  },
);
</script>

<template>
  <div class="mi-payment-icons" :class="className">
    <div
      v-for="item in icons"
      :key="item.id"
      class="mi-payment-icons__item"
      :aria-label="item.label"
    >
      <img v-if="item.src" :src="item.src" :alt="item.label" class="mi-payment-icons__image" />
      <component v-else-if="item.icon" :is="item.icon" />
    </div>
  </div>
</template>

<style scoped>
.mi-payment-icons {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-payment-icons__item {
  width: var(--mi-spacing-6xl);
  height: var(--mi-spacing-6xl);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mi-payment-icons__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
