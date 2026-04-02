import type { Meta, StoryObj } from "@storybook/vue3-vite";
import SpecificationItem from "@components/atoms/SpecificationItem/SpecificationItem.vue";

const meta = {
  title: "Atoms/SpecificationItem",
  component: SpecificationItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    label: "Диагональ",
    value: "6.7\"",
    copyable: true,
    isLink: false,
  },
} satisfies Meta<typeof SpecificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const LinkValue: Story = {
  args: {
    isLink: true,
    value: "Подробнее",
    copyable: false,
  },
};
