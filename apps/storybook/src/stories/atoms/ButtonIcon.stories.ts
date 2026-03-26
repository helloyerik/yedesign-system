import type { Meta, StoryObj } from "@storybook/vue3-vite";
import {
  PhArrowsLeftRight,
  PhHeart,
  PhShareNetwork,
  PhShoppingBag,
  PhTrash,
} from "@phosphor-icons/vue";
import ButtonIcon from "@components/atoms/ButtonIcon/ButtonIcon.vue";

const meta = {
  title: "Atoms/ButtonIcon",
  component: ButtonIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["S", "M", "L", "XL"],
    },
    variant: {
      control: "inline-radio",
      options: ["ghost", "secondary"],
    },
    disabled: { control: "boolean" },
    color: { control: "color" },
    tooltip: { control: "text" },
  },
  args: {
    size: "M",
    variant: "ghost",
    disabled: false,
    color: undefined,
    tooltip: "",
  },
} satisfies Meta<typeof ButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { ButtonIcon, PhHeart },
    setup() {
      return { args };
    },
    template: `
      <ButtonIcon v-bind="args">
        <PhHeart :size="20" />
      </ButtonIcon>
    `,
  }),
};

export const AllSizes: Story = {
  render: () => ({
    components: { ButtonIcon, PhHeart },
    template: `
      <section style="display:flex; gap: var(--mi-spacing-16); align-items:end;">
        <div style="display:grid; gap: var(--mi-spacing-8); justify-items:center;">
          <ButtonIcon size="S"><PhHeart :size="20" /></ButtonIcon>
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">{Label}</span>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-8); justify-items:center;">
          <ButtonIcon size="M"><PhHeart :size="20" /></ButtonIcon>
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">{Label}</span>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-8); justify-items:center;">
          <ButtonIcon size="L"><PhHeart :size="20" /></ButtonIcon>
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">{Label}</span>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-8); justify-items:center;">
          <ButtonIcon size="XL"><PhHeart :size="20" /></ButtonIcon>
          <span style="color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">{Label}</span>
        </div>
      </section>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { ButtonIcon, PhHeart, PhTrash },
    template: `
      <section style="display:flex; gap: var(--mi-spacing-16); align-items:center;">
        <ButtonIcon variant="ghost"><PhHeart :size="20" /></ButtonIcon>
        <ButtonIcon variant="secondary"><PhHeart :size="20" /></ButtonIcon>
        <ButtonIcon disabled><PhTrash :size="20" /></ButtonIcon>
      </section>
    `,
  }),
};

export const CommonIcons: Story = {
  render: () => ({
    components: {
      ButtonIcon,
      PhHeart,
      PhShoppingBag,
      PhShareNetwork,
      PhArrowsLeftRight,
      PhTrash,
    },
    template: `
      <section style="display:flex; gap: var(--mi-spacing-16); align-items:center;">
        <ButtonIcon><PhHeart :size="20" /></ButtonIcon>
        <ButtonIcon><PhShoppingBag :size="20" /></ButtonIcon>
        <ButtonIcon><PhShareNetwork :size="20" /></ButtonIcon>
        <ButtonIcon><PhArrowsLeftRight :size="20" /></ButtonIcon>
        <ButtonIcon><PhTrash :size="20" /></ButtonIcon>
      </section>
    `,
  }),
};

export const WithTooltip: Story = {
  render: () => ({
    components: { ButtonIcon, PhHeart },
    template: `
      <ButtonIcon tooltip="В избранные">
        <PhHeart :size="20" />
      </ButtonIcon>
    `,
  }),
};
