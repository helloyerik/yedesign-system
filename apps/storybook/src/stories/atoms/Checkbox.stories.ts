import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Checkbox from "@components/atoms/Checkbox/Checkbox.vue";

const meta = {
  title: "Atoms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["M", "L", "XL"],
    },
    variant: {
      control: "inline-radio",
      options: ["brand", "secondary"],
    },
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    size: "M",
    variant: "brand",
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Checkbox },
    setup() {
      const checked = ref(args.checked ?? false);
      return { args, checked };
    },
    template: `
      <Checkbox v-bind="args" v-model:checked="checked">
        Receive updates
      </Checkbox>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16);">
        <Checkbox>Default</Checkbox>
        <Checkbox checked>Checked</Checkbox>
        <Checkbox indeterminate>Indeterminate</Checkbox>
        <Checkbox disabled>Disabled</Checkbox>
        <Checkbox checked disabled>Checked disabled</Checkbox>
        <Checkbox variant="secondary" checked>Secondary checked</Checkbox>
      </section>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { Checkbox },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16);">
        <Checkbox size="M" checked>Medium</Checkbox>
        <Checkbox size="L" checked>Large</Checkbox>
        <Checkbox size="XL" checked>XL</Checkbox>
      </section>
    `,
  }),
};
