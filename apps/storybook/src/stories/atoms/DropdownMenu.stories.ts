import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import DropdownMenu from "@components/atoms/DropdownMenu/DropdownMenu.vue";
import Button from "@components/atoms/Button/Button.vue";

const meta = {
  title: "Atoms/DropdownMenu",
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
  },
  args: {
    placement: "bottom-end",
    variant: "default",
    disabled: false,
  },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

const baseItems = [
  { id: "edit", label: "Edit" },
  { id: "duplicate", label: "Duplicate" },
  { id: "archive", label: "Archive" },
];

export const Default: Story = {
  render: (args) => ({
    components: { DropdownMenu },
    setup() {
      return { args };
    },
    template: `
      <DropdownMenu v-bind="args" :items="[
        { id: 'edit', label: 'Edit' },
        { id: 'duplicate', label: 'Duplicate' },
        { id: 'archive', label: 'Archive' },
      ]" />
    `,
  }),
};

export const WithGroups: Story = {
  render: (args) => ({
    components: { DropdownMenu },
    setup() {
      return { args };
    },
    template: `
      <DropdownMenu v-bind="args" :items="[
        { id: 'edit', label: 'Edit' },
        { id: 'duplicate', label: 'Duplicate' },
        [
          { id: 'danger', label: 'Delete', theme: 'danger' },
        ],
      ]" />
    `,
  }),
};

export const CustomTrigger: Story = {
  render: (args) => ({
    components: { DropdownMenu, Button },
    setup() {
      const open = ref(false);
      return { args, open, baseItems };
    },
    template: `
      <DropdownMenu v-bind="args" :items="baseItems">
        <template #trigger="{ toggle }">
          <Button label="Open menu" @click="toggle" />
        </template>
      </DropdownMenu>
    `,
  }),
};
