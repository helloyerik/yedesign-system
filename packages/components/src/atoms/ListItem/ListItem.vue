<script setup lang="ts">
import { computed, useSlots } from "vue";
import { PhCaretRight } from "@phosphor-icons/vue";
import UserAvatar from "../UserAvatar/UserAvatar.vue";

type ListItemSize = "XL" | "L" | "M" | "S" | "XS";
type ListItemVariant = "plain" | "fill";

const props = withDefaults(
  defineProps<{
    title: string;
    subtitle?: string;
    imageSrc?: string;
    imageAlt?: string;
    size?: ListItemSize;
    variant?: ListItemVariant;
    chevron?: boolean;
    interactive?: boolean;
    disabled?: boolean;
  }>(),
  {
    subtitle: "",
    imageSrc: "",
    imageAlt: "",
    size: "M",
    variant: "plain",
    chevron: true,
    interactive: true,
    disabled: false,
  },
);

const slots = useSlots();

const hasStart = computed(() => Boolean(slots.start));
const hasMedia = computed(() => Boolean(slots.media) || Boolean(props.imageSrc));
const hasMeta = computed(() => Boolean(slots.meta));
const hasEnd = computed(() => Boolean(slots.end));
const hasSubtitle = computed(() => Boolean(props.subtitle) || Boolean(slots.subtitle));

const mediaSize = computed(() => {
  switch (props.size) {
    case "XL":
      return 72;
    case "L":
      return 48;
    case "M":
      return 48;
    case "S":
      return 40;
    case "XS":
      return 40;
    default:
      return 36;
  }
});

const avatarFallbackSize = computed(() => Math.max(mediaSize.value, 24));
</script>

<template>
  <div
    class="mi-list-item"
    :class="[
      `mi-list-item--${size}`,
      `mi-list-item--${variant}`,
      {
        'is-interactive': interactive && !disabled,
        'is-disabled': disabled,
        'has-subtitle': hasSubtitle,
      },
    ]"
  >
    <div v-if="hasStart" class="mi-list-item__start">
      <slot name="start" />
    </div>

    <div v-if="hasMedia || slots.media" class="mi-list-item__media">
      <slot name="media">
        <img
          v-if="imageSrc"
          class="mi-list-item__image"
          :src="imageSrc"
          :alt="imageAlt || title"
        />
        <UserAvatar v-else :size="avatarFallbackSize" />
      </slot>
    </div>

    <div class="mi-list-item__body">
      <div class="mi-list-item__content">
        <span class="mi-list-item__title">{{ title }}</span>
        <span v-if="hasSubtitle" class="mi-list-item__subtitle">
          <slot name="subtitle">{{ subtitle }}</slot>
        </span>
      </div>
      <div v-if="hasMeta" class="mi-list-item__meta">
        <slot name="meta" />
      </div>
    </div>

    <div v-if="hasEnd" class="mi-list-item__end">
      <slot name="end" />
    </div>
    <div v-else-if="chevron" class="mi-list-item__end mi-list-item__end--chevron" aria-hidden="true">
      <PhCaretRight class="mi-list-item__chevron" weight="regular" />
    </div>
  </div>
</template>

<style scoped>
.mi-list-item {
  --mi-list-item-min-height: var(--mi-size-list-item-m-height);
  --mi-list-item-media-size: var(--mi-size-list-item-m-media);
  --mi-list-item-padding-x: var(--mi-spacing-16);
  --mi-list-item-padding-y: var(--mi-spacing-12);
  --mi-list-item-gap: var(--mi-spacing-12);
  --mi-list-item-radius: var(--mi-radius-2xl);
  --mi-list-item-title-family: var(--mi-font-family-body-2);
  --mi-list-item-title-size: var(--mi-font-size-body-2);
  --mi-list-item-title-weight: var(--mi-font-weight-body-2);
  --mi-list-item-title-line-height: var(--mi-line-height-body-2);
  --mi-list-item-subtitle-family: var(--mi-font-family-body-2);
  --mi-list-item-subtitle-size: var(--mi-font-size-body-2);
  --mi-list-item-subtitle-weight: var(--mi-font-weight-body-2);
  --mi-list-item-subtitle-line-height: var(--mi-line-height-body-2);
  --mi-list-item-end-size: var(--mi-size-list-item-m-chevron);
  --mi-list-item-media-radius: var(--mi-radius-l);

  display: flex;
  align-items: center;
  min-height: var(--mi-list-item-min-height);
  gap: var(--mi-list-item-gap);
  padding: var(--mi-list-item-padding-y) var(--mi-list-item-padding-x);
  border-radius: var(--mi-list-item-radius);
  background: transparent;
  color: var(--mi-color-text-primary);
  transition:
    background-color 160ms ease,
    color 160ms ease,
    opacity 160ms ease;
}

