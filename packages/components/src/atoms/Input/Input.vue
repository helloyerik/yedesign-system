<script setup lang="ts">
import { computed, type Component, useSlots } from "vue";
import { PhGearSix, PhWarning, PhX } from "@phosphor-icons/vue";

type InputSize = "XL" | "L";
type InputState =
  | "default"
  | "hover"
  | "active"
  | "filled"
  | "disabled"
  | "error"
  | "errorOutline"
  | "textOnly";

const props = withDefaults(
  defineProps<{
    label?: string;
    value?: string;
    placeholder?: string;
    type?: string;
    name?: string;
    id?: string;
    disabled?: boolean;
    size?: InputSize;
    state?: InputState;
    startIcon?: Component | null;
    endIcon?: Component | null;
    className?: string;
    errorText?: string;
  }>(),
  {
    label: "Label",
    value: "",
    placeholder: undefined,
    type: "text",
    name: undefined,
    id: undefined,
    disabled: false,
    size: "XL",
    state: "default",
    startIcon: undefined,
    endIcon: undefined,
    className: "",
    errorText: "Error content",
  },
);

const emit = defineEmits<{
  "update:value": [value: string];
  change: [value: string];
  keydown: [event: KeyboardEvent];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
}>();

const slots = useSlots();

const hasLabel = computed(() => props.label.trim().length > 0);
const labelParts = computed(() => props.label.split("*"));
const isErrorOutline = computed(() => props.state === "errorOutline");
const isDisabled = computed(() => props.state === "disabled" || props.disabled);
const isErrorState = computed(() => props.state === "error" || props.state === "errorOutline");
const valueClass = computed(() => (props.size === "XL" ? "mi-input__control--body-2" : "mi-input__control--body-1"));
const labelClass = computed(() => "mi-input__label--caption-2");
const floatingLabelClass = computed(() =>
  props.size === "XL" ? "mi-input__label--placeholder-body-2" : "mi-input__label--placeholder-body-1",
);
const inputPaddingClass = computed(() => {
  if (!hasLabel.value) {
    return "mi-input__control--padding-none";
  }

  return props.size === "XL"
    ? "mi-input__control--padding-xl"
    : "mi-input__control--padding-l";
});
const containerClass = computed(() => (props.state === "textOnly" ? "mi-input--text-only-spacing" : ""));
const isFocusBorderState = computed(() => ["default", "hover", "filled"].includes(props.state));
const inputContainerClasses = computed(() => [
  `mi-input--${props.size}`,
  `mi-input--${props.state}`,
  containerClass.value,
  props.className,
  {
    "mi-input--focusable": isFocusBorderState.value,
  },
]);

const resolvedStartIcon = computed(() => {
  if (slots.startIcon) return null;
  if (props.startIcon === null) return null;
  if (props.startIcon) return props.startIcon;
  return PhGearSix;
});

const resolvedEndIcon = computed(() => {
  if (slots.endIcon) return null;
  if (props.endIcon === null) return null;
  if (props.endIcon) return props.endIcon;
  return isErrorState.value ? PhWarning : PhX;
});

const onInput = (event: Event) => {
  const nextValue = (event.target as HTMLInputElement).value;
  emit("update:value", nextValue);
  emit("change", nextValue);
};

const onKeydown = (event: KeyboardEvent) => emit("keydown", event);
const onFocus = (event: FocusEvent) => emit("focus", event);
const onBlur = (event: FocusEvent) => emit("blur", event);
</script>

<template>
  <div v-if="isErrorOutline && errorText" class="mi-input-shell">
    <div class="mi-input" :class="inputContainerClasses">
      <span v-if="slots.startIcon || resolvedStartIcon" class="mi-input__adornment mi-input__adornment--start">
        <slot name="startIcon">
          <component :is="resolvedStartIcon" :size="20" class="mi-input__icon-default mi-input__icon-default--start" />
        </slot>
      </span>

      <div class="mi-input__field">
        <input
          :id="id"
          :name="name"
          :type="type"
          :value="value ?? ''"
          :placeholder="placeholder ?? ' '"
          :disabled="isDisabled"
          class="mi-input__control"
          :class="[valueClass, inputPaddingClass]"
          :aria-label="label"
          @input="onInput"
          @keydown="onKeydown"
          @focus="onFocus"
          @blur="onBlur"
        />

        <span
          v-if="hasLabel"
          class="mi-input__label"
          :class="[labelClass, floatingLabelClass]"
        >
          <template v-for="(part, index) in labelParts" :key="`${part}-${index}`">
            <span>{{ part }}</span>
            <span v-if="index < labelParts.length - 1" class="mi-input__required">*</span>
          </template>
        </span>
      </div>

      <span v-if="slots.endIcon || resolvedEndIcon" class="mi-input__adornment mi-input__adornment--end">
        <slot name="endIcon">
          <component
            :is="resolvedEndIcon"
            :size="20"
            class="mi-input__icon-default"
            :class="{ 'mi-input__icon-default--danger': isErrorState }"
          />
        </slot>
      </span>
    </div>

    <span class="mi-input__message">{{ errorText }}</span>
  </div>

  <div v-else class="mi-input" :class="inputContainerClasses">
    <span v-if="slots.startIcon || resolvedStartIcon" class="mi-input__adornment mi-input__adornment--start">
      <slot name="startIcon">
        <component :is="resolvedStartIcon" :size="20" class="mi-input__icon-default mi-input__icon-default--start" />
      </slot>
    </span>

    <div class="mi-input__field">
      <input
        :id="id"
        :name="name"
        :type="type"
        :value="value ?? ''"
        :placeholder="placeholder ?? ' '"
        :disabled="isDisabled"
        class="mi-input__control"
        :class="[valueClass, inputPaddingClass]"
        :aria-label="label"
        @input="onInput"
        @keydown="onKeydown"
        @focus="onFocus"
        @blur="onBlur"
      />

      <span
        v-if="hasLabel"
        class="mi-input__label"
        :class="[labelClass, floatingLabelClass]"
      >
        <template v-for="(part, index) in labelParts" :key="`${part}-${index}`">
          <span>{{ part }}</span>
          <span v-if="index < labelParts.length - 1" class="mi-input__required">*</span>
        </template>
      </span>
    </div>

    <span v-if="slots.endIcon || resolvedEndIcon" class="mi-input__adornment mi-input__adornment--end">
      <slot name="endIcon">
        <component
          :is="resolvedEndIcon"
          :size="20"
          class="mi-input__icon-default"
          :class="{ 'mi-input__icon-default--danger': isErrorState }"
        />
      </slot>
    </span>
  </div>
