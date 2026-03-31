import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import QuantityStepper from "@components/atoms/QuantityStepper/QuantityStepper.vue";

const meta = {
  title: "Atoms/QuantityStepper",
  component: QuantityStepper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    quantity: 2,
    min: 1,
  },
} satisfies Meta<typeof QuantityStepper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => ({
    components: { QuantityStepper },
    setup() {
      const quantity = ref(args.quantity);
      return { args, quantity };
    },
    template: `
      <QuantityStepper
        :quantity="quantity"
        :min="args.min"
        :max="args.max"
        @decrement="quantity -= 1"
        @increment="quantity += 1"
      />
    `,
  }),
};

export const MaxBound: Story = {
  args: {
    quantity: 3,
    min: 1,
    max: 3,
  },
};
