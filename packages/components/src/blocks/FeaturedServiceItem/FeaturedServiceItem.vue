<script setup lang="ts">
import { computed } from "vue";
import { PhCaretRight, PhCheck } from "@phosphor-icons/vue";
import Button from "../../atoms/Button/Button.vue";

export interface FeaturedServiceTermOption {
  id: string;
  label: string;
}

type FeaturedServiceMode = "card" | "header";
type FeaturedServiceLayout = "default" | "desktop-horizontal";
type FeaturedServiceCaretSize = "S" | "M";
type FeaturedServiceButtonVariant = "secondary" | "brand-secondary";
type FeaturedServiceButtonTone = "brand" | "primary";
type FeaturedServiceCardHeightMode = "fixed" | "hug";

const props = withDefaults(
  defineProps<{
    mode?: FeaturedServiceMode;
    layout?: FeaturedServiceLayout;
    imageSrc: string;
    title: string;
    description?: string;
    imageAlt?: string;
    className?: string;
    caretSize?: FeaturedServiceCaretSize;
    priceLabel?: string;
    benefits?: readonly string[];
    termOptions?: readonly FeaturedServiceTermOption[];
    selectedTermId?: string | null;
    inCartTermId?: string | null;
    isInCart?: boolean;
    primaryActionLabel?: string;
    primaryActionVariant?: FeaturedServiceButtonVariant;
    primaryActionTone?: FeaturedServiceButtonTone;
    inCartActionLabel?: string;
    showTopDivider?: boolean;
    cardHeightMode?: FeaturedServiceCardHeightMode;
    clipTermOverflow?: boolean;
  }>(),
  {
    mode: "card",
    layout: "default",
    description: "",
    imageAlt: "",
    className: "",
    caretSize: "M",
    priceLabel: "",
    benefits: () => [],
    termOptions: () => [],
    selectedTermId: null,
    inCartTermId: null,
    isInCart: false,
    primaryActionLabel: "Добавить",
    primaryActionVariant: "brand-secondary",
    primaryActionTone: "brand",
    inCartActionLabel: "В корзине",
    showTopDivider: false,
    cardHeightMode: "fixed",
    clipTermOverflow: false,
  },
);

const emit = defineEmits<{
  click: [];
  showAllBenefits: [];
  termSelect: [termId: string];
  primaryAction: [];
}>();

const withNonBreakingTermLabel = (value: string) =>
  value.replace(/(\d+)\s+(год|года|лет|месяц|месяца|месяцев|мес)(?=\s|$|[.,;:!?])/gi, "$1\u00A0$2");

const effectiveSelectedTermId = computed(() => props.selectedTermId ?? props.termOptions[0]?.id ?? null);
const hasBenefits = computed(() => props.benefits.length > 0);
const ctaLabel = computed(() => (props.isInCart ? props.inCartActionLabel : props.primaryActionLabel));
const cardHeightClassName = computed(() => {
  if (props.cardHeightMode === "hug") return "is-hug";
  return hasBenefits.value ? "is-fixed" : "is-compact";
});
const showBenefitsTrigger = () => emit("showAllBenefits");
const headerClick = () => emit("click");
</script>

