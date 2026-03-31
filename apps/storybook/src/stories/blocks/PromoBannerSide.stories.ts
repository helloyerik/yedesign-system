import type { Meta, StoryObj } from "@storybook/vue3-vite";
import PromoBannerSide from "@components/blocks/PromoBannerSide/PromoBannerSide.vue";

const meta = {
  title: "Blocks/PromoBannerSide",
  component: PromoBannerSide,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    imageSrc: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=900&q=80",
    variant: "default",
  },
} satisfies Meta<typeof PromoBannerSide>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { PromoBannerSide },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 325px;">
        <PromoBannerSide v-bind="args" />
      </div>
    `,
  }),
};

export const VariantB: Story = {
  args: {
    variant: "variant-b",
  },
};
