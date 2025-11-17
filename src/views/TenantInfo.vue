<template>
  <div class="flex w-full flex-col -mt-6">
    <ManagementPageHeader
      :search-term="searchTerm"
      search-id="tenant-info-search"
      search-label="Search tenants"
      search-placeholder="Search tenants"
      add-button-label="New Tenant"
      header-class="tenant-info-header page-header-negative-margin"
      @update:search-term="searchTerm = $event"
      @add="handleAddTenant"
      @filter="$emit('filter')"
      @export="$emit('export')"
    />

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
import Card from "../components/common/Card.vue";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";
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
