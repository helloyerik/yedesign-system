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
  "primary-click": [];
  "secondary-click": [];
  "in-cart-click": [];
}>();
</script>

<template>
  <div
    class="mi-button-group"
    :class="[
      className,
      {
        'mi-button-group--horizontal': horizontal,
      },
    ]"
  >
    <template v-if="showPrimary">
      <Button
        v-if="!inCart"
        :label="primaryLabel"
        :variant="primaryVariant"
        :size="buttonSize"
        width="full"
        @click="emit('primary-click')"
      />
      <InCartButton
        v-else
        :label="inCartLabel"
        width="full"
        @click="emit('in-cart-click')"
      />
    </template>
    <Button
      :label="secondaryLabel"
      variant="secondary"
      :size="buttonSize"
      width="full"
      :class-name="secondaryButtonClassName"
      @click="emit('secondary-click')"
    />
  </div>
</template>

<style scoped>
.mi-button-group {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-8);
  width: 100%;
}

.mi-button-group--horizontal {
  flex-direction: row;
}
</style>
