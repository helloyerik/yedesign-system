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
  }>(),
  {
    min: 1,
    max: undefined,
    decrementAriaLabel: "Уменьшить количество",
    incrementAriaLabel: "Увеличить количество",
  },
);

const emit = defineEmits<{
  decrement: [];
  increment: [];
}>();

const canDecrement = computed(() => props.quantity > props.min);
const canIncrement = computed(() => (typeof props.max === "number" ? props.quantity < props.max : true));

const onDecrement = () => {
  if (canDecrement.value) emit("decrement");
};

const onIncrement = () => {
  if (canIncrement.value) emit("increment");
};
</script>

<template>
  <div class="mi-quantity-stepper">
    <button
      type="button"
      :aria-label="decrementAriaLabel"
      :disabled="!canDecrement"
      class="mi-quantity-stepper__action"
      :class="{ 'is-disabled': !canDecrement }"
      @click="onDecrement"
    >
      <PhMinus :size="16" weight="regular" class="mi-quantity-stepper__icon mi-quantity-stepper__icon--secondary" />
    </button>

    <div class="mi-quantity-stepper__value">
      <span class="mi-quantity-stepper__value-text">{{ quantity }}</span>
    </div>

    <button
      type="button"
      :aria-label="incrementAriaLabel"
      :disabled="!canIncrement"
      class="mi-quantity-stepper__action"
      :class="{ 'is-disabled': !canIncrement }"
      @click="onIncrement"
    >
      <PhPlus :size="16" weight="regular" class="mi-quantity-stepper__icon mi-quantity-stepper__icon--primary" />
    </button>
  </div>
</template>

<style scoped>
.mi-quantity-stepper {
  display: flex;
  width: 100px;
  align-items: center;
  justify-content: space-between;
  gap: var(--mi-spacing-8);
  height: var(--mi-size-button-s-height);
  padding-inline: var(--mi-spacing-0);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-surface-muted);
}

.mi-quantity-stepper__action {
  display: flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  cursor: pointer;
  transition: transform 150ms ease, opacity 150ms ease;
}

.mi-quantity-stepper__action:not(:disabled):active {
  transform: scale(var(--mi-motion-button-press-scale));
}

.mi-quantity-stepper__action.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-quantity-stepper__value {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
}

.mi-quantity-stepper__value-text {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-quantity-stepper__icon {
  flex: 0 0 auto;
}

.mi-quantity-stepper__icon--secondary {
  color: var(--mi-color-text-secondary);
}

.mi-quantity-stepper__icon--primary {
  color: var(--mi-color-text-primary);
}
</style>
