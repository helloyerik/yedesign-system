import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Accordion from "@components/atoms/Accordion/Accordion.vue";

const meta = {
  title: "Atoms/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems = [
  { id: "item-1", title: "{Title}" },
  { id: "item-2", title: "{Title}" },
  { id: "item-3", title: "{Title}" },
];

export const Default: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      return { items: sampleItems };
    },
    template: `
      <div style="width: 343px;">
        <Accordion :items="items" default-open-id="item-1">
          <template #content>
            <div
              style="
                background: var(--mi-color-brand-base-selection);
                height: var(--mi-spacing-24);
                width: 100%;
              "
            ></div>
          </template>
        </Accordion>
      </div>
    `,
  }),
};

export const NoPaddingX: Story = {
  render: () => ({
    components: { Accordion },
    setup() {
      return { items: sampleItems.slice(0, 2) };
    },
    template: `
      <div style="width: 343px;">
        <Accordion :items="items" default-open-id="item-1" header-padding-x="none">
          <template #content>
            <div
              style="
                background: var(--mi-color-brand-base-selection);
                height: var(--mi-spacing-24);
                width: 100%;
              "
            ></div>
          </template>
        </Accordion>
      </div>
    `,
  }),
};
