<script setup lang="ts">
import { PhX } from "@phosphor-icons/vue";
import ButtonIcon from "../../atoms/ButtonIcon/ButtonIcon.vue";
interface ActionsPanelAction {
  id: string;
  label: string;
  icon?: unknown;
  theme?: "normal" | "danger";
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    open: boolean;
    actions: ActionsPanelAction[];
    selectedCount?: number;
    className?: string;
  }>(),
  {
    selectedCount: undefined,
    className: "",
  },
);

const emit = defineEmits<{
  close: [];
  action: [id: string];
}>();

const handleActionClick = (action: ActionsPanelAction) => {
  if (action.disabled) return;
  emit("action", action.id);
};
</script>

<template>
  <div v-if="open" class="mi-actions-panel" :class="className">
    <div class="mi-actions-panel__content">
      <span v-if="selectedCount != null" class="mi-actions-panel__count">
        Выбрано: {{ selectedCount }}
      </span>
      <span class="mi-actions-panel__divider" />
      <div class="mi-actions-panel__actions">
        <button
          v-for="action in actions"
          :key="action.id"
          type="button"
          class="mi-actions-panel__action"
          :class="[
            action.theme === 'danger' ? 'is-danger' : '',
            action.disabled ? 'is-disabled' : '',
          ]"
          :disabled="action.disabled"
          @click="handleActionClick(action)"
        >
          <span v-if="action.icon" class="mi-actions-panel__action-icon">
            <component :is="action.icon" />
          </span>
          {{ action.label }}
        </button>
      </div>
      <div class="mi-actions-panel__close">
        <ButtonIcon size="S" variant="ghost" :color="'var(--mi-color-brand-text-brand-contrast)'" @click="emit('close')">
          <PhX size="16" />
        </ButtonIcon>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mi-actions-panel {
  position: fixed;
  bottom: var(--mi-spacing-20);
  left: 50%;
  transform: translateX(-50%);
  z-index: 150;
}

.mi-actions-panel__content {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-12);
  padding: var(--mi-spacing-8) var(--mi-spacing-16);
  border-radius: var(--mi-radius-xl);
  background: var(--mi-color-brand-base-brand-secondary);
  box-shadow: var(--mi-shadow-soft);
  animation: mi-actions-panel-in 200ms ease-out;
}

.mi-actions-panel__count {
  color: var(--mi-color-brand-text-brand-contrast);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  white-space: nowrap;
}

.mi-actions-panel__divider {
  width: 1px;
  height: var(--mi-spacing-20);
  background: var(--mi-color-brand-text-brand-contrast);
  opacity: 0.5;
}

.mi-actions-panel__actions {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-2);
}

.mi-actions-panel__action {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  padding: var(--mi-spacing-8) var(--mi-spacing-16);
  border: 0;
  border-radius: var(--mi-radius-s);
  background: transparent;
  color: var(--mi-color-brand-text-brand-contrast);
  cursor: pointer;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
  transition: background-color 150ms ease, opacity 150ms ease;
  white-space: nowrap;
}

.mi-actions-panel__action:hover:not(.is-disabled) {
  background: color-mix(in srgb, var(--mi-color-base-light), transparent 85%);
}

.mi-actions-panel__action.is-danger {
  color: var(--mi-color-brand-text-brand-contrast);
}

.mi-actions-panel__action.is-danger:hover:not(.is-disabled) {
  background: color-mix(in srgb, var(--mi-color-base-light), transparent 85%);
}

.mi-actions-panel__action.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.mi-actions-panel__action-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.mi-actions-panel__close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@keyframes mi-actions-panel-in {
  from {
    transform: translateY(var(--mi-spacing-8));
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
