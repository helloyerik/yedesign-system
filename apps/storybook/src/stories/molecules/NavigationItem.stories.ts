import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {
  PhBell,
  PhGear,
  PhHeart,
  PhHouse,
  PhMoon,
  PhShoppingBag,
  PhTag,
} from "@phosphor-icons/vue";
import NavigationItem from "@components/molecules/NavigationItem/NavigationItem.vue";

const meta = {
  title: "Molecules/NavigationItem",
  component: NavigationItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    selected: { control: "boolean" },
    collapsed: { control: "boolean" },
    label: { control: "text" },
  },
  decorators: [
    () => ({
      template: `
        <div style="width:240px; border:1px solid var(--mi-color-line-brand); border-radius: var(--mi-radius-m); background: var(--mi-color-base-background); padding: var(--mi-spacing-8);">
          <story />
        </div>
      `,
    }),
  ],
  args: {
    label: "Home",
    selected: false,
    collapsed: false,
  },
} satisfies Meta<typeof NavigationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { NavigationItem, PhHouse },
    setup() {
      return { args };
    },
    template: `
      <NavigationItem v-bind="args">
        <template #icon><PhHouse :size="24" /></template>
      </NavigationItem>
    `,
  }),
};

export const Selected: Story = {
  ...Default,
  args: {
    label: "Home",
    selected: true,
    collapsed: false,
  },
};

export const Collapsed: Story = {
  render: (args) => ({
    components: { NavigationItem, PhHouse },
    setup() {
      return { args };
    },
    template: `
      <div style="width:68px; border:1px solid var(--mi-color-line-brand); border-radius: var(--mi-radius-m); background: var(--mi-color-base-background); padding: var(--mi-spacing-8);">
        <NavigationItem v-bind="args">
          <template #icon><PhHouse :size="24" /></template>
        </NavigationItem>
      </div>
    `,
  }),
  args: {
    label: "Home",
    selected: false,
    collapsed: true,
  },
};

export const WithRightContent: Story = {
  render: (args) => ({
    components: { NavigationItem, PhMoon },
    setup() {
      return { args };
    },
    template: `
      <NavigationItem v-bind="args">
        <template #icon><PhMoon :size="24" /></template>
        <template #right>
          <div style="width:36px; height:20px; border-radius:999px; background: var(--mi-color-brand-base-selection);" />
        </template>
      </NavigationItem>
    `,
  }),
  args: {
    label: "Dark mode",
  },
};

export const SidebarExample: Story = {
  render: () => ({
    components: {
      NavigationItem,
      PhBell,
      PhGear,
      PhHeart,
      PhHouse,
      PhMoon,
      PhShoppingBag,
      PhTag,
    },
    template: `
      <div style="width:240px; border:1px solid var(--mi-color-line-brand); border-radius: var(--mi-radius-m); background: var(--mi-color-base-background); padding: var(--mi-spacing-8); display:flex; flex-direction:column; gap:2px;">
        <NavigationItem label="Home" selected>
          <template #icon><PhHouse :size="24" /></template>
        </NavigationItem>
        <NavigationItem label="Orders">
          <template #icon><PhShoppingBag :size="24" /></template>
        </NavigationItem>
        <NavigationItem label="Favorites">
          <template #icon><PhHeart :size="24" /></template>
        </NavigationItem>
        <NavigationItem label="Promotions">
          <template #icon><PhTag :size="24" /></template>
        </NavigationItem>
        <NavigationItem label="Notifications">
          <template #icon><PhBell :size="24" /></template>
        </NavigationItem>
        <NavigationItem label="Settings">
          <template #icon><PhGear :size="24" /></template>
        </NavigationItem>
        <NavigationItem label="Dark mode">
          <template #icon><PhMoon :size="24" /></template>
          <template #right>
            <div style="width:36px; height:20px; border-radius:999px; background: var(--mi-color-brand-base-selection);" />
          </template>
        </NavigationItem>
      </div>
    `,
  }),
};
