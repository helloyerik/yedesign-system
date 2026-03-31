import type { Meta, StoryObj } from "@storybook/vue3-vite";
import SpecificationItem from "@components/molecules/SpecificationItem/SpecificationItem.vue";

const meta = {
  title: "Molecules/SpecificationItem",
  component: SpecificationItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Артикул",
    value: "17682",
    copyable: true,
    isLink: false,
  },
} satisfies Meta<typeof SpecificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { SpecificationItem },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 360px;">
        <SpecificationItem v-bind="args" />
      </div>
    `,
  }),
};

export const Link: Story = {
  args: {
    label: "Бренд",
    value: "Apple",
    copyable: false,
    isLink: true,
  },
};
