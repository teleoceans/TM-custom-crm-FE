<template>
  <BaseFilterDropdown :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)">
    <CheckboxFilterSection
      title="Role"
      :options="roleOptions"
      :selected-values="selectedRoles"
      :id-prefix="'users-role'"
      @update:selected-values="$emit('update:selectedRoles', $event)"
    />
    <CheckboxFilterSection
      title="Tenants assigned to"
      :options="tenantOptions"
      :selected-values="selectedTenants"
      :id-prefix="'users-tenant'"
      @update:selected-values="$emit('update:selectedTenants', $event)"
    />
    <CheckboxFilterSection
      title="Status"
      :options="statusOptions"
      :selected-values="selectedStatuses"
      :id-prefix="'users-status'"
      is-last
      @update:selected-values="$emit('update:selectedStatuses', $event)"
    />
  </BaseFilterDropdown>
</template>

<script setup>
import BaseFilterDropdown from "../common/filters/BaseFilterDropdown.vue";
import CheckboxFilterSection from "../common/filters/CheckboxFilterSection.vue";
import { mockUserRoles, mockUserTenants } from "../../mock/users.js";

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  selectedRoles: {
    type: Array,
    default: () => [],
  },
  selectedTenants: {
    type: Array,
    default: () => [],
  },
  selectedStatuses: {
    type: Array,
    default: () => [],
  },
});

defineEmits([
  "update:modelValue",
  "update:selectedRoles",
  "update:selectedTenants",
  "update:selectedStatuses",
]);

// Role options - using roles from mock data, but can be customized
const roleOptions = [
  { label: "All", value: "all" },
  { label: "Admin", value: "Admin" },
  { label: "Cold Caller", value: "Cold Caller" },
  { label: "Acquisition manager", value: "Acquisition manager" },
  ...mockUserRoles
    .filter((role) => !["Admin"].includes(role.value))
    .map((role) => ({ label: role.label, value: role.value })),
];

// Tenant options (no "All" option)
const tenantOptions = mockUserTenants.map((tenant) => ({
  label: tenant.label,
  value: tenant.id,
}));

// Status options (no "All" option)
const statusOptions = [
  { label: "Active", value: "Active" },
  { label: "Inactive", value: "Inactive" },
];
</script>
