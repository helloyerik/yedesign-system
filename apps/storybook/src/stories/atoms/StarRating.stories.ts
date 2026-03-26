import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StarRating from "@components/atoms/StarRating/StarRating.vue";

const meta = {
  title: "Atoms/StarRating",
  component: StarRating,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rating: {
      control: { type: "number", min: 0, max: 5, step: 0.1 },
    },
    size: {
      control: { type: "number", min: 20, max: 28, step: 8 },
    },
  },
  args: {
    rating: 5,
    size: 20,
  },
} satisfies Meta<typeof StarRating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Ratings: Story = {
  render: () => ({
    components: { StarRating },
    template: `
      <section style="display:flex; flex-wrap:wrap; gap: var(--mi-spacing-16); align-items:center;">
        <div style="display:grid; gap: var(--mi-spacing-4); justify-items:center;">
          <StarRating :rating="5" :size="20" />
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">5.0 / 20px</span>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-4); justify-items:center;">
          <StarRating :rating="4.1" :size="28" />
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">4.1 / 28px</span>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-4); justify-items:center;">
          <StarRating :rating="3" :size="20" />
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">3.0 / 20px</span>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-4); justify-items:center;">
          <StarRating :rating="0" :size="20" />
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">0.0 / 20px</span>
        </div>
      </section>
    `,
  }),
};
