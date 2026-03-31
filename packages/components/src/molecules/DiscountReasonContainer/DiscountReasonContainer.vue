<template>
  <div class="mi-discount-reason-container">
    <p class="mi-discount-reason-container__text">
      <span class="mi-discount-reason-container__muted">Причины уценки: </span>
      <span>ТОВАР БЫВШИЙ В УПОТРЕБЛЕНИИ (может иметь следы использования)</span>
    </p>
    <p class="mi-discount-reason-container__text">
      <span>
        ТОВАР ПОЛНОСТЬЮ РАБОТОСПОСОБЕН И ПРОВЕРЕН ПО ВСЕМ ФУНКЦИЯМ. ТОВАР МОЖЕТ НЕ ИМЕТЬ ИНСТРУКЦИИ ИЛИ НАКЛЕЕК. КОРОБКА МОЖЕТ ИМЕТЬ ПОВРЕЖДЕНИЯ ИЛИ ИМЕТЬ ПЯТНА, А ТАКЖЕ МОЖЕТ ИМЕТЬ НЕСООТВЕТСТВИЕ СЕРИЙНОГО НОМЕРА.
      </span>
      <span class="mi-discount-reason-container__link">Подробнее</span>
    </p>
  </div>
</template>

<style scoped>
.mi-discount-reason-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--mi-spacing-8);
  padding: var(--mi-spacing-12) var(--mi-spacing-16);
  border-radius: var(--mi-radius-m);
  background: var(--mi-color-base-generic);
  color: var(--mi-color-text-primary);
  font-family: var(--mi-font-family-body-1);
  font-size: var(--mi-font-size-body-1);
  font-weight: var(--mi-font-weight-body-1);
  line-height: var(--mi-line-height-body-1);
}

.mi-discount-reason-container__text {
  white-space: pre-wrap;
}

.mi-discount-reason-container__muted {
  color: var(--mi-color-text-secondary);
}

.mi-discount-reason-container__link {
  color: var(--mi-color-brand-text-link);
}
</style>
