import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import Tooltip from "@components/atoms/Tooltip/Tooltip.vue";

const meta = {
  title: "Atoms/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "inline-radio",
      options: ["top", "bottom", "left", "right"],
    },
    widthVariant: {
      control: "inline-radio",
      options: ["fixed", "hug"],
    },
    autoPosition: { control: "boolean" },
    autoArrow: { control: "boolean" },
  },
  args: {
    position: "bottom",
    widthVariant: "fixed",
    autoPosition: false,
    autoArrow: true,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <div style="display:grid; gap: var(--mi-spacing-4); text-align:center;">
          <p style="margin:0; color: var(--mi-color-text-primary); font: var(--mi-font-weight-subheader-2) var(--mi-font-size-subheader-2) / var(--mi-line-height-subheader-2) var(--mi-font-family-subheader-2);">
            {Title}
          </p>
          <p style="margin:0; color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">
            {Description}
          </p>
        </div>
      </Tooltip>
    `,
  }),
};

export const HugWidth: Story = {
  args: {
    widthVariant: "hug",
  },
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args };
    },
    template: `
      <Tooltip v-bind="args">
        <p style="margin:0; white-space:nowrap; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-body-2); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
          {Title}
        </p>
      </Tooltip>
    `,
  }),
};

export const AllPositions: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24); justify-items:center; padding: var(--mi-spacing-24);">
        <Tooltip position="bottom" width-variant="hug">
          <p style="margin:0; white-space:nowrap; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-body-2); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
            Bottom
          </p>
        </Tooltip>
        <div style="display:flex; gap: var(--mi-spacing-24); align-items:center;">
          <Tooltip position="right" width-variant="hug">
            <p style="margin:0; white-space:nowrap; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-body-2); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
              Right
            </p>
          </Tooltip>
          <Tooltip position="left" width-variant="hug">
            <p style="margin:0; white-space:nowrap; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-body-2); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
              Left
            </p>
          </Tooltip>
        </div>
        <Tooltip position="top" width-variant="hug">
          <p style="margin:0; white-space:nowrap; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-body-2); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
            Top
          </p>
        </Tooltip>
      </section>
    `,
  }),
};

export const RichContent: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <Tooltip position="bottom">
        <div style="display:grid; gap: var(--mi-spacing-8); width: 200px;">
          <p style="margin:0; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-subheader-2); font-size: var(--mi-font-size-subheader-2); line-height: var(--mi-line-height-subheader-2); font-weight: var(--mi-font-weight-subheader-2);">
            {Title}
          </p>
          <p style="margin:0; color: var(--mi-color-text-secondary); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">
            {Description}
          </p>
        </div>
      </Tooltip>
    `,
  }),
};

export const AlignedToTrigger: Story = {
  render: () => ({
    components: { Tooltip },
    setup() {
      const buttonRef = ref<HTMLElement | null>(null);
      const labelRef = ref<HTMLElement | null>(null);

      return { buttonRef, labelRef };
    },
    template: `
      <div style="width: 420px; border-radius: var(--mi-radius-m); background: var(--mi-color-base-generic); padding: var(--mi-spacing-16);">
        <div style="display:flex; align-items:flex-start; justify-content:space-between;">
          <button
            ref="buttonRef"
            type="button"
            style="display:inline-flex; width: 36px; height: 36px; align-items:center; justify-content:center; border: 1px solid var(--mi-color-line-generic); border-radius: 999px; background: var(--mi-color-base-light); color: var(--mi-color-text-primary);"
          >
            I
          </button>

          <div
            ref="labelRef"
            style="display:inline-flex; align-items:center; border-radius: var(--mi-radius-xs); background: var(--mi-color-base-semantic-positive-light); padding: 1px var(--mi-spacing-8); color: var(--mi-color-text-positive); font-family: var(--mi-font-family-body-1); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);"
          >
            {Label}
          </div>
        </div>

        <div style="position:relative; height: 120px; margin-top: var(--mi-spacing-16);">
          <div style="position:absolute; top: 8px; left: 12px;">
            <Tooltip position="bottom" width-variant="hug" :trigger="buttonRef">
              <p style="margin:0; white-space:nowrap; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-body-2); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
                {Tooltip}
              </p>
            </Tooltip>
          </div>

          <div style="position:absolute; top: 8px; right: 12px;">
            <Tooltip position="bottom" width-variant="hug" :trigger="labelRef">
              <p style="margin:0; white-space:nowrap; color: var(--mi-color-text-primary); font-family: var(--mi-font-family-body-2); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
                {Tooltip}
              </p>
            </Tooltip>
          </div>
        </div>
      </div>
    `,
  }),
};
