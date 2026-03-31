<script setup lang="ts">
import { PhX } from "@phosphor-icons/vue";

export interface ActionsPanelAction {
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
    closable?: boolean;
    className?: string;
  }>(),
  {
    selectedCount: undefined,
    closable: false,
    className: "",
  },
);

const emit = defineEmits<{
  actionClick: [id: string];
  close: [];
}>();

const onActionClick = (action: ActionsPanelAction) => {
  if (!action.disabled) {
    emit("actionClick", action.id);
  }
};
</script>

<template>
  <div
    v-if="open"
    class="mi-actions-panel__positioner"
  >
    <div class="mi-actions-panel" :class="className">
      <span
        v-if="selectedCount != null"
        class="mi-actions-panel__count"
      >
        Выбрано: {{ selectedCount }}
      </span>

      <div class="mi-actions-panel__divider" />

      <div class="mi-actions-panel__actions">
        <button
          v-for="action in actions"
          :key="action.id"
          type="button"
          class="mi-actions-panel__action"
          :class="{
            'is-danger': action.theme === 'danger',
            'is-disabled': action.disabled,
          }"
          :disabled="action.disabled"
          @click="onActionClick(action)"
        >
          <span v-if="action.icon" class="mi-actions-panel__action-icon">
            <component :is="action.icon" />
          </span>
          {{ action.label }}
        </button>
      </div>

      <template v-if="closable">
        <div class="mi-actions-panel__divider" />
        <button
          type="button"
          class="mi-actions-panel__close"
          @click="emit('close')"
        >
          <PhX :size="16" />
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.mi-actions-panel__positioner {
  position: fixed;
  bottom: var(--mi-spacing-16);
  left: 50%;
  z-index: 150;
  transform: translateX(-50%);
}

.mi-actions-panel {
  display: flex;
  align-items: center;
  gap: var(--mi-spacing-12);
  padding: var(--mi-spacing-16) var(--mi-spacing-12);
  border-radius: var(--mi-radius-xl);
  background: var(--mi-color-brand-base-brand-secondary);
  box-shadow: 0 8px 24px rgb(0 0 0 / 20%);
  animation: mi-actions-panel-slide-up 200ms ease-out;
}

.mi-actions-panel__count {
  margin-right: var(--mi-spacing-8);
  color: rgb(255 255 255 / 80%);
  white-space: nowrap;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-actions-panel__divider {
  width: 1px;
  height: 20px;
  flex-shrink: 0;
  background: rgb(255 255 255 / 80%);
}

.mi-actions-panel__actions {
  display: flex;
  align-items: center;
  gap: 2px;
}

.mi-actions-panel__action {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
  padding: var(--mi-spacing-8) var(--mi-spacing-12);
  border: 0;
  border-radius: var(--mi-radius-s);
  background: transparent;
  color: var(--mi-color-text-inverse);
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 150ms ease, color 150ms ease, opacity 150ms ease;
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-actions-panel__action:hover:not(:disabled) {
  background: rgb(255 255 255 / 10%);
}

.mi-actions-panel__action.is-danger {
  color: #ff003d;
}

.mi-actions-panel__action.is-danger:hover:not(:disabled) {
  background: rgb(255 0 61 / 15%);
}

.mi-actions-panel__action.is-disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.mi-actions-panel__action-icon {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.mi-actions-panel__close {
  display: inline-flex;
  width: 28px;
  height: 28px;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: var(--mi-radius-s);
  background: transparent;
  color: rgb(255 255 255 / 80%);
  cursor: pointer;
  transition: background-color 150ms ease, color 150ms ease;
}

.mi-actions-panel__close:hover {
  background: rgb(255 255 255 / 10%);
  color: var(--mi-color-text-inverse);
}

@keyframes mi-actions-panel-slide-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
