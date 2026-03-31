import type { Meta, StoryObj } from "@storybook/vue3-vite";
import InCartButton from "@components/atoms/InCartButton/InCartButton.vue";

const meta = {
  title: "Atoms/InCartButton",
  component: InCartButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "inline-radio",
      options: ["full", "hug"],
    },
  },
  args: {
    label: "В корзине",
    width: "full",
  },
} satisfies Meta<typeof InCartButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HugWidth: Story = {
  args: {
    width: "hug",
  },
};
