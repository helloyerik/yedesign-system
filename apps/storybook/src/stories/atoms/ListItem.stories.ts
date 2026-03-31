import { ref } from "vue";
import type { Meta, StoryObj } from "@storybook/vue3-vite";
import { PhCaretDown, PhFlowerLotus, PhQuestion } from "@phosphor-icons/vue";
import ListItem from "@components/atoms/ListItem/ListItem.vue";
import Checkbox from "@components/atoms/Checkbox/Checkbox.vue";
import Radio from "@components/atoms/Radio/Radio.vue";
import Switch from "@components/atoms/Switch/Switch.vue";

const imageSrc =
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=160&q=80";

const meta = {
  title: "Atoms/ListItem",
  component: ListItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "inline-radio",
      options: ["XL", "L", "M", "S", "XS"],
    },
    chevron: { control: "boolean" },
    variant: {
      control: "inline-radio",
      options: ["plain", "filled"],
    },
    interactive: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    title: "Label",
    subtitle: "Description",
    imageSrc,
    size: "M",
    variant: "plain",
    chevron: true,
    interactive: true,
    disabled: false,
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: (args) => ({
    components: { ListItem },
    setup() {
      return { args };
    },
    template: `
      <div style="width: 373px;">
        <ListItem v-bind="args" />
      </div>
    `,
  }),
};

export const Sizes: Story = {
  render: () => ({
    components: { ListItem },
    setup() {
      return { imageSrc };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24); max-width: 373px;">
        <div style="padding-inline: var(--mi-spacing-16);">
          <ListItem size="XL" variant="plain" title="Label" subtitle="Description" :image-src="imageSrc" />
        </div>
        <div style="padding-inline: var(--mi-spacing-12);">
          <ListItem size="L" variant="plain" title="Label" subtitle="Description" :image-src="imageSrc" />
        </div>
        <div style="padding-inline: var(--mi-spacing-12);">
          <ListItem size="M" variant="plain" title="Label" subtitle="Description" :image-src="imageSrc" />
        </div>
        <div style="padding-inline: var(--mi-spacing-8);">
          <ListItem size="S" variant="plain" title="Label" subtitle="Description" :image-src="imageSrc" />
        </div>
        <div style="padding-inline: var(--mi-spacing-8);">
          <ListItem size="XS" variant="plain" title="Label" subtitle="Description" :image-src="imageSrc" />
        </div>
      </section>
    `,
  }),
};

export const Filled: Story = {
  render: () => ({
    components: { ListItem },
    setup() {
      return { imageSrc };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-24); max-width: 373px;">
        <ListItem size="XL" variant="filled" title="Label" subtitle="Description" :image-src="imageSrc" />
        <ListItem size="L" variant="filled" title="Label" subtitle="Description" :image-src="imageSrc" />
        <ListItem size="M" variant="filled" title="Label" subtitle="Description" :image-src="imageSrc" />
        <ListItem size="S" variant="filled" title="Label" subtitle="Description" :image-src="imageSrc" />
        <ListItem size="XS" variant="filled" title="Label" subtitle="Description" :image-src="imageSrc" />
      </section>
    `,
  }),
};

export const LeadingControls: Story = {
  render: () => ({
    components: { ListItem, Checkbox, Radio, Switch, PhCaretDown, PhFlowerLotus, PhQuestion },
    setup() {
      const checked = ref(true);
      const enabled = ref(false);
      return { checked, enabled };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-12); max-width: 343px;">
        <ListItem size="S" title="Иконка">
          <template #start>
            <PhCaretDown :size="16" />
          </template>
          <template #media>
            <Checkbox size="M" :checked="true" />
          </template>
          <template #subtitle>
            <span style="display:inline-flex; align-items:center; gap: var(--mi-spacing-8);">
              <PhFlowerLotus :size="16" />
              Иконка
            </span>
          </template>
          <template #meta>
            <span style="display:inline-flex; width: var(--mi-spacing-16); height: var(--mi-spacing-16); align-items:center; justify-content:center; border-radius: var(--mi-radius-pill); background: var(--mi-color-base-generic); color: var(--mi-color-text-secondary);">
              <PhQuestion :size="10" weight="fill" />
            </span>
          </template>
        </ListItem>

        <ListItem size="S" title="Иконка">
          <template #start>
            <PhCaretDown :size="16" />
          </template>
          <template #media>
            <Switch v-model:checked="checked" size="M" />
          </template>
          <template #subtitle>
            <span style="display:inline-flex; align-items:center; gap: var(--mi-spacing-8);">
              <PhFlowerLotus :size="16" />
              Иконка
            </span>
          </template>
          <template #meta>
            <span style="display:inline-flex; width: var(--mi-spacing-16); height: var(--mi-spacing-16); align-items:center; justify-content:center; border-radius: var(--mi-radius-pill); background: var(--mi-color-base-generic); color: var(--mi-color-text-secondary);">
              <PhQuestion :size="10" weight="fill" />
            </span>
          </template>
        </ListItem>

        <ListItem size="S" title="Иконка">
          <template #start>
            <PhCaretDown :size="16" />
          </template>
          <template #media>
            <span style="display:inline-flex; align-items:center; gap: var(--mi-spacing-8);">
              <PhFlowerLotus :size="16" />
              Иконка
            </span>
          </template>
          <template #end>
            <Switch v-model:checked="enabled" size="M" />
          </template>
        </ListItem>
      </section>
    `,
  }),
};

export const MediaVariants: Story = {
  render: () => ({
    components: { ListItem, Checkbox, Radio, PhFlowerLotus },
    setup() {
      return { imageSrc };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-12); justify-items:start;">
        <ListItem size="S" title="Label" subtitle="Image" :image-src="imageSrc" />
        <ListItem size="S" title="Label" subtitle="Checkbox">
          <template #media>
            <Checkbox size="M" :checked="true" />
          </template>
        </ListItem>
        <ListItem size="S" title="Label" subtitle="Radio">
          <template #media>
            <Radio :checked="true" />
          </template>
        </ListItem>
        <ListItem size="S" title="Label" subtitle="Icon">
          <template #media>
            <PhFlowerLotus :size="20" />
          </template>
        </ListItem>
      </section>
    `,
  }),
};

export const StackedExamples: Story = {
  render: () => ({
    components: { ListItem },
    setup() {
      return { imageSrc };
    },
    template: `
      <section style="display:grid; gap: var(--mi-spacing-12); max-width: 343px;">
        <ListItem size="M" title="1" :image-src="imageSrc" :chevron="false" :interactive="false" />
        <ListItem size="M" title="2" :image-src="imageSrc" :chevron="false" :interactive="false" />
      </section>
    `,
  }),
};
