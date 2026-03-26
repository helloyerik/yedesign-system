import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Skeleton from "@components/atoms/Skeleton/Skeleton.vue";

const meta = {
  title: "Atoms/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    width: { control: "text" },
    height: { control: "text" },
    borderRadius: { control: "text" },
    circle: { control: "boolean" },
    animated: { control: "boolean" },
  },
  args: {
    width: "180px",
    height: "20px",
    circle: false,
    animated: true,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Lines: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-12); width: 320px;">
        <Skeleton width="100%" height="24px" border-radius="var(--mi-radius-l)" />
        <Skeleton width="65%" height="16px" border-radius="var(--mi-radius-m)" />
        <Skeleton width="80%" height="16px" border-radius="var(--mi-radius-m)" />
      </section>
    `,
  }),
};

export const Circle: Story = {
  args: {
    width: "56px",
    height: "56px",
    circle: true,
  },
};

export const CssVarSizes: Story = {
  render: () => ({
    components: { Skeleton },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16);">
        <Skeleton width="var(--mi-size-tooltip-min-width)" height="36px" border-radius="var(--mi-radius-l)" />
        <Skeleton width="var(--mi-spacing-32)" height="var(--mi-spacing-32)" circle />
      </section>
    `,
  }),
};

export const CustomRadius: Story = {
  args: {
    width: "220px",
    height: "44px",
    borderRadius: "var(--mi-radius-2xl)",
  },
};
