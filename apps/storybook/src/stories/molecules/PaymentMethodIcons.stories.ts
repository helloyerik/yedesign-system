import type { Meta, StoryObj } from "@storybook/vue3-vite";
import PaymentMethodIcons from "@components/molecules/PaymentMethodIcons/PaymentMethodIcons.vue";

const meta = {
  title: "Molecules/PaymentMethodIcons",
  component: PaymentMethodIcons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof PaymentMethodIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
