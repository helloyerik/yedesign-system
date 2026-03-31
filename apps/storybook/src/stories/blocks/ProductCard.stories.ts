import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ProductCard from "@components/blocks/ProductCard/ProductCard.vue";
import MobileProductCard from "@components/blocks/ProductCard/MobileProductCard.vue";

const imageA =
  "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=700&q=80";
const imageB =
  "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=700&q=80";

const meta = {
  title: "Blocks/ProductCard",
  component: ProductCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rating: {
      control: "text",
    },
    reviewCount: {
      control: "text",
    },
    showcase: {
      control: "boolean",
    },
  },
  args: {
    image: imageA,
    title: "{Title}",
    rating: "{rating}",
    reviewCount: "{counter}",
    currentPrice: "{Price}",
  },
} satisfies Meta<typeof ProductCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabels: Story = {
  args: {
    labels: [
      { text: "{Label}", variant: "bonus" },
      { text: "{Label}", variant: "info" },
      { text: "{Label}", variant: "misc" },
    ],
  },
};

export const WithDiscount: Story = {
  args: {
    image: imageB,
    originalPrice: "{OldPrice}",
    discount: "{Discount}",
    labels: [
      { text: "{Label}", variant: "bonus" },
      { text: "{Label}", variant: "info" },
    ],
  },
};

export const Showcase: Story = {
  args: {
    showcase: true,
  },
};

export const NoRating: Story = {
  args: {
    rating: undefined,
    reviewCount: undefined,
    labels: [{ text: "{Label}", variant: "bonus" }],
  },
};

export const Mobile: Story = {
  render: () => ({
    components: { MobileProductCard },
    setup() {
      return { imageA };
    },
    template: `
      <MobileProductCard
        :image="imageA"
        title="{Title}"
        rating="{rating}"
        review-count="{counter}"
        current-price="{Price}"
        original-price="{OldPrice}"
        discount="{Discount}"
        :labels="[
          { text: '{Label}', variant: 'bonus' },
          { text: '{Label}', variant: 'info' },
        ]"
      />
    `,
  }),
};

export const DesktopVsMobile: Story = {
  render: () => ({
    components: { ProductCard, MobileProductCard },
    setup() {
      return { imageA };
    },
    template: `
      <div style="display:flex; flex-direction:column; gap: var(--mi-spacing-24); align-items:flex-start;">
        <div>
          <h3 style="margin-bottom: var(--mi-spacing-16); color: var(--mi-color-text-hint); font-size: 13px; font-weight: 600; text-transform: uppercase;">Desktop</h3>
          <ProductCard
            :image="imageA"
            title="{Title}"
            rating="{rating}"
            review-count="{counter}"
            current-price="{Price}"
            :labels="[
              { text: '{Label}', variant: 'bonus' },
              { text: '{Label}', variant: 'info' },
            ]"
          />
        </div>
        <div>
          <h3 style="margin-bottom: var(--mi-spacing-16); color: var(--mi-color-text-hint); font-size: 13px; font-weight: 600; text-transform: uppercase;">Mobile</h3>
          <MobileProductCard
            :image="imageA"
            title="{Title}"
            rating="{rating}"
            review-count="{counter}"
            current-price="{Price}"
            :labels="[
              { text: '{Label}', variant: 'bonus' },
              { text: '{Label}', variant: 'info' },
            ]"
          />
        </div>
      </div>
    `,
  }),
};
