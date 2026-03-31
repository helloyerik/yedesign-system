import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Toast from "@components/molecules/Toast/Toast.vue";

const meta = {
  title: "Molecules/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["success", "error"],
    },
    appearance: {
      control: "inline-radio",
      options: ["default", "light"],
    },
    message: { control: "text" },
  },
  args: {
    variant: "success",
    message: "{Message}",
    appearance: "default",
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: {
    variant: "error",
  },
};

export const SuccessWithButton: Story = {
  args: {
    variant: "success",
    buttonLabel: "{Action}",
  },
};

export const Light: Story = {
  args: {
    variant: "success",
    appearance: "light",
  },
};

export const AllVariants: Story = {
  render: () => ({
    components: { Toast },
    template: `
      <div style="display:flex; width: 360px; flex-direction:column; gap: var(--mi-spacing-16);">
        <Toast variant="success" message="{Message}" button-label="{Action}" />
        <Toast variant="error" message="{Message}" />
        <Toast variant="success" appearance="light" message="{Message}" />
      </div>
    `,
  }),
};
