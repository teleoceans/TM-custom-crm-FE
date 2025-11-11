<template>
  <div class="lead-card">
    <div class="lead-card__body">
      <div v-for="field in fields" :key="field.label" class="lead-card__row">
        <div class="lead-card__left">
          <span class="lead-card__icon">
            <LeadIcon
              v-if="field.icon"
              :name="`lead-detail-${field.icon}`"
              size="16"
            />
          </span>
          <span class="lead-card__label">{{ field.label }}</span>
        </div>
        <span class="lead-card__value">{{ field.value }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import LeadIcon from "./LeadIcon.vue";

defineProps({
  fields: {
    type: Array,
    default: () => [],
  },
});
</script>

<style scoped>
.lead-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  align-self: stretch;
}

@media (max-width: 480px) {
  .lead-card {
    padding: 16px;
    gap: 12px;
  }

  .lead-card__row {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .lead-card__value {
    text-align: left;
    width: 100%;
  }
}

.lead-card__body {
  display: flex;
  flex-direction: column;
  align-self: stretch;
  width: 100%;
  border-bottom: 1px solid #e5e7eb;
}

.lead-card__row {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #e5e7eb;
}

.lead-card__row:first-child {
  padding-top: 0;
}

.lead-card__row:last-child {
  border-bottom: none;
  padding-bottom: 8px;
}

.lead-card__left {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.lead-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #1f2a37;
}

.lead-card__label {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #6b7280;
}

.lead-card__value {
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: #111928;
  font-weight: 500;
  text-align: right;
  flex: 1;
}

.dark .lead-card {
  background: #1f2937;
  border-color: #ffffff;
}

.dark .lead-card__body {
  border-color: #ffffff;
}

.dark .lead-card__row {
  border-color: #ffffff;
}

.dark .lead-card__icon {
  color: #9ca3af;
}

.dark .lead-card__label {
  color: #9ca3af;
}

.dark .lead-card__value {
  color: #f9fafb;
}
</style>
