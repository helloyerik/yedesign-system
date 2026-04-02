import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhStar } from "@phosphor-icons/vue";
import Tabs from "@components/atoms/Tabs/Tabs.vue";

const meta = {
  title: "Atoms/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["underline", "pills"],
    },
    size: {
      control: "inline-radio",
      options: ["M", "L", "XL"],
    },
  },
  args: {
    variant: "underline",
    size: "M",
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Tabs, PhStar },
    setup() {
      const active = ref("tab-1");
      const items = [
        { id: "tab-1", label: "Все" },
        { id: "tab-2", label: "Избранное", icon: PhStar, counter: 4 },
        { id: "tab-3", label: "Скрытые", disabled: true },
      ];
      return { args, active, items };
    },
    template: `
      <Tabs v-bind="args" :items="items" :active-tab="active" @change="(id) => (active = id)" />
    `,
  }),
};