<template>
  <div
    v-if="mode === 'header'"
    class="mi-featured-service-header"
    :class="className"
  >
    <button
      v-if="$attrs.onClick !== undefined || true"
      type="button"
      class="mi-featured-service-header__button"
      @click="headerClick"
    >
      <div class="mi-featured-service-header__thumbnail">
        <img :src="imageSrc" :alt="imageAlt" class="mi-featured-service-header__image" />
      </div>
      <div class="mi-featured-service-header__body">
        <div class="mi-featured-service-header__title-row">
          <span class="mi-featured-service-header__title">{{ title }}</span>
          <PhCaretRight
            :size="caretSize === 'S' ? 12 : 16"
            weight="bold"
            class="mi-featured-service-header__caret"
          />
        </div>
        <p v-if="description" class="mi-featured-service-header__description">{{ description }}</p>
      </div>
    </button>
  </div>

  <article
    v-else
    class="mi-featured-service-card"
    :class="[className, cardHeightClassName, { 'mi-featured-service-card--desktop-horizontal': layout === 'desktop-horizontal' }]"
  >
    <div v-if="showTopDivider" class="mi-featured-service-card__top-divider" />

    <button
      type="button"
      class="mi-featured-service-header__button mi-featured-service-card__header"
      @click="showBenefitsTrigger"
    >
      <div class="mi-featured-service-header__thumbnail">
        <img :src="imageSrc" :alt="imageAlt" class="mi-featured-service-header__image" />
      </div>
      <div class="mi-featured-service-header__body">
        <div class="mi-featured-service-header__title-row">
          <span class="mi-featured-service-header__title">{{ title }}</span>
          <PhCaretRight :size="16" weight="bold" class="mi-featured-service-header__caret" />
        </div>
        <p v-if="description" class="mi-featured-service-header__description">{{ description }}</p>
      </div>
    </button>

    <div
      class="mi-featured-service-card__content"
      :class="{ 'has-benefits': hasBenefits }"
      @click="showBenefitsTrigger"
    >
      <div
        class="mi-featured-service-card__terms-row"
        :class="{ 'clip-overflow': clipTermOverflow }"
      >
        <div class="mi-featured-service-card__terms">
          <button
            v-for="termOption in termOptions"
            :key="termOption.id"
            type="button"
            class="mi-featured-service-card__term-button"
            :class="{ 'is-selected': termOption.id === effectiveSelectedTermId }"
            @click.stop="emit('termSelect', termOption.id)"
          >
            <span class="mi-featured-service-card__term-label">{{ withNonBreakingTermLabel(termOption.label) }}</span>
            <span
              v-if="(inCartTermId ? termOption.id === inCartTermId : isInCart && termOption.id === effectiveSelectedTermId)"
              class="mi-featured-service-card__term-check"
            >
              <svg aria-hidden="true" viewBox="0 0 8 6" class="mi-featured-service-card__term-check-icon" fill="none">
                <path
                  d="M1 3.2L3.1 5L7 1"
                  stroke="rgb(255 255 255 / 85%)"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div v-if="hasBenefits" class="mi-featured-service-card__benefits">
        <div
          v-for="benefit in benefits.slice(0, 3)"
          :key="benefit"
          class="mi-featured-service-card__benefit"
        >
          <PhCheck :size="16" weight="bold" class="mi-featured-service-card__benefit-icon" />
          <p class="mi-featured-service-card__benefit-text">{{ benefit }}</p>
        </div>
      </div>
    </div>

    <div class="mi-featured-service-card__footer">
      <div class="mi-featured-service-card__price-wrap">
        <p class="mi-featured-service-card__price">{{ priceLabel }}</p>
      </div>
      <div class="mi-featured-service-card__cta">
        <Button
          v-if="isInCart"
          :label="ctaLabel"
          variant="outline"
          size="S"
          @click="emit('primaryAction')"
        >
          <template #rightIcon>
            <PhCaretRight :size="16" />
          </template>
        </Button>

        <Button
          v-else
          :variant="primaryActionVariant"
          size="S"
          :class-name="[
            primaryActionVariant === 'brand-secondary'
              ? ''
              : primaryActionTone === 'primary'
                ? 'mi-featured-service-card__button--primary'
                : 'mi-featured-service-card__button--brand',
            layout === 'desktop-horizontal' ? 'mi-featured-service-card__button--desktop' : '',
          ].join(' ')"
          @click="emit('primaryAction')"
        >
          <span>{{ ctaLabel }}</span>
        </Button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.mi-featured-service-header__button {
  display: flex;
  width: 100%;
  align-items: center;
  gap: var(--mi-spacing-12);
  border: 0;
  background: transparent;
  padding: 0;
  text-align: left;
}

.mi-featured-service-header__thumbnail {
  display: flex;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--mi-color-line-brand);
  border-radius: 8px;
  background: var(--mi-color-base-background);
  padding: 3px;
}

.mi-featured-service-header__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mi-featured-service-header__body {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
  gap: 2px;
}

.mi-featured-service-header__title-row {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 2px;
}

