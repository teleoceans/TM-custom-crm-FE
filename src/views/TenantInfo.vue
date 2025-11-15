<template>
  <div class="flex w-full flex-col -mt-6">
    <div
      class="tenant-info-header grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div
        class="col-span-full flex flex-col gap-3 px-4 pt-4 md:flex-row md:items-center md:justify-between"
      >
        <div class="relative w-full md:w-auto md:max-w-md">
          <label for="tenant-info-search" class="sr-only">Search tenants</label>
          <div
            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
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
            id="tenant-info-search"
            v-model="searchTerm"
            type="text"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Search tenants"
          />
        </div>
        <div class="flex items-center gap-3">
          <Button variant="muted" size="sm">
            <template #icon-left>
              <svg
                class="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z"
                />
              </svg>
            </template>
            Filter
          </Button>
          <Button variant="muted" size="sm" @click="handleAddTenant">
            <template #icon-left>
              <svg
                class="h-4 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z"
                />
              </svg>
            </template>
            New Tenant
          </Button>
          <Button variant="muted" size="sm">
            <template #icon-left>
              <svg
                class="h-4 w-4"
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
            </template>
            Export
          </Button>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 gap-4 py-6 lg:grid-cols-12 lg:items-start lg:gap-4"
    >
      <div class="flex flex-col gap-4 lg:col-span-6">
        <Card title="Tenant Info" padding="responsive" class="tenant-info-card">
          <dl class="space-y-4">
            <div
              v-for="field in profileFields"
              :key="field.key"
              class="grid w-full grid-cols-[140px_1fr] items-start gap-x-4 gap-y-3 border-b border-gray-200 pb-4 last:border-b-0 dark:border-gray-700"
            >
              <dt class="text-sm text-gray-500 dark:text-gray-400">
                {{ field.label }}
              </dt>
              <dd class="text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ field.value }}
              </dd>
            </div>
          </dl>
        </Card>
      </div>

      <div class="flex flex-col gap-4 lg:col-span-6">
        <Card
          title="Assigned Users"
          padding="responsive"
          class="assigned-users-card"
        >
          <div class="space-y-4">
            <!-- Cold Callers Section -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                Cold Callers
              </h4>
              <ul
                v-if="coldCallers.length > 0"
                class="space-y-1 text-sm text-gray-900 dark:text-gray-100"
              >
                <li v-for="(user, index) in coldCallers" :key="index">
                  {{ user }}
                </li>
              </ul>
              <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                None
              </p>
              <div class="border-b border-gray-200 dark:border-gray-700"></div>
            </div>

            <!-- Acquisition Managers Section -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                Acquisition Managers
              </h4>
              <ul
                v-if="acquisitionManagers.length > 0"
                class="space-y-1 text-sm text-gray-900 dark:text-gray-100"
              >
                <li v-for="(user, index) in acquisitionManagers" :key="index">
                  {{ user }}
                </li>
              </ul>
              <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                None
              </p>
              <div class="border-b border-gray-200 dark:border-gray-700"></div>
            </div>

            <!-- Dispositions Section -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-900 dark:text-gray-100">
                Dispositions
              </h4>
              <ul
                v-if="dispositions.length > 0"
                class="space-y-1 text-sm text-gray-900 dark:text-gray-100"
              >
                <li v-for="(user, index) in dispositions" :key="index">
                  {{ user }}
                </li>
              </ul>
              <p v-else class="text-sm text-gray-500 dark:text-gray-400">
                None
              </p>
            </div>

            <!-- View Details Link -->
            <div class="pt-2">
              <a
                href="#"
                class="text-sm text-gray-900 underline dark:text-gray-100"
              >
                View Details
              </a>
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
import Button from "../components/common/Button.vue";
import Card from "../components/common/Card.vue";
import EditIcon from "../components/icons/EditIcon.vue";
import useDateFormatter from "../composables/useDateFormatter";
import { defaultTenantDetailId, mockTenantDetailsById } from "../mock/tenants";

const router = useRouter();
const route = useRoute();
const searchTerm = ref("");

const browserLocale =
  typeof window !== "undefined" && window.navigator?.language
    ? window.navigator.language
    : "en-US";

const { formatDateTime } = useDateFormatter(
  { dateStyle: "medium" },
  browserLocale
);

const fallbackDetail = mockTenantDetailsById[defaultTenantDetailId];

const detail = computed(() => {
  const id = route.params.tenantId?.toString();
  const tenantDetail = (id && mockTenantDetailsById[id]) || fallbackDetail;
  return tenantDetail;
});

const profileFields = computed(() => {
  const profile = detail.value?.profile;
  if (!profile) return [];
  return [
    { key: "name", label: "Name", value: profile.name || "—" },
    { key: "phone", label: "Phone Number", value: profile.phone || "—" },
    {
      key: "whatsappNumber",
      label: "WhatsApp Number",
      value: profile.whatsappNumber || "—",
    },
    { key: "email", label: "Email", value: profile.email || "—" },
    {
      key: "contractDate",
      label: "Contract Date",
      value: profile.contractDate
        ? formatDateTime(profile.contractDate, { dateStyle: "short" })
        : "—",
    },
    { key: "industry", label: "Industry", value: profile.industry || "—" },
    {
      key: "streetAddress1",
      label: "Street Address 1",
      value: profile.streetAddress1 || "—",
    },
    {
      key: "streetAddress2",
      label: "Street Address 2",
      value: profile.streetAddress2 || "—",
    },
    { key: "country", label: "Country", value: profile.country || "—" },
    { key: "city", label: "City", value: profile.city || "—" },
    { key: "state", label: "State", value: profile.state || "—" },
    { key: "zipCode", label: "Zip Code", value: profile.zipCode || "—" },
    { key: "timeZone", label: "Time Zone", value: profile.timeZone || "—" },
    { key: "currency", label: "Currency", value: profile.currency || "—" },
    { key: "website", label: "Website", value: profile.website || "—" },
  ];
});

const coldCallers = computed(() => {
  const profile = detail.value?.profile;
  if (!profile) return [];
  return Array.isArray(profile.coldCallers) ? profile.coldCallers : [];
});

const acquisitionManagers = computed(() => {
  const profile = detail.value?.profile;
  if (!profile) return [];
  return Array.isArray(profile.acquisitionManagers)
    ? profile.acquisitionManagers
    : [];
});

const dispositions = computed(() => {
  const profile = detail.value?.profile;
  if (!profile) return [];
  return Array.isArray(profile.dispositions) ? profile.dispositions : [];
});

const handleAddTenant = () => {
  router.push("/tenant-management/new");
};
</script>

<style scoped>
.tenant-info-header {
  margin-left: -1rem;
  margin-right: -1rem;
}

:deep(.tenant-info-card),
:deep(.assigned-users-card) {
  padding: 0.5rem !important;
}

:deep(.tenant-info-card > div:first-child),
:deep(.assigned-users-card > div:first-child) {
  padding: 0.5rem 1.5rem !important;
  border-bottom: none !important;
}

:deep(.tenant-info-card > div:nth-child(2)),
:deep(.assigned-users-card > div:nth-child(2)) {
  padding: 0.25rem 1.5rem !important;
}
</style>
