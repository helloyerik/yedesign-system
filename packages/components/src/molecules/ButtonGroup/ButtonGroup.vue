<script setup lang="ts">
import Button from "../../atoms/Button/Button.vue";
import InCartButton from "../../atoms/InCartButton/InCartButton.vue";

type ButtonVariant = "primary" | "brand-secondary" | "secondary" | "outline" | "text-only";
type ButtonSize = "L" | "M" | "S" | "XS";

const props = withDefaults(
  defineProps<{
    primaryLabel: string;
    secondaryLabel: string;
    inCartLabel?: string;
    inCart?: boolean;
    primaryVariant?: ButtonVariant;
    buttonSize?: ButtonSize;
    secondaryButtonClassName?: string;
    className?: string;
    showPrimary?: boolean;
    horizontal?: boolean;
  }>(),
  {
    inCartLabel: "В корзине",
    inCart: false,
    primaryVariant: "primary",
    buttonSize: "M",
    secondaryButtonClassName: "",
    className: "",
    showPrimary: true,
    horizontal: false,
  },
);

const emit = defineEmits<{
  primaryClick: [event: MouseEvent];
  inCartClick: [event: MouseEvent];
  secondaryClick: [event: MouseEvent];
}>();
</script>

<template>
  <div
    class="mi-button-group"
    :class="[
      horizontal ? 'mi-button-group--horizontal' : 'mi-button-group--vertical',
      className,
    ]"
  >
    <Button
      v-if="showPrimary && !inCart"
      :label="primaryLabel"
      :variant="primaryVariant"
      :size="buttonSize"
      width="full"
      @click="emit('primaryClick', $event)"
    />

    <InCartButton
      v-else-if="showPrimary && inCart"
      :label="inCartLabel"
      width="full"
      @click="emit('inCartClick', $event)"
    />

    <Button
      :label="secondaryLabel"
      variant="secondary"
      :size="buttonSize"
      width="full"
      :class-name="secondaryButtonClassName"
      @click="emit('secondaryClick', $event)"
    />
  </div>
</template>

<style scoped>
.mi-button-group {
  display: flex;
  width: 100%;
  gap: var(--mi-spacing-8);
}

.mi-button-group--vertical {
  flex-direction: column;
}

.mi-button-group--horizontal {
  flex-direction: row;
}
</style>
