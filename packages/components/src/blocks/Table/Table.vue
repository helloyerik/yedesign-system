<script setup lang="ts">
import { computed, ref } from "vue";
import Checkbox from "../../atoms/Checkbox/Checkbox.vue";
import DropdownMenu from "../../atoms/DropdownMenu/DropdownMenu.vue";

export interface TableColumn<T> {
  id: string;
  header: string;
  cell: (row: T) => string | number;
  width?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
}

interface RowAction<T> {
  label: string;
  icon?: unknown;
  onClick: (row: T) => void;
  theme?: "normal" | "danger";
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    data: any[];
    columns: TableColumn<any>[];
    getRowId: (row: any) => string;
    selectable?: boolean;
    selectedIds?: string[];
    selectionColumnWidth?: string;
    actions?: RowAction<any>[];
    fullWidth?: boolean;
    fixedLayout?: boolean;
    hideLastRowBorder?: boolean;
    rowHoverClassName?: string;
    selectedRowClassName?: string;
    className?: string;
  }>(),
  {
    selectable: false,
    selectedIds: () => [],
    selectionColumnWidth: "44px",
    actions: () => [],
    fullWidth: true,
    fixedLayout: false,
    hideLastRowBorder: false,
    rowHoverClassName: "",
    selectedRowClassName: "is-selected",
    className: "",
  },
);

const emit = defineEmits<{
  "selection-change": [ids: string[]];
  "row-click": [row: any];
}>();

const sortCol = ref<string | null>(null);
const sortDir = ref<"asc" | "desc" | null>(null);

const allIds = computed(() => props.data.map((row) => props.getRowId(row)));
const allSelected = computed(() => allIds.value.length > 0 && allIds.value.every((id) => props.selectedIds.includes(id)));
const someSelected = computed(() => !allSelected.value && allIds.value.some((id) => props.selectedIds.includes(id)));

const sortedData = computed(() => {
  if (!sortCol.value || !sortDir.value) return props.data;
  const col = props.columns.find((c) => c.id === sortCol.value);
  if (!col?.sortFn) return props.data;
  const next = [...props.data].sort(col.sortFn);
  return sortDir.value === "desc" ? next.reverse() : next;
});

const toggleAll = () => {
  if (allSelected.value) {
    emit("selection-change", []);
    return;
  }
  emit("selection-change", [...allIds.value]);
};

const toggleRow = (id: string) => {
  if (props.selectedIds.includes(id)) {
    emit("selection-change", props.selectedIds.filter((value) => value !== id));
    return;
  }
  emit("selection-change", [...props.selectedIds, id]);
};

const handleSort = (column: TableColumn<any>) => {
  if (!column.sortable) return;
  if (sortCol.value === column.id) {
    sortDir.value = sortDir.value === "asc" ? "desc" : sortDir.value === "desc" ? null : "asc";
    if (!sortDir.value) sortCol.value = null;
  } else {
    sortCol.value = column.id;
    sortDir.value = "asc";
  }
};
</script>

