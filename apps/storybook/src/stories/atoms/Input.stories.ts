import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Input from "@components/atoms/Input/Input.vue";

const meta = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["XL", "L"],
    },
    state: {
      control: "select",
      options: ["default", "hover", "active", "filled", "disabled", "error", "errorOutline", "textOnly"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Label",
    value: "",
    size: "XL",
    state: "default",
    errorText: "Error content",
    className: "",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref(args.value ?? "");
      return { args, value };
    },
    template: `
      <div style="width: var(--mi-size-input-width);">
        <Input v-bind="args" v-model:value="value" />
      </div>
    `,
  }),
};

export const StateMatrix: Story = {
  render: () => ({
    components: { Input },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24);">
        <div style="display:grid; gap: var(--mi-spacing-8);">
          <Input style="width: var(--mi-size-input-width);" label="Label" size="XL" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="XL" state="hover" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="XL" state="active" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="XL" state="filled" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="XL" state="disabled" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="XL" state="error" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="XL" state="errorOutline" />
          <Input style="width: var(--mi-size-input-width);" label="" value="Text Only" size="XL" state="textOnly" :start-icon="null" :end-icon="null" />
        </div>

        <div style="display:grid; gap: var(--mi-spacing-8);">
          <Input style="width: var(--mi-size-input-width);" label="Label" size="L" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="L" state="hover" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="L" state="active" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="L" state="filled" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="L" state="disabled" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="L" state="error" />
          <Input style="width: var(--mi-size-input-width);" label="Label" value="Text" size="L" state="errorOutline" />
          <Input style="width: var(--mi-size-input-width);" label="" value="Text Only" size="L" state="textOnly" :start-icon="null" :end-icon="null" />
        </div>
      </section>
    `,
  }),
};
