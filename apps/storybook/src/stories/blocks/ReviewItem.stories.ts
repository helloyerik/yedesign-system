import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ReviewItem from "@components/blocks/ReviewItem/ReviewItem.vue";

const meta = {
  title: "Blocks/ReviewItem",
  component: ReviewItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    userName: "Алия Д.",
    date: "12 марта",
    rating: 5,
    text: "Очень быстро доставили, товар в идеальном состоянии. Спасибо!",
  },
} satisfies Meta<typeof ReviewItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
