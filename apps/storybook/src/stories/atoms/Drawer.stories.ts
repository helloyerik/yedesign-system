import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import Drawer from "@components/atoms/Drawer/Drawer.vue";
import Button from "@components/atoms/Button/Button.vue";

const meta = {
  title: "Atoms/Drawer",
  component: Drawer,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "inline-radio",
      options: ["left", "right", "top", "bottom"],
    },
    size: {
      control: "number",
    },
    hideVeil: { control: "boolean" },
    disableOutsideClick: { control: "boolean" },
    disableEscapeKeyDown: { control: "boolean" },
  },
  args: {
    title: "Drawer title",
    placement: "right",
    size: 400,
    hideVeil: false,
    disableOutsideClick: false,
    disableEscapeKeyDown: false,
  },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Drawer, Button },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div style="padding: var(--mi-spacing-24);">
        <Button label="Open drawer" @click="open = true" />
        <Drawer v-model="open" v-bind="args">
          <div style="padding: var(--mi-spacing-24); display:flex; flex-direction:column; gap: var(--mi-spacing-16);">
            <p style="margin:0;">Drawer content</p>
            <div style="height: var(--mi-spacing-64); background: var(--mi-color-base-generic); border-radius: var(--mi-radius-l);"></div>
          </div>
        </Drawer>
      </div>
    `,
  }),
};

export const Left: Story = {
  render: () => ({
    components: { Drawer, Button },
    setup() {
      const open = ref(false);
      return { open };
    },
    template: `
      <div style="padding: var(--mi-spacing-24);">
        <Button label="Open left drawer" @click="open = true" />
        <Drawer v-model="open" placement="left" title="Left drawer">
          <div style="padding: var(--mi-spacing-24);">
            <div style="height: var(--mi-spacing-64); background: var(--mi-color-base-generic); border-radius: var(--mi-radius-l);"></div>
          </div>
        </Drawer>
      </div>
    `,
  }),
};
