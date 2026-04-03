<script setup lang="ts">
import { computed, useSlots } from "vue";
import { PhX } from "@phosphor-icons/vue";
import Button from "../../atoms/Button/Button.vue";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon.vue";

type BannerVariant = "default" | "slim";
type BannerLayout = "horizontal" | "vertical";
type BannerSize = "desktop" | "compact";
type BannerImageFit = "cover" | "contain" | "fill";
type BannerImagePosition = "left" | "right";
type BannerCloseAlign = "center" | "top";

type ButtonVariant = "primary" | "brand-secondary" | "secondary" | "secondary-info" | "outline" | "text-only";

const props = withDefaults(
  defineProps<{
    variant?: BannerVariant;
    layout?: BannerLayout;
    size?: BannerSize;
    title?: string;
    text?: string;
    ctaLabel?: string;
    ctaVariant?: ButtonVariant;
    secondaryLabel?: string;
    secondaryVariant?: ButtonVariant;
    imageSrc?: string;
    imageAlt?: string;
    imageFit?: BannerImageFit;
    imagePosition?: BannerImagePosition;
    showClose?: boolean;
    closeAlign?: BannerCloseAlign;
    className?: string;
  }>(),
  {
    variant: "default",
    layout: "horizontal",
    size: "desktop",
    title: "",
    text: "",
    ctaLabel: "",
    ctaVariant: undefined,
    secondaryLabel: "",
    secondaryVariant: undefined,
    imageSrc: "",
    imageAlt: "",
    imageFit: "cover",
    imagePosition: "right",
    showClose: false,
    closeAlign: "center",
    className: "",
  },
);

const emit = defineEmits<{
  close: [];
}>();

const slots = useSlots();

const hasImage = computed(() => Boolean(slots.image) || Boolean(props.imageSrc));
const hasActions = computed(() => Boolean(slots.actions) || Boolean(props.ctaLabel) || Boolean(props.secondaryLabel));
const hasTitle = computed(() => Boolean(props.title));
const hasText = computed(() => Boolean(props.text));

const imagePositionClass = computed(() => (props.variant === "default" ? `mi-banner--image-${props.imagePosition}` : null));

const rootClass = computed(() => [
  "mi-banner",
  `mi-banner--${props.variant}`,
  props.variant === "default" ? `mi-banner--${props.layout}` : null,
  props.variant === "slim" ? `mi-banner--${props.size}` : null,
  hasImage.value ? imagePositionClass.value : null,
  props.showClose ? "mi-banner--with-close" : null,
  props.closeAlign === "top" ? "mi-banner--close-top" : null,
  props.className,
]);

const imageStyle = computed(() => ({
  "--mi-banner-image-fit": props.imageFit,
}));

const resolvedCtaVariant = computed<ButtonVariant>(() => {
  if (props.ctaVariant) return props.ctaVariant;
  return props.variant === "slim" ? "secondary" : "brand-secondary";
});

const resolvedSecondaryVariant = computed<ButtonVariant>(() => {
  if (props.secondaryVariant) return props.secondaryVariant;
  return props.variant === "slim" ? "secondary" : "outline";
});

const handleClose = () => {
  emit("close");
};
</script>

