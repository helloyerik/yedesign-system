import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DiscountReasonContainer from "@components/blocks/DiscountReasonContainer/DiscountReasonContainer.vue";

const meta = {
  title: "Blocks/DiscountReasonContainer",
  component: DiscountReasonContainer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "Причины уценки:",
    summary: "ТОВАР БЫВШИЙ В УПОТРЕБЛЕНИИ (может иметь следы использования)",
    details:
      "ТОВАР ПОЛНОСТЬЮ РАБОТОСПОСОБЕН И ПРОВЕРЕН ПО ВСЕМ ФУНКЦИЯМ. ТОВАР МОЖЕТ НЕ ИМЕТЬ ИНСТРУКЦИИ ИЛИ НАКЛЕЕК. КОРОБКА МОЖЕТ ИМЕТЬ ПОВРЕЖДЕНИЯ ИЛИ ИМЕТЬ ПЯТНА, А ТАКЖЕ МОЖЕТ ИМЕТЬ НЕСООТВЕТСТВИЕ СЕРИЙНОГО НОМЕРА.",
    detailsLabel: "Подробнее",
  },
} satisfies Meta<typeof DiscountReasonContainer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
