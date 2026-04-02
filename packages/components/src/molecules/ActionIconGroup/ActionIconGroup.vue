<script setup lang="ts">
import { computed } from "vue";
import { PhScales, PhHeart, PhExport } from "@phosphor-icons/vue";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon.vue";

type ActionIconSize = "S" | "M" | "L" | "XL";

const props = withDefaults(
  defineProps<{
    isComparing?: boolean;
    isFavorite?: boolean;
    showShare?: boolean;
    size?: ActionIconSize;
    className?: string;
  }>(),
  {
    isComparing: false,
    isFavorite: false,
    showShare: true,
    size: "M",
    className: "",
  },
);

const emit = defineEmits<{
  "compare-click": [];
  "favorite-click": [];
  "share-click": [];
}>();

const compareColor = computed(() =>
  props.isComparing ? "var(--mi-color-brand-text-brand)" : "var(--mi-color-text-secondary)",
);
const favoriteColor = computed(() =>
  props.isFavorite ? "var(--mi-color-brand-text-brand)" : "var(--mi-color-text-secondary)",
);
</script>

<template>
  <div class="mi-action-icon-group" :class="className">
    <ButtonIcon
      :size="size"
      variant="ghost"
      tooltip="В сравнение"
      :color="compareColor"
      @click="emit('compare-click')"
    >
      <PhScales :weight="isComparing ? 'fill' : 'regular'" :size="'var(--mi-size-button-icon-glyph)'" />
    </ButtonIcon>
    <ButtonIcon
      :size="size"
      variant="ghost"
      tooltip="В избранные"
      :color="favoriteColor"
      @click="emit('favorite-click')"
    >
      <PhHeart :weight="isFavorite ? 'fill' : 'regular'" :size="'var(--mi-size-button-icon-glyph)'" />
    </ButtonIcon>
    <ButtonIcon
      v-if="showShare"
      :size="size"
      variant="ghost"
      tooltip="Поделиться"
      color="var(--mi-color-text-secondary)"
      @click="emit('share-click')"
    >
      <PhExport :size="'var(--mi-size-button-icon-glyph)'" />
    </ButtonIcon>
  </div>
</template>

<style scoped>
.mi-action-icon-group {
  display: inline-flex;
  align-items: center;
}
</style>