<template>
  <div :class="rootClass" :style="imageStyle">
    <slot name="badge" />

    <template v-if="variant === 'default'">
      <div class="mi-banner__content">
        <div class="mi-banner__text-group">
          <p v-if="hasTitle" class="mi-banner__title mi-banner__title--default">{{ title }}</p>
          <p v-if="hasText" class="mi-banner__text mi-banner__text--default">{{ text }}</p>
        </div>

        <div v-if="hasActions" class="mi-banner__actions mi-banner__actions--default">
          <slot name="actions">
            <Button v-if="ctaLabel" :label="ctaLabel" size="M" :variant="resolvedCtaVariant" />
            <Button v-if="secondaryLabel" :label="secondaryLabel" size="M" :variant="resolvedSecondaryVariant" />
          </slot>
        </div>
      </div>

      <div v-if="hasImage" class="mi-banner__media">
        <slot name="image">
          <img class="mi-banner__image" :src="imageSrc" :alt="imageAlt" />
        </slot>
      </div>

      <ButtonIcon
        v-if="showClose"
        class="mi-banner__close"
        size="S"
        variant="ghost"
        @click="handleClose"
      >
        <PhX :size="16" />
      </ButtonIcon>
    </template>

    <template v-else>
      <div v-if="hasImage" class="mi-banner__media">
        <slot name="image">
          <img class="mi-banner__image" :src="imageSrc" :alt="imageAlt" />
        </slot>
      </div>

      <div class="mi-banner__content mi-banner__content--slim">
        <div class="mi-banner__text-group">
          <p v-if="hasTitle" class="mi-banner__title mi-banner__title--slim">{{ title }}</p>
          <p v-if="hasText" class="mi-banner__text mi-banner__text--slim">{{ text }}</p>
        </div>
      </div>

      <div v-if="hasActions" class="mi-banner__actions mi-banner__actions--slim">
        <slot name="actions">
          <Button v-if="ctaLabel" :label="ctaLabel" size="M" :variant="resolvedCtaVariant" />
        </slot>
      </div>

      <div v-if="showClose" class="mi-banner__close-wrap">
        <ButtonIcon size="S" variant="ghost" @click="handleClose">
          <PhX :size="16" />
        </ButtonIcon>
      </div>
    </template>
  </div>
</template>

<style scoped>
.mi-banner {
  position: relative;
  display: flex;
  background: var(--mi-color-base-generic-solid);
  border-radius: var(--mi-radius-banner);
  color: var(--mi-color-text-primary);
  overflow: hidden;
}

.mi-banner--default {
  box-shadow: var(--mi-shadow-banner);
}

.mi-banner--default.mi-banner--horizontal {
  flex-direction: row;
}

.mi-banner--default.mi-banner--vertical {
  flex-direction: column;
}

.mi-banner--slim {
  align-items: center;
  min-height: var(--mi-size-banner-slim-min-height);
}

.mi-banner--slim.mi-banner--compact {
  min-height: var(--mi-size-banner-slim-min-height-compact);
  box-shadow: none;
}

.mi-banner--slim.mi-banner--desktop {
  box-shadow: var(--mi-shadow-banner);
}

.mi-banner--default.mi-banner--horizontal.mi-banner--image-left {
  flex-direction: row-reverse;
}


.mi-banner__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--mi-spacing-banner-default-gap);
  width: 100%;
  padding: var(--mi-spacing-banner-default-padding-top)
    var(--mi-spacing-banner-default-padding-right)
    var(--mi-spacing-banner-default-padding-bottom)
    var(--mi-spacing-banner-default-padding-left);
}

.mi-banner--default.mi-banner--with-close .mi-banner__content {
  padding-right: calc(var(--mi-spacing-banner-default-padding-right) + var(--mi-size-button-icon-s));
}

.mi-banner__content--slim {
  padding: var(--mi-spacing-banner-slim-padding-top)
    var(--mi-spacing-banner-slim-padding-right)
    var(--mi-spacing-banner-slim-padding-bottom)
    var(--mi-spacing-banner-slim-padding-left);
}

.mi-banner--slim.mi-banner--compact .mi-banner__content--slim {
  padding-right: var(--mi-spacing-banner-slim-padding-right-compact);
}

.mi-banner__text-group {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-banner-default-gap);
}

.mi-banner__title {
  margin: 0;
}

.mi-banner__title--default {
  font-family: var(--mi-font-family-banner-default-title);
  font-size: var(--mi-font-size-banner-default-title);
  line-height: var(--mi-line-height-banner-default-title);
  font-weight: var(--mi-font-weight-banner-default-title);
  color: var(--mi-color-text-primary);
}

