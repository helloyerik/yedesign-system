import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ProductPriceTooltip from "@components/blocks/ProductPriceTooltip/ProductPriceTooltip.vue";

const meta = {
  title: "Blocks/ProductPriceTooltip",
  component: ProductPriceTooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "Выгода 31 000 ₸",
    priceRows: [
      { label: "Цена", value: "159 990 ₸", strike: true },
    ],
    discountRow: { label: "Скидка", discount: "-10%", value: "15 999 ₸" },
    totalLabel: "Итого",
    totalValue: "143 991 ₸",
  },
} satisfies Meta<typeof ProductPriceTooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