.mi-list-item--XL {
  --mi-list-item-min-height: var(--mi-size-list-item-xl-height);
  --mi-list-item-media-size: var(--mi-size-list-item-xl-media);
  --mi-list-item-end-size: var(--mi-size-list-item-xl-chevron);
  --mi-list-item-padding-x: var(--mi-spacing-16);
  --mi-list-item-padding-y: var(--mi-spacing-16);
  --mi-list-item-gap: var(--mi-spacing-16);
  --mi-list-item-radius: var(--mi-radius-list-item-xl-fill);
  --mi-list-item-title-family: var(--mi-font-family-body-3);
  --mi-list-item-title-size: var(--mi-font-size-body-3);
  --mi-list-item-title-weight: var(--mi-font-weight-body-3);
  --mi-list-item-title-line-height: var(--mi-size-list-item-xl-title-line-height);
}

.mi-list-item--L {
  --mi-list-item-min-height: var(--mi-size-list-item-l-height);
  --mi-list-item-media-size: var(--mi-size-list-item-l-media);
  --mi-list-item-end-size: var(--mi-size-list-item-l-chevron);
  --mi-list-item-padding-x: var(--mi-spacing-16);
  --mi-list-item-padding-y: var(--mi-spacing-12);
  --mi-list-item-gap: var(--mi-spacing-12);
  --mi-list-item-radius: var(--mi-radius-list-item-l-fill);
  --mi-list-item-title-family: var(--mi-font-family-body-2);
  --mi-list-item-title-size: var(--mi-font-size-body-2);
  --mi-list-item-title-weight: var(--mi-font-weight-body-2);
  --mi-list-item-title-line-height: var(--mi-line-height-body-2);
  --mi-list-item-subtitle-family: var(--mi-font-family-body-1);
  --mi-list-item-subtitle-size: var(--mi-font-size-body-1);
  --mi-list-item-subtitle-weight: var(--mi-font-weight-body-1);
  --mi-list-item-subtitle-line-height: var(--mi-line-height-body-1-short);
}

.mi-list-item--M {
  --mi-list-item-min-height: var(--mi-size-list-item-m-height);
  --mi-list-item-media-size: var(--mi-size-list-item-m-media);
  --mi-list-item-end-size: var(--mi-size-list-item-m-chevron);
  --mi-list-item-padding-x: var(--mi-spacing-12);
  --mi-list-item-padding-y: var(--mi-spacing-12);
  --mi-list-item-gap: var(--mi-spacing-12);
  --mi-list-item-radius: var(--mi-radius-list-item-m-fill);
  --mi-list-item-title-family: var(--mi-font-family-body-2);
  --mi-list-item-title-size: var(--mi-font-size-body-2);
  --mi-list-item-title-weight: var(--mi-font-weight-body-2);
  --mi-list-item-title-line-height: var(--mi-line-height-body-2);
  --mi-list-item-subtitle-family: var(--mi-font-family-body-1);
  --mi-list-item-subtitle-size: var(--mi-font-size-body-1);
  --mi-list-item-subtitle-weight: var(--mi-font-weight-body-1);
  --mi-list-item-subtitle-line-height: var(--mi-line-height-body-1-short);
}

