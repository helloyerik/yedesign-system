import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { h, ref } from "vue";
import Tree from "@components/blocks/Tree/Tree";
import type { TreeNode } from "@components/blocks/Tree/Tree";

const nodes: TreeNode[] = [
  {
    label: "Электроника",
    value: "electronics",
    children: [
      {
        label: "Смартфоны",
        value: "phones",
        children: [
          { label: "Apple", value: "apple" },
          { label: "Samsung", value: "samsung" },
        ],
      },
      { label: "Ноутбуки", value: "laptops" },
    ],
  },
  {
    label: "Бытовая техника",
    value: "appliances",
    children: [
      { label: "Холодильники", value: "fridges" },
      { label: "Пылесосы", value: "vacuum" },
    ],
  },
];

const meta = {
  title: "Blocks/Tree",
  component: Tree,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Tree },
    setup() {
      const selectedValue = ref("apple");
      return { nodes, selectedValue };
    },
    template: `
      <div style="width: 360px;">
        <Tree
          :nodes="nodes"
          :selected-value="selectedValue"
          :initial-expanded-values="['electronics', 'electronics/phones']"
          :on-select="(node) => selectedValue = node.value"
        />
      </div>
    `,
  }),
};

export const WithTrailingContent: Story = {
  render: () => ({
    components: { Tree },
    setup() {
      const selectedValue = ref("appliances");
      return {
        nodes,
        selectedValue,
        renderTrailingContent(node: TreeNode) {
          return h(
            "span",
            {
              style: {
                color: "var(--mi-color-text-secondary)",
                fontSize: "13px",
              },
            },
            node.children?.length ? String(node.children.length) : "",
          );
        },
      };
    },
    template: `
      <div style="width: 360px;">
        <Tree
          :nodes="nodes"
          :selected-value="selectedValue"
          :initial-expanded-values="['electronics', 'appliances']"
          :render-trailing-content="renderTrailingContent"
          :on-select="(node) => selectedValue = node.value"
        />
      </div>
    `,
  }),
};
