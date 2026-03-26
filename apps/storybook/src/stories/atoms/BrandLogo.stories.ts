import type { Meta, StoryObj } from "@storybook/vue3-vite";
import BrandLogo from "@components/atoms/BrandLogo/BrandLogo.vue";

const meta = {
  title: "Atoms/BrandLogo",
  component: BrandLogo,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mobile: { control: "boolean" },
    clickable: { control: "boolean" },
    width: { control: "text" },
    height: { control: "text" },
  },
  args: {
    mobile: false,
    clickable: false,
  },
} satisfies Meta<typeof BrandLogo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const DesktopAndMobile: Story = {
  render: () => ({
    components: { BrandLogo },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24); justify-items:start;">
        <BrandLogo />
        <BrandLogo mobile />
      </section>
    `,
  }),
};

export const Interactive: Story = {
  args: {
    clickable: true,
  },
};
