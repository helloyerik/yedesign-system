import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ThemePanel from "@components/blocks/ThemePanel/ThemePanel.vue";

const meta = {
  title: "Blocks/ThemePanel",
  component: ThemePanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    open: true,
    toggles: [
      { id: "breadcrumbs", label: "Старые хлебные крошки", checked: true },
      { id: "simple-card", label: "Упростить карточку", checked: false },
      { id: "discounted", label: "Товар уцененный", checked: false },
    ],
    selectGroups: [
      {
        id: "mobile-description",
        title: "Описание товара",
        label: "Mobile вариант",
        value: "variant-a",
        options: [
          { value: "variant-a", label: "Вариант A" },
          { value: "variant-b", label: "Вариант B" },
          { value: "variant-c", label: "Вариант C" },
        ],
      },
      {
        id: "feature-hint",
        title: "Подсказки новых фичей",
        label: "A/B вариант",
        value: "variant-b",
        options: [
          { value: "variant-a", label: "Подсказка A" },
          { value: "variant-b", label: "Подсказка B" },
          { value: "variant-c", label: "Подсказка C" },
          { value: "variant-d", label: "Подсказка D" },
        ],
      },
    ],
  },
} satisfies Meta<typeof ThemePanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
