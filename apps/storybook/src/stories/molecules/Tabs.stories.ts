import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import { PhHeart, PhHouse, PhShoppingBag } from "@phosphor-icons/vue";
import Tabs from "@components/molecules/Tabs/Tabs.vue";

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["M", "L", "XL"],
    },
    variant: {
      control: "inline-radio",
      options: ["underline", "pills"],
    },
  },
  args: {
    size: "M",
    variant: "underline",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: "home", label: "Home", icon: PhHouse },
  { id: "orders", label: "Orders", icon: PhShoppingBag, counter: 2 },
  { id: "favorites", label: "Favorites", icon: PhHeart, counter: 8 },
];

export const Interactive: Story = {
  render: (args) => ({
    components: { Tabs },
    setup() {
      const activeTab = ref("home");
      return { args, activeTab, items: defaultItems };
    },
    template: `
      <Tabs
        :items="items"
        :active-tab="activeTab"
        :size="args.size"
        :variant="args.variant"
        @tab-change="(id) => activeTab = id"
      />
    `,
  }),
};

export const Pills: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      const activeTab = ref("all");
      const items = [
        { id: "all", label: "All" },
        { id: "new", label: "New", counter: 12 },
        { id: "sale", label: "Sale" },
      ];
      return { activeTab, items };
    },
    template: `
      <Tabs
        :items="items"
        active-tab="all"
        variant="pills"
        @tab-change="(id) => activeTab = id"
      />
    `,
  }),
};

export const DisabledTab: Story = {
  render: () => ({
    components: { Tabs },
    setup() {
      const activeTab = ref("home");
      const items = [
        { id: "home", label: "Home", icon: PhHouse },
        { id: "orders", label: "Orders", icon: PhShoppingBag, disabled: true },
        { id: "favorites", label: "Favorites", icon: PhHeart },
      ];
      return { activeTab, items };
    },
    template: `
      <Tabs
        :items="items"
        :active-tab="activeTab"
        @tab-change="(id) => activeTab = id"
      />
    `,
  }),
};
