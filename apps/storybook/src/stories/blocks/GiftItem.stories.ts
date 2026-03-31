import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhGift } from "@phosphor-icons/vue";
import GiftItem from "@components/blocks/GiftItem/GiftItem.vue";

const meta = {
  title: "Blocks/GiftItem",
  component: GiftItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    title: "{Title}",
    description: "{Description}",
    actionLabel: "{Action}",
  },
} satisfies Meta<typeof GiftItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { GiftItem, PhGift },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 360px;">
        <GiftItem v-bind="args">
          <template #icon>
            <PhGift :size="20" color="var(--mi-color-brand-primary)" />
          </template>
        </GiftItem>
      </div>
    `,
  }),
};
