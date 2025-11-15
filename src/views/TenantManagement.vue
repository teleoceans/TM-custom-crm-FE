<template>
  <div class="flex w-full flex-col -mt-6">
    <ManagementPageHeader
      :search-term="searchTerm"
      search-id="tenant-search"
      search-label="Search tenants"
      search-placeholder="Search tenants"
      add-button-label="New Tenant"
      header-class="tenants-header"
      @update:search-term="searchTerm = $event"
      @add="handleAddTenant"
    />

    <div class="flex flex-col">
      <section>
        <TenantTableSection
          :items="allTenants"
          :columns="tenantColumns"
          :search-term="searchTerm"
          :search-fields="SEARCH_FIELDS"
          :row-actions="tenantRowActions"
          :empty-state="allTenantsEmptyState"
          badge-label="All Tenants"
          @reset="handleResetSearch"
          @add="handleAddTenant"
          @view="handleViewTenant"
          @action="handleTenantAction"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import TenantTableSection from "../components/tenants/TenantTableSection.vue";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";
import { mockAllTenants } from "../mock/tenants";
import useDateFormatter from "../composables/useDateFormatter";
import useTenantActions from "../composables/useTenantActions";
import useEntityStatus from "../composables/useEntityStatus";

const SEARCH_FIELDS = Object.freeze([
  "name",
  "phone",
  "contractDate",
  "assignedUsers",
  "status",
]);

const router = useRouter();
const searchTerm = ref("");
const allTenants = ref([...mockAllTenants]);

const { formatDateTime } = useDateFormatter();
const { getStatusClass } = useEntityStatus();
const {
  rowActions: tenantRowActions,
  add: handleAddTenant,
  view: handleViewTenant,
  handleRowAction,
} = useTenantActions({
  onAdd: () => router.push("/tenant-management/new"),
  onView: (tenantId) => router.push(`/tenant-management/${tenantId}`),
});

const formatAssignedUsers = (users) => {
  if (!users || !Array.isArray(users)) return "0";
  return users.length.toString();
};

const tenantColumns = computed(() => [
  {
    key: "name",
    label: "Name",
    headerClass: "w-56",
    textClass: "font-medium text-gray-900 text-sm dark:text-gray-100",
  },
  {
    key: "phone",
    label: "Phone number",
    headerClass: "w-48",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
  },
  {
    key: "contractDate",
    label: "Contract date",
    headerClass: "w-48",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
    formatter: (value) => formatDateTime(value),
  },
  {
    key: "assignedUsers",
    label: "Assigned users",
    headerClass: "w-48",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
    formatter: (value) => formatAssignedUsers(value),
  },
  {
    key: "status",
    label: "STATUS",
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
]);

const allTenantsEmptyState = {
  title: "No tenants match your search",
  description: "Adjust your search or add a new tenant to get started.",
  resetLabel: "Clear search",
  primaryActionLabel: "Add tenant",
};

const handleResetSearch = () => {
  searchTerm.value = "";
};

const handleTenantAction = ({ value, item }) => {
  handleRowAction(value, item);
};
</script>

<style scoped>
.tenants-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
