<template>
  <BaseFilterDropdown
    :model-value="modelValue"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <CheckboxFilterSection
      title="Role"
      :options="roleOptions"
      :selected-values="selectedRoles"
      :id-prefix="'tenant-role'"
      @update:selected-values="$emit('update:selectedRoles', $event)"
    />
    <RangeFilterSection
      title="Number of Assigned Users"
      :range="numberOfUsersRange"
      :id-prefix="'number-of-users'"
      :min="0"
      :placeholders="{ from: '0', to: '5' }"
      input-class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
      input-layout-class="flex gap-3"
      wrapper-class="space-y-3"
      @update:range="$emit('update:numberOfUsersRange', $event)"
    />
    <RangeFilterSection
      title="Total Cost"
      :range="totalCostRange"
      :id-prefix="'total-cost'"
      :min="0"
      :step="0.01"
      :placeholders="{ from: '300', to: '3500' }"
      input-class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-primary-500 dark:focus:ring-primary-500"
      input-layout-class="flex gap-3"
      wrapper-class="space-y-3"
      is-last
      @update:range="$emit('update:totalCostRange', $event)"
    />
  </BaseFilterDropdown>
</template>

<script setup>
import BaseFilterDropdown from "../common/filters/BaseFilterDropdown.vue";
import CheckboxFilterSection from "../common/filters/CheckboxFilterSection.vue";
import RangeFilterSection from "../common/filters/RangeFilterSection.vue";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  selectedRoles: {
    type: Array,
    default: () => [],
  },
  numberOfUsersRange: {
    type: Object,
    default: () => ({ from: null, to: null }),
  },
  totalCostRange: {
    type: Object,
    default: () => ({ from: null, to: null }),
  },
});

defineEmits([
  "update:modelValue",
  "update:selectedRoles",
  "update:numberOfUsersRange",
  "update:totalCostRange",
]);

// Role options
const roleOptions = [
  { label: "All", value: "all" },
  { label: "Admin", value: "Admin" },
  { label: "Cold Caller", value: "Cold Caller" },
  { label: "Acquisition manager", value: "Acquisition manager" },
];
</script>
