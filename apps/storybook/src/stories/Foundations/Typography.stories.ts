import type { Meta, StoryObj } from "@storybook/vue3-vite";
import TypographyScale from "@storybook-app/components/TypographyScale.vue";
import palette from "@tokens-studio/Palette/Mode 1.json";

type TypographyToken = {
  type: "typography";
};

type TypographyItem = {
  name: string;
  token: string;
  size: string;
  lineHeight: string;
  fontWeight?: string;
  fontFamily?: string;
  sample: string;
};

const slug = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const sampleByName: Record<string, string> = {
  "Display 4": "Oversized campaign headers and major launch statements",
  "Display 3": "Large editorial hero titles with strong brand presence",
  "Display 2": "Main hero headlines and bold sectional statements",
  "Display 1": "Section entry titles with strong visual rhythm",
  "Header 2": "Secondary section titles and module headings",
  "Header 1": "Card headings, filters and important content labels",
  "Subheader 3": "Prominent sub-sections and grouped content titles",
  "Subheader 2": "Nested headings and emphasized labels",
  "Subheader 1": "Dense UI subtitles and medium-emphasis headings",
  "Body 3": "Longer supporting paragraphs with comfortable readability",
  "Body 2": "Default body text for most product and marketing content",
  "Body 1": "Compact labels, helper text and metadata",
  "Body 1 Short": "Tight UI rows, compact chips and inline metadata",
  "Caption 2": "Secondary captions and support annotations",
  "Caption 1": "Microcopy, footnotes and minimal metadata",
  "Article Body": "Long-form article text for guides, specs and editorial blocks",
  "Code Body": "Monospace text for code snippets, values and technical examples",
};

const weightByName = (name: string) => `var(--mi-font-weight-${slug(name)})`;
const familyByName = (name: string) => `var(--mi-font-family-${slug(name)})`;

const valuesByName: Record<string, { size: string; lineHeight: string }> = {
  "Display 4": { size: "48px", lineHeight: "52px" },
  "Display 3": { size: "40px", lineHeight: "48px" },
  "Display 2": { size: "32px", lineHeight: "40px" },
  "Display 1": { size: "28px", lineHeight: "36px" },
  "Header 2": { size: "24px", lineHeight: "28px" },
  "Header 1": { size: "20px", lineHeight: "24px" },
  "Subheader 3": { size: "17px", lineHeight: "24px" },
  "Subheader 2": { size: "15px", lineHeight: "20px" },
  "Subheader 1": { size: "13px", lineHeight: "18px" },
  "Body 3": { size: "17px", lineHeight: "24px" },
  "Body 2": { size: "15px", lineHeight: "20px" },
  "Body 1": { size: "13px", lineHeight: "18px" },
  "Body 1 Short": { size: "13px", lineHeight: "16px" },
  "Caption 2": { size: "11px", lineHeight: "16px" },
  "Caption 1": { size: "9px", lineHeight: "12px" },
  "Article Body": { size: "15px", lineHeight: "20px" },
  "Code Body": { size: "15px", lineHeight: "22px" },
};

const makeItems = (groupName: "Display" | "Header" | "Text"): TypographyItem[] =>
  Object.entries(palette[groupName] as Record<string, TypographyToken>).map(([name]) => ({
    name,
    token: `--mi-font-size-${slug(name)}`,
    size: valuesByName[name]?.size ?? `var(--mi-font-size-${slug(name)})`,
    lineHeight: valuesByName[name]?.lineHeight ?? `var(--mi-line-height-${slug(name)})`,
    fontWeight: weightByName(name),
    fontFamily: familyByName(name),
    sample: sampleByName[name] ?? name,
  }));

const customTextItems: TypographyItem[] = [
  {
    name: "Article Body",
    token: "--mi-font-size-article-body",
    size: valuesByName["Article Body"].size,
    lineHeight: valuesByName["Article Body"].lineHeight,
    fontWeight: "var(--mi-font-weight-article-body)",
    fontFamily: "var(--mi-font-family-article-body)",
    sample: sampleByName["Article Body"],
  },
  {
    name: "Code Body",
    token: "--mi-font-size-code-body",
    size: valuesByName["Code Body"].size,
    lineHeight: valuesByName["Code Body"].lineHeight,
    fontWeight: "var(--mi-font-weight-code-body)",
    fontFamily: "var(--mi-font-family-code-body)",
    sample: sampleByName["Code Body"],
  },
];

const sections = [
  {
    name: "Display",
    description: "Largest type tokens for hero headlines and bold section entry points.",
    items: makeItems("Display"),
  },
  {
    name: "Header",
    description: "Section, module and card heading levels, including subheaders.",
    items: makeItems("Header"),
  },
  {
    name: "Text",
    description: "Reading text, compact body styles and caption levels.",
    items: [...makeItems("Text"), ...customTextItems],
  },
];

const meta = {
  title: "Foundations/Typography",
  component: TypographyScale,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: () => ({
    components: { TypographyScale },
    setup() {
      return { sections };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24); max-width: 1200px;">
        <header style="display:grid; gap: var(--mi-spacing-12);">
          <p style="margin:0; color: var(--mi-color-text-secondary); font: var(--mi-font-weight-body-1) var(--mi-font-size-body-1) / var(--mi-line-height-body-1) var(--mi-font-family-body-1);">Foundations</p>
          <h1 style="margin:0; font-size: var(--mi-font-size-display-2); line-height: var(--mi-line-height-display-2);">Typography scale</h1>
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
          <TypographyScale :items="section.items" />
        </section>
      </section>
    `,
  }),
} satisfies Meta<typeof TypographyScale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
