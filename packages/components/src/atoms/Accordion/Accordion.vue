<script setup lang="ts">
import { computed, ref, useId } from "vue";
import { PhCaretDown } from "@phosphor-icons/vue";

export type AccordionItem = {
  id: string;
  title: string;
  content?: string;
};

const props = withDefaults(
  defineProps<{
    items: AccordionItem[];
    defaultOpenId?: string;
    className?: string;
    headerPaddingX?: "default" | "none";
  }>(),
  {
    defaultOpenId: undefined,
    className: "",
    headerPaddingX: "default",
  },
);

const openId = ref<string | null>(props.defaultOpenId ?? null);
const rootId = useId();

const headerPaddingClass = computed(() =>
  props.headerPaddingX === "none" ? "mi-accordion__header--no-padding" : "mi-accordion__header--default-padding",
);

const toggleItem = (id: string) => {
  openId.value = openId.value === id ? null : id;
};

const isOpen = (id: string) => openId.value === id;
const contentId = (id: string) => `${rootId}-${id}-content`;
</script>

<template>
  <div class="mi-accordion" :class="className">
    <div v-for="item in items" :key="item.id" class="mi-accordion__item">
      <button
        type="button"
        class="mi-accordion__header"
        :class="headerPaddingClass"
        :aria-expanded="isOpen(item.id)"
        :aria-controls="contentId(item.id)"
        @click="toggleItem(item.id)"
      >
        <span class="mi-accordion__title">{{ item.title }}</span>
        <PhCaretDown :size="20" class="mi-accordion__caret" :class="{ 'is-open': isOpen(item.id) }" />
      </button>
      <div v-if="isOpen(item.id)" :id="contentId(item.id)" class="mi-accordion__content">
        <slot name="content" :item="item" :isOpen="isOpen(item.id)">
          <div v-if="item.content" class="mi-accordion__content-text">{{ item.content }}</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-accordion {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.mi-accordion__item {
  width: 100%;
  background: var(--mi-color-surface-panel);
  border-radius: var(--mi-radius-m);
  overflow: hidden;
}

.mi-accordion__header {
  display: flex;
  align-items: center;
  gap: calc(var(--mi-spacing-8) + var(--mi-spacing-3));
  width: 100%;
  border: 0;
  background: transparent;
  text-align: left;
  cursor: pointer;
  padding-block: var(--mi-spacing-12);
}

.mi-accordion__header--default-padding {
  padding-inline: var(--mi-spacing-16);
}

.mi-accordion__header--no-padding {
  padding-inline: 0;
}

.mi-accordion__header:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px var(--mi-color-brand-base-selection);
}

.mi-accordion__title {
  flex: 1 1 auto;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-accordion__caret {
  flex: 0 0 auto;
  color: var(--mi-color-text-primary);
  transition: transform 200ms ease;
}

.mi-accordion__caret.is-open {
  transform: rotate(180deg);
}

.mi-accordion__content {
  width: 100%;
}

.mi-accordion__content-text {
  padding-inline: var(--mi-spacing-16);
  padding-bottom: var(--mi-spacing-12);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}
</style>
