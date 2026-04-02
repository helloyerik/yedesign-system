import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Pagination from "@components/atoms/Pagination/Pagination.vue";

const meta = {
  title: "Atoms/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["S", "M", "L"],
    },
  },
  args: {
    size: "M",
    compact: false,
    showPages: true,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(3);
      return { args, page };
    },
    template: `
      <Pagination
        v-bind="args"
        :page="page"
        :page-size="10"
        :total="120"
        @update="(next) => (page = next)"
      />
    `,
  }),
};

export const Compact: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(1);
      return { args, page };
    },
    template: `
      <Pagination
        v-bind="args"
        compact
        :page="page"
        :page-size="10"
        :total="120"
        @update="(next) => (page = next)"
      />
    `,
  }),
};
