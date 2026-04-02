import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ReviewSummary from "@components/blocks/ReviewSummary/ReviewSummary.vue";

const meta = {
  title: "Blocks/ReviewSummary",
  component: ReviewSummary,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    rating: 4.8,
    reviewCount: 128,
  },
} satisfies Meta<typeof ReviewSummary>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
