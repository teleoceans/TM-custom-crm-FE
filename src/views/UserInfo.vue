<template>
  <div class="flex w-full flex-col -mt-6">
    <ManagementPageHeader
      :search-term="searchTerm"
      search-id="user-info-search"
      search-label="Search users"
      search-placeholder="Search users"
      add-button-label="New User"
      header-class="user-info-header page-header-negative-margin"
      @update:search-term="searchTerm = $event"
      @add="handleInviteUser"
      @filter="$emit('filter')"
      @export="$emit('export')"
    />

    <div
      class="grid grid-cols-1 gap-4 py-6 lg:grid-cols-12 lg:items-start lg:gap-4"
    >
      <div class="flex flex-col gap-4 lg:col-span-6">
        <Card title="User Info" padding="responsive" class="user-info-card overflow-hidden">
          <dl class="space-y-4">
            <div
              v-for="field in profileFields"
              :key="field.key"
              class="flex w-full flex-col gap-y-1 border-b border-gray-200 pb-4 last:border-b-0 dark:border-gray-700 sm:grid sm:grid-cols-[140px_1fr] sm:items-start sm:gap-x-4 sm:gap-y-3"
            >
              <div class="flex items-center gap-2">
                <component
                  :is="field.icon"
                  v-if="field.icon"
                  class="h-4 w-4 text-gray-500 dark:text-gray-400"
                />
                <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 sm:font-normal">
                  {{ field.label }}
                </dt>
              </div>
              <dd class="min-w-0 break-words text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ field.value }}
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      <div class="flex flex-col gap-4 lg:col-span-6">
        <Card title="Permissions Allowed" padding="responsive" class="permissions-card overflow-hidden">
          <div class="space-y-4">
            <div
              v-for="(group, index) in permissionGroups"
              :key="group.id"
              class="space-y-2"
            >
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ group.label }}
              </h4>
              <ul
                v-if="group.options.length > 0"
                class="space-y-1 text-sm text-gray-900 dark:text-gray-100"
              >
                <li v-for="option in group.options" :key="option.id">
                  {{ option.label }}
                </li>
              </ul>
              <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                None
              </p>
              <div
                v-if="index < permissionGroups.length - 1"
                class="border-b border-gray-200 dark:border-gray-700"
              ></div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import Card from "../components/common/Card.vue";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";
import useDateFormatter from "../composables/useDateFormatter";
import {
  defaultUserDetailId,
  mockUserDetailsById,
  mockUserPermissionGroups,
} from "../mock/users";

const router = useRouter();
const route = useRoute();
const searchTerm = ref("");

const browserLocale =
  typeof window !== "undefined" && window.navigator?.language
    ? window.navigator.language
    : "en-US";

const { formatDateTime } = useDateFormatter({ dateStyle: "medium" }, browserLocale);

const fallbackDetail = mockUserDetailsById[defaultUserDetailId];

const detail = computed(() => {
  const id = route.params.userId?.toString();
  return (id && mockUserDetailsById[id]) || fallbackDetail;
});

const profileFields = computed(() => {
  const profile = detail.value?.profile;
  if (!profile) return [];
  return [
    { key: "name", label: "Name", value: profile.name },
    { key: "role", label: "Role", value: profile.role },
    { key: "email", label: "Email", value: profile.email },
    { key: "password", label: "Password", value: profile.password },
    { key: "phone", label: "Phone Number", value: profile.phone },
    {
      key: "addedOn",
      label: "Added on",
      value: formatDateTime(profile.addedOn, { dateStyle: "short" }),
    },
  ];
});

const permissionGroups = computed(() => {
  const permissions = detail.value?.permissions ?? {};
  return mockUserPermissionGroups.map((group) => {
    const selected = permissions[group.id] ?? [];
    const selectedOptions = group.options.filter((option) =>
      selected.includes(option.id)
    );
    return {
      id: group.id,
      label: group.label,
      options: selectedOptions,
    };
  });
});

const handleInviteUser = () => {
  router.push("/user-management/new");
};
</script>

<style scoped>
:deep(.user-info-card),
:deep(.permissions-card) {
  padding: 0.5rem !important;
  overflow-x: hidden;
  word-wrap: break-word;
}

:deep(.user-info-card > div:first-child),
:deep(.permissions-card > div:first-child) {
  padding: 0.5rem 1.5rem !important;
  border-bottom: none !important;
}

:deep(.user-info-card > div:nth-child(2)),
:deep(.permissions-card > div:nth-child(2)) {
  padding: 0.25rem 1.5rem !important;
  overflow-x: hidden;
  word-wrap: break-word;
}

/* Ensure content doesn't overflow on mobile */
@media (max-width: 640px) {
  :deep(.user-info-card),
  :deep(.permissions-card) {
    padding: 0.5rem 0.75rem !important;
  }

  :deep(.user-info-card > div:first-child),
  :deep(.permissions-card > div:first-child) {
    padding: 0.5rem 1rem !important;
  }

  :deep(.user-info-card > div:nth-child(2)),
  :deep(.permissions-card > div:nth-child(2)) {
    padding: 0.25rem 1rem !important;
  }
}
</style>

