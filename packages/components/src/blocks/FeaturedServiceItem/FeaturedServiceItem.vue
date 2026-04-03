<script setup lang="ts">
import { computed } from "vue";
import { PhCaretRight, PhCheck } from "@phosphor-icons/vue";
import Button from "../../atoms/Button/Button.vue";

type FeaturedServiceCardHeight = "fixed" | "hug";
type FeaturedServiceCaretSize = "S" | "M";
type FeaturedServiceActionVariant = "secondary" | "secondary-info" | "brand-secondary";
type FeaturedServiceActionTone = "brand" | "primary";

export interface FeaturedServiceTermOption {
  id: string;
  label: string;
}

const props = withDefaults(
  defineProps<{
    imageSrc: string;
    title: string;
    description?: string;
    imageAlt?: string;
    priceLabel?: string;
    benefits?: readonly string[];
    termOptions?: readonly FeaturedServiceTermOption[];
    selectedTermId?: string | null;
    inCartTermId?: string | null;
    isInCart?: boolean;
    primaryActionLabel?: string;
    primaryActionVariant?: FeaturedServiceActionVariant;
    primaryActionTone?: FeaturedServiceActionTone;
    inCartActionLabel?: string;
    caretSize?: FeaturedServiceCaretSize;
    cardHeightMode?: FeaturedServiceCardHeight;
    clipTermOverflow?: boolean;
    showTopDivider?: boolean;
    className?: string;
  }>(),
  {
    description: "",
    imageAlt: "",
    priceLabel: "",
    benefits: () => [],
    termOptions: () => [],
    selectedTermId: null,
    inCartTermId: null,
    isInCart: false,
    primaryActionLabel: "Добавить",
    primaryActionVariant: "secondary-info",
    primaryActionTone: "brand",
    inCartActionLabel: "В корзине",
    caretSize: "S",
    cardHeightMode: "fixed",
    clipTermOverflow: false,
    showTopDivider: false,
    className: "",
  },
);

const emit = defineEmits<{
  "term-select": [id: string];
  "primary-action": [];
}>();

const visibleBenefits = computed(() => props.benefits.slice(0, 3));
const effectiveSelectedTermId = computed(
  () => props.selectedTermId ?? props.termOptions[0]?.id ?? null,
);
const caretSizeToken = computed(() =>
  props.caretSize === "S" ? "var(--mi-size-icon-12)" : "var(--mi-size-icon-16)",
);

const withNonBreakingTermLabel = (value: string) =>
  value.replace(
    /(\d+)\s+(год|года|лет|месяц|месяца|месяцев|мес)(?=\s|$|[.,;:!?])/gi,
    "$1\u00A0$2",
  );
</script>

<template>
  <article
    class="mi-featured-service"
    :class="[
      className,
      `mi-featured-service--${cardHeightMode}`,
    ]"
  >
    <div v-if="showTopDivider" class="mi-featured-service__divider" aria-hidden="true" />

    <div class="mi-featured-service__header">
      <div class="mi-featured-service__image">
        <img :src="imageSrc" :alt="imageAlt" />
      </div>
      <div class="mi-featured-service__header-content">
        <div class="mi-featured-service__title-row">
          <span class="mi-featured-service__title">{{ title }}</span>
          <PhCaretRight class="mi-featured-service__caret" :style="{ width: caretSizeToken, height: caretSizeToken }" weight="bold" />
        </div>
        <p v-if="description" class="mi-featured-service__description">{{ description }}</p>
      </div>
    </div>

    <div class="mi-featured-service__body">
      <div
        v-if="termOptions.length"
        class="mi-featured-service__terms"
        :class="{ 'is-clipped': clipTermOverflow }"
      >
        <div class="mi-featured-service__terms-row">
          <button
            v-for="term in termOptions"
            :key="term.id"
            type="button"
            class="mi-featured-service__term"
            :class="{ 'is-selected': term.id === effectiveSelectedTermId }"
            @click="emit('term-select', term.id)"
          >
            <span class="mi-featured-service__term-label">
              {{ withNonBreakingTermLabel(term.label) }}
            </span>
            <span
              v-if="term.id === (inCartTermId || (isInCart ? effectiveSelectedTermId : null))"
              class="mi-featured-service__term-check"
              aria-hidden="true"
            >
              <svg viewBox="0 0 8 6" class="mi-featured-service__term-check-icon" fill="none">
                <path
                  d="M1 3.2L3.1 5L7 1"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      <div v-if="visibleBenefits.length" class="mi-featured-service__benefits">
        <div v-for="benefit in visibleBenefits" :key="benefit" class="mi-featured-service__benefit">
          <PhCheck :size="'var(--mi-size-icon-20)'" weight="bold" class="mi-featured-service__benefit-icon" />
          <p class="mi-featured-service__benefit-text">{{ benefit }}</p>
        </div>
      </div>
    </div>

    <div class="mi-featured-service__footer">
      <p class="mi-featured-service__price">{{ priceLabel }}</p>
      <div class="mi-featured-service__cta">
        <Button
          v-if="!isInCart"
          :label="primaryActionLabel"
          size="S"
          :variant="primaryActionVariant"
          :className="primaryActionTone === 'brand' && primaryActionVariant === 'secondary' ? 'mi-featured-service__cta--brand' : ''"
          @click="emit('primary-action')"
        />
        <Button
          v-else
          :label="inCartActionLabel"
          size="S"
          variant="outline"
          className="mi-featured-service__cta-compact"
          @click="emit('primary-action')"
        >
          <template #rightIcon>
            <PhCaretRight :size="'var(--mi-size-icon-16)'" class="mi-featured-service__cta-icon" />
          </template>
        </Button>
      </div>
    </div>
  </article>
