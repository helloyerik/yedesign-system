import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ButtonGroup from "@components/molecules/ButtonGroup/ButtonGroup.vue";

const meta = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    primaryVariant: {
      control: "inline-radio",
      options: ["primary", "brand-secondary", "secondary", "outline", "text-only"],
    },
    buttonSize: {
      control: "inline-radio",
      options: ["L", "M", "S", "XS"],
    },
    inCart: { control: "boolean" },
    showPrimary: { control: "boolean" },
    horizontal: { control: "boolean" },
  },
  args: {
    primaryLabel: "Купить",
    secondaryLabel: "Сравнить",
    inCartLabel: "В корзине",
    inCart: false,
    primaryVariant: "primary",
    buttonSize: "M",
    showPrimary: true,
    horizontal: false,
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { ButtonGroup },
    setup() {
      const inCart = ref(args.inCart);
      return { args, inCart };
    },
    template: `
      <div style="width: 320px;">
        <ButtonGroup
          v-bind="args"
          :in-cart="inCart"
          @primary-click="inCart = true"
          @in-cart-click="inCart = false"
        />
      </div>
    `,
  }),
};
