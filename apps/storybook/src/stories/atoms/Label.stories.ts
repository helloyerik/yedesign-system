import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Label from "@components/atoms/Label/Label.vue";

const meta = {
  title: "Atoms/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    colorScheme: {
      control: "inline-radio",
      options: ["success", "warning", "info", "supplier"],
    },
  },
  args: {
    text: "Выгода 31 000",
    colorScheme: "success",
    showCaret: true,
    tooltip: "Скидка применяется автоматически на этапе оплаты.",
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
