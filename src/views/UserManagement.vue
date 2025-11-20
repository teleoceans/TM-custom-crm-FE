<template>
  <div class="flex w-full flex-col -mt-6">
    <ManagementPageHeader
      :search-term="searchTerm"
      search-id="user-search"
      search-label="Search users"
      search-placeholder="Search users"
      add-button-label="New User"
      header-class="users-header"
      @update:search-term="searchTerm = $event"
      @add="handleInviteUser"
    />

    <div class="flex flex-col">
      <section>
        <UserTableSection
          :items="allUsers"
          :columns="allUsersColumns"
          :search-term="searchTerm"
          :search-fields="SEARCH_FIELDS"
          :row-actions="userRowActions"
          :empty-state="allUsersEmptyState"
          badge-variant="all"
          badge-label="All Users"
          @reset="handleResetSearch"
          @add="handleInviteUser"
          @view="handleViewUser"
          @action="handleUserAction"
        />
      </section>

      <section>
        <UserTableSection
          :items="newUsers"
          :columns="newUsersColumns"
          :search-term="searchTerm"
          :search-fields="SEARCH_FIELDS"
          :row-actions="userRowActions"
          :empty-state="newUsersEmptyState"
          badge-variant="new"
          badge-label="New Users"
          @reset="handleResetSearch"
          @add="handleInviteUser"
          @view="handleViewUser"
          @action="handleUserAction"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import UserTableSection from "../components/users/UserTableSection.vue";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";
import { mockAllUsers, mockNewUsers } from "../mock/users";
import useDateFormatter from "../composables/useDateFormatter";
import useUserActions from "../composables/useUserActions";
import useEntityStatus from "../composables/useEntityStatus";

const SEARCH_FIELDS = Object.freeze([
  "name",
  "email",
  "role",
  "assignedTo",
  "status",
]);

const router = useRouter();
const searchTerm = ref("");
const allUsers = ref([...mockAllUsers]);
const newUsers = ref([...mockNewUsers]);

const { formatDateTime } = useDateFormatter();
const { getStatusClass } = useEntityStatus();
const {
  rowActions: userRowActions,
  invite: handleInviteUser,
  view: handleViewUser,
  handleRowAction,
} = useUserActions({
  onInvite: () => router.push("/user-management/new"),
  onView: (userId) => router.push(`/user-management/${userId}`),
});

const createColumns = (dateKey, dateLabel) => [
  {
    key: "name",
    label: "Name",
    headerClass: "w-56",
    textClass: "font-semibold text-gray-900 text-sm dark:text-gray-100",
  },
  {
    key: "email",
    label: "Email",
    headerClass: "w-64",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
  },
  {
    key: "role",
    label: "Role",
    headerClass: "w-36",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
  },
  {
    key: dateKey,
    label: dateLabel,
    headerClass: "w-48",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
    formatter: (value) => formatDateTime(value),
  },
  {
    key: "assignedTo",
    label: "Assigned to",
    headerClass: "w-56",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
  },
  {
    key: "status",
    label: "Status",
    headerClass: "w-36",
    badge: true,
    badgeClass: (item) => getStatusClass(item.status),
  },
  {
    key: "actions",
    label: "Actions",
    headerClass: "w-32 text-right",
    cellClass: "px-3 py-2 text-right",
  },
];

const allUsersColumns = computed(() =>
  createColumns("lastLogin", "Last login")
);
const newUsersColumns = computed(() => createColumns("addedOn", "Added on"));

const allUsersEmptyState = {
  title: "No users match your search",
  description: "Adjust your search or invite a new teammate to get started.",
  resetLabel: "Clear search",
  primaryActionLabel: "Invite user",
};

const newUsersEmptyState = {
  title: "No new users found",
  description:
    "Looks like everyone is onboarded. Invite someone new to collaborate.",
  resetLabel: "Clear search",
  primaryActionLabel: "Invite user",
};

const handleResetSearch = () => {
  searchTerm.value = "";
};

const handleUserAction = ({ value, item }) => {
  handleRowAction(value, item);
};
</script>

<style scoped>
.users-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
