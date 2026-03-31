<script setup lang="ts">
import paymentMethodPaths from "./paymentMethodPaths";
</script>

<template>
  <div class="mi-payment-method-icons" data-name="payment-method-icons">
    <div class="mi-payment-method-icons__icon" aria-label="Halyk Bank">
      <svg class="mi-payment-method-icons__svg" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <path :d="paymentMethodPaths.p1d489c00" fill="#007A5C" fill-rule="evenodd" clip-rule="evenodd" />
        <path :d="paymentMethodPaths.p3378f1a0" fill="#F9B101" fill-rule="evenodd" clip-rule="evenodd" />
      </svg>
    </div>

    <div class="mi-payment-method-icons__icon" aria-label="Home Credit Bank">
      <svg class="mi-payment-method-icons__svg" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <path :d="paymentMethodPaths.p172b680" fill="#E11931" />
      </svg>
    </div>

    <div class="mi-payment-method-icons__icon" aria-label="Bank Center Credit">
      <svg class="mi-payment-method-icons__svg" fill="none" preserveAspectRatio="none" viewBox="0 0 30 30">
        <path :d="paymentMethodPaths.p7ceab00" fill="#A31551" fill-rule="evenodd" clip-rule="evenodd" />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.mi-payment-method-icons {
  display: inline-flex;
  align-items: center;
  gap: var(--mi-spacing-8);
}

.mi-payment-method-icons__icon {
  position: relative;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
}

.mi-payment-method-icons__svg {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
