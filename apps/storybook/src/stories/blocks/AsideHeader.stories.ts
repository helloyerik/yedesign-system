import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhHouse, PhGear, PhChartBar } from "@phosphor-icons/vue";
import AsideHeader from "@components/blocks/AsideHeader/AsideHeader.vue";

const meta = {
  title: "Blocks/AsideHeader",
  component: AsideHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    serviceName: "Dreamstore",
    collapsible: true,
    defaultCollapsed: false,
    headerDecoration: true,
  },
} satisfies Meta<typeof AsideHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { AsideHeader, PhHouse, PhGear, PhChartBar },
    setup() {
      return {
        args,
        subheaderItems: [
          { id: "home", label: "Главная", icon: PhHouse },
        ],
        menuItems: [
          { id: "stats", label: "Статистика", icon: PhChartBar },
        ],
        footerItems: [
          { id: "settings", label: "Настройки", icon: PhGear },
        ],
      };
    },
    template: `
      <div style="height: 420px;">
        <AsideHeader
          v-bind="args"
          :subheader-items="subheaderItems"
          :menu-items="menuItems"
          :footer-items="footerItems"
        />
      </div>
    `,
  }),
};
