import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhHouse } from "@phosphor-icons/vue";
import NavigationItem from "@components/atoms/NavigationItem/NavigationItem.vue";

const meta = {
  title: "Atoms/NavigationItem",
  component: NavigationItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Главная",
    selected: false,
    collapsed: false,
  },
} satisfies Meta<typeof NavigationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NavigationItem, PhHouse },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 240px;">
        <NavigationItem v-bind="args" :icon="PhHouse" />
      </div>
    `,
  }),
};

export const Selected: Story = {
  args: {
    selected: true,
  },
};
