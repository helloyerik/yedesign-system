import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import { PhScales, PhTrash } from "@phosphor-icons/vue";
import ActionsPanel from "@components/molecules/ActionsPanel/ActionsPanel.vue";

const meta = {
  title: "Molecules/ActionsPanel",
  component: ActionsPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    selectedCount: 3,
  },
} satisfies Meta<typeof ActionsPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const actions = [
  { id: "compare", label: "Сравнить", icon: PhScales },
  { id: "delete", label: "Удалить", icon: PhTrash, theme: "danger" as const },
];

export const Default: Story = {
  render: (args) => ({
    components: { ActionsPanel },
    setup() {
      const open = ref(args.open);
      return { args, open, actions };
    },
    template: `
      <div style="min-height: 260px; position: relative; background: var(--mi-color-base-background);">
        <ActionsPanel
          :open="open"
          :actions="actions"
          :selected-count="args.selectedCount"
          closable
          @close="open = false"
        />
      </div>
    `,
  }),
};