<template>
  <div class="mi-table" :class="className">
    <table
      class="mi-table__table"
      :class="{
        'is-full': fullWidth,
        'is-fixed': fixedLayout,
      }"
    >
      <thead>
        <tr class="mi-table__header-row">
          <th v-if="selectable" class="mi-table__cell" :style="{ width: selectionColumnWidth }">
            <Checkbox
              :checked="allSelected"
              :indeterminate="someSelected"
              @change="toggleAll"
            />
          </th>
          <th
            v-for="column in columns"
            :key="column.id"
            class="mi-table__cell mi-table__cell--header"
            :style="{ width: column.width }"
          >
            <button
              type="button"
              class="mi-table__header-button"
              :class="{ 'is-sortable': column.sortable }"
              @click="handleSort(column)"
            >
              <span>{{ column.header }}</span>
              <span v-if="column.sortable" class="mi-table__sort">
                <svg
                  v-if="sortCol === column.id && sortDir === 'asc'"
                  class="mi-table__sort-icon"
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M0.0385188 3.69164C0.000619672 3.60029 -0.00933637 3.49975 0.00990999 3.40274C0.0291564 3.30573 0.0767402 3.21661 0.146644 3.14664L3.14664 0.146643C3.19308 0.100155 3.24822 0.0632755 3.30892 0.0381134C3.36962 0.0129512 3.43469 0 3.50039 0C3.5661 0 3.63116 0.0129512 3.69186 0.0381134C3.75256 0.0632755 3.80771 0.100155 3.85414 0.146643L6.85414 3.14664C6.92415 3.21657 6.97183 3.3057 6.99116 3.40274C7.01048 3.49978 7.00058 3.60038 6.9627 3.69179C6.92483 3.7832 6.86068 3.86132 6.77839 3.91625C6.69609 3.97119 6.59934 4.00047 6.50039 4.00039H0.500394C0.401504 4.00037 0.304841 3.97103 0.222628 3.91607C0.140415 3.86111 0.0763442 3.78301 0.0385188 3.69164Z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  v-else-if="sortCol === column.id && sortDir === 'desc'"
                  class="mi-table__sort-icon"
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M6.50039 9.00039H0.500394C0.401446 9.00032 0.3047 9.0296 0.222403 9.08453C0.140106 9.13947 0.0759587 9.21759 0.0380825 9.309C0.000206247 9.40041 -0.00969606 9.501 0.00962914 9.59805C0.0289543 9.69509 0.0766379 9.78422 0.146644 9.85414L3.14664 12.8541C3.19308 12.9006 3.24822 12.9375 3.30892 12.9627C3.36962 12.9878 3.43469 13.0008 3.50039 13.0008C3.5661 13.0008 3.63116 12.9878 3.69186 12.9627C3.75256 12.9375 3.80771 12.9006 3.85414 12.8541L6.85414 9.85414C6.92415 9.78422 6.97183 9.69509 6.99116 9.59805C7.01048 9.501 7.00058 9.40041 6.9627 9.309C6.92483 9.21759 6.86068 9.13947 6.77839 9.08453C6.69609 9.0296 6.59934 9.00032 6.50039 9.00039Z"
                    fill="currentColor"
                  />
                </svg>
                <svg
                  v-else
                  class="mi-table__sort-icon"
                  width="7"
                  height="13"
                  viewBox="0 0 7 13"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                >
                  <path
                    d="M0.0385188 3.69164C0.000619672 3.60029 -0.00933637 3.49975 0.00990999 3.40274C0.0291564 3.30573 0.0767402 3.21661 0.146644 3.14664L3.14664 0.146643C3.19308 0.100155 3.24822 0.0632755 3.30892 0.0381134C3.36962 0.0129512 3.43469 0 3.50039 0C3.5661 0 3.63116 0.0129512 3.69186 0.0381134C3.75256 0.0632755 3.80771 0.100155 3.85414 0.146643L6.85414 3.14664C6.92415 3.21657 6.97183 3.3057 6.99116 3.40274C7.01048 3.49978 7.00058 3.60038 6.9627 3.69179C6.92483 3.7832 6.86068 3.86132 6.77839 3.91625C6.69609 3.97119 6.59934 4.00047 6.50039 4.00039H0.500394C0.401504 4.00037 0.304841 3.97103 0.222628 3.91607C0.140415 3.86111 0.0763442 3.78301 0.0385188 3.69164ZM6.50039 9.00039H0.500394C0.401446 9.00032 0.3047 9.0296 0.222403 9.08453C0.140106 9.13947 0.0759587 9.21759 0.0380825 9.309C0.000206247 9.40041 -0.00969606 9.501 0.00962914 9.59805C0.0289543 9.69509 0.0766379 9.78422 0.146644 9.85414L3.14664 12.8541C3.19308 12.9006 3.24822 12.9375 3.30892 12.9627C3.36962 12.9878 3.43469 13.0008 3.50039 13.0008C3.5661 13.0008 3.63116 12.9878 3.69186 12.9627C3.75256 12.9375 3.80771 12.9006 3.85414 12.8541L6.85414 9.85414C6.92415 9.78422 6.97183 9.69509 6.99116 9.59805C7.01048 9.501 7.00058 9.40041 6.9627 9.309C6.92483 9.21759 6.86068 9.13947 6.77839 9.08453C6.69609 9.0296 6.59934 9.00032 6.50039 9.00039Z"
                    fill="currentColor"
                  />
                </svg>
              </span>
            </button>
          </th>
          <th v-if="actions.length" class="mi-table__cell mi-table__cell--header" />
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in sortedData"
          :key="getRowId(row)"
          class="mi-table__row"
          :class="[
            rowHoverClassName,
            selectedIds.includes(getRowId(row)) ? selectedRowClassName : '',
            hideLastRowBorder && index === sortedData.length - 1 ? 'no-border' : '',
          ]"
          @click="emit('row-click', row)"
        >
          <td v-if="selectable" class="mi-table__cell" :style="{ width: selectionColumnWidth }">
            <Checkbox
              :checked="selectedIds.includes(getRowId(row))"
              @change="toggleRow(getRowId(row))"
            />
          </td>
          <td
            v-for="column in columns"
            :key="column.id"
            class="mi-table__cell"
            :class="`align-${column.align ?? 'start'}`"
          >
            {{ column.cell(row) }}
          </td>
          <td v-if="actions.length" class="mi-table__cell mi-table__cell--actions">
            <DropdownMenu
              :items="actions.map((action) => ({
                id: action.label,
                label: action.label,
                icon: action.icon,
                theme: action.theme,
                disabled: action.disabled,
                onClick: () => action.onClick(row),
              }))"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.mi-table {
  width: 100%;
  overflow-x: auto;
}

.mi-table__table {
  border-collapse: collapse;
  width: 100%;
}

.mi-table__table.is-fixed {
  table-layout: fixed;
}

.mi-table__row {
  border-bottom: 1px solid var(--mi-color-line-generic);
}

.mi-table__row.no-border {
  border-bottom: 0;
}

.mi-table__cell {
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  text-align: left;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-table__cell--header {
  box-sizing: border-box;
  height: var(--mi-spacing-6xl);
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  border-bottom: var(--mi-size-hairline) solid var(--mi-color-line-generic);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-1);
  font-size: var(--mi-font-size-subheader-1);
  line-height: var(--mi-line-height-subheader-1);
  font-weight: var(--mi-font-weight-subheader-1);
}

.mi-table__header-button {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  border: 0;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font: inherit;
}

.mi-table__sort {
  display: inline-flex;
  align-items: center;
  color: var(--mi-color-text-primary);
}

.mi-table__sort-icon {
  display: block;
  color: var(--mi-color-text-primary);
}

.mi-table__cell.align-center {
  text-align: center;
}

.mi-table__cell.align-end {
  text-align: right;
}

.mi-table__cell--actions {
  width: var(--mi-spacing-32);
}
</style>
