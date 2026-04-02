<script setup lang="ts">
import { computed } from "vue";
import { getTextSpacingToken, type TextSpacingMode, type TextSpacingVariant } from "./textSpacing";

const props = withDefaults(
  defineProps<{
    topVariant: TextSpacingVariant;
    bottomVariant: TextSpacingVariant;
    mode?: TextSpacingMode;
    tokenOverride?: string;
    className?: string;
  }>(),
  {
    mode: "default",
    tokenOverride: undefined,
    className: "",
  },
);

const token = computed(() =>
  props.tokenOverride ?? getTextSpacingToken(props.topVariant, props.bottomVariant, props.mode),
);
</script>

<template>
  <div
    class="mi-text-spacer"
    :class="className"
    :style="{ height: `var(${token})` }"
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
