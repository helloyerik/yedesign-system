import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ProductLabel from "@components/molecules/ProductLabel/ProductLabel.vue";
import Tooltip from "@components/atoms/Tooltip/Tooltip.vue";

const meta = {
  title: "Molecules/ProductLabel",
  component: ProductLabel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    colorScheme: {
      control: "inline-radio",
      options: ["success", "info", "supplier", "warning"],
    },
    showCaret: {
      control: "boolean",
    },
  },
  args: {
    text: "{Label}",
    colorScheme: "success",
    showCaret: true,
  },
} satisfies Meta<typeof ProductLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Info: Story = {
  args: {
    colorScheme: "info",
  },
};

export const Warning: Story = {
  args: {
    colorScheme: "warning",
  },
};

export const Supplier: Story = {
  args: {
    colorScheme: "supplier",
  },
};

export const WithTooltip: Story = {
  render: (args) => ({
    components: { ProductLabel, Tooltip },
    setup() {
      return { args };
    },
    template: `
      <ProductLabel v-bind="args">
        <template #tooltip>
          <Tooltip position="bottom" width-variant="hug">
            <p style="white-space: nowrap; color: var(--mi-color-text-primary);">{Tooltip}</p>
          </Tooltip>
        </template>
      </ProductLabel>
    `,
  }),
};

export const AllVariants: Story = {
  render: () => ({
    components: { ProductLabel },
    template: `
      <div style="display:flex; flex-wrap:wrap; gap: var(--mi-spacing-8);">
        <ProductLabel text="{Label}" color-scheme="success" show-caret />
        <ProductLabel text="{Label}" color-scheme="info" show-caret />
        <ProductLabel text="{Label}" color-scheme="supplier" show-caret />
        <ProductLabel text="{Label}" color-scheme="warning" show-caret />
      </div>
    `,
  }),
};
