import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import Button from "@components/atoms/Button/Button.vue";
import BottomSheet from "@components/atoms/BottomSheet/BottomSheet.vue";

const meta = {
  title: "Atoms/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    title: "Настройки темы",
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Button, BottomSheet },
    setup() {
      const open = ref(false);
      return { args, open };
    },
    template: `
      <div style="display:grid; gap: var(--mi-spacing-16); justify-items:start; padding: var(--mi-spacing-24); min-height: 100vh;">
        <Button label="Открыть BottomSheet" variant="outline" @click="open = true" />
        <BottomSheet v-bind="args" v-model="open">
          <div style="display:grid; gap: var(--mi-spacing-16); padding: var(--mi-spacing-16);">
            <p style="margin:0;">Контент мобильного листа по паттерну dreamstore.</p>
            <Button label="Закрыть" width="full" @click="open = false" />
          </div>
        </BottomSheet>
      </div>
    `,
  }),
};
