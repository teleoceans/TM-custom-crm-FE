<template>
  <BaseFilterDropdown
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
    width="w-56"
  >
    <CheckboxFilterSection
      title="Stage"
      :options="stageOptions"
      :selected-values="selectedStages"
      :id-prefix="'pipeline-stage'"
      is-last
      @update:selected-values="$emit('update:selectedStages', $event)"
    />
  </BaseFilterDropdown>
</template>

<script setup>
import BaseFilterDropdown from "../common/filters/BaseFilterDropdown.vue";
import CheckboxFilterSection from "../common/filters/CheckboxFilterSection.vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  selectedStages: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["update:modelValue", "update:selectedStages"]);

const stageOptions = [
  { label: "All", value: "all" },
  { label: "New", value: "new-leads" },
  { label: "Contacted", value: "contacted" },
  { label: "Won", value: "won-leads" },
  { label: "Lost", value: "lost-leads" },
];
</script>
