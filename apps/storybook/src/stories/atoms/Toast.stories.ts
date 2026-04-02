import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Toast from "@components/atoms/Toast/Toast.vue";

const meta = {
  title: "Atoms/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["success", "error"],
    },
    appearance: {
      control: "inline-radio",
      options: ["default", "light"],
    },
  },
  args: {
    message: "Товар добавлен в корзину",
    variant: "success",
    appearance: "light",
    buttonLabel: "Отменить",
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
