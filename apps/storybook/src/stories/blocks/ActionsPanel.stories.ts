import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhTrash, PhCheck } from "@phosphor-icons/vue";
import ActionsPanel from "@components/blocks/ActionsPanel/ActionsPanel.vue";

const meta = {
  title: "Blocks/ActionsPanel",
  component: ActionsPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    selectedCount: 3,
    actions: [
      { id: "approve", label: "Принять", icon: PhCheck },
      { id: "remove", label: "Удалить", icon: PhTrash, theme: "danger" },
    ],
  },
} satisfies Meta<typeof ActionsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
