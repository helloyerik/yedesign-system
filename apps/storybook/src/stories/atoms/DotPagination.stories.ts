import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DotPagination from "@components/atoms/DotPagination/DotPagination.vue";

const meta = {
  title: "Atoms/DotPagination",
  component: DotPagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    () => ({
      components: { DotPagination },
      template: `
        <div style="width: 300px; border-radius: var(--mi-radius-l); background: var(--mi-color-base-light); padding: var(--mi-spacing-16);">
          <story />
        </div>
      `,
    }),
  ],
  argTypes: {
    count: { control: { type: "number", min: 1, max: 12, step: 1 } },
    activeIndex: { control: { type: "number", min: 0, max: 11, step: 1 } },
  },
  args: {
    count: 8,
    activeIndex: 0,
  },
} satisfies Meta<typeof DotPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const MiddleActive: Story = {
  args: {
    activeIndex: 3,
  },
};

export const LastActive: Story = {
  args: {
    activeIndex: 7,
  },
};

export const FewDots: Story = {
  args: {
    count: 3,
    activeIndex: 1,
  },
};
