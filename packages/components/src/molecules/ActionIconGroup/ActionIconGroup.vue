<script setup lang="ts">
import { computed } from "vue";
import { PhExport, PhHeart, PhScales } from "@phosphor-icons/vue";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon.vue";

const props = withDefaults(
  defineProps<{
    isComparing?: boolean;
    isFavorite?: boolean;
    showShare?: boolean;
    size?: number;
    className?: string;
  }>(),
  {
    isComparing: false,
    isFavorite: false,
    showShare: true,
    size: 20,
    className: "",
  },
);

const emit = defineEmits<{
  compareClick: [event: MouseEvent];
  favoriteClick: [event: MouseEvent];
  shareClick: [event: MouseEvent];
}>();

const compareColor = computed(() =>
  props.isComparing ? "var(--mi-color-brand-primary)" : "var(--mi-color-text-secondary)",
);
const favoriteColor = computed(() =>
  props.isFavorite ? "var(--mi-color-brand-primary)" : "var(--mi-color-text-secondary)",
);

const onCompareClick = (event: MouseEvent) => emit("compareClick", event);
const onFavoriteClick = (event: MouseEvent) => emit("favoriteClick", event);
const onShareClick = (event: MouseEvent) => emit("shareClick", event);
</script>

<template>
  <div class="mi-action-icon-group" :class="className">
    <ButtonIcon
      variant="ghost"
      tooltip="В сравнение"
      :color="compareColor"
      @click="onCompareClick"
    >
      <PhScales :size="size" :weight="isComparing ? 'fill' : 'regular'" />
    </ButtonIcon>

    <ButtonIcon
      variant="ghost"
      tooltip="В избранные"
      :color="favoriteColor"
      @click="onFavoriteClick"
    >
      <PhHeart :size="size" :weight="isFavorite ? 'fill' : 'regular'" />
    </ButtonIcon>

    <ButtonIcon
      v-if="showShare"
      variant="ghost"
      tooltip="Поделиться"
      :color="'var(--mi-color-text-secondary)'"
      @click="onShareClick"
    >
      <PhExport :size="size" weight="regular" />
    </ButtonIcon>
  </div>
</template>

<style scoped>
.mi-action-icon-group {
  display: flex;
  align-items: center;
}
</style>
