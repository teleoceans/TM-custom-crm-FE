<template>
  <span :class="chipClasses">
    <span v-if="$slots.icon" class="card-chip__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
    <span class="card-chip__label">
      <slot />
    </span>
  </span>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * Predefined styling variant. Ignored when `customClass` is provided.
   */
  variant: {
    type: String,
    default: "neutral",
    validator: (value) =>
      ["neutral", "primary", "success", "warning", "danger", "info"].includes(
        value
      ),
  },
  /**
   * Controls chip paddings and font size.
   */
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md"].includes(value),
  },
  /**
   * Override variant styling with a custom set of classes.
   */
  customClass: {
    type: [String, Array, Object],
    default: null,
  },
  /**
   * Apply uppercase styling to the label.
   */
  uppercase: {
    type: Boolean,
    default: false,
  },
});

const VARIANT_CLASS_MAP = {
  neutral: "card-chip--neutral",
  primary: "card-chip--primary",
  success: "card-chip--success",
  warning: "card-chip--warning",
  danger: "card-chip--danger",
  info: "card-chip--info",
};

const SIZE_CLASS_MAP = {
  sm: "px-2.5 py-0.5 text-[0.7rem]",
  md: "px-3 py-1 text-xs",
};

const variantClass = computed(() => {
  if (props.customClass) {
    return props.customClass;
  }
  return VARIANT_CLASS_MAP[props.variant] ?? VARIANT_CLASS_MAP.neutral;
});

const chipClasses = computed(() => [
  "card-chip inline-flex items-center rounded-full font-semibold leading-none",
  SIZE_CLASS_MAP[props.size] ?? SIZE_CLASS_MAP.md,
  variantClass.value,
  props.uppercase ? "uppercase" : null,
]);
</script>

<style scoped>
.card-chip {
  gap: 0.375rem;
}

.card-chip__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
}

.card-chip__label {
  display: inline-flex;
  align-items: center;
}

.card-chip--neutral {
  background-color: #f3f4f6;
  color: #374151;
}

.card-chip--primary {
  background-color: #edebfe;
  color: #8d5cf3;
}

.card-chip--success {
  background-color: #def7ec;
  color: #28a745;
}

.card-chip--warning {
  background-color: #fdf6b2;
  color: #ffc107;
}

.card-chip--danger {
  background-color: #fde8e8;
  color: #dc3545;
}

.card-chip--info {
  background-color: #e0f2fe;
  color: #2563eb;
}
</style>