.mi-banner__title--slim {
  font-family: var(--mi-font-family-banner-slim-title);
  font-size: var(--mi-font-size-banner-slim-title);
  line-height: var(--mi-line-height-banner-slim-title);
  font-weight: var(--mi-font-weight-banner-slim-title);
  color: var(--mi-color-text-primary);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--mi-banner-slim-title-lines, 1);
}

.mi-banner--slim.mi-banner--compact .mi-banner__title--slim {
  font-size: var(--mi-font-size-banner-slim-title-compact);
  line-height: var(--mi-line-height-banner-slim-title-compact);
}

.mi-banner__text {
  margin: 0;
}

.mi-banner__text--default {
  font-family: var(--mi-font-family-banner-default-text);
  font-size: var(--mi-font-size-banner-default-text);
  line-height: var(--mi-line-height-banner-default-text);
  font-weight: var(--mi-font-weight-banner-default-text);
  color: var(--mi-color-text-primary);
}

.mi-banner__text--slim {
  font-family: var(--mi-font-family-banner-slim-text);
  font-size: var(--mi-font-size-banner-slim-text);
  line-height: var(--mi-line-height-banner-slim-text);
  font-weight: var(--mi-font-weight-banner-slim-text);
  color: var(--mi-color-text-primary);
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--mi-banner-slim-text-lines, 2);
}

.mi-banner--slim.mi-banner--compact .mi-banner__text--slim {
  font-size: var(--mi-font-size-banner-slim-text-compact);
  line-height: var(--mi-line-height-banner-slim-text-compact);
}

.mi-banner--slim.mi-banner--compact {
  --mi-banner-slim-title-lines: 2;
  --mi-banner-slim-text-lines: 3;
}

.mi-banner--slim.mi-banner--desktop {
  --mi-banner-slim-title-lines: 1;
  --mi-banner-slim-text-lines: 2;
}

.mi-banner__actions {
  display: flex;
  gap: var(--mi-spacing-banner-default-actions-gap);
  align-items: center;
}

.mi-banner__actions--slim {
  margin-left: auto;
  padding-right: var(--mi-spacing-banner-slim-content-gap);
}

.mi-banner__media {
  position: relative;
  flex: 0 0 auto;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
}

.mi-banner--default.mi-banner--horizontal .mi-banner__media {
  width: var(--mi-size-banner-default-image-width);
  min-height: var(--mi-size-banner-default-image-height);
}

.mi-banner--default.mi-banner--vertical .mi-banner__media {
  width: 100%;
  height: var(--mi-size-banner-default-image-height);
}

.mi-banner--slim .mi-banner__media {
  width: var(--mi-size-banner-slim-image-width);
  height: var(--mi-size-banner-slim-image-height);
}

.mi-banner--slim.mi-banner--compact .mi-banner__media {
  width: var(--mi-size-banner-slim-image-width-compact);
  height: var(--mi-size-banner-slim-image-height-compact);
}

.mi-banner__image {
  width: 100%;
  height: 100%;
  object-fit: var(--mi-banner-image-fit, cover);
}

.mi-banner__close {
  position: absolute;
  top: var(--mi-size-banner-default-close-offset-top);
  right: var(--mi-size-banner-default-close-offset-right);
}

.mi-banner__close-wrap {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: auto;
  padding-right: var(--mi-spacing-banner-slim-padding-right);
  padding-left: var(--mi-spacing-banner-slim-content-gap);
  align-self: stretch;
}

.mi-banner--slim.mi-banner--compact .mi-banner__close-wrap {
  padding-right: var(--mi-spacing-banner-slim-padding-right-compact);
}

.mi-banner--close-top .mi-banner__close-wrap {
  align-items: flex-start;
  padding-top: var(--mi-spacing-banner-slim-padding-top);
}

.mi-banner--slim.mi-banner--compact .mi-banner__close-wrap {
  align-items: flex-start;
  padding-top: var(--mi-spacing-banner-slim-padding-top);
}
</style>
