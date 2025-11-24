<template>
  <LeadsTableCard
    :class="tableCardClass"
    :items="items"
    :columns="columns"
    :search-term="searchTerm"
    :search-fields="searchFields"
    :selected-roles="selectedRoles"
    :selected-tenants="selectedTenants"
    :selected-statuses="selectedStatuses"
    :resource-name="resourceName"
    :resource-name-plural="resourceNamePlural"
    :enable-date-filter="false"
    :empty-state="emptyState"
    @reset="emit('reset')"
    @add-item="emit('add')"
    @view-item="emit('view', $event)"
  >
    <template #header>
      <div :class="headerClass">
        <div :class="headerLeftClass">
          <slot name="badge">
            <component
              :is="badgeComponent"
              v-if="badgeComponent"
              :entity-type="entityType"
              :variant="badgeVariant"
              :label="badgeLabel"
              :aria-label="badgeAriaLabel"
            />
          </slot>
        </div>
        <slot name="header-actions" />
      </div>
    </template>

    <template #cell-actions="{ item }">
      <div @click.stop>
        <ActionsMenu
          :actions="rowActions"
          trigger-variant="plain"
          @select="(value) => emit('action', { value, item })"
        >
          <template #icon>
            <span :class="actionsTriggerClass" aria-hidden="true">
              <svg
                class="h-5 w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="4"
                  d="M6 12h0m6 0h0m6 0h0"
                />
              </svg>
            </span>
          </template>
          <template #item="{ action }">
            <span :class="actionsItemClass">
              <span :class="actionsItemIconClass" aria-hidden="true">
                <slot name="action-icon" :action="action">
                  <EditIcon v-if="action.value === 'edit'" class="h-4 w-4" />
                  <TrashIcon v-else-if="action.value === 'delete'" class="h-4 w-4" />
                </slot>
              </span>
              <span>{{ action.label }}</span>
            </span>
          </template>
        </ActionsMenu>
      </div>
    </template>
  </LeadsTableCard>
</template>

<script setup>
import { computed } from "vue";
import ActionsMenu from "./ActionsMenu.vue";
import LeadsTableCard from "../leads/LeadsTableCard.vue";
import EditIcon from "../icons/common/EditIcon.vue";
import TrashIcon from "../icons/common/TrashIcon.vue";

const props = defineProps({
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
    default: () => [],
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
  resourceName: {
    type: String,
    default: "entity",
  },
  resourceNamePlural: {
    type: String,
    default: "entities",
  },
  emptyState: {
    type: Object,
    default: () => ({
      title: "No items match your search",
      description: "Adjust your search or add a new item to get started.",
      resetLabel: "Clear search",
      primaryActionLabel: "Add item",
    }),
  },
  rowActions: {
    type: Array,
    default: () => [],
  },
  badgeComponent: {
    type: [Object, String],
    default: null,
  },
  badgeVariant: {
    type: String,
    default: "all",
  },
  badgeLabel: {
    type: String,
    default: "All Items",
  },
  badgeAriaLabel: {
    type: String,
    default: "Entity segment filter",
  },
  entityType: {
    type: String,
    default: "entity",
  },
});

const emit = defineEmits(["action", "add", "view", "reset"]);

const tableCardClass = computed(() => `${props.entityType}-table-card`);
const headerClass = computed(() => `${props.entityType}-table-header`);
const headerLeftClass = computed(
  () => `${props.entityType}-table-header__left`
);
const actionsTriggerClass = computed(
  () => `${props.entityType}-actions-trigger`
);
const actionsItemClass = computed(() => `${props.entityType}-actions-item`);
const actionsItemIconClass = computed(
  () => `${props.entityType}-actions-item__icon`
);
</script>

<style scoped>
/* Consolidated styles for all entity types using attribute selectors */
[class*="-table-card"] :deep(.inline-flex.items-center.rounded-full) {
  font-weight: 600;
}

[class*="-table-header"] {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

[class*="-table-header__left"] {
  display: flex;
  align-items: center;
  gap: 12px;
}

[class*="-actions-trigger"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #9ca3af;
  transition: color 0.2s ease;
}

[class*="-actions-trigger"]:hover {
  color: #4b5563;
}

[class*="-actions-item"] {
  display: inline-flex;
  width: 100%;
  align-items: center;
  gap: 8px;
}

[class*="-actions-item__icon"] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

@media (min-width: 768px) {
  [class*="-table-header"] {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
