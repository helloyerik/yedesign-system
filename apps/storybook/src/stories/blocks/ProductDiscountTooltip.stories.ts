import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ProductDiscountTooltip from "@components/blocks/ProductDiscountTooltip/ProductDiscountTooltip.vue";

const meta = {
  title: "Blocks/ProductDiscountTooltip",
  component: ProductDiscountTooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ProductDiscountTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
