<template>
  <BaseFilterDropdown :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <CheckboxFilterSection
      title="Stage"
      :options="stageOptions"
      :selected-values="selectedStages"
      :id-prefix="'leads-stage'"
      @update:selected-values="$emit('update:selectedStages', $event)"
    />
    <RangeFilterSection
      title="Lead Value"
      :range="leadValueRange"
      :id-prefix="'lead-value'"
      is-last
      @update:range="$emit('update:leadValueRange', $event)"
    />
  </BaseFilterDropdown>
</template>

<script setup>
import BaseFilterDropdown from "../common/filters/BaseFilterDropdown.vue";
import CheckboxFilterSection from "../common/filters/CheckboxFilterSection.vue";
import RangeFilterSection from "../common/filters/RangeFilterSection.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  selectedStages: {
    type: Array,
    default: () => [],
  },
  leadValueRange: {
    type: Object,
    default: () => ({ from: null, to: null }),
  },
});

defineEmits([
  "update:modelValue",
  "update:selectedStages",
  "update:leadValueRange",
]);

const stageOptions = [
  { label: "All", value: "all" },
  { label: "New", value: "new" },
  { label: "Contacted", value: "contacted" },
  { label: "Won", value: "won" },
  { label: "Lost", value: "lost" },
];
</script>
