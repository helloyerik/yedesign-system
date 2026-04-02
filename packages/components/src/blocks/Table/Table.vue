<script setup lang="ts">
import { computed, ref } from "vue";
import { PhCaretUp, PhCaretDown } from "@phosphor-icons/vue";
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
                <PhCaretUp :size="10" weight="fill" :class="{ 'is-active': sortCol === column.id && sortDir === 'asc' }" />
                <PhCaretDown :size="10" weight="fill" :class="{ 'is-active': sortCol === column.id && sortDir === 'desc' }" />
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
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-table__header-button {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-4);
  border: 0;
  background: transparent;
  cursor: pointer;
  color: inherit;
  font: inherit;
}

.mi-table__sort {
  display: inline-flex;
  flex-direction: column;
  gap: 0;
  color: var(--mi-color-text-hint);
  line-height: 0;
}

.mi-table__sort .is-active {
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
