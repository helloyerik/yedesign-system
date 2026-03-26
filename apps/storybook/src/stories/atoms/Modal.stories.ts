import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Modal from "@components/atoms/Modal/Modal.vue";

const meta = {
  title: "Components/Modal",
  component: Modal,
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
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

const renderModal = (args: Record<string, unknown>, content: string) => ({
  components: { Modal },
  setup() {
    return { args };
  },
  template: `
    <Modal v-bind="args" :model-value="true">
      ${content}
    </Modal>
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
    renderModal(
      args,
      `
      <div style="display:flex; align-items:center; justify-content:center; width:100%; min-height:200px; padding:16px; color:var(--mi-color-text-brand); text-align:center; font-family:var(--mi-font-family-body-2); font-size:var(--mi-font-size-body-2); line-height:var(--mi-line-height-body-2);">
        {Content}
      </div>
      `,
    ),
};
