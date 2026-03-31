import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import Segmented from "@components/molecules/Segmented/Segmented.vue";

const meta = {
  title: "Molecules/Segmented",
  component: Segmented,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    fullWidth: { control: "boolean" },
  },
  args: {
    fullWidth: false,
  },
} satisfies Meta<typeof Segmented>;

export default meta;
type Story = StoryObj<typeof meta>;

const options = [
  { value: "all", label: "Все" },
  { value: "active", label: "Активные" },
  { value: "archived", label: "Архив" },
];

export const Interactive: Story = {
  render: (args) => ({
    components: { Segmented },
    setup() {
      const value = ref("all");
      return { args, value, options };
    },
    template: `
      <Segmented
        :value="value"
        :options="options"
        :full-width="args.fullWidth"
        @change="(nextValue) => value = nextValue"
      />
    `,
  }),
};

export const FullWidth: Story = {
  render: () => ({
    components: { Segmented },
    setup() {
      const value = ref("active");
      return {
        value,
        options: [
          { value: "all", label: "Все" },
          { value: "active", label: "Активные" },
          { value: "archived", label: "Архив", disabled: true },
        ],
      };
    },
    template: `
      <div style="width: 320px;">
        <Segmented
          :value="value"
          :options="options"
          full-width
          @change="(nextValue) => value = nextValue"
        />
      </div>
    `,
  }),
};
