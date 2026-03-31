import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Accordion from "@components/molecules/Accordion/Accordion.vue";

const meta = {
  title: "Molecules/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    headerPaddingX: {
      control: "inline-radio",
      options: ["default", "none"],
    },
  },
  args: {
    headerPaddingX: "default",
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const accordionItems = [
  { id: "item-1", title: "{Title}" },
  { id: "item-2", title: "{Title}" },
  { id: "item-3", title: "{Title}" },
];

export const Default: Story = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args, items: accordionItems };
    },
    template: `
      <div style="width: 343px;">
        <Accordion v-bind="args" :items="items" default-open-id="item-1">
          <template #content-item-1><div style="width:100%; height: 96px; background: var(--mi-color-brand-base-selection);" /></template>
          <template #content-item-2><div style="width:100%; height: 96px; background: var(--mi-color-brand-base-selection);" /></template>
          <template #content-item-3><div style="width:100%; height: 96px; background: var(--mi-color-brand-base-selection);" /></template>
        </Accordion>
      </div>
    `,
  }),
};

export const NoPaddingX: Story = {
  render: (args) => ({
    components: { Accordion },
    setup() {
      return {
        args: { ...args, headerPaddingX: "none" },
        items: accordionItems.slice(0, 2),
      };
    },
    template: `
      <div style="width: 343px;">
        <Accordion v-bind="args" :items="items" default-open-id="item-1">
          <template #content-item-1><div style="width:100%; height: 96px; background: var(--mi-color-brand-base-selection);" /></template>
          <template #content-item-2><div style="width:100%; height: 96px; background: var(--mi-color-brand-base-selection);" /></template>
        </Accordion>
      </div>
    `,
  }),
};
