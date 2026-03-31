import { PhCaretDown, PhCaretRight } from "@phosphor-icons/vue";
import {
  defineComponent,
  h,
  ref,
  type PropType,
  type CSSProperties,
  type VNodeChild,
} from "vue";

export interface TreeNode {
  label: string;
  value: string;
  children?: TreeNode[];
}

export default defineComponent({
  name: "Tree",
  props: {
    nodes: {
      type: Array as PropType<TreeNode[]>,
      required: true,
    },
    selectedValue: {
      type: String,
      default: undefined,
    },
    onSelect: {
      type: Function as PropType<(node: TreeNode) => void>,
      required: true,
    },
    initialExpandedValues: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    className: {
      type: String,
      default: "",
    },
    renderTrailingContent: {
      type: Function as PropType<(node: TreeNode) => VNodeChild>,
      default: undefined,
    },
    selectedItemClassName: {
      type: String,
      default: "mi-tree__item--selected",
    },
  },
  setup(props) {
    const expandedValues = ref(new Set(props.initialExpandedValues));

    const toggleExpanded = (value: string) => {
      const next = new Set(expandedValues.value);
      if (next.has(value)) {
        next.delete(value);
      } else {
        next.add(value);
      }
      expandedValues.value = next;
    };

    const renderNode = (node: TreeNode, depth: number, parentPath: string): VNodeChild => {
      const path = parentPath ? `${parentPath}/${node.value}` : node.value;
      const hasChildren = Boolean(node.children?.length);
      const isExpanded = expandedValues.value.has(path);
      const isSelected = props.selectedValue === node.value;
      const trailingContent = props.renderTrailingContent?.(node);
      const indentStyle: CSSProperties = {
        paddingLeft: `calc(var(--mi-spacing-4) + ${depth} * var(--mi-spacing-16))`,
      };

      return h("div", { key: path }, [
        h("div", { class: "mi-tree__node-wrap", style: indentStyle }, [
          h(
            "div",
            {
              class: [
                "mi-tree__node",
                isSelected ? props.selectedItemClassName : "mi-tree__node--hover",
              ],
            },
            [
              h("span", { class: "mi-tree__toggle-wrap" }, [
                hasChildren
                  ? h(
                      "button",
                      {
                        type: "button",
                        class: "mi-tree__toggle",
                        "aria-label": isExpanded ? `Свернуть ${node.label}` : `Развернуть ${node.label}`,
                        onClick: (event: MouseEvent) => {
                          event.stopPropagation();
                          toggleExpanded(path);
                        },
                      },
                      [
                        isExpanded
                          ? h(PhCaretDown, { size: 14, weight: "fill" })
                          : h(PhCaretRight, { size: 14, weight: "fill" }),
                      ],
                    )
                  : null,
              ]),
              h(
                "button",
                {
                  type: "button",
                  class: "mi-tree__label-button",
                  onClick: () => props.onSelect(node),
                },
                [
                  h("span", { class: "mi-tree__label" }, node.label),
                  trailingContent ? h("span", { class: "mi-tree__trailing" }, [trailingContent]) : null,
                ],
              ),
            ],
          ),
        ]),
        hasChildren && isExpanded
          ? h("div", { class: "mi-tree__children" }, node.children?.map((child) => renderNode(child, depth + 1, path)))
          : null,
      ]);
    };

    return () =>
      h(
        "div",
        { class: ["mi-tree", props.className] },
        props.nodes.map((node) => renderNode(node, 0, "")),
      );
  },
});
