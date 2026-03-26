import type { Meta, StoryObj } from "@storybook/vue3-vite";
import UserAvatar from "@components/atoms/UserAvatar/UserAvatar.vue";

const meta = {
  title: "Atoms/UserAvatar",
  component: UserAvatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "number", min: 20, max: 72, step: 4 },
    },
  },
  args: {
    size: 36,
  },
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Sizes: Story = {
  render: () => ({
    components: { UserAvatar },
    template: `
      <section style="display:flex; align-items:center; gap: var(--mi-spacing-16);">
        <UserAvatar :size="28" />
        <UserAvatar :size="36" />
        <UserAvatar :size="48" />
      </section>
    `,
  }),
};
