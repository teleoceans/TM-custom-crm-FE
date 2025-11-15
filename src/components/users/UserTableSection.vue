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
    :badge-variant="badgeVariant"
    :badge-label="badgeLabel"
    badge-aria-label="User segment filter"
    entity-type="user"
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
    default: () => ["name", "email", "role", "assignedTo", "status"],
  },
  resourceName: {
    type: String,
    default: "user",
  },
  resourceNamePlural: {
    type: String,
    default: "users",
  },
  emptyState: {
    type: Object,
    default: () => ({
      title: "No users match your search",
      description:
        "Adjust your search or invite a new teammate to get started.",
      resetLabel: "Clear search",
      primaryActionLabel: "Invite user",
    }),
  },
  rowActions: {
    type: Array,
    default: () => [],
  },
  badgeVariant: {
    type: String,
    default: "all",
  },
  badgeLabel: {
    type: String,
    default: "All Users",
  },
});

const emit = defineEmits(["action", "add", "view", "reset"]);
</script>

<style scoped>
/* Styles are now in EntityTableSection.vue */
</style>
