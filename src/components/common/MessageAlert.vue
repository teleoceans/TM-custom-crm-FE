<template>
  <div
    v-if="message"
    :class="alertClasses"
    role="alert"
    :aria-live="type === 'error' ? 'assertive' : 'polite'"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "success",
    validator: (value) => ["success", "error"].includes(value),
  },
});

const alertClasses = computed(() => {
  const baseClasses =
    "rounded-lg p-4 text-sm transition-all duration-200";
  
  if (props.type === "error") {
    return `${baseClasses} bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300`;
  }
  
  return `${baseClasses} bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300`;
});
</script>

