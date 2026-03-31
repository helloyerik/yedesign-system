import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DiscountReasonContainer from "@components/molecules/DiscountReasonContainer/DiscountReasonContainer.vue";

const meta = {
  title: "Molecules/DiscountReasonContainer",
  component: DiscountReasonContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DiscountReasonContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: { DiscountReasonContainer },
    template: `
      <div style="width: 343px;">
        <DiscountReasonContainer />
      </div>
    `,
  }),
};
