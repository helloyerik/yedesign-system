<script setup lang="ts">
import { computed } from "vue";
import { getTextSpacingToken, type TextSpacingMode, type TextSpacingVariant } from "./textSpacing";

const props = withDefaults(
  defineProps<{
    topVariant: TextSpacingVariant;
    bottomVariant: TextSpacingVariant;
    mode?: TextSpacingMode;
    tokenOverride?: string;
    sizeOverride?: string;
    className?: string;
  }>(),
  {
    mode: "default",
    tokenOverride: undefined,
    sizeOverride: undefined,
    className: "",
  },
);

const token = computed(() =>
  props.tokenOverride ?? getTextSpacingToken(props.topVariant, props.bottomVariant, props.mode),
);
const height = computed(() => (props.sizeOverride ? props.sizeOverride : `var(${token.value})`));
</script>

<template>
  <div
    class="mi-text-spacer"
    :class="className"
    :style="{ height }"
    aria-hidden="true"
  />
</template>

<style scoped>
.mi-text-spacer {
  display: block;
  width: 100%;
  flex: 0 0 auto;
}
</style>