</template>

<style scoped>
.mi-input-shell {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-4);
  width: 100%;
}

.mi-input {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-12);
  width: 100%;
  border: 1px solid var(--mi-color-line-generic);
  border-radius: var(--mi-radius-xl);
  background: var(--mi-color-base-light);
}

.mi-input--XL {
  padding-inline: var(--mi-spacing-16);
  height: var(--mi-size-input-height-xl);
}

.mi-input--L {
  padding-inline: var(--mi-spacing-12);
  padding-block: var(--mi-spacing-4);
  border-radius: var(--mi-radius-xl);
  min-height: 44px;
}

.mi-input--default,
.mi-input--filled {
  border-color: var(--mi-color-line-generic);
  background: var(--mi-color-base-light);
}

.mi-input--hover {
  border-color: var(--mi-color-line-generic-hover);
  background: var(--mi-color-base-light);
}

.mi-input--active {
  border-color: var(--mi-color-line-generic-active);
  background: var(--mi-color-base-light);
}

.mi-input--disabled {
  border-color: var(--mi-color-line-generic);
  background: var(--mi-color-base-generic-disabled);
}

.mi-input--error,
.mi-input--errorOutline {
  border-color: var(--mi-color-text-danger);
  background: var(--mi-color-base-light);
}

.mi-input--textOnly {
  border-color: transparent;
  background: transparent;
}

.mi-input--text-only-spacing {
  padding-inline: 0;
  padding-block: var(--mi-spacing-4);
}

.mi-input--focusable:focus-within {
  border-color: var(--mi-color-line-generic-active);
}

.mi-input__adornment {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
}

.mi-input__field {
  position: relative;
  flex: 1 1 auto;
  min-width: 0;
}

.mi-input__control {
  width: 100%;
  background: transparent;
  border: 0;
  outline: none;
  margin: 0;
  color: var(--mi-color-text-primary);
}

.mi-input__control:disabled {
  cursor: not-allowed;
}

.mi-input__control::placeholder {
  color: transparent;
}

.mi-input__control--body-2 {
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-input__control--body-1 {
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-input__control--padding-xl {
  padding-top: var(--mi-spacing-xl);
  padding-bottom: var(--mi-spacing-4);
}

.mi-input__control--padding-l {
  padding-top: var(--mi-spacing-16);
  padding-bottom: var(--mi-spacing-4);
}

.mi-input__control--padding-none {
  padding-block: 0;
}

.mi-input__label {
  position: absolute;
  left: 0;
  top: var(--mi-spacing-4);
  pointer-events: none;
  transition: transform 150ms ease, color 150ms ease, font-size 150ms ease, line-height 150ms ease;
}

.mi-input__label--caption-2 {
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-input__label--placeholder-body-2 {
  transform: translateY(var(--mi-spacing-8));
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}

.mi-input__label--placeholder-body-1 {
  transform: translateY(var(--mi-spacing-8));
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-input__control:not(:placeholder-shown) + .mi-input__label,
.mi-input__control:focus + .mi-input__label {
  transform: translateY(0);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}

.mi-input--default .mi-input__label,
.mi-input--hover .mi-input__label,
.mi-input--active .mi-input__label,
.mi-input--filled .mi-input__label,
.mi-input--error .mi-input__label,
.mi-input--errorOutline .mi-input__label,
.mi-input--textOnly .mi-input__label {
  color: var(--mi-color-text-secondary);
}

.mi-input--disabled .mi-input__label {
  color: var(--mi-color-text-hint);
}

.mi-input--disabled .mi-input__control {
  color: var(--mi-color-text-secondary);
}

.mi-input__required,
.mi-input__message,
.mi-input__icon-default--danger {
  color: var(--mi-color-text-danger);
}

.mi-input__icon-default {
  color: var(--mi-color-text-secondary);
}

.mi-input__icon-default--start {
  color: var(--mi-color-text-secondary);
}

.mi-input__message {
  font-family: var(--mi-font-family-body-2);
  font-size: var(--mi-font-size-body-2);
  line-height: var(--mi-line-height-body-2);
}
</style>
