import type { Meta, StoryObj } from "@storybook/vue3-vite";
import PromoBannerSide from "@components/blocks/PromoBannerSide/PromoBannerSide.vue";

const meta = {
  title: "Blocks/PromoBannerSide",
  component: PromoBannerSide,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    imageSrc: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    variant: "default",
  },
} satisfies Meta<typeof PromoBannerSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Tall: Story = {
  args: {
    variant: "tall",
  },
};
