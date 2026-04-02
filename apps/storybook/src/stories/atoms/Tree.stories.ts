import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Tree from "@components/atoms/Tree/Tree.vue";

const meta = {
  title: "Atoms/Tree",
  component: Tree,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Tree>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { Tree },
    setup() {
      const selected = ref("phones");
      const nodes = [
        {
          label: "Каталог",
          value: "catalog",
          children: [
            { label: "Смартфоны", value: "phones" },
            { label: "Ноутбуки", value: "laptops" },
          ],
        },
        { label: "Акции", value: "sales" },
      ];
      return { nodes, selected };
    },
    template: `
      <div style="width: 320px;">
        <Tree :nodes="nodes" :selected-value="selected" @select="(node) => (selected = node.value)" />
      </div>
    `,
  }),
};
