import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Tag from "@components/atoms/Tag/Tag.vue";

const meta = {
  title: "Atoms/Tag",
  component: Tag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["neutral", "overlay"],
    },
    size: {
      control: "inline-radio",
      options: ["S", "M"],
    },
  },
  args: {
    label: "Скоро",
    variant: "overlay",
    size: "M",
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { Tag },
    template: `
      <div style="display:flex; gap: var(--mi-spacing-12); align-items:center;">
        <Tag label="Скоро" variant="overlay" />
        <Tag label="До" variant="neutral" />
      </div>
    `,
  }),
};
