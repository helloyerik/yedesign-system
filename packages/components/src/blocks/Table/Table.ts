import {
  Checkbox,
} from "../../atoms";
import { PhDotsThreeVertical, PhCaretUp, PhCaretDown } from "@phosphor-icons/vue";
import {
  defineComponent,
  h,
  ref,
  computed,
  type PropType,
  type VNodeChild,
} from "vue";

export interface TableColumn<T = Record<string, unknown>> {
  id: string;
  header: VNodeChild;
  cell: (row: T) => VNodeChild;
  width?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  sortFn?: (a: T, b: T) => number;
}

export interface RowAction<T = Record<string, unknown>> {
  label: string;
  icon?: VNodeChild;
  onClick: (row: T) => void;
  theme?: "normal" | "danger";
  disabled?: boolean;
}

type SortDir = "asc" | "desc" | null;

const SortIcon = defineComponent({
  name: "MiTableSortIcon",
  props: {
    dir: {
      type: String as PropType<SortDir>,
      default: null,
    },
  },
  setup(props) {
    return () =>
      h("span", { class: "mi-table__sort-icon" }, [
        h(PhCaretUp, {
          size: 10,
          weight: "fill",
          class: props.dir === "asc" ? "mi-table__sort-caret is-active" : "mi-table__sort-caret",
        }),
        h(PhCaretDown, {
          size: 10,
          weight: "fill",
          class: props.dir === "desc" ? "mi-table__sort-caret is-active" : "mi-table__sort-caret",
        }),
      ]);
  },
});

const ActionsMenu = defineComponent({
  name: "MiTableActionsMenu",
  props: {
    row: {
      type: Object as PropType<Record<string, unknown>>,
      required: true,
    },
    actions: {
      type: Array as PropType<Array<RowAction<Record<string, unknown>>>>,
      required: true,
    },
  },
  setup(props) {
    const open = ref(false);

    return () =>
      h("div", { class: "mi-table__actions-menu" }, [
        h(
          "button",
          {
            type: "button",
            class: "mi-table__actions-trigger",
            onClick: (event: MouseEvent) => {
              event.stopPropagation();
              open.value = !open.value;
            },
          },
          [h(PhDotsThreeVertical, { size: 16, weight: "bold" })],
        ),
        open.value
          ? [
              h("div", {
                class: "mi-table__actions-overlay",
                onClick: () => {
                  open.value = false;
                },
              }),
              h(
                "div",
                { class: "mi-table__actions-dropdown" },
                props.actions.map((action) =>
                  h(
                    "button",
                    {
                      key: action.label,
                      type: "button",
                      disabled: action.disabled,
                      class: [
                        "mi-table__actions-item",
                        action.disabled ? "is-disabled" : "",
                        action.theme === "danger" ? "is-danger" : "",
                      ],
                      onClick: (event: MouseEvent) => {
                        event.stopPropagation();
                        action.onClick(props.row);
                        open.value = false;
                      },
                    },
                    [
                      action.icon
                        ? h("span", { class: "mi-table__actions-item-icon" }, [action.icon])
                        : null,
                      action.label,
                    ],
                  ),
                ),
              ),
            ]
          : null,
      ]);
  },
});

