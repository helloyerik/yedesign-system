import type { Meta, StoryObj } from "@storybook/vue3-vite";
import SelectorCard from "@mi/components/molecules/SelectorCard/SelectorCard.vue";

const meta = {
  title: "Molecules/SelectorCard",
  component: SelectorCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  render: () => ({
    components: { SelectorCard },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24); max-width: 760px;">
        <div style="display:grid; gap: var(--mi-spacing-12);">
          <h2 style="margin:0; font-size: var(--mi-font-size-header-2); line-height: var(--mi-line-height-header-2);">Brand</h2>
          <div style="display:grid; gap: var(--mi-spacing-12);">
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="brand" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="brand" state="hover" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="brand" state="active" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="brand" :checked="true" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="brand" :checked="true" :disabled="true" />
          </div>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-12);">
          <h2 style="margin:0; font-size: var(--mi-font-size-header-2); line-height: var(--mi-line-height-header-2);">Primary</h2>
          <div style="display:grid; gap: var(--mi-spacing-12);">
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="primary" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="primary" state="hover" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="primary" state="active" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="primary" :checked="true" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" variant="primary" :checked="true" :disabled="true" />
          </div>
        </div>
        <div style="display:grid; gap: var(--mi-spacing-12);">
          <h2 style="margin:0; font-size: var(--mi-font-size-header-2); line-height: var(--mi-line-height-header-2);">Sizes</h2>
          <div style="display:grid; gap: var(--mi-spacing-12);">
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" size="M" />
            <SelectorCard title="Картой онлайн" description="Оплата картой Visa или MasterCard" size="L" />
          </div>
        </div>
      </section>
    `,
  }),
} satisfies Meta<typeof SelectorCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
