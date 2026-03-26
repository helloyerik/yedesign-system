import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ImageCounter from "@components/atoms/ImageCounter/ImageCounter.vue";

const meta = {
  title: "Atoms/ImageCounter",
  component: ImageCounter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    current: { control: { type: "number", min: 1, max: 20, step: 1 } },
    total: { control: { type: "number", min: 1, max: 20, step: 1 } },
  },
  args: {
    current: 3,
    total: 10,
  },
} satisfies Meta<typeof ImageCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const Variants: Story = {
  render: () => ({
    components: { ImageCounter },
    template: `
      <section style="display:flex; gap: var(--mi-spacing-16); align-items:center;">
        <ImageCounter :current="1" :total="5" />
        <ImageCounter :current="3" :total="10" />
        <ImageCounter :current="12" :total="24" />
      </section>
    `,
  }),
};
