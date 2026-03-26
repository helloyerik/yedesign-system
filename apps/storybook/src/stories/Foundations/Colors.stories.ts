import type { Meta, StoryObj } from "@storybook/vue3-vite";
import TokenSwatch from "@storybook-app/components/TokenSwatch.vue";
import lightTokens from "@tokens-studio/Tokens/Light.json";

type ColorToken = {
  value: string;
  type: "color";
  description?: string;
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const sections = Object.entries(lightTokens).map(([sectionName, items]) => ({
  name: sectionName,
  items: Object.entries(items as Record<string, ColorToken>).map(([name, token]) => ({
    name,
    token: `--mi-color-${slug(sectionName)}-${slug(name)}`,
    value: `var(--mi-color-${slug(sectionName)}-${slug(name)})`,
    description: token.description,
  })),
}));

const meta = {
  title: "Foundations/Colors",
  component: TokenSwatch,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: () => ({
    components: { TokenSwatch },
    setup() {
      return { sections };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24); max-width: 1200px;">
        <header style="max-width: 760px; display:grid; gap: var(--mi-spacing-12);">
          <p style="margin:0; color: var(--mi-color-text-secondary); font: var(--mi-font-weight-body-1) var(--mi-font-size-body-1) / var(--mi-line-height-body-1) var(--mi-font-family-body-1);">Foundations</p>
          <h1 style="margin:0; font-size: var(--mi-font-size-display-2); line-height: var(--mi-line-height-display-2);">Semantic colors</h1>
          <p style="margin:0; color: var(--mi-color-text-secondary); font-size: var(--mi-font-size-body-2); line-height: var(--mi-line-height-body-2);">
            This story is generated from the production Tokens Studio export. Each swatch below maps directly to a semantic color token used in the live system.
          </p>
        </header>
        <section v-for="section in sections" :key="section.name" style="display:grid; gap: var(--mi-spacing-16);">
          <header style="display:grid; gap: var(--mi-spacing-4);">
            <h2 style="margin:0; font-size: var(--mi-font-size-header-2); line-height: var(--mi-line-height-header-2);">
              {{ section.name }}
            </h2>
            <p style="margin:0; color: var(--mi-color-text-secondary); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">
              {{ section.items.length }} token(s)
            </p>
          </header>
          <div style="display:grid; gap: 0;">
            <TokenSwatch v-for="item in section.items" :key="item.token" v-bind="item" />
          </div>
        </section>
      </section>
    `,
  }),
} satisfies Meta<typeof TokenSwatch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
