import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Segmented from "@components/atoms/Segmented/Segmented.vue";

const meta = {
  title: "Atoms/Segmented",
  component: Segmented,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    fullWidth: false,
  },
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { Segmented },
    setup() {
      const value = ref("list");
      return {
        args,
        value,
        options: [
          { value: "list", label: "Список" },
          { value: "tiles", label: "Плитка" },
        ],
      };
    },
    template: `
      <Segmented v-bind="args" v-model="value" :options="options" />
    `,
  }),
};