.mi-featured-service-header__title {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  font-weight: var(--mi-font-weight-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
}

.mi-featured-service-header__caret {
  flex-shrink: 0;
  color: var(--mi-color-text-secondary);
}

.mi-featured-service-header__description {
  overflow: hidden;
  color: var(--mi-color-text-secondary);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-featured-service-card {
  position: relative;
  isolation: isolate;
  display: flex;
  width: 320px;
  flex-shrink: 0;
  flex-direction: column;
  overflow: visible;
  border-radius: 10px;
  background: var(--mi-color-base-background);
  box-shadow: inset 0 0 0 1px var(--mi-color-line-generic-solid);
}

.mi-featured-service-card.is-fixed {
  height: 284px;
}

.mi-featured-service-card.is-compact {
  height: 196px;
}

.mi-featured-service-card.is-hug {
  height: auto;
}

.mi-featured-service-card__top-divider {
  width: 100%;
  height: 1px;
  background: var(--mi-color-line-generic-solid);
}

.mi-featured-service-card__header {
  padding: var(--mi-spacing-16);
}

.mi-featured-service-card__content {
  display: flex;
  min-height: 0;
  flex: 1 1 auto;
  flex-direction: column;
  overflow: visible;
  padding: 0 var(--mi-spacing-16) var(--mi-spacing-16);
  cursor: pointer;
}

.mi-featured-service-card__content.has-benefits {
  gap: var(--mi-spacing-12);
}

.mi-featured-service-card__terms-row {
  min-height: 34px;
  width: 100%;
  overflow: visible;
}

.mi-featured-service-card__terms-row.clip-overflow {
  overflow-x: hidden;
}

.mi-featured-service-card__terms {
  display: flex;
  min-width: max-content;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-featured-service-card__term-button {
  display: inline-flex;
  height: 34px;
  flex-shrink: 0;
  align-items: center;
  gap: var(--mi-spacing-8);
  border: 1px solid var(--mi-color-line-brand);
  border-radius: 8px;
  background: var(--mi-color-base-background);
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
  color: var(--mi-color-text-primary);
}

.mi-featured-service-card__term-button.is-selected {
  border-width: 2px;
  border-color: var(--mi-color-brand-base-brand-secondary);
}

.mi-featured-service-card__term-label {
  order: 2;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  font-weight: var(--mi-font-weight-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-featured-service-card__term-check {
  order: 1;
  display: inline-flex;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background: var(--mi-color-text-complementary);
}

.mi-featured-service-card__term-check-icon {
  display: block;
  width: 8px;
  height: 6px;
}

.mi-featured-service-card__benefits {
  display: flex;
  min-height: 0;
  flex: 1 1 auto;
  flex-direction: column;
  gap: var(--mi-spacing-12);
}

.mi-featured-service-card__benefit {
  display: flex;
  min-width: 0;
  align-items: flex-start;
  gap: var(--mi-spacing-8);
}

.mi-featured-service-card__benefit-icon {
  margin-top: 1px;
  flex-shrink: 0;
  color: var(--mi-color-text-positive);
}

.mi-featured-service-card__benefit-text {
  overflow: hidden;
  color: var(--mi-color-text-primary);
  text-overflow: ellipsis;
  white-space: nowrap;
  font-family: var(--mi-font-family-body-1-short);
  font-size: var(--mi-font-size-body-1-short);
  font-weight: var(--mi-font-weight-body-1-short);
  line-height: var(--mi-line-height-body-1-short);
}

.mi-featured-service-card__footer {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  border-top: 1px solid var(--mi-color-line-brand);
  padding: var(--mi-spacing-16);
}

.mi-featured-service-card__price-wrap {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
}

.mi-featured-service-card__price {
  width: 100%;
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-3);
  font-size: var(--mi-font-size-subheader-3);
  font-weight: var(--mi-font-weight-subheader-3);
  line-height: var(--mi-line-height-subheader-3);
}

.mi-featured-service-card__cta {
  flex-shrink: 0;
}

.mi-featured-service-card__button--primary,
.mi-featured-service-card__button--primary :deep(span) {
  color: var(--mi-color-text-primary);
}

.mi-featured-service-card__button--brand,
.mi-featured-service-card__button--brand :deep(span) {
  color: var(--mi-color-brand-primary);
}

.mi-featured-service-card--desktop-horizontal {
  height: auto;
}

@media (min-width: 768px) {
  .mi-featured-service-card--desktop-horizontal {
    width: 100%;
    flex-direction: row;
    align-items: stretch;
    padding: 4px;
  }

  .mi-featured-service-card--desktop-horizontal .mi-featured-service-card__header {
    padding-bottom: var(--mi-spacing-16);
  }

  .mi-featured-service-card--desktop-horizontal .mi-featured-service-card__content {
    flex: 1 1 auto;
    padding-top: 0;
  }

  .mi-featured-service-card--desktop-horizontal .mi-featured-service-card__footer {
    width: 200px;
    min-height: 100%;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    border-top: 0;
    padding: var(--mi-spacing-12) var(--mi-spacing-16) var(--mi-spacing-16);
  }

  .mi-featured-service-card--desktop-horizontal .mi-featured-service-card__price {
    text-align: right;
    font-family: var(--mi-font-family-header-1);
    font-size: var(--mi-font-size-header-1);
    font-weight: var(--mi-font-weight-header-1);
    line-height: var(--mi-line-height-header-1);
  }

  .mi-featured-service-card__button--desktop {
    min-width: 90px;
  }
}
</style>
