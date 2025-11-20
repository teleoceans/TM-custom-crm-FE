<template>
  <tr>
    <td :colspan="colspan" class="px-6 py-16 text-center text-sm text-gray-500 dark:text-gray-400">
      <div class="mx-auto max-w-md space-y-2">
        <p class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ emptyState.title }}
        </p>
        <p>{{ emptyState.description }}</p>
        <div class="flex justify-center gap-3 pt-2">
          <Button variant="secondary" size="sm" @click="$emit('reset-search')">
            {{ emptyState.resetLabel }}
          </Button>
          <Button size="sm" @click="$emit('add-item')">
            {{ emptyState.primaryActionLabel }}
          </Button>
        </div>
      </div>
    </td>
  </tr>
</template>

<script setup>
import Button from "./Button.vue";

defineProps({
  colspan: {
    type: Number,
    required: true,
  },
  emptyState: {
    type: Object,
    required: true,
    default: () => ({
      title: "No results match the current search",
      description: "Adjust your search or reset to see the full list again.",
      resetLabel: "Reset search",
      primaryActionLabel: "Add a new record",
    }),
  },
});

defineEmits(["reset-search", "add-item"]);
</script>

