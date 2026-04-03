import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Banner from "@components/blocks/Banner/Banner.vue";

const meta = {
  title: "Blocks/Banner",
  component: Banner,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Баннер для промо, уведомлений и встроенных подсказок. Поддерживает варианты Default и Slim.",
      },
    },
  },
  tags: ["autodocs"],
  args: {
    variant: "default",
    layout: "horizontal",
    title: "Готовитесь к продаже?",
    text: "Подготовьте карточку товара, чтобы быстрее продать и получить больше откликов.",
    ctaLabel: "Начать",
    secondaryLabel: "Подробнее",
    imagePosition: "right",
    imageSrc: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80",
    imageAlt: "Promo",
    showClose: true,
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultVertical: Story = {
  args: {
    layout: "vertical",
    imageSrc: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80",
    secondaryLabel: "",
  },
};

export const Slim: Story = {
  args: {
    variant: "slim",
    size: "desktop",
    imagePosition: "left",
    title: "Заголовок",
    text: "Текст",
    ctaLabel: "Текст",
    secondaryLabel: "",
    showClose: true,
    imageSrc: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=280&q=80",
  },
};

export const SlimCompact: Story = {
  args: {
    variant: "slim",
    size: "compact",
    imagePosition: "left",
    title: "Крутые дизайнеры вдохновляют",
    text: "Вы вдохновляете. Здесь можно показать до двух строк текста.",
    ctaLabel: "",
    secondaryLabel: "",
    showClose: true,
    closeAlign: "top",
    imageSrc: "https://images.unsplash.com/photo-1500534314209-a26db0f5b2d0?auto=format&fit=crop&w=280&q=80",
  },
};
