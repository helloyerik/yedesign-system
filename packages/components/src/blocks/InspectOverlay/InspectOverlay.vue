<script setup lang="ts">
import { computed, reactive, ref, unref, watchEffect } from "vue";

type MaybeRef<T> = T | { value: T };

const props = withDefaults(
  defineProps<{
    enabled?: boolean;
    containerRef?: MaybeRef<HTMLElement | null>;
    className?: string;
  }>(),
  {
    enabled: false,
    containerRef: undefined,
    className: "",
  },
);

const state = reactive({
  rect: null as DOMRect | null,
  label: "",
});

const lastTarget = ref<Element | null>(null);

const resolvedContainer = computed(() => {
  const provided = props.containerRef ? unref(props.containerRef) : null;
  if (provided) return provided;
  if (typeof document === "undefined") return null;
  return document.body;
});

const updateFromTarget = (target: Element | null) => {
  if (!target) {
    state.rect = null;
    state.label = "";
    return;
  }

  const rect = target.getBoundingClientRect();
  if (rect.width <= 0 || rect.height <= 0) {
    state.rect = null;
    state.label = "";
    return;
  }

  state.rect = rect;
  state.label = `${target.tagName.toLowerCase()} · ${Math.round(rect.width)}×${Math.round(rect.height)}`;
};

const clearOverlay = () => {
  state.rect = null;
  state.label = "";
  lastTarget.value = null;
};

watchEffect((onCleanup) => {
  if (!props.enabled) {
    clearOverlay();
    return;
  }

  const container = resolvedContainer.value;
  if (!container) return;
  if (typeof window === "undefined") return;

  const handleMove = (event: MouseEvent) => {
    const target = event.target as Element | null;
    if (!target) {
      clearOverlay();
      return;
    }

    if (container !== target && !container.contains(target)) {
      clearOverlay();
      return;
    }

    lastTarget.value = target;
    updateFromTarget(target);
  };

  const handleLeave = () => {
    clearOverlay();
  };

  const handleScroll = () => {
    if (!lastTarget.value) return;
    updateFromTarget(lastTarget.value);
  };

  container.addEventListener("mousemove", handleMove);
  container.addEventListener("mouseleave", handleLeave);
  window.addEventListener("scroll", handleScroll, true);
  window.addEventListener("resize", handleScroll);

  onCleanup(() => {
    container.removeEventListener("mousemove", handleMove);
    container.removeEventListener("mouseleave", handleLeave);
    window.removeEventListener("scroll", handleScroll, true);
    window.removeEventListener("resize", handleScroll);
  });
});

const overlayVars = computed(() => {
  if (!state.rect) return {};
  return {
    "--mi-inspect-top": `${state.rect.top}px`,
    "--mi-inspect-left": `${state.rect.left}px`,
    "--mi-inspect-width": `${state.rect.width}px`,
    "--mi-inspect-height": `${state.rect.height}px`,
  } as Record<string, string>;
});

const labelStyle = computed(() => {
  if (!state.rect) return {};
  const viewportWidth = typeof window === "undefined" ? 0 : window.innerWidth;
  const labelWidth = 160;
  const top = Math.max(0, state.rect.top - 24);
  const left = Math.max(0, Math.min(state.rect.left, Math.max(0, viewportWidth - labelWidth)));
  return {
    top: `${top}px`,
    left: `${left}px`,
  };
});

const isVisible = computed(() => props.enabled && Boolean(state.rect));
</script>

<template>
  <Teleport to="body">
    <div v-if="isVisible" class="mi-inspect-overlay" :class="className" :style="overlayVars">
      <div class="mi-inspect-overlay__box" />
      <div class="mi-inspect-overlay__label" :style="labelStyle">
        {{ state.label }}
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.mi-inspect-overlay {
  position: fixed;
  inset: 0;
  z-index: 1100;
  pointer-events: none;
}

.mi-inspect-overlay__box {
  position: fixed;
  top: var(--mi-inspect-top);
  left: var(--mi-inspect-left);
  width: var(--mi-inspect-width);
  height: var(--mi-inspect-height);
  border: 1px solid var(--mi-color-line-info);
  background: color-mix(in srgb, var(--mi-color-line-info), transparent 85%);
  border-radius: var(--mi-radius-s);
}

.mi-inspect-overlay__label {
  position: fixed;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: var(--mi-spacing-4) var(--mi-spacing-8);
  border-radius: var(--mi-radius-s);
  background: var(--mi-color-text-info);
  color: var(--mi-color-brand-text-brand-contrast);
  font-family: var(--mi-font-family-mono);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
  box-shadow: var(--mi-shadow-soft);
}
</style>
