import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ActionIconGroup from "@components/molecules/ActionIconGroup/ActionIconGroup.vue";

const meta = {
  title: "Molecules/ActionIconGroup",
  component: ActionIconGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["S", "M", "L", "XL"],
    },
  },
  args: {
    isComparing: false,
    isFavorite: false,
    showShare: true,
    size: "M",
  },
} satisfies Meta<typeof ActionIconGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