.mi-list-item--S {
  --mi-list-item-min-height: var(--mi-size-list-item-s-height);
  --mi-list-item-media-size: var(--mi-size-list-item-s-media);
  --mi-list-item-end-size: var(--mi-size-list-item-s-chevron);
  --mi-list-item-padding-x: var(--mi-spacing-12);
  --mi-list-item-padding-y: var(--mi-spacing-8);
  --mi-list-item-gap: var(--mi-size-list-item-s-gap);
  --mi-list-item-radius: var(--mi-radius-list-item-s-fill);
  --mi-list-item-title-family: var(--mi-font-family-body-1);
  --mi-list-item-title-size: var(--mi-font-size-body-1);
  --mi-list-item-title-weight: var(--mi-font-weight-body-1);
  --mi-list-item-title-line-height: var(--mi-line-height-body-1-short);
  --mi-list-item-subtitle-family: var(--mi-font-family-caption-2);
  --mi-list-item-subtitle-size: var(--mi-font-size-caption-2);
  --mi-list-item-subtitle-weight: var(--mi-font-weight-caption-2);
  --mi-list-item-subtitle-line-height: var(--mi-size-list-item-caption-line-height);
}

.mi-list-item--XS {
  --mi-list-item-min-height: var(--mi-size-list-item-xs-height);
  --mi-list-item-media-size: var(--mi-size-list-item-xs-media);
  --mi-list-item-end-size: var(--mi-size-list-item-xs-chevron);
  --mi-list-item-padding-x: var(--mi-spacing-12);
  --mi-list-item-padding-y: var(--mi-spacing-8);
  --mi-list-item-gap: var(--mi-size-list-item-xs-gap);
  --mi-list-item-radius: var(--mi-radius-list-item-xs-fill);
  --mi-list-item-title-family: var(--mi-font-family-body-1);
  --mi-list-item-title-size: var(--mi-font-size-body-1);
  --mi-list-item-title-weight: var(--mi-font-weight-body-1);
  --mi-list-item-title-line-height: var(--mi-line-height-body-1-short);
  --mi-list-item-subtitle-family: var(--mi-font-family-caption-2);
  --mi-list-item-subtitle-size: var(--mi-font-size-caption-2);
  --mi-list-item-subtitle-weight: var(--mi-font-weight-caption-2);
  --mi-list-item-subtitle-line-height: var(--mi-size-list-item-caption-line-height);
}

.mi-list-item--fill {
  background: var(--mi-color-surface-panel);
}

.mi-list-item.is-interactive {
  cursor: pointer;
}

.mi-list-item.is-interactive:hover {
  background: var(--mi-color-surface-muted);
}

.mi-list-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.mi-list-item__start,
.mi-list-item__media,
.mi-list-item__end {
  flex: 0 0 auto;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mi-list-item__media {
  width: var(--mi-list-item-media-size);
  height: var(--mi-list-item-media-size);
  overflow: hidden;
  border-radius: var(--mi-list-item-media-radius);
  background: var(--mi-color-surface-muted);
}

.mi-list-item__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mi-list-item__body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--mi-spacing-8);
  flex: 1 1 auto;
  min-width: 0;
}

.mi-list-item__content {
  display: grid;
  gap: var(--mi-spacing-4);
  min-width: 0;
}

.mi-list-item__title,
.mi-list-item__subtitle,
.mi-list-item__meta {
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mi-list-item__title {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-list-item-title-family);
  font-size: var(--mi-list-item-title-size);
  font-weight: var(--mi-list-item-title-weight);
  line-height: var(--mi-list-item-title-line-height);
}

.mi-list-item__subtitle,
.mi-list-item__meta {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-list-item-subtitle-family);
  font-size: var(--mi-list-item-subtitle-size);
  font-weight: var(--mi-list-item-subtitle-weight);
  line-height: var(--mi-list-item-subtitle-line-height);
}

.mi-list-item__meta {
  text-align: right;
}

.mi-list-item__end--chevron {
  color: var(--mi-color-text-primary);
}

.mi-list-item__chevron {
  width: var(--mi-list-item-end-size);
  height: var(--mi-list-item-end-size);
}
</style>
