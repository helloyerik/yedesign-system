import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { ref } from "vue";
import InspectOverlay from "@components/blocks/InspectOverlay/InspectOverlay.vue";

const meta = {
  title: "Blocks/InspectOverlay",
  component: InspectOverlay,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    enabled: true,
  },
} satisfies Meta<typeof InspectOverlay>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => ({
    components: { InspectOverlay },
    setup() {
      const containerRef = ref<HTMLElement | null>(null);
      return { args, containerRef };
    },
    template: `
      <div
        ref="containerRef"
        style="
          display: flex;
          flex-direction: column;
          gap: var(--mi-spacing-16);
          padding: var(--mi-spacing-24);
          min-height: 70vh;
          background: var(--mi-color-surface-panel);
        "
      >
        <div
          style="
            display: flex;
            gap: var(--mi-spacing-12);
          "
        >
          <div
            style="
              flex: 1;
              padding: var(--mi-spacing-16);
              border-radius: var(--mi-radius-l);
              border: 1px solid var(--mi-color-line-generic);
              background: var(--mi-color-base-light);
            "
          >
            Карточка 1
          </div>
          <div
            style="
              flex: 1;
              padding: var(--mi-spacing-20);
              border-radius: var(--mi-radius-l);
              border: 1px solid var(--mi-color-line-generic);
              background: var(--mi-color-base-light);
            "
          >
            Карточка 2
          </div>
        </div>
        <button
          type="button"
          style="
            align-self: flex-start;
            padding: var(--mi-spacing-8) var(--mi-spacing-16);
            border-radius: var(--mi-radius-m);
            border: 1px solid var(--mi-color-line-generic);
            background: var(--mi-color-surface-panel);
            color: var(--mi-color-text-primary);
          "
        >
          Кнопка
        </button>
        <p
          style="
            margin: 0;
            max-width: 420px;
            color: var(--mi-color-text-secondary);
            font-family: var(--mi-font-family-body-1);
            font-size: var(--mi-font-size-body-1);
            line-height: var(--mi-line-height-body-1);
          "
        >
          Наведите курсор, чтобы увидеть слой инспекции. Компонент привязан к контейнеру.
        </p>
      </div>
      <InspectOverlay v-bind="args" :container-ref="containerRef" />
    `,
  }),
};
