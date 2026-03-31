import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import {
  PhBell,
  PhGear,
  PhHeart,
  PhHouse,
  PhMoon,
  PhShoppingBag,
  PhTag,
} from "@phosphor-icons/vue";
import AsideHeader from "@components/molecules/AsideHeader/AsideHeader.vue";

const meta = {
  title: "Molecules/AsideHeader",
  component: AsideHeader,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AsideHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => ({
    components: {
      AsideHeader,
      PhBell,
      PhGear,
      PhHeart,
      PhHouse,
      PhMoon,
      PhShoppingBag,
      PhTag,
    },
    setup() {
      const selectedId = ref("home");
      return {
        selectedId,
        topItems: [
          { id: "home", label: "Home", icon: PhHouse },
          { id: "orders", label: "Orders", icon: PhShoppingBag },
        ],
        middleGroups: [
          {
            items: [
              { id: "favorites", label: "Favorites", icon: PhHeart },
              { id: "promotions", label: "Promotions", icon: PhTag },
            ],
          },
        ],
        bottomItems: [
          { id: "notifications", label: "Notifications", icon: PhBell },
          { id: "settings", label: "Settings", icon: PhGear },
          { id: "theme", label: "Dark mode", icon: PhMoon, rightContent: { template: '<div style="width:36px;height:20px;border-radius:999px;background: var(--mi-color-brand-base-selection);" />' } },
        ],
      };
    },
    template: `
      <div style="height: 480px; background: var(--mi-color-base-background);">
        <AsideHeader
          service-name="Service Name"
          :top-items="topItems"
          :middle-groups="middleGroups"
          :bottom-items="bottomItems"
          :selected-id="selectedId"
          @select="(id) => selectedId = id"
        >
          <template #logo>
            <div style="width:32px; height:32px; border-radius:999px; background: var(--mi-color-brand-primary);" />
          </template>
        </AsideHeader>
      </div>
    `,
  }),
};
