import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhCaretDown, PhPlus } from "@phosphor-icons/vue";
import Button from "@components/atoms/Button/Button.vue";

const meta = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["primary", "brand-secondary", "secondary", "outline", "text-only"],
    },
    size: {
      control: "inline-radio",
      options: ["L", "M", "S", "XS"],
    },
    width: {
      control: "inline-radio",
      options: ["hug", "full"],
    },
    isLoading: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Label",
    variant: "primary",
    size: "M",
    width: "hug",
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Button, PhPlus, PhCaretDown },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <template #leftIcon><PhPlus :size="20" weight="bold" /></template>
        <template #rightIcon><PhCaretDown :size="20" weight="bold" /></template>
      </Button>
    `,
  }),
};

export const Primary: Story = {
  args: {
    label: "Label",
    variant: "primary",
    size: "M",
  },
};

export const PrimaryWithIcon: Story = {
  render: (args) => ({
    components: { Button, PhPlus },
    setup() {
      return { args };
    },
    template: `
      <Button v-bind="args">
        <template #leftIcon><PhPlus :size="20" weight="bold" /></template>
      </Button>
    `,
  }),
  args: {
    label: "Label",
    variant: "primary",
    size: "L",
  },
};

export const Secondary: Story = {
  args: {
    label: "Label",
    variant: "secondary",
    size: "M",
  },
};

export const BrandSecondary: Story = {
  args: {
    label: "Label",
    variant: "brand-secondary",
    size: "M",
  },
};

export const Outline: Story = {
  args: {
    label: "Label",
    variant: "outline",
    size: "M",
  },
};

export const TextOnly: Story = {
  args: {
    label: "Label",
    variant: "text-only",
    size: "S",
  },
};

export const Loading: Story = {
  args: {
    label: "Label",
    variant: "primary",
    size: "M",
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    label: "Label",
    variant: "primary",
    size: "M",
    disabled: true,
  },
};

export const DisabledVariants: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex; flex-direction:column; gap: var(--mi-spacing-12); align-items:flex-start;">
        <Button label="Primary disabled" variant="primary" size="M" disabled />
        <Button label="Brand secondary disabled" variant="brand-secondary" size="M" disabled />
        <Button label="Secondary disabled" variant="secondary" size="M" disabled />
        <Button label="Outline disabled" variant="outline" size="M" disabled />
        <Button label="Text-only disabled" variant="text-only" size="S" disabled />
      </div>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="display:flex; flex-direction:column; gap: var(--mi-spacing-16); align-items:flex-start;">
        <Button size="L" label="Label" />
        <Button size="M" label="Label" />
        <Button size="S" label="Label" />
        <Button size="XS" label="Label" />
      </div>
    `,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    components: { Button },
    template: `
      <div style="width: 400px; border: 1px solid var(--mi-color-line-generic); padding: var(--mi-spacing-16);">
        <Button width="full" label="Label" />
      </div>
    `,
  }),
};
