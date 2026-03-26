import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Select from "@components/atoms/Select/Select.vue";

const options = ["Option 1", "Option 2", "Option 3"];

const meta = {
  title: "Atoms/Select",
  component: Select,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "compact", "textOnly"],
    },
    caretWeight: {
      control: "inline-radio",
      options: ["regular", "fill"],
    },
    caretSize: { control: { type: "number", min: 12, max: 20, step: 2 } },
    showSelectedMark: { control: "boolean" },
  },
  args: {
    value: "Option 1",
    options,
    variant: "default",
    caretWeight: "regular",
    caretSize: 16,
    showSelectedMark: false,
    placeholder: "Выберите...",
    className: "",
    dropdownMenuClassName: "",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Select },
    setup() {
      const value = ref(args.value);
      return { args, value };
    },
    template: `
      <div style="width: 320px;">
        <Select v-bind="args" v-model:value="value" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const valueA = ref("Option 1");
      const valueB = ref("Option 1");
      const valueC = ref("Text Only");
      return { options, valueA, valueB, valueC };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16); width: 320px;">
        <Select v-model:value="valueA" :options="options" />
        <Select v-model:value="valueB" :options="options" variant="compact" />
        <div style="width: fit-content;">
          <Select v-model:value="valueC" :options="['Text Only', 'Another Option']" variant="textOnly" />
        </div>
      </section>
    `,
  }),
};

export const WithSelectedMark: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref("Option 1");
      return { options, value };
    },
    template: `
      <div style="width: 320px;">
        <Select v-model:value="value" :options="options" variant="compact" show-selected-mark />
      </div>
    `,
  }),
};

export const TextOnlyWithFilledCaret: Story = {
  render: () => ({
    components: { Select },
    setup() {
      const value = ref("Document type");
      return { value };
    },
    template: `
      <div style="width: fit-content;">
        <Select
          v-model:value="value"
          :options="['Document type', 'Another option']"
          variant="textOnly"
          caret-weight="fill"
        />
      </div>
    `,
  }),
};
