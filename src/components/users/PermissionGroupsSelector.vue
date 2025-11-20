<template>
  <div class="space-y-8">
    <section
      v-for="group in permissionGroups"
      :key="group.id"
      class="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0 dark:border-gray-700"
    >
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {{ group.label }}
        </h2>
        <button
          type="button"
          class="text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
          @click="$emit('toggle-group', group.id)"
        >
          {{ isGroupFullySelected(group.id) ? "Clear all" : "Select all" }}
        </button>
      </div>
      <div class="grid gap-3 md:grid-cols-2">
        <label
          v-for="option in group.options"
          :key="option.id"
          class="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          <input
            :id="`${group.id}-${option.id}`"
            :model-value="modelValue[group.id]"
            :value="option.id"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-500"
            @change="handleCheckboxChange(group.id, option.id, $event.target.checked)"
          />
          <span>{{ option.label }}</span>
        </label>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  permissionGroups: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue", "toggle-group"]);

const isGroupFullySelected = (groupId) => {
  const group = props.permissionGroups.find((item) => item.id === groupId);
  if (!group) return false;

  const currentSelection = props.modelValue[groupId] || [];
  return currentSelection.length === group.options.length;
};

const handleCheckboxChange = (groupId, optionId, checked) => {
  const currentSelection = [...(props.modelValue[groupId] || [])];

  if (checked) {
    if (!currentSelection.includes(optionId)) {
      currentSelection.push(optionId);
    }
  } else {
    const index = currentSelection.indexOf(optionId);
    if (index > -1) {
      currentSelection.splice(index, 1);
    }
  }

  emit("update:modelValue", {
    ...props.modelValue,
    [groupId]: currentSelection,
  });
};
</script>

