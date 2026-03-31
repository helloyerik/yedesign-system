import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ReviewItem from "@components/blocks/ReviewItem/ReviewItem.vue";

const meta = {
  title: "Blocks/ReviewItem",
  component: ReviewItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    userName: "Алия",
    date: "12.02.2026",
    rating: 4.7,
    text: "Понравился сервис и скорость доставки. Упаковка аккуратная, товар без повреждений.",
  },
} satisfies Meta<typeof ReviewItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ReviewItem },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 640px;">
        <ReviewItem v-bind="args" />
      </div>
    `,
  }),
};
