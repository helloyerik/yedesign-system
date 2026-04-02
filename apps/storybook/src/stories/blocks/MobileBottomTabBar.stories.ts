import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import MobileBottomTabBar from "@components/blocks/MobileBottomTabBar/MobileBottomTabBar.vue";

const meta = {
  title: "Blocks/MobileBottomTabBar",
  component: MobileBottomTabBar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    cartCount: 2,
    showLabels: true,
  },
} satisfies Meta<typeof MobileBottomTabBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { MobileBottomTabBar },
    setup() {
      const activeTab = ref("home");
      return { args, activeTab };
    },
    template: `
      <div style="height: 420px;">
        <MobileBottomTabBar v-bind="args" :active-tab="activeTab" @select="(key) => (activeTab = key)" />
      </div>
    `,
  }),
};
