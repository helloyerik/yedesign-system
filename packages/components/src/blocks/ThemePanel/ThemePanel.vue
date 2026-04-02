<script setup lang="ts">
import { computed } from "vue";
import BottomSheet from "../../atoms/BottomSheet/BottomSheet.vue";
import Checkbox from "../../atoms/Checkbox/Checkbox.vue";
import Dialog from "../../atoms/Dialog/Dialog.vue";
import Select from "../../atoms/Select/Select.vue";
import { useIsMobileViewport } from "../../utils/useViewportMode";

export interface ThemePanelToggle {
  id: string;
  label: string;
  checked: boolean;
  disabled?: boolean;
}

export interface ThemePanelSelectOption {
  value: string;
  label: string;
  description?: string;
}

export interface ThemePanelSelectGroup {
  id: string;
  title: string;
  label?: string;
  value: string;
  options: ThemePanelSelectOption[];
}

const props = withDefaults(
  defineProps<{
    open: boolean;
    title?: string;
    toggles?: ThemePanelToggle[];
    selectGroups?: ThemePanelSelectGroup[];
    className?: string;
  }>(),
  {
    title: "Эксперименты",
    toggles: () => [],
    selectGroups: () => [],
    className: "",
  },
);

const emit = defineEmits<{
  close: [];
  "toggle-change": [id: string, checked: boolean];
  "select-change": [id: string, value: string];
}>();

const { isMobile } = useIsMobileViewport();

const contentClass = computed(() =>
  ["mi-theme-panel__content", props.className].filter(Boolean).join(" "),
);

const handleToggleChange = (id: string, checked: boolean) => {
  emit("toggle-change", id, checked);
};

const handleSelectChange = (id: string, value: string) => {
  emit("select-change", id, value);
};

const handleDialogUpdate = (value: boolean) => {
  if (!value) emit("close");
};
</script>

<template>
  <BottomSheet
    v-if="isMobile"
    :model-value="open"
    :title="title"
    body-class-name="mi-theme-panel__body"
    @update:modelValue="handleDialogUpdate"
    @close="emit('close')"
  >
    <div :class="contentClass">
      <div v-if="toggles.length" class="mi-theme-panel__group">
        <Checkbox
          v-for="toggle in toggles"
          :key="toggle.id"
          :checked="toggle.checked"
          :disabled="toggle.disabled"
          size="L"
          @update:checked="(value) => handleToggleChange(toggle.id, value)"
        >
          {{ toggle.label }}
        </Checkbox>
      </div>

      <div v-for="group in selectGroups" :key="group.id" class="mi-theme-panel__group">
        <p class="mi-theme-panel__title">{{ group.title }}</p>
        <div class="mi-theme-panel__select">
          <span v-if="group.label" class="mi-theme-panel__label">{{ group.label }}</span>
          <Select
            :value="group.value"
            :options="group.options"
            show-selected-mark
            @update:value="(value) => handleSelectChange(group.id, value)"
          />
        </div>
      </div>
    </div>
  </BottomSheet>

  <Dialog
    v-else
    :model-value="open"
    :title="title"
    width="S"
    variant="Secondary"
    content-class-name="mi-theme-panel__dialog"
    body-class-name="mi-theme-panel__dialog-body"
    @update:modelValue="handleDialogUpdate"
    @close="emit('close')"
  >
    <div :class="contentClass">
      <div v-if="toggles.length" class="mi-theme-panel__group">
        <Checkbox
          v-for="toggle in toggles"
          :key="toggle.id"
          :checked="toggle.checked"
          :disabled="toggle.disabled"
          size="L"
          @update:checked="(value) => handleToggleChange(toggle.id, value)"
        >
          {{ toggle.label }}
        </Checkbox>
      </div>

      <div v-for="group in selectGroups" :key="group.id" class="mi-theme-panel__group">
        <p class="mi-theme-panel__title">{{ group.title }}</p>
        <div class="mi-theme-panel__select">
          <span v-if="group.label" class="mi-theme-panel__label">{{ group.label }}</span>
          <Select
            :value="group.value"
            :options="group.options"
            show-selected-mark
            @update:value="(value) => handleSelectChange(group.id, value)"
          />
        </div>
      </div>
    </div>
  </Dialog>
</template>

<style scoped>
.mi-theme-panel__body {
  width: 100%;
}

.mi-theme-panel__dialog {
  max-height: calc(100dvh - var(--mi-spacing-48));
}

.mi-theme-panel__dialog-body {
  width: 100%;
  overflow-y: auto;
  background: var(--mi-color-surface-panel);
}

.mi-theme-panel__content {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-16);
  padding: var(--mi-spacing-20);
  background: var(--mi-color-surface-panel);
}

.mi-theme-panel__group {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-12);
}

.mi-theme-panel__group + .mi-theme-panel__group {
  border-top: 1px solid var(--mi-color-line-generic);
  padding-top: var(--mi-spacing-16);
}

.mi-theme-panel__title {
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  margin: 0;
}

.mi-theme-panel__select {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-8);
}

.mi-theme-panel__label {
  color: var(--mi-color-text-secondary);
  font-family: var(--mi-font-family-caption-2);
  font-size: var(--mi-font-size-caption-2);
  line-height: var(--mi-line-height-caption-2);
}
</style>
