<script setup lang="ts">
import { computed } from "vue";
import { PhMinus, PhPlus } from "@phosphor-icons/vue";

const props = withDefaults(
  defineProps<{
    quantity: number;
    min?: number;
    max?: number;
    decrementAriaLabel?: string;
    incrementAriaLabel?: string;
    className?: string;
  }>(),
  {
    min: 1,
    max: undefined,
    decrementAriaLabel: "Уменьшить количество",
    incrementAriaLabel: "Увеличить количество",
    className: "",
  },
);

const emit = defineEmits<{
  decrement: [];
  increment: [];
}>();

const canDecrement = computed(() => props.quantity > props.min);
const canIncrement = computed(() => (typeof props.max === "number" ? props.quantity < props.max : true));
</script>

<template>
  <div class="mi-stepper" :class="className">
    <button
      type="button"
      class="mi-stepper__action"
      :class="{ 'is-disabled': !canDecrement }"
      :disabled="!canDecrement"
      :aria-label="decrementAriaLabel"
      @click="canDecrement ? emit('decrement') : undefined"
    >
      <PhMinus :size="'var(--mi-size-icon-16)'" />
    </button>
    <span class="mi-stepper__value">{{ quantity }}</span>
    <button
      type="button"
      class="mi-stepper__action"
      :class="{ 'is-disabled': !canIncrement }"
      :disabled="!canIncrement"
      :aria-label="incrementAriaLabel"
      @click="canIncrement ? emit('increment') : undefined"
    >
      <PhPlus :size="'var(--mi-size-icon-16)'" class="mi-stepper__icon--primary" />
    </button>
  </div>
</template>

<style scoped>
.mi-stepper {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--mi-spacing-0);
  height: var(--mi-size-cart-stepper-height);
  padding-inline: var(--mi-spacing-0);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-surface-subtle);
  width: var(--mi-size-cart-stepper-width);
}

.mi-stepper__action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--mi-size-cart-stepper-action-size);
  height: var(--mi-size-cart-stepper-action-size);
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  color: var(--mi-color-text-secondary);
  cursor: pointer;
  transition: transform 150ms ease, opacity 150ms ease;
}

.mi-stepper__action:active {
  transform: scale(var(--mi-motion-button-press-scale));
}

.mi-stepper__action.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.mi-stepper__value {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  flex: 1 1 auto;
  text-align: center;
}

.mi-stepper__icon--primary {
  color: var(--mi-color-text-primary);
}
</style>
