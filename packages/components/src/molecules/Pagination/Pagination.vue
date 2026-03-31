<script setup lang="ts">
import { computed } from "vue";
import {
  PhCaretDoubleLeft,
  PhCaretDoubleRight,
  PhCaretLeft,
  PhCaretRight,
} from "@phosphor-icons/vue";

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

const sizeConfig = {
  S: { icon: 14 },
  M: { icon: 16 },
  L: { icon: 18 },
} satisfies Record<PaginationSize, { icon: number }>;

const getPages = (current: number, totalPages: number): Array<number | "..."> => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages: Array<number | "..."> = [1];

  if (current > 3) {
    pages.push("...");
  }

  const start = Math.max(2, current - 1);
  const end = Math.min(totalPages - 1, current + 1);

  for (let page = start; page <= end; page += 1) {
    pages.push(page);
  }

  if (current < totalPages - 2) {
    pages.push("...");
  }

  pages.push(totalPages);
  return pages;
};

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)));
const pages = computed(() => getPages(props.page, totalPages.value));
const isFirst = computed(() => props.page <= 1);
const isLast = computed(() => props.page >= totalPages.value);
const iconSize = computed(() => sizeConfig[props.size].icon);

const rootClassName = computed(() => [
  "mi-pagination",
  `mi-pagination--${props.size}`,
  props.className,
]);

const updatePage = (nextPage: number) => {
  emit("update", nextPage, props.pageSize);
};
</script>

<template>
  <nav :class="rootClassName" aria-label="Pagination">
    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isFirst"
      aria-label="First page"
      @click="updatePage(1)"
    >
      <PhCaretDoubleLeft :size="iconSize" />
      <span v-if="!compact" class="mi-pagination__text mi-pagination__text--after">Первая</span>
    </button>

    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isFirst"
      aria-label="Previous page"
      @click="updatePage(page - 1)"
    >
      <PhCaretLeft :size="iconSize" />
      <span v-if="!compact" class="mi-pagination__text mi-pagination__text--after">Назад</span>
    </button>

    <div v-if="showPages" class="mi-pagination__pages">
      <template v-for="(item, index) in pages" :key="`${item}-${index}`">
        <span
          v-if="item === '...'"
          class="mi-pagination__button mi-pagination__button--ellipsis"
        >
          ...
        </span>

        <button
          v-else
          type="button"
          class="mi-pagination__button mi-pagination__button--page"
          :class="{ 'is-active': item === page }"
          :aria-current="item === page ? 'page' : undefined"
          :aria-label="`Page ${item}`"
          @click="updatePage(item)"
        >
          {{ item }}
        </button>
      </template>
    </div>

    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isLast"
      aria-label="Next page"
      @click="updatePage(page + 1)"
    >
      <span v-if="!compact" class="mi-pagination__text mi-pagination__text--before">Далее</span>
      <PhCaretRight :size="iconSize" />
    </button>

    <button
      type="button"
      class="mi-pagination__button mi-pagination__button--nav"
      :disabled="isLast"
      aria-label="Last page"
      @click="updatePage(totalPages)"
    >
      <span v-if="!compact" class="mi-pagination__text mi-pagination__text--before">Последняя</span>
      <PhCaretDoubleRight :size="iconSize" />
    </button>
  </nav>
</template>

<style scoped>
.mi-pagination {
  --mi-pagination-height: 32px;
  --mi-pagination-min-width: 32px;
  --mi-pagination-gap: 2px;
  --mi-pagination-font-family: var(--mi-font-family-body-1);
  --mi-pagination-font-size: var(--mi-font-size-body-1);
  --mi-pagination-font-weight: var(--mi-font-weight-body-1);
  --mi-pagination-line-height: var(--mi-line-height-body-1);

  display: inline-flex;
  align-items: center;
  gap: var(--mi-pagination-gap);
}

.mi-pagination--S {
  --mi-pagination-height: 28px;
  --mi-pagination-min-width: 28px;
  --mi-pagination-gap: 2px;
  --mi-pagination-font-family: var(--mi-font-family-body-1);
  --mi-pagination-font-size: var(--mi-font-size-body-1);
  --mi-pagination-font-weight: var(--mi-font-weight-body-1);
  --mi-pagination-line-height: var(--mi-line-height-body-1);
}

.mi-pagination--M {
  --mi-pagination-height: 32px;
  --mi-pagination-min-width: 32px;
  --mi-pagination-gap: 2px;
  --mi-pagination-font-family: var(--mi-font-family-body-1);
  --mi-pagination-font-size: var(--mi-font-size-body-1);
  --mi-pagination-font-weight: var(--mi-font-weight-body-1);
  --mi-pagination-line-height: var(--mi-line-height-body-1);
}

.mi-pagination--L {
  --mi-pagination-height: 36px;
  --mi-pagination-min-width: 36px;
  --mi-pagination-gap: 4px;
  --mi-pagination-font-family: var(--mi-font-family-body-2);
  --mi-pagination-font-size: var(--mi-font-size-body-2);
  --mi-pagination-font-weight: var(--mi-font-weight-body-2);
  --mi-pagination-line-height: var(--mi-line-height-body-2);
}

.mi-pagination__pages {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-pagination-gap);
}

.mi-pagination__button {
  display: inline-flex;
  min-width: var(--mi-pagination-min-width);
  height: var(--mi-pagination-height);
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  gap: 0;
  padding: 0 var(--mi-spacing-8);
  border: 0;
  border-radius: var(--mi-radius-m);
  background: transparent;
  color: var(--mi-color-text-primary);
  cursor: pointer;
  user-select: none;
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;
  font-family: var(--mi-pagination-font-family);
  font-size: var(--mi-pagination-font-size);
  font-weight: var(--mi-pagination-font-weight);
  line-height: var(--mi-pagination-line-height);
}

.mi-pagination__button--nav {
  color: var(--mi-color-text-secondary);
}

.mi-pagination__button:hover:not(:disabled) {
  background: var(--mi-color-base-generic);
}

.mi-pagination__button:active:not(:disabled) {
  background: var(--mi-color-base-generic-hover);
}

.mi-pagination__button.is-active {
  background: var(--mi-color-base-generic);
}

.mi-pagination__button:disabled {
  background: transparent;
  color: var(--mi-color-text-hint);
  cursor: not-allowed;
}

.mi-pagination__button--ellipsis {
  color: var(--mi-color-text-hint);
  cursor: default;
}

.mi-pagination__text--before {
  margin-right: 2px;
}

.mi-pagination__text--after {
  margin-left: 2px;
}
</style>
