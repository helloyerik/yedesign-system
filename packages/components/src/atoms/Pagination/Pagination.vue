<script setup lang="ts">
import { computed } from "vue";
import { PhCaretLeft, PhCaretRight, PhCaretDoubleLeft, PhCaretDoubleRight } from "@phosphor-icons/vue";

type PaginationSize = "S" | "M" | "L";

const props = withDefaults(
  defineProps<{
    page: number;
    pageSize: number;
    total: number;
    size?: PaginationSize;
    compact?: boolean;
    showPages?: boolean;
    className?: string;
  }>(),
  {
    size: "M",
    compact: false,
    showPages: true,
    className: "",
  },
);

const emit = defineEmits<{
  update: [page: number, pageSize: number];
}>();

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));

const getPages = (current: number, total: number): Array<number | "..."> => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: Array<number | "..."> = [1];
  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);
  for (let i = start; i <= end; i += 1) pages.push(i);

  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
};

const pages = computed(() => getPages(props.page, totalPages.value));
const isFirst = computed(() => props.page <= 1);
const isLast = computed(() => props.page >= totalPages.value);

const updatePage = (page: number) => {
  emit("update", page, props.pageSize);
};
</script>

<template>
  <nav class="mi-pagination" :class="[`mi-pagination--${size}`, className]" aria-label="Pagination">
    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isFirst"
      @click="updatePage(1)"
      aria-label="First page"
    >
      <PhCaretDoubleLeft class="mi-pagination__icon" weight="bold" />
      <span v-if="!compact" class="mi-pagination__label">Первая</span>
    </button>

    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isFirst"
      @click="updatePage(props.page - 1)"
      aria-label="Previous page"
    >
      <PhCaretLeft class="mi-pagination__icon" weight="bold" />
      <span v-if="!compact" class="mi-pagination__label">Назад</span>
    </button>

    <div v-if="showPages" class="mi-pagination__pages">
      <template v-for="(entry, index) in pages" :key="`${entry}-${index}`">
        <span v-if="entry === '...'" class="mi-pagination__ellipsis">...</span>
        <button
          v-else
          type="button"
          class="mi-pagination__button mi-pagination__button--page"
          :class="{ 'is-active': entry === props.page }"
          @click="updatePage(entry)"
          :aria-label="`Page ${entry}`"
          :aria-current="entry === props.page ? 'page' : undefined"
        >
          {{ entry }}
        </button>
      </template>
    </div>

    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isLast"
      @click="updatePage(props.page + 1)"
      aria-label="Next page"
    >
      <span v-if="!compact" class="mi-pagination__label">Далее</span>
      <PhCaretRight class="mi-pagination__icon" weight="bold" />
    </button>

    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isLast"
      @click="updatePage(totalPages)"
      aria-label="Last page"
    >
      <span v-if="!compact" class="mi-pagination__label">Последняя</span>
      <PhCaretDoubleRight class="mi-pagination__icon" weight="bold" />
    </button>
  </nav>
</template>

<style scoped>
.mi-pagination {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-2);
}

.mi-pagination--L {
  gap: var(--mi-spacing-4);
}

.mi-pagination__pages {
  display: inline-flex;
  align-items: center;
  gap: inherit;
}

.mi-pagination__button,
.mi-pagination__ellipsis {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: var(--mi-size-pagination-m);
  height: var(--mi-size-pagination-m);
  padding-inline: var(--mi-spacing-8);
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  cursor: pointer;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;
  user-select: none;
  white-space: nowrap;
}

.mi-pagination--S .mi-pagination__button,
.mi-pagination--S .mi-pagination__ellipsis {
  min-width: var(--mi-size-pagination-s);
  height: var(--mi-size-pagination-s);
}

.mi-pagination--L .mi-pagination__button,
.mi-pagination--L .mi-pagination__ellipsis {
  min-width: var(--mi-size-pagination-l);
  height: var(--mi-size-pagination-l);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-pagination__button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
  color: var(--mi-color-text-hint);
}

.mi-pagination__button:not(:disabled):hover {
  background: var(--mi-color-base-generic);
}

.mi-pagination__button:not(:disabled):active {
  background: var(--mi-color-base-generic-hover);
}

.mi-pagination__button--page.is-active {
  background: var(--mi-color-base-generic);
}

.mi-pagination__ellipsis {
  cursor: default;
  color: var(--mi-color-text-hint);
}

.mi-pagination__label {
  margin-inline: var(--mi-spacing-2);
}

.mi-pagination__icon {
  width: var(--mi-size-pagination-icon-m);
  height: var(--mi-size-pagination-icon-m);
}

.mi-pagination--S .mi-pagination__icon {
  width: var(--mi-size-pagination-icon-s);
  height: var(--mi-size-pagination-icon-s);
}

.mi-pagination--L .mi-pagination__icon {
  width: var(--mi-size-pagination-icon-l);
  height: var(--mi-size-pagination-icon-l);
}
</style>
