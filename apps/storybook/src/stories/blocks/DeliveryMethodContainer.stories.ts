import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DeliveryMethodContainer from "@components/blocks/DeliveryMethodContainer/DeliveryMethodContainer.vue";

const meta = {
  title: "Blocks/DeliveryMethodContainer",
  component: DeliveryMethodContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof DeliveryMethodContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
