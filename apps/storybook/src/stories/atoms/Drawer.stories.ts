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
      <div style="padding: 40px;">
        <Button label="Open drawer" @click="open = true" />
        <Drawer v-model="open" v-bind="args">
          <div style="padding: 24px; display:flex; flex-direction:column; gap: 16px;">
            <p style="margin:0;">Drawer content</p>
            <p style="margin:0;">Matches React layout, veil, ESC, and outside-click behavior.</p>
          </div>
        </Drawer>
      </div>
    `,
  }),
};
