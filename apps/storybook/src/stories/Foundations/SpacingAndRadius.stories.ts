import type { Meta, StoryObj } from "@storybook/vue3-vite";
import MetricRow from "@storybook-app/components/MetricRow.vue";
import radiusTokens from "@tokens-studio/Border Radius/Mode 1.json";
import spacingTokens from "@tokens-studio/Spacings/Mode 1.json";

type NumberToken = {
  value: number;
  type: "number";
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/ radius$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const spacingLabels: Record<string, string> = {
  "0": "None",
  Nano: "2 / Nano",
  Micro: "4 / Micro",
  S: "8 / Small",
  M: "12 / Medium",
  L: "16 / Large",
  XL: "20 / XL",
  "2XL": "24 / 2XL",
  "3XL": "28 / 3XL",
  "4XL": "32 / 4XL",
  "5XL": "36 / 5XL",
  "6XL": "40 / 6XL",
};

const radiusLabels: Record<string, string> = {
  "XS radius": "XS / 3px",
  "S radius": "S / 5px",
  "M radius": "M / 6px",
  "L radius": "L / 8px",
  "XL radius": "XL / 10px",
  "2XL radius": "2XL / 16px",
};

const spacing = Object.entries(spacingTokens as Record<string, NumberToken>)
  .sort(([, left], [, right]) => left.value - right.value)
  .map(([name, token]) => [spacingLabels[name] ?? name, `--mi-spacing-${slug(name)}`, `${token.value}px`] as const);

const radius = Object.entries(radiusTokens as Record<string, NumberToken>)
  .sort(([, left], [, right]) => left.value - right.value)
  .map(([name, token]) => [
    radiusLabels[name] ?? name,
    `--mi-radius-${slug(name)}`,
    `${token.value}px`,
    name === "2XL radius" ? "120px" : undefined,
  ] as const);

const sections = [
  {
    name: "Spacing",
    description: "Spacing tokens imported directly from the production Tokens Studio scale.",
    items: spacing,
  },
  {
    name: "Radius",
    description: "Corner radius tokens imported directly from the production Tokens Studio scale.",
    items: radius,
  },
];

const meta = {
  title: "Foundations/Spacing And Radius",
  component: MetricRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: () => ({
    components: { MetricRow },
    setup() {
      return { sections };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-32); max-width: 1200px;">
        <header style="display:grid; gap: var(--mi-spacing-12);">
          <p style="margin:0; color: var(--mi-color-text-secondary); font: var(--mi-font-weight-body-1) var(--mi-font-size-body-1) / var(--mi-line-height-body-1) var(--mi-font-family-body-1);">Foundations</p>
          <h1 style="margin:0; font-size: var(--mi-font-size-display-2); line-height: var(--mi-line-height-display-2);">Spacing and radius</h1>
        </header>

        <section v-for="section in sections" :key="section.name" style="display:grid; gap: var(--mi-spacing-16);">
          <header style="display:grid; gap: var(--mi-spacing-4);">
            <h2 style="margin:0; font-size: var(--mi-font-size-header-2); line-height: var(--mi-line-height-header-2);">
              {{ section.name }}
            </h2>
            <p style="margin:0; color: var(--mi-color-text-secondary); font-size: var(--mi-font-size-body-1); line-height: var(--mi-line-height-body-1);">
              {{ section.description }}
            </p>
          </header>
          <div style="display:grid; gap: 0;">
            <MetricRow
              v-for="[name, token, value, previewWidth] in section.items"
              :key="token"
              :name="name"
              :token="token"
              :value="value"
              :preview-width="previewWidth"
            />
          </div>
        </section>
      </section>
    `,
  }),
} satisfies Meta<typeof MetricRow>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
