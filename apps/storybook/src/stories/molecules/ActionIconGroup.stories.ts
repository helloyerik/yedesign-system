import type { Meta, StoryObj } from "@storybook/vue3-vite";
import ActionIconGroup from "@components/molecules/ActionIconGroup/ActionIconGroup.vue";

const meta = {
  title: "Molecules/ActionIconGroup",
  component: ActionIconGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    isComparing: { control: "boolean" },
    isFavorite: { control: "boolean" },
    size: { control: "number" },
    showShare: { control: "boolean" },
  },
  args: {
    isComparing: false,
    isFavorite: false,
    showShare: true,
    size: 24,
  },
} satisfies Meta<typeof ActionIconGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ComparingActive: Story = {
  args: {
    isComparing: true,
  },
};

export const FavoriteActive: Story = {
  args: {
    isFavorite: true,
  },
};

export const BothActive: Story = {
  args: {
    isComparing: true,
    isFavorite: true,
  },
};

export const AllStates: Story = {
  render: () => ({
    components: { ActionIconGroup },
    template: `
      <div style="display:flex; flex-direction:column; gap: var(--mi-spacing-16);">
        <div style="display:flex; align-items:center; gap: var(--mi-spacing-16);">
          <span style="width:100px; color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: 12px;">{Label}</span>
          <ActionIconGroup />
        </div>
        <div style="display:flex; align-items:center; gap: var(--mi-spacing-16);">
          <span style="width:100px; color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: 12px;">{Label}</span>
          <ActionIconGroup is-comparing />
        </div>
        <div style="display:flex; align-items:center; gap: var(--mi-spacing-16);">
          <span style="width:100px; color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: 12px;">{Label}</span>
          <ActionIconGroup is-favorite />
        </div>
        <div style="display:flex; align-items:center; gap: var(--mi-spacing-16);">
          <span style="width:100px; color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: 12px;">{Label}</span>
          <ActionIconGroup is-comparing is-favorite />
        </div>
      </div>
    `,
  }),
};
