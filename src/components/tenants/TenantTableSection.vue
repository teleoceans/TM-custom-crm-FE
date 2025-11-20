<template>
  <EntityTableSection
    :items="items"
    :columns="columns"
    :search-term="searchTerm"
    :search-fields="searchFields"
    :resource-name="resourceName"
    :resource-name-plural="resourceNamePlural"
    :empty-state="emptyState"
    :row-actions="rowActions"
    :badge-component="SegmentBadge"
    :badge-variant="'all'"
    :badge-label="badgeLabel"
    badge-aria-label="Tenant segment filter"
    entity-type="tenant"
    @action="emit('action', $event)"
    @add="emit('add')"
    @view="emit('view', $event)"
    @reset="emit('reset')"
  >
    <template #action-icon="{ action }">
      <slot name="action-icon" :action="action" />
    </template>
  </EntityTableSection>
</template>

<script setup>
import EntityTableSection from "../common/EntityTableSection.vue";
import SegmentBadge from "../common/SegmentBadge.vue";

defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  searchTerm: {
    type: String,
    default: "",
  },
  searchFields: {
    type: Array,
    default: () => ["name", "phone", "contractDate", "assignedUsers", "status"],
  },
  resourceName: {
    type: String,
    default: "tenant",
  },
  resourceNamePlural: {
    type: String,
    default: "tenants",
  },
  emptyState: {
    type: Object,
    default: () => ({
      title: "No tenants match your search",
      description:
        "Adjust your search or add a new tenant to get started.",
      resetLabel: "Clear search",
      primaryActionLabel: "Add tenant",
    }),
  },
  rowActions: {
    type: Array,
    default: () => [],
  },
  badgeLabel: {
    type: String,
    default: "All Tenants",
  },
});

const emit = defineEmits(["action", "add", "view", "reset"]);
</script>

<style scoped>
/* Styles are now in EntityTableSection.vue */
</style>

