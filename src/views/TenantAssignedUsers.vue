<template>
  <div class="flex w-full flex-col -mt-6">
    <div class="relative">
      <ManagementPageHeader
        :search-term="searchTerm"
        search-id="assigned-users-search"
        search-label="Search Tenants"
        search-placeholder="Search Tenants"
        add-button-label="New Tenant"
        header-class="assigned-users-header page-header-negative-margin"
        @update:search-term="searchTerm = $event"
        @add="handleNewTenant"
        @filter="handleFilter"
        @export="handleExport"
      />
      <TenantAssignedUsersFilter
        v-model="showFilter"
        :selected-roles="selectedRoles"
        :number-of-users-range="numberOfUsersRange"
        :total-cost-range="totalCostRange"
        @update:selected-roles="selectedRoles = $event"
        @update:number-of-users-range="numberOfUsersRange = $event"
        @update:total-cost-range="totalCostRange = $event"
      />
    </div>

    <!-- Back Button Section -->
    <div class="flex items-center gap-4 py-4">
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        @click="handleBack"
      >
        <svg
          class="mr-2 h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back
      </button>
    </div>

    <!-- Roles and Costs Table -->
    <Card padding="none" class="mb-6">
      <!-- Table Header -->
      <div class="border-b border-gray-200 px-6 py-4 dark:border-gray-700">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Assigned Users
        </h2>
      </div>
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-primary-200 dark:bg-primary-800">
            <tr>
              <th scope="col" class="w-14 px-6 py-4">
                <input
                  type="checkbox"
                  :checked="allSelected"
                  :indeterminate="isIndeterminate"
                  class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  @change="toggleSelectAll"
                />
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
              >
                ROLE
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
              >
                NUMBER OF ASSIGNED USERS
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
              >
                HOURLY RATE
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
              >
                DIALER
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
              >
                COST PER ONE USER
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
              >
                TOTAL COST
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-white"
              >
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800"
          >
            <tr
              v-for="role in roles"
              :key="role.id"
              class="transition hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <input
                  type="checkbox"
                  :checked="role.selected"
                  class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  @change="toggleRoleSelection(role.id)"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {{ role.role }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {{ role.numberOfAssignedUsers ?? "—" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {{ role.hourlyRate ? `${role.hourlyRate}$` : "—" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {{ role.dialer ? `${role.dialer}$` : "—" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {{ role.costPerOneUser ? `${role.costPerOneUser}$` : "—" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {{ role.totalCost ? `${role.totalCost}$` : "—" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div @click.stop>
                  <ActionsMenu
                    :actions="rowActions"
                    trigger-variant="plain"
                    @select="(value) => handleRowAction(value, role)"
                  >
                    <template #icon>
                      <span class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200" aria-hidden="true">
                        <svg
                          class="h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-width="4"
                            d="M6 12h0m6 0h0m6 0h0"
                          />
                        </svg>
                      </span>
                    </template>
                    <template #item="{ action }">
                      <span class="flex items-center gap-2">
                        <EditIcon v-if="action.value === 'edit'" class="h-4 w-4" />
                        <TrashIcon v-else-if="action.value === 'delete'" class="h-4 w-4" />
                        <span>{{ action.label }}</span>
                      </span>
                    </template>
                  </ActionsMenu>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>

    <!-- List Price Section -->
    <div class="mb-6 inline-block">
      <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
        List Price
      </h2>
      <div class="flex flex-wrap gap-4">
        <div class="flex-shrink-0">
          <label
            for="quantity"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Quantity
          </label>
          <Input
            id="quantity"
            v-model="listPrice.quantity"
            type="number"
            placeholder="1000"
          />
        </div>
        <div class="flex-shrink-0">
          <label
            for="price-per-client"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Price / Client
          </label>
          <Input
            id="price-per-client"
            v-model="listPrice.pricePerClient"
            type="number"
            step="0.01"
            placeholder="0.2"
          />
        </div>
        <div class="flex-shrink-0">
          <label
            for="total-cost"
            class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Total Cost
          </label>
          <Input
            id="total-cost"
            :model-value="`${listPriceTotalCost}$`"
            type="text"
            disabled
            placeholder="200$"
          />
        </div>
      </div>
      <div class="mt-6">
        <Button variant="primary" size="md" @click="handleAssignNewUser">
          Assign New User
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Card from "../components/common/Card.vue";
import Button from "../components/common/Button.vue";
import Input from "../components/common/Input.vue";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";
import TenantAssignedUsersFilter from "../components/tenants/TenantAssignedUsersFilter.vue";
import EditIcon from "../components/icons/common/EditIcon.vue";
import TrashIcon from "../components/icons/common/TrashIcon.vue";
import ActionsMenu from "../components/common/ActionsMenu.vue";
import { getTenantRolesAndCosts } from "../mock/tenants";

const rowActions = [
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete", tone: "danger" },
];

const router = useRouter();
const route = useRoute();
const searchTerm = ref("");
const showFilter = ref(false);
const selectedRoles = ref([]);
const numberOfUsersRange = ref({ from: null, to: null });
const totalCostRange = ref({ from: null, to: null });

const tenantId = computed(() => route.params.tenantId?.toString());

const roles = ref([]);
const listPrice = ref({
  quantity: 1000,
  pricePerClient: 0.2,
  totalCost: 200,
});

const listPriceTotalCost = computed(() => {
  const quantity = Number(listPrice.value.quantity) || 0;
  const pricePerClient = Number(listPrice.value.pricePerClient) || 0;
  return quantity * pricePerClient;
});

onMounted(() => {
  const data = getTenantRolesAndCosts(tenantId.value);
  if (data?.roles) {
    roles.value = data.roles.map((role) => ({ ...role }));
  }
  if (data?.listPrice) {
    listPrice.value = { ...data.listPrice };
  }
});

const allSelected = computed(() => {
  return roles.value.length > 0 && roles.value.every((role) => role.selected);
});

const isIndeterminate = computed(() => {
  const selectedCount = roles.value.filter((role) => role.selected).length;
  return selectedCount > 0 && selectedCount < roles.value.length;
});

const toggleSelectAll = (event) => {
  const checked = event.target.checked;
  roles.value.forEach((role) => {
    role.selected = checked;
  });
};

const toggleRoleSelection = (roleId) => {
  const role = roles.value.find((r) => r.id === roleId);
  if (role) {
    role.selected = !role.selected;
  }
};

const updateListPrice = () => {
  // Total cost is computed automatically via listPriceTotalCost
  // This function can be used for additional logic if needed
};

const handleBack = () => {
  router.push(`/tenant-management/${tenantId.value}`);
};

const handleExport = () => {
  console.log("Export clicked");
};

const handleNewTenant = () => {
  router.push("/tenant-management/new");
};

const handleFilter = () => {
  showFilter.value = !showFilter.value;
};

const handleRowAction = (actionValue, role) => {
  if (actionValue === "edit") {
    console.log("Edit role:", role);
  } else if (actionValue === "delete") {
    console.log("Delete role:", role);
  }
};

const handleAssignNewUser = () => {
  console.log("Assign new user clicked");
};
</script>

<style scoped>
/* Additional styles if needed */
</style>