export default defineComponent({
  name: "Table",
  props: {
    data: {
      type: Array as PropType<Array<Record<string, unknown>>>,
      required: true,
    },
    columns: {
      type: Array as PropType<Array<TableColumn<Record<string, unknown>>>>,
      required: true,
    },
    getRowId: {
      type: Function as PropType<(row: Record<string, unknown>) => string>,
      required: true,
    },
    selectable: {
      type: Boolean,
      default: false,
    },
    selectionColumnWidth: {
      type: String,
      default: "44px",
    },
    selectionHeaderCellClassName: {
      type: String,
      default: "",
    },
    selectionCellClassName: {
      type: String,
      default: "",
    },
    selectionCheckboxVariant: {
      type: String as PropType<"brand" | "secondary">,
      default: "brand",
    },
    selectedIds: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    onSelectionChange: {
      type: Function as PropType<(ids: string[]) => void>,
      default: undefined,
    },
    actions: {
      type: Array as PropType<Array<RowAction<Record<string, unknown>>>>,
      default: undefined,
    },
    onRowClick: {
      type: Function as PropType<(row: Record<string, unknown>) => void>,
      default: undefined,
    },
    edgePadding: {
      type: Boolean,
      default: true,
    },
    verticalAlign: {
      type: String as PropType<"top" | "middle">,
      default: "top",
    },
    emptyMessage: {
      type: String,
      default: "Нет данных",
    },
    className: {
      type: String,
      default: "",
    },
    headerRowClassName: {
      type: String,
      default: "",
    },
    dataHeaderCellClassName: {
      type: String,
      default: "",
    },
    dataCellClassName: {
      type: String,
      default: "",
    },
    rowClassName: {
      type: String,
      default: "",
    },
    hideLastRowBorder: {
      type: Boolean,
      default: false,
    },
    selectedRowClassName: {
      type: String,
      default: "mi-table__row--selected",
    },
    rowHoverClassName: {
      type: String,
      default: "mi-table__row--hover",
    },
    selectedCellClassName: {
      type: String,
      default: "mi-table__cell--selected",
    },
    fixedLayout: {
      type: Boolean,
      default: false,
    },
    appendRow: {
      type: null as unknown as PropType<VNodeChild>,
      default: null,
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const sortCol = ref<string | null>(null);
    const sortDir = ref<SortDir>(null);

    const allIds = computed(() => props.data.map(props.getRowId));
    const allSelected = computed(
      () => allIds.value.length > 0 && allIds.value.every((id) => props.selectedIds.includes(id)),
    );
    const someSelected = computed(
      () => !allSelected.value && allIds.value.some((id) => props.selectedIds.includes(id)),
    );

    const sortedData = computed(() => {
      if (!sortCol.value || !sortDir.value) return props.data;
      const column = props.columns.find((entry) => entry.id === sortCol.value);
      if (!column?.sortFn) return props.data;
      const sorted = [...props.data].sort(column.sortFn);
      return sortDir.value === "desc" ? sorted.reverse() : sorted;
    });

    const handleSort = (columnId: string) => {
      if (sortCol.value === columnId) {
        const nextDir = sortDir.value === "asc" ? "desc" : sortDir.value === "desc" ? null : "asc";
        sortDir.value = nextDir;
        if (nextDir === null) {
          sortCol.value = null;
        }
        return;
      }

      sortCol.value = columnId;
      sortDir.value = "asc";
    };

    const toggleAll = () => {
      if (!props.onSelectionChange) return;
      props.onSelectionChange(allSelected.value ? [] : [...allIds.value]);
    };

    const toggleRow = (id: string) => {
      if (!props.onSelectionChange) return;
      props.onSelectionChange(
        props.selectedIds.includes(id)
          ? props.selectedIds.filter((value) => value !== id)
          : [...props.selectedIds, id],
      );
    };

    return () => {
      const vAlign = props.verticalAlign === "middle" ? "mi-table__cell--middle" : "mi-table__cell--top";
      const selectionAlignClass =
        props.verticalAlign === "middle"
          ? "mi-table__selection-wrap--middle"
          : "mi-table__selection-wrap--top";
      const edgePad = props.edgePadding ? "mi-table__edge-pad" : "";

      return h("div", { class: ["mi-table-wrap", props.className] }, [
        h(
          "table",
          {
            class: [
              "mi-table",
              props.fullWidth ? "mi-table--full-width" : "mi-table--auto-width",
              props.fixedLayout ? "mi-table--fixed" : "",
            ],
          },
          [
            h("thead", {}, [
              h(
                "tr",
                { class: ["mi-table__header-row", props.headerRowClassName] },
                [
                  props.selectable
                    ? h(
                        "th",
                        {
                          class: [
                            "mi-table__header-cell",
                            "mi-table__selection-cell",
                            vAlign,
                            props.edgePadding ? "mi-table__selection-cell--left-edge" : "",
                            props.selectionHeaderCellClassName,
                          ],
                          style: {
                            width: props.selectionColumnWidth,
                            minWidth: props.selectionColumnWidth,
                            maxWidth: props.selectionColumnWidth,
                          },
                        },
                        [
                          h("div", { class: ["mi-table__selection-wrap", selectionAlignClass] }, [
                            h(Checkbox, {
                              checked: allSelected.value,
                              indeterminate: someSelected.value,
                              variant: props.selectionCheckboxVariant,
                              onChange: toggleAll,
                            }),
                          ]),
                        ],
                      )
                    : null,
                  ...props.columns.map((column) =>
                    h(
                      "th",
                      {
                        key: column.id,
                        class: [
                          "mi-table__header-cell",
                          vAlign,
                          edgePad,
                          column.sortable ? "mi-table__header-cell--sortable" : "",
                          props.dataHeaderCellClassName,
                        ],
                        style: column.width
                          ? {
                              width: column.width,
                              minWidth: column.width,
                              maxWidth: column.width,
                              textAlign: column.align,
                            }
                          : { textAlign: column.align },
                        onClick: column.sortable ? () => handleSort(column.id) : undefined,
                      },
                      [
                        h(
                          "span",
                          {
                            class: [
                              "mi-table__header-cell-content",
                              column.align === "end"
                                ? "mi-table__header-cell-content--end"
                                : column.align === "center"
                                  ? "mi-table__header-cell-content--center"
                                  : "mi-table__header-cell-content--start",
                            ],
                          },
                          [
                            h("span", { class: "mi-table__header-label" }, [column.header]),
                            column.sortable ? h(SortIcon, { dir: sortCol.value === column.id ? sortDir.value : null }) : null,
                          ],
                        ),
                      ],
                    ),
                  ),
                  props.actions
                    ? h("th", {
                        class: [
                          "mi-table__header-cell",
                          vAlign,
                          props.edgePadding ? "mi-table__actions-head-cell" : "",
                        ],
                      })
                    : null,
                ],
              ),
            ]),
            h("tbody", {}, [
              sortedData.value.length === 0 && !props.appendRow
                ? h("tr", {}, [
                    h(
                      "td",
                      {
                        class: "mi-table__empty",
                        colSpan: props.columns.length + (props.selectable ? 1 : 0) + (props.actions ? 1 : 0),
                      },
                      props.emptyMessage,
                    ),
                  ])
                : sortedData.value.map((row) => {
                    const id = props.getRowId(row);
                    const isSelected = props.selectedIds.includes(id);

                    return h(
                      "tr",
                      {
                        key: id,
                        class: [
                          "mi-table__row",
                          props.hideLastRowBorder ? "mi-table__row--hide-last-border" : "",
                          props.onRowClick ? "mi-table__row--clickable" : "",
                          isSelected ? props.selectedRowClassName : props.rowHoverClassName,
                          props.rowClassName,
                        ],
                        onClick: props.onRowClick ? () => props.onRowClick?.(row) : undefined,
                      },
                      [
                        props.selectable
                          ? h(
                              "td",
                              {
                                class: [
                                  "mi-table__cell",
                                  "mi-table__selection-cell",
                                  vAlign,
                                  props.edgePadding ? "mi-table__selection-cell--left-edge" : "",
                                  props.selectionCellClassName,
                                ],
                                style: {
                                  width: props.selectionColumnWidth,
                                  minWidth: props.selectionColumnWidth,
                                  maxWidth: props.selectionColumnWidth,
                                },
                              },
                              [
                                h("div", { class: ["mi-table__selection-wrap", selectionAlignClass] }, [
                                  h(Checkbox, {
                                    checked: isSelected,
                                    variant: props.selectionCheckboxVariant,
                                    onChange: () => toggleRow(id),
                                  }),
                                ]),
                              ],
                            )
                          : null,
                        ...props.columns.map((column) =>
                          h(
                            "td",
                            {
                              key: column.id,
                              class: [
                                "mi-table__cell",
                                isSelected ? props.selectedCellClassName : "",
                                vAlign,
                                edgePad,
                                props.dataCellClassName,
                              ],
                              style: column.width
                                ? {
                                    width: column.width,
                                    minWidth: column.width,
                                    maxWidth: column.width,
                                    textAlign: column.align,
                                  }
                                : { textAlign: column.align },
                            },
                            [column.cell(row)],
                          ),
                        ),
                        props.actions
                          ? h(
                              "td",
                              {
                                class: [
                                  "mi-table__cell",
                                  vAlign,
                                  props.edgePadding ? "mi-table__actions-cell" : "",
                                ],
                              },
                              [h(ActionsMenu, { row, actions: props.actions })],
                            )
                          : null,
                      ],
                    );
                  }),
              props.appendRow,
            ]),
          ],
        ),
      ]);
    };
  },
});
