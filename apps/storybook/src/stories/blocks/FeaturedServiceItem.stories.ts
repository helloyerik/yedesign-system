import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import FeaturedServiceItem from "@components/blocks/FeaturedServiceItem/FeaturedServiceItem.vue";

const meta = {
  title: "Blocks/FeaturedServiceItem",
  component: FeaturedServiceItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FeaturedServiceItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc = "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&w=160&q=80";

export const Default: Story = {
  render: () => ({
    components: { FeaturedServiceItem },
    setup() {
      const selectedTermId = ref("service-plus-1y");
      const isInCart = ref(false);
      const inCartTermId = ref<string | null>(null);

      return {
        selectedTermId,
        isInCart,
        inCartTermId,
        imageSrc,
        terms: [
          { id: "service-plus-1y", label: "1 год" },
          { id: "service-plus-2y", label: "2 года" },
          { id: "service-plus-3y", label: "3 года" },
        ],
        benefits: [
          "Защита от скачков напряжения",
          "Бесплатный ремонт и запчасти",
          "Бесплатная доставка техники",
        ],
        onPrimaryAction() {
          if (!isInCart.value) {
            isInCart.value = true;
            inCartTermId.value = selectedTermId.value;
            return;
          }

          if (inCartTermId.value === selectedTermId.value) {
            isInCart.value = false;
            inCartTermId.value = null;
            return;
          }

          inCartTermId.value = selectedTermId.value;
        },
      };
    },
    template: `
      <FeaturedServiceItem
        :image-src="imageSrc"
        title="Сервис Плюс"
        description="Замена поврежденной техники"
        price-label="5 890 ₸"
        :benefits="benefits"
        :term-options="terms"
        :selected-term-id="selectedTermId"
        :in-cart-term-id="inCartTermId"
        :is-in-cart="isInCart"
        @term-select="(id) => selectedTermId = id"
        @primary-action="onPrimaryAction"
      />
    `,
  }),
};

export const InCart: Story = {
  render: () => ({
    components: { FeaturedServiceItem },
    setup() {
      return {
        imageSrc,
        terms: [
          { id: "service-plus-1y", label: "1 год" },
          { id: "service-plus-2y", label: "2 года" },
          { id: "service-plus-3y", label: "3 года" },
        ],
        benefits: [
          "Защита от скачков напряжения",
          "Бесплатный ремонт и запчасти",
          "Бесплатная доставка техники",
        ],
      };
    },
    template: `
      <FeaturedServiceItem
        :image-src="imageSrc"
        title="Сервис Плюс"
        description="Замена поврежденной техники"
        price-label="9 890 ₸"
        :benefits="benefits"
        :term-options="terms"
        selected-term-id="service-plus-1y"
        in-cart-term-id="service-plus-1y"
        is-in-cart
      />
    `,
  }),
};

export const HeaderOnly: Story = {
  render: () => ({
    components: { FeaturedServiceItem },
    setup() {
      return { imageSrc };
    },
    template: `
      <div style="width: 320px;">
        <FeaturedServiceItem
          mode="header"
          :image-src="imageSrc"
          title="Сервис Плюс"
          description="Замена поврежденной техники"
        />
      </div>
    `,
  }),
};

export const NoBenefitsHug: Story = {
  render: () => ({
    components: { FeaturedServiceItem },
    setup() {
      return {
        imageSrc,
        terms: [
          { id: "service-plus-1y", label: "1 год" },
          { id: "service-plus-2y", label: "2 года" },
          { id: "service-plus-3y", label: "3 года" },
        ],
      };
    },
    template: `
      <FeaturedServiceItem
        :image-src="imageSrc"
        title="Сервис Плюс"
        description="Замена поврежденной техники"
        price-label="5 890 ₸"
        :benefits="[]"
        card-height-mode="hug"
        :term-options="terms"
      />
    `,
  }),
};
