import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Radio from "@components/atoms/Radio/Radio.vue";
import RadioGroup from "@components/atoms/Radio/RadioGroup.vue";

const options = [
  { value: "pickup", label: "Pickup" },
  { value: "delivery", label: "Delivery" },
  { value: "express", label: "Express", disabled: true },
];

const meta = {
  title: "Atoms/Radio",
  component: Radio,
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
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Radio },
    setup() {
      const checked = ref(args.checked ?? false);
      return { args, checked };
    },
    template: `
      <Radio v-bind="args" v-model:checked="checked">
        Standard option
      </Radio>
    `,
  }),
};

export const States: Story = {
  render: () => ({
    components: { Radio },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16);">
        <Radio>Default</Radio>
        <Radio checked>Checked</Radio>
        <Radio disabled>Disabled</Radio>
        <Radio checked disabled>Checked disabled</Radio>
      </section>
    `,
  }),
};

export const Group: Story = {
  render: () => ({
    components: { RadioGroup },
    setup() {
      const value = ref("pickup");
      return { options, value };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24);">
        <RadioGroup v-model="value" :options="options" />
        <RadioGroup v-model="value" :options="options" direction="horizontal" size="L" />
      </section>
    `,
  }),
};
