import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import SearchInput from "@components/atoms/SearchInput/SearchInput.vue";

const meta = {
  title: "Atoms/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "inline-radio",
      options: ["hug", "full"],
    },
    surface: {
      control: "inline-radio",
      options: ["generic", "plain"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    modelValue: "",
    placeholder: "Search products",
    width: "hug",
    surface: "generic",
    disabled: false,
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { SearchInput },
    setup() {
      const value = ref(args.modelValue ?? "");
      return { args, value };
    },
    template: `
      <div style="max-width: 420px;">
        <SearchInput v-bind="args" v-model="value" />
      </div>
    `,
  }),
};

export const Variants: Story = {
  render: () => ({
    components: { SearchInput },
    setup() {
      const query = ref("iPhone");
      return { query };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-16); max-width: 480px;">
        <SearchInput placeholder="Search" />
        <SearchInput v-model="query" placeholder="Search" surface="plain" />
        <SearchInput placeholder="Full width search" width="full" />
        <SearchInput placeholder="Disabled" disabled />
      </section>
    `,
  }),
};
