<template>
  <div class="flex w-full flex-col -mt-6">
    <div
      class="users-header grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div
        class="col-span-full flex flex-col gap-3 px-4 pt-4 md:flex-row md:items-center md:justify-between"
      >
        <div class="relative w-full max-w-md">
          <label for="user-search" class="sr-only">Search users</label>
          <div
            class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
          >
            <svg
              class="h-4 w-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            id="user-search"
            v-model="searchTerm"
            type="text"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Search users"
          />
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <svg
              class="me-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z"
              />
            </svg>
            Filter
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            @click="handleInviteUser"
          >
            <svg
              class="me-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z"
              />
            </svg>
            New User
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <svg
              class="me-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 3a1 1 0 0 1 .993.883L13 4v8.585l1.293-1.292a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-3 3a1 1 0 0 1-1.32.083l-.094-.083-3-3a1 1 0 0 1 1.32-1.497l.094.083L11 12.585V4a1 1 0 0 1 1-1Z"
              />
              <path
                d="M5 15a1 1 0 0 1 .883.993L6 16v2h12v-2a1 1 0 0 1 1.993-.117L20 16v3a1 1 0 0 1-.883.993L19 20H5a1 1 0 0 1-.993-.883L4 19v-3a1 1 0 0 1 1-1Z"
              />
            </svg>
            Export
          </button>
        </div>
      </div>
    </div>

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
import UserTableSection from "../components/users/UserTableSection.vue";
import { mockAllUsers, mockNewUsers } from "../mock/users";
import useDateFormatter from "../composables/useDateFormatter";
import useUserActions from "../composables/useUserActions";
import useUserStatus from "../composables/useUserStatus";

const SEARCH_FIELDS = Object.freeze([
  "name",
  "email",
  "role",
  "assignedTo",
  "status",
]);

const searchTerm = ref("");
const allUsers = ref([...mockAllUsers]);
const newUsers = ref([...mockNewUsers]);

const { formatDateTime } = useDateFormatter();
const { getStatusClass } = useUserStatus();
const {
  rowActions: userRowActions,
  invite: handleInviteUser,
  view: handleViewUser,
  handleRowAction,
} = useUserActions();

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
