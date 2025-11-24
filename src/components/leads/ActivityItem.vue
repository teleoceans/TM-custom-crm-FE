<template>
  <li class="activity-item">
    <div v-if="$slots.icon" class="activity-icon">
      <slot name="icon" />
    </div>
    <div class="activity-body">
      <p class="activity-title">{{ title }}</p>
      <p class="activity-meta">{{ meta }}</p>
    </div>
  </li>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  meta: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.activity-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

@media (max-width: 480px) {
  .activity-item {
    align-items: flex-start;
    gap: 12px;
  }

  .activity-body {
    gap: 6px;
  }
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
}

.activity-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
}

.activity-title {
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #111928;
}

.activity-meta {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: #6b7280;
}

.dark .activity-item {
  border-color: #ffffff;
}

.dark .activity-title {
  color: #f9fafb;
}

.dark .activity-meta {
  color: #9ca3af;
}
</style>

