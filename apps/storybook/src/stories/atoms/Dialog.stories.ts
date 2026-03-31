import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Dialog from "@components/atoms/Dialog/Dialog.vue";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "select",
      options: ["S", "M", "L"],
    },
    variant: {
      control: "select",
      options: ["Primary", "Secondary"],
    },
    closeButtonVariant: {
      control: "select",
      options: ["ghost", "secondary"],
    },
    footerBordered: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderDialog = (args: Record<string, unknown>, content: string) => ({
  components: { Dialog },
  setup() {
    return { args };
  },
  template: `
    <Dialog v-bind="args" :model-value="true">
      ${content}
    </Dialog>
  `,
});

export const Default: Story = {
  args: {
    title: "{Title}",
    variant: "Secondary",
    width: "S",
    showFooter: false,
  },
  render: (args) =>
    renderDialog(
      args,
      `
      <div style="display:flex; align-items:center; justify-content:center; width:100%; min-height:200px; padding:16px; color:var(--mi-color-text-brand); text-align:center; font-family:var(--mi-font-family-body-2); font-size:var(--mi-font-size-body-2); line-height:var(--mi-line-height-body-2);">
        {Content}
      </div>
      `,
    ),
};

export const PrimaryVariant: Story = {
  args: {
    variant: "Primary",
    width: "S",
    showFooter: false,
  },
  render: (args) =>
    renderDialog(
      args,
      `
      <div style="display:flex; align-items:center; justify-content:center; width:100%; min-height:200px; padding:16px; color:var(--mi-color-text-brand); text-align:center; font-family:var(--mi-font-family-body-2); font-size:var(--mi-font-size-body-2); line-height:var(--mi-line-height-body-2);">
        {Description}
      </div>
      `,
    ),
};

export const LargeWidth: Story = {
  args: {
    title: "{Title}",
    variant: "Secondary",
    width: "L",
    showFooter: true,
  },
  render: (args) =>
    renderDialog(
      args,
      `
      <div style="display:flex; align-items:center; justify-content:center; width:100%; height:400px; color:var(--mi-color-text-brand); font-family:var(--mi-font-family-body-2); font-size:var(--mi-font-size-body-2); line-height:var(--mi-line-height-body-2);">
        {Content}
      </div>
      `,
    ),
};

export const WithFooter: Story = {
  args: {
    title: "{Title}",
    variant: "Secondary",
    width: "M",
    showFooter: true,
    footerBordered: true,
  },
  render: (args) =>
    renderDialog(
      args,
      `
      <div style="display:flex; width:100%; flex-direction:column; gap:16px; padding:20px; background:#fff;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <label style="font-family:var(--mi-font-family-caption-2); font-size:var(--mi-font-size-caption-2); line-height:var(--mi-line-height-caption-2); color:var(--mi-color-text-secondary); text-transform:uppercase; letter-spacing:0.06em;">{Label}</label>
          <div style="padding:12px; border:1px solid var(--mi-color-line-generic); border-radius:var(--mi-radius-l); font-family:var(--mi-font-family-body-1); font-size:var(--mi-font-size-body-1); line-height:var(--mi-line-height-body-1); color:var(--mi-color-text-primary);">{Value}</div>
        </div>
        <div style="display:flex; flex-direction:column; gap:4px;">
          <label style="font-family:var(--mi-font-family-caption-2); font-size:var(--mi-font-size-caption-2); line-height:var(--mi-line-height-caption-2); color:var(--mi-color-text-secondary); text-transform:uppercase; letter-spacing:0.06em;">{Label}</label>
          <div style="padding:12px; border:1px solid var(--mi-color-line-generic); border-radius:var(--mi-radius-l); font-family:var(--mi-font-family-body-1); font-size:var(--mi-font-size-body-1); line-height:var(--mi-line-height-body-1); color:var(--mi-color-text-hint); font-style:italic;">{Value}</div>
        </div>
      </div>
      `,
    ),
};

export const SecondaryCloseButton: Story = {
  args: {
    title: "{Title}",
    variant: "Secondary",
    width: "S",
    closeButtonVariant: "secondary",
    showFooter: false,
  },
  render: (args) =>
    renderDialog(
      args,
      `
      <div style="display:flex; align-items:center; justify-content:center; width:100%; min-height:200px; padding:16px; color:var(--mi-color-text-brand); text-align:center; font-family:var(--mi-font-family-body-2); font-size:var(--mi-font-size-body-2); line-height:var(--mi-line-height-body-2);">
        {Content}
      </div>
      `,
    ),
};

export const BorderlessFooter: Story = {
  args: {
    title: "{Title}",
    variant: "Secondary",
    width: "M",
    showFooter: true,
    footerBordered: false,
  },
  render: (args) =>
    renderDialog(
      args,
      `
      <div style="display:flex; width:100%; flex-direction:column; gap:16px; padding:20px; background:#fff;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <label style="font-family:var(--mi-font-family-caption-2); font-size:var(--mi-font-size-caption-2); line-height:var(--mi-line-height-caption-2); color:var(--mi-color-text-secondary); text-transform:uppercase; letter-spacing:0.06em;">{Label}</label>
          <div style="padding:12px; border:1px solid var(--mi-color-line-generic); border-radius:var(--mi-radius-l); font-family:var(--mi-font-family-body-1); font-size:var(--mi-font-size-body-1); line-height:var(--mi-line-height-body-1); color:var(--mi-color-text-primary);">{Value}</div>
        </div>
      </div>
      `,
    ),
};
