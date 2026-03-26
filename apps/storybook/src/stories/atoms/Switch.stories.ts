import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Switch from "@components/atoms/Switch/Switch.vue";

const meta = {
  title: "Atoms/Switch",
  component: Switch,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["M", "L"],
    },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    checked: false,
    disabled: false,
    size: "M",
    label: "Enable notifications",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Switch },
    setup() {
      const checked = ref(args.checked ?? false);
      return { args, checked };
    },
    template: `
      <Switch v-bind="args" v-model:checked="checked" />
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Switch },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16);">
        <Switch label="Default" />
        <Switch checked label="Checked" />
        <Switch disabled label="Disabled" />
        <Switch checked disabled label="Checked disabled" />
      </section>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Switch },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16);">
        <Switch size="M" checked label="Medium switch" />
        <Switch size="L" checked label="Large switch" />
      </section>
    `,
  }),
};
