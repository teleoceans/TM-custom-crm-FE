<template>
  <div class="space-y-4">
    <div class="flex items-center gap-3">
      <input
        :id="checkboxId"
        :checked="enabled"
        type="checkbox"
        class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700"
        @change="$emit('update:enabled', $event.target.checked)"
      />
      <label :for="checkboxId" class="text-base font-bold text-gray-900 dark:text-gray-100">
        {{ label }}
      </label>
    </div>
    <div v-if="enabled" class="grid gap-4">
      <template v-for="(row, rowIndex) in fieldRows" :key="rowIndex">
        <div :class="row.gridClass">
          <div
            v-for="field in row.fields"
            :key="field.key"
            class="purple-input"
          >
            <Input
              :model-value="getFieldValue(field.key)"
              :label="field.label"
              :type="field.type"
              :placeholder="field.placeholder"
              :disabled="field.disabled"
              :step="field.step"
              @update:model-value="updateField(field.key, $event)"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import Input from "../common/Input.vue";
import { formatCurrencySimple } from "../../utils/formatters";

const props = defineProps({
  sectionKey: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  fieldRows: {
    type: Array,
    required: true,
    // Each row: { gridClass: string, fields: Array<{key, label, type, placeholder, disabled?, step?}> }
  },
  modelValue: {
    type: Object,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "update:enabled"]);

const checkboxId = `${props.sectionKey}-checkbox`;

const getFieldValue = (fieldKey) => {
  const value = props.modelValue[fieldKey];
  // Format totalCost fields
  if (fieldKey === "totalCost") {
    return formatCurrencySimple(value);
  }
  return value;
};

const updateField = (fieldKey, value) => {
  // Convert to number for numeric fields (except totalCost which is disabled)
  const processedValue =
    fieldKey !== "totalCost" && value !== null && value !== undefined
      ? Number(value) || 0
      : value;

  emit("update:modelValue", {
    ...props.modelValue,
    [fieldKey]: processedValue,
  });
};

</script>

<style scoped>
/* Purple input styling for CreateTenant form */
.purple-input :deep(input) {
  border-color: rgb(233 213 255) !important; /* purple-200 */
}

.purple-input :deep(input:focus) {
  border-color: rgb(147 51 234) !important; /* purple-500 */
  --tw-ring-color: rgb(233 213 255) !important; /* purple-200 */
}

.dark .purple-input :deep(input) {
  border-color: rgb(126 34 206) !important; /* purple-700 */
}

.dark .purple-input :deep(input:focus) {
  border-color: rgb(168 85 247) !important; /* purple-400 */
  --tw-ring-color: rgb(88 28 135) !important; /* purple-800 */
}
</style>

