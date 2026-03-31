import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ButtonGroup from "@components/molecules/ButtonGroup/ButtonGroup.vue";

const meta = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    primaryVariant: {
      control: "inline-radio",
      options: ["primary", "brand-secondary", "secondary", "outline", "text-only"],
    },
    buttonSize: {
      control: "inline-radio",
      options: ["L", "M", "S", "XS"],
    },
    inCart: { control: "boolean" },
    showPrimary: { control: "boolean" },
    horizontal: { control: "boolean" },
  },
  args: {
    primaryLabel: "{Primary}",
    secondaryLabel: "{Secondary}",
    inCartLabel: "В корзине",
    inCart: false,
    primaryVariant: "primary",
    buttonSize: "M",
    showPrimary: true,
    horizontal: false,
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const InCart: Story = {
  args: {
    inCart: true,
  },
};

export const Horizontal: Story = {
  args: {
    horizontal: true,
  },
};