</template>

<style scoped>
.mi-featured-service {
  display: flex;
  flex-direction: column;
  width: var(--mi-size-services-card-width);
  border-radius: var(--mi-size-services-card-radius);
  background: var(--mi-color-surface-panel);
  box-shadow: inset 0 0 0 var(--mi-size-hairline) var(--mi-color-line-generic-solid);
  overflow: visible;
}

.mi-featured-service--fixed {
  height: var(--mi-size-services-mobile-warranty-card-height);
}

.mi-featured-service--hug {
  height: auto;
}

.mi-featured-service__divider {
  height: var(--mi-size-services-divider-height);
  width: 100%;
  background: var(--mi-color-line-generic-solid);
}

.mi-featured-service__header {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-12);
  padding: var(--mi-spacing-16);
  text-align: left;
}

.mi-featured-service__image {
  width: var(--mi-size-services-card-thumbnail);
  height: var(--mi-size-services-card-thumbnail);
  border-radius: var(--mi-radius-l);
  border: var(--mi-size-hairline) solid var(--mi-color-line-generic);
  background: var(--mi-color-surface-panel);
  padding: var(--mi-spacing-4);
  flex: 0 0 auto;
}

.mi-featured-service__image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.mi-featured-service__header-content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  gap: var(--mi-spacing-4);
}

.mi-featured-service__title-row {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-4);
  min-width: 0;
}

.mi-featured-service__title {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-subheader-2);
  font-size: var(--mi-font-size-subheader-2);
  line-height: var(--mi-line-height-subheader-2);
  font-weight: var(--mi-font-weight-subheader-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mi-featured-service__caret {
  color: var(--mi-color-text-secondary);
  flex: 0 0 auto;
}

.mi-featured-service__description {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.mi-featured-service__body {
  display: flex;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  padding: 0 var(--mi-spacing-16) var(--mi-spacing-16);
  gap: var(--mi-spacing-12);
}

.mi-featured-service__terms {
  display: flex;
  min-height: var(--mi-size-services-term-options-row-height);
  width: 100%;
  overflow: visible;
}

.mi-featured-service__terms.is-clipped {
  overflow-x: hidden;
  overflow-y: visible;
}

.mi-featured-service__terms-row {
  display: flex;
  min-width: max-content;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-featured-service__term {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  height: var(--mi-size-services-term-option-height);
  box-sizing: border-box;
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
  border-radius: var(--mi-size-services-term-option-radius);
  border: var(--mi-size-services-term-option-border-width) solid var(--mi-color-line-generic);
  background: var(--mi-color-surface-panel);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  cursor: pointer;
  flex: 0 0 auto;
  white-space: nowrap;
}

.mi-featured-service__term.is-selected {
  border-color: var(--mi-color-text-complementary);
  border-width: var(--mi-size-services-term-option-selected-border-width);
}

.mi-featured-service__term-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--mi-size-services-term-option-radio-size);
  height: var(--mi-size-services-term-option-radio-size);
  border-radius: var(--mi-size-services-term-option-checkbox-radius);
  background: var(--mi-color-text-complementary);
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-featured-service__term-check-icon {
  width: var(--mi-size-services-term-option-checkbox-icon-size);
  height: var(--mi-size-services-term-option-checkbox-icon-height);
  display: block;
}

.mi-featured-service__benefits {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-12);
}

.mi-featured-service__benefit {
  display: flex;
  align-items: flex-start;
  gap: var(--mi-spacing-12);
  color: var(--mi-color-text-primary);
}

.mi-featured-service__benefit-icon {
  color: var(--mi-color-text-positive-heavy);
  margin-top: var(--mi-size-hairline);
}

.mi-featured-service__benefit-text {
  margin: 0;
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.mi-featured-service__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--mi-spacing-16);
  border-top: var(--mi-size-hairline) solid var(--mi-color-line-generic-solid);
  padding: var(--mi-spacing-16);
}

.mi-featured-service__price {
  margin: 0;
  min-width: 0;
  flex: 1;
  font-family: var(--mi-font-family-subheader-3);
  font-size: var(--mi-font-size-subheader-3);
  line-height: var(--mi-line-height-subheader-3);
  font-weight: var(--mi-font-weight-subheader-3);
  color: var(--mi-color-text-primary);
}

.mi-featured-service__cta {
  flex: 0 0 auto;
}

:deep(.mi-featured-service__cta--brand) {
  color: var(--mi-color-brand-text-brand);
}

:deep(.mi-featured-service__cta--brand .mi-button__label span) {
  color: var(--mi-color-brand-text-brand);
}

.mi-featured-service__cta-compact {
  gap: var(--mi-spacing-4);
}

.mi-featured-service__cta-icon {
  color: var(--mi-color-text-primary);
}
</style>
