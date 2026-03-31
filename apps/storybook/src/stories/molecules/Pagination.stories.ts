import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import Pagination from "@components/molecules/Pagination/Pagination.vue";

const meta = {
  title: "Molecules/Pagination",
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
    compact: { control: "boolean" },
    showPages: { control: "boolean" },
  },
  args: {
    page: 4,
    pageSize: 10,
    total: 120,
    size: "M",
    compact: false,
    showPages: true,
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  render: (args) => ({
    components: { Pagination },
    setup() {
      const page = ref(args.page);

      return {
        args,
        page,
        onUpdate(nextPage: number, pageSize: number) {
          page.value = nextPage;
          void pageSize;
        },
      };
    },
    template: `
      <Pagination
        :page="page"
        :page-size="args.pageSize"
        :total="args.total"
        :size="args.size"
        :compact="args.compact"
        :show-pages="args.showPages"
        @update="onUpdate"
      />
    `,
  }),
};

export const Compact: Story = {
  args: {
    page: 2,
    pageSize: 10,
    total: 70,
    size: "M",
    compact: true,
    showPages: false,
  },
};

export const Large: Story = {
  args: {
    page: 8,
    pageSize: 10,
    total: 240,
    size: "L",
  },
};
