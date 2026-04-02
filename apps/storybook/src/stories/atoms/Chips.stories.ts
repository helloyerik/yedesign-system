import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Chips from "@components/atoms/Chips/Chips.vue";

const options = [
  { id: "all", label: "Все" },
  { id: "phones", label: "Смартфоны" },
  { id: "laptops", label: "Ноутбуки" },
  { id: "audio", label: "Аудио" },
];

const meta = {
  title: "Atoms/Chips",
  component: Chips,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    options,
    size: "S",
  },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BrandSecondaryActive: Story = {
  render: (args) => ({
    components: { Chips },
    setup() {
      const value = ref("all");
      return { args, value };
    },
    template: `
      <Chips
        v-bind="args"
        v-model:value="value"
        active-variant="brand-secondary"
        inactive-variant="secondary"
      />
    `,
  }),
};

export const SecondaryActiveTextOnlyRest: Story = {
  render: (args) => ({
    components: { Chips },
    setup() {
      const value = ref("phones");
      return { args, value };
    },
    template: `
      <Chips
        v-bind="args"
        v-model:value="value"
        active-variant="secondary"
        inactive-variant="text-only"
      />
    `,
  }),
};
