import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhCreditCard, PhBank, PhWallet } from "@phosphor-icons/vue";
import PaymentMethodIcons from "@components/blocks/PaymentMethodIcons/PaymentMethodIcons.vue";

const meta = {
  title: "Blocks/PaymentMethodIcons",
  component: PaymentMethodIcons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    icons: [
      { id: "bank", label: "Bank", icon: PhBank },
      { id: "card", label: "Card", icon: PhCreditCard },
      { id: "wallet", label: "Wallet", icon: PhWallet },
    ],
  },
} satisfies Meta<typeof PaymentMethodIcons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
