<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string;
    summary?: string;
    details?: string;
    detailsLabel?: string;
    detailsHref?: string;
    className?: string;
  }>(),
  {
    title: "Причины уценки:",
    summary: "ТОВАР БЫВШИЙ В УПОТРЕБЛЕНИИ (может иметь следы использования)",
    details:
      "ТОВАР ПОЛНОСТЬЮ РАБОТОСПОСОБЕН И ПРОВЕРЕН ПО ВСЕМ ФУНКЦИЯМ. ТОВАР МОЖЕТ НЕ ИМЕТЬ ИНСТРУКЦИИ ИЛИ НАКЛЕЕК. КОРОБКА МОЖЕТ ИМЕТЬ ПОВРЕЖДЕНИЯ ИЛИ ИМЕТЬ ПЯТНА, А ТАКЖЕ МОЖЕТ ИМЕТЬ НЕСООТВЕТСТВИЕ СЕРИЙНОГО НОМЕРА.",
    detailsLabel: "Подробнее",
    detailsHref: "",
    className: "",
  },
);

const emit = defineEmits<{
  "details-click": [];
}>();

const handleDetailsClick = () => {
  emit("details-click");
};
</script>

<template>
  <div class="mi-discount-reason" :class="className">
    <p class="mi-discount-reason__row">
      <span class="mi-discount-reason__title">{{ title }}</span>
      <span class="mi-discount-reason__text">{{ summary }}</span>
    </p>
    <p class="mi-discount-reason__row">
      <span class="mi-discount-reason__text">{{ details }}</span>
      <a
        v-if="detailsLabel"
        class="mi-discount-reason__link"
        :href="detailsHref || undefined"
        @click.prevent="detailsHref ? undefined : handleDetailsClick()"
      >
        {{ detailsLabel }}
      </a>
    </p>
  </div>
</template>

<style scoped>
.mi-discount-reason {
  display: flex;
  flex-direction: column;
  gap: var(--mi-spacing-8);
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-discount-reason__row {
  display: block;
  white-space: pre-wrap;
}

.mi-discount-reason__title {
  color: var(--mi-color-text-secondary);
}

.mi-discount-reason__text {
  color: var(--mi-color-text-primary);
}

.mi-discount-reason__link {
  color: var(--mi-color-brand-text-link);
  text-decoration: none;
  margin-left: var(--mi-spacing-4);
}

.mi-discount-reason__link:hover {
  text-decoration: underline;
}
</style>
