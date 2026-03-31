<script setup lang="ts">
import { computed, useId, useSlots, ref } from "vue";
import { PhCaretDown } from "@phosphor-icons/vue";

export type AccordionItem = {
  id: string;
  title: string;
  content?: string | number | null;
};

type HeaderPaddingX = "default" | "none";

const props = withDefaults(
  defineProps<{
    items: AccordionItem[];
    defaultOpenId?: string;
    headerPaddingX?: HeaderPaddingX;
    className?: string;
  }>(),
  {
    defaultOpenId: undefined,
    headerPaddingX: "default",
    className: "",
  },
);

const baseId = useId();
const slots = useSlots();
const openId = ref<string | null>(props.defaultOpenId ?? null);

const rootClassName = computed(() =>
  ["mi-accordion", props.className].filter(Boolean).join(" "),
);

const headerClassName = computed(() =>
  props.headerPaddingX === "none"
    ? "mi-accordion__trigger mi-accordion__trigger--no-padding-x"
    : "mi-accordion__trigger",
);

const contentId = (itemId: string) => `${baseId}-${itemId}-content`;
const isOpen = (itemId: string) => openId.value === itemId;
const toggleItem = (itemId: string) => {
  openId.value = isOpen(itemId) ? null : itemId;
};
const getContentSlotName = (itemId: string) => `content-${itemId}`;
const hasContentSlot = (itemId: string) => Boolean(slots[getContentSlotName(itemId)]);
</script>

<template>
  <div :class="rootClassName">
    <div
      v-for="item in items"
      :key="item.id"
      class="mi-accordion__item"
    >
      <button
        type="button"
        :class="headerClassName"
        :aria-expanded="isOpen(item.id)"
        :aria-controls="contentId(item.id)"
        @click="toggleItem(item.id)"
      >
        <span class="mi-accordion__title">{{ item.title }}</span>
        <PhCaretDown
          :size="20"
          class="mi-accordion__icon"
          :class="{ 'is-open': isOpen(item.id) }"
          weight="regular"
        />
      </button>

      <div
        v-if="isOpen(item.id) && (hasContentSlot(item.id) || item.content != null)"
        :id="contentId(item.id)"
        class="mi-accordion__content"
      >
        <slot :name="getContentSlotName(item.id)">
          {{ item.content }}
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-accordion {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
}

.mi-accordion__item {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-background);
}

.mi-accordion__trigger {
  display: flex;
  width: 100%;
  cursor: pointer;
  align-items: center;
  gap: 11px;
  border: 0;
  background: transparent;
  padding-inline: var(--mi-spacing-16);
  padding-block: var(--mi-spacing-12);
  text-align: left;
}

.mi-accordion__trigger--no-padding-x {
  padding-inline: 0;
}

.mi-accordion__title {
  flex: 1 1 auto;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-accordion__icon {
  flex: 0 0 auto;
  color: var(--mi-color-text-hint);
  transition: transform 200ms ease;
}

.mi-accordion__icon.is-open {
  transform: rotate(180deg);
}

.mi-accordion__content {
  width: 100%;
}
</style>
