import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhCheck, PhTrash } from "@phosphor-icons/vue";
import DropdownMenu from "@components/molecules/DropdownMenu/DropdownMenu.vue";

const meta = {
  title: "Molecules/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "inline-radio",
      options: ["bottom-start", "bottom-end"],
    },
    variant: {
      control: "inline-radio",
      options: ["default", "compact-list"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    placement: "bottom-end",
    variant: "default",
    disabled: false,
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultItems = [
  { id: "edit", label: "Edit" },
  [
    { id: "duplicate", label: "Duplicate", reserveIconSpace: true },
    { id: "archive", label: "Archive", description: "Moves item to archive", reserveIconSpace: true },
  ],
  { id: "delete", label: "Delete", theme: "danger", icon: PhTrash },
];

export const Default: Story = {
  render: (args) => ({
    components: { DropdownMenu },
    setup() {
      return { args, items: defaultItems };
    },
    template: `
      <DropdownMenu v-bind="args" :items="items" />
    `,
  }),
};

export const CompactList: Story = {
  render: (args) => ({
    components: { DropdownMenu, PhCheck },
    setup() {
      return {
        args: { ...args, variant: "compact-list", placement: "bottom-start" },
        items: [
          { id: "selected", label: "Selected item", icon: PhCheck, reserveIconSpace: true, labelClassName: "text-brand" },
          { id: "plain", label: "Plain item", reserveIconSpace: true },
        ],
      };
    },
    template: `
      <DropdownMenu v-bind="args" :items="items">
        <template #switcher="{ onClick, triggerRef }">
          <button
            :ref="triggerRef"
            type="button"
            @click="onClick"
            style="display:flex; align-items:center; gap:8px; padding:10px 12px; border:1px solid var(--mi-color-line-brand); border-radius: var(--mi-radius-m); background: transparent;"
          >
            Custom switcher
          </button>
        </template>
      </DropdownMenu>
    `,
  }),
};
