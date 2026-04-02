<script setup lang="ts">
import ProductLabel from "../../atoms/ProductLabel/ProductLabel.vue";

interface ProductLabelItem {
  id: string;
  text: string;
  colorScheme: "success" | "warning" | "info" | "supplier";
  showCaret?: boolean;
  tooltip?: string;
  onClick?: () => void;
}

const props = withDefaults(
  defineProps<{
    items: ProductLabelItem[];
    className?: string;
  }>(),
  {
    className: "",
  },
);
</script>

<template>
  <div class="mi-product-label-group" :class="className">
    <ProductLabel
      v-for="item in items"
      :key="item.id"
      :text="item.text"
      :color-scheme="item.colorScheme"
      :show-caret="item.showCaret"
      :tooltip="item.tooltip"
      @click="item.onClick?.()"
    />
  </div>
</template>

<style scoped>
.mi-product-label-group {
  display: flex;
  align-items: flex-start;
  gap: var(--mi-spacing-4);
}
</style>
