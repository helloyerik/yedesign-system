<script setup lang="ts">
import { computed, defineComponent, h, ref } from "vue";
import { PhCaretDown, PhCaretRight } from "@phosphor-icons/vue";

export interface TreeNode {
  label: string;
  value: string;
  children?: TreeNode[];
}

const props = withDefaults(
  defineProps<{
    nodes: TreeNode[];
    selectedValue?: string;
    initialExpandedValues?: string[];
    className?: string;
  }>(),
  {
    selectedValue: undefined,
    initialExpandedValues: () => [],
    className: "",
  },
);

const emit = defineEmits<{
  select: [node: TreeNode];
}>();

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

const TreeNodeView = defineComponent({
  name: "TreeNodeView",
  props: {
    node: { type: Object as () => TreeNode, required: true },
    depth: { type: Number, required: true },
    parentPath: { type: String, required: true },
  },
  setup(nodeProps, { slots }) {
    const path = computed(() =>
      nodeProps.parentPath ? `${nodeProps.parentPath}/${nodeProps.node.value}` : nodeProps.node.value,
    );
    const hasChildren = computed(() => Boolean(nodeProps.node.children?.length));
    const isExpanded = computed(() => expandedValues.value.has(path.value));
    const isSelected = computed(() => props.selectedValue === nodeProps.node.value);
    const paddingLeft = computed(
      () => `calc(var(--mi-spacing-4) + ${nodeProps.depth} * var(--mi-spacing-20))`,
    );

    return () =>
      h("div", { class: "mi-tree__node" }, [
        h("div", { class: "mi-tree__row", style: { paddingLeft: paddingLeft.value } }, [
          h(
            "button",
            {
              class: "mi-tree__toggle",
              type: "button",
              "aria-label": isExpanded.value ? `Свернуть ${nodeProps.node.label}` : `Развернуть ${nodeProps.node.label}`,
              onClick: (event: Event) => {
                event.stopPropagation();
                if (hasChildren.value) toggleExpanded(path.value);
              },
            },
            hasChildren.value
              ? h(isExpanded.value ? PhCaretDown : PhCaretRight, { size: 14, weight: "fill" })
              : null,
          ),
          h(
            "button",
            {
              type: "button",
              class: ["mi-tree__label", isSelected.value ? "is-selected" : ""],
              onClick: () => emit("select", nodeProps.node),
            },
            [
              h("span", { class: "mi-tree__label-text" }, nodeProps.node.label),
              slots.trailing ? h("span", { class: "mi-tree__trailing" }, slots.trailing({ node: nodeProps.node })) : null,
            ],
          ),
        ]),
        hasChildren.value && isExpanded.value
          ? h(
              "div",
              { class: "mi-tree__children" },
              nodeProps.node.children?.map((child) =>
                h(TreeNodeView, {
                  node: child,
                  depth: nodeProps.depth + 1,
                  parentPath: path.value,
                }),
              ),
            )
          : null,
      ]);
  },
});
</script>

<template>
  <div class="mi-tree" :class="className">
    <TreeNodeView v-for="node in nodes" :key="node.value" :node="node" :depth="0" parent-path="">
      <template #trailing="{ node }">
        <slot name="trailing" :node="node" />
      </template>
    </TreeNodeView>
  </div>
</template>

<style scoped>
.mi-tree {
  width: 100%;
  padding-block: var(--mi-spacing-4);
}

.mi-tree__row {
  display: flex;
  align-items: center;
  width: 100%;
}

.mi-tree__toggle {
  width: var(--mi-spacing-32);
  height: var(--mi-spacing-32);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  background: transparent;
  color: var(--mi-color-text-secondary);
  cursor: pointer;
}

.mi-tree__label {
  flex: 1 1 auto;
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  padding: var(--mi-spacing-8) var(--mi-spacing-4);
  border: 0;
  border-radius: var(--mi-radius-xs);
  background: transparent;
  cursor: pointer;
  text-align: left;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  transition: background-color 150ms ease;
}

.mi-tree__label:hover {
  background: var(--mi-color-base-generic-hover);
}

.mi-tree__label.is-selected {
  background: var(--mi-color-base-generic);
}

.mi-tree__label-text {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.mi-tree__trailing {
  display: inline-flex;
  align-items: center;
}
</style>
