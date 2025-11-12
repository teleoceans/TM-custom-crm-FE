<template>
  <LeadsTableCard
    class="user-table-card"
    :items="items"
    :columns="columns"
    :search-term="searchTerm"
    :search-fields="searchFields"
    :resource-name="resourceName"
    :resource-name-plural="resourceNamePlural"
    :enable-date-filter="false"
    :empty-state="emptyState"
    @reset="emit('reset')"
    @add-item="emit('add')"
    @view-item="emit('view', $event)"
  >
    <template #header>
      <div class="user-table-header">
        <div class="user-table-header__left">
          <slot name="badge">
            <UserSegmentBadge
              :variant="badgeVariant"
              :label="badgeLabel"
              aria-label="User segment filter"
            />
          </slot>
        </div>
        <slot name="header-actions" />
      </div>
    </template>

    <template #cell-actions="{ item }">
      <ActionsMenu
        :actions="rowActions"
        trigger-variant="plain"
        @select="(value) => emit('action', { value, item })"
      >
        <template #icon>
          <span class="user-actions-trigger" aria-hidden="true">
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
          <span class="user-actions-item">
            <span class="user-actions-item__icon" aria-hidden="true">
              <slot name="action-icon" :action="action">
                <svg
                  v-if="action.value === 'edit'"
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.862 3.487a1.5 1.5 0 0 1 2.122 0l1.53 1.53a1.5 1.5 0 0 1 0 2.121L7.409 20.243a1.5 1.5 0 0 1-.903.434l-3.5.467a.75.75 0 0 1-.84-.84l.467-3.5a1.5 1.5 0 0 1 .434-.903L16.862 3.487Zm-2.115 4.237 1.53 1.53L6.352 19.178l-1.53-1.53L14.747 7.724Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <svg
                  v-else-if="action.value === 'delete'"
                  class="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9.6 3a1.6 1.6 0 0 0-1.52 1.1l-.22.67H4.5a.9.9 0 0 0 0 1.8h.4l.77 11.05A2.6 2.6 0 0 0 8.25 20.5h7.5a2.6 2.6 0 0 0 2.58-2.88L19.1 6.6h.4a.9.9 0 1 0 0-1.8h-3.36l-.22-.67A1.6 1.6 0 0 0 14.1 3H9.6Zm4.14 3.57H10.2a.9.9 0 0 1-.85-.61l-.08-.24h6.4l-.08.24a.9.9 0 0 1-.85.61Zm-3.69 3.83a.9.9 0 1 0-1.8.06l.3 5.7a.9.9 0 1 0 1.8-.06l-.3-5.7Zm4.2-.84a.9.9 0 0 1 .84.95l-.3 5.7a.9.9 0 1 1-1.8-.06l.3-5.7a.9.9 0 0 1 .96-.89Z"
                    clip-rule="evenodd"
                  />
                </svg>
              </slot>
            </span>
            <span>{{ action.label }}</span>
          </span>
        </template>
      </ActionsMenu>
    </template>
  </LeadsTableCard>
</template>

<script setup>
import ActionsMenu from "../common/ActionsMenu.vue";
import LeadsTableCard from "../leads/LeadsTableCard.vue";
import UserSegmentBadge from "./UserSegmentBadge.vue";

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
.user-table-card :deep(.inline-flex.items-center.rounded-full) {
  font-weight: 600;
}

.user-table-header {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.user-table-header__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-actions-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: #9ca3af;
  transition: color 0.2s ease;
}

.user-actions-trigger:hover {
  color: #4b5563;
}

.user-actions-item {
  display: inline-flex;
  width: 100%;
  align-items: center;
  gap: 8px;
}

.user-actions-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

@media (min-width: 768px) {
  .user-table-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
