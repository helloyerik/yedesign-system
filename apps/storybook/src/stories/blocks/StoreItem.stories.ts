import type { Meta, StoryObj } from "@storybook/vue3-vite";
import StoreItem from "@components/blocks/StoreItem/StoreItem.vue";

const meta = {
  title: "Blocks/StoreItem",
  component: StoreItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    () => ({
      template: `
        <div style="background: var(--mi-color-base-background); padding: var(--mi-spacing-16); border-radius: var(--mi-radius-l); width: 400px;">
          <story />
        </div>
      `,
    }),
  ],
  args: {
    name: "ул. Амман, 14",
    hours: "10:00-22:00",
    label: "меньше 10",
    filled: 3,
    type: "progress",
    showDivider: true,
  },
} satisfies Meta<typeof StoreItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const HighStock: Story = {
  args: {
    name: "ул. Каныша Сатпаева, 13",
    label: "от 30-40",
    filled: 5,
  },
};

export const Showcase: Story = {
  args: {
    name: "ул. Сыганак, 3 (Е-10)",
    label: "Витрина",
    filled: 0,
    type: "warning",
  },
};

export const AllVariants: Story = {
  render: () => ({
    components: { StoreItem },
    template: `
      <div style="display:flex; flex-direction:column; width: 100%;">
        <StoreItem name="Склад города" hours="10:00-22:00" label="меньше 10" :filled="3" type="progress" show-divider />
        <StoreItem name="ул. Каныша Сатпаева, 13" hours="10:00-22:00" label="от 30-40" :filled="5" type="progress" show-divider />
        <StoreItem name="ул. Сыганак, 3 (Е-10)" hours="10:00-22:00" label="Витрина" :filled="0" type="warning" show-divider />
        <StoreItem name="ул. Сарайшык, 15" hours="10:00-22:00" label="1 шт." :filled="1" type="progress" />
      </div>
    `,
  }),
};
