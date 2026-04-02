import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ProductLabelGroup from "@components/blocks/ProductLabelGroup/ProductLabelGroup.vue";

const meta = {
  title: "Blocks/ProductLabelGroup",
  component: ProductLabelGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    items: [
      {
        id: "discount",
        text: "Уцененный товар",
        colorScheme: "warning",
        showCaret: true,
        tooltip: "Причина уценки: незначительные следы эксплуатации.",
      },
      {
        id: "savings",
        text: "Выгода 31 000",
        colorScheme: "success",
        showCaret: true,
        tooltip: "Скидка применяется автоматически.",
      },
      {
        id: "supplier",
        text: "Официальный поставщик",
        colorScheme: "supplier",
        showCaret: true,
      },
    ],
  },
} satisfies Meta<typeof ProductLabelGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
