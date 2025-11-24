<template>
  <Card
    class="mt-6 overflow-hidden border border-gray-300 dark:border-white"
    :border="false"
    padding="none"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <TableDateFilter
      v-if="enableDateFilter"
      :model-value="dateFilter"
      :options="availableDateFilterOptions"
      :id-prefix="idPrefix"
      @update:model-value="dateFilter = $event"
    />
    <div class="overflow-x-auto">
      <table class="min-w-full table-fixed divide-y divide-gray-200">
        <thead>
          <tr
            class="bg-primary-800 text-left text-xs font-semibold uppercase tracking-wide text-white"
          >
            <th v-if="selectable" class="w-14 px-6 py-4 whitespace-nowrap">
              <input
                ref="selectAllCheckbox"
                type="checkbox"
                :checked="allSelectedOnPage"
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                @change="toggleSelectAll($event.target.checked)"
              />
              <span class="sr-only">Select all {{ resourceNamePlural }}</span>
            </th>
            <th
              v-for="column in resolvedColumns"
              :key="column.key"
              :class="['px-6 py-4 whitespace-nowrap', column.headerClass]"
            >
              <slot :name="`header-${column.key}`" :column="column">
                {{ column.label }}
              </slot>
            </th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-gray-200 bg-white dark:divide-white dark:bg-gray-800"
        >
          <tr
            v-for="item in paginatedItems"
            :key="item[rowIdKey]"
            class="cursor-pointer transition hover:bg-gray-50 dark:hover:bg-gray-800"
            :class="{ 'cursor-default': !rowClickable }"
            @click="handleViewItem(item[rowIdKey])"
          >
            <td v-if="selectable" class="px-6 py-4 whitespace-nowrap">
              <input
                :id="`${idPrefix}-select-${item[rowIdKey]}`"
                v-model="selectedRowIds"
                type="checkbox"
                :value="item[rowIdKey]"
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                @click.stop
              />
              <span class="sr-only">Select {{ itemLabel(item) }}</span>
            </td>
            <td
              v-for="column in resolvedColumns"
              :key="column.key"
              :class="['px-6 py-4 whitespace-nowrap', column.cellClass]"
            >
              <slot
                :name="`cell-${column.key}`"
                :item="item"
                :value="resolveCellValue(column, item)"
              >
                <CardChip
                  v-if="column.badge"
                  :custom-class="resolveBadgeClass(column, item)"
                >
                  {{ resolveCellValue(column, item) }}
                </CardChip>
                <span v-else-if="column.textClass" :class="column.textClass">
                  {{ resolveCellValue(column, item) }}
                </span>
                <span v-else :class="column.valueClass">
                  {{ resolveCellValue(column, item) }}
                </span>
              </slot>
            </td>
          </tr>
          <TableEmptyState
            v-if="paginatedItems.length === 0"
            :colspan="resolvedColumns.length + (selectable ? 1 : 0)"
            :empty-state="emptyState"
            @reset-search="handleResetSearch"
            @add-item="handleAddItem"
          />
        </tbody>
      </table>
    </div>

    <TablePagination
      :current-page="currentPage"
      :total-pages="totalPages"
      :showing-range="showingRange"
      :total-records="totalRecords"
      :resource-name-plural="resourceNamePlural"
      :pagination-items="paginationItems"
      @go-to-page="goToPage"
    />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Card from "../common/Card.vue";
import CardChip from "../common/CardChip.vue";
import TablePagination from "../common/TablePagination.vue";
import TableEmptyState from "../common/TableEmptyState.vue";
import TableDateFilter from "../common/TableDateFilter.vue";
import { formatDate, formatCurrency } from "../../utils/formatters";
import { DEFAULT_DATE_FILTER_OPTIONS } from "../../composables/useDateFilter";
import { useTablePagination } from "../../composables/useTablePagination";
import { useTableSelection } from "../../composables/useTableSelection";
import { useTableFilters } from "../../composables/useTableFilters";

const stageStyles = {
  "New lead": "card-chip--primary",
  "Contacted lead": "card-chip--warning",
  "Lost lead": "card-chip--danger",
  "Won lead": "card-chip--success",
  Completed: "card-chip--success",
};

function defaultStageClass(stage) {
  return stageStyles[stage] ?? "card-chip--neutral";
}

const defaultColumns = [
  {
    key: "name",
    label: "Name",
    headerClass: "w-56",
    cellClass: "",
    textClass: "font-semibold text-gray-900 text-sm dark:text-gray-100",
  },
  {
    key: "phone",
    label: "Phone Number",
    headerClass: "w-44",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
  },
  {
    key: "email",
    label: "Email",
    headerClass: "w-56",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
  },
  {
    key: "createdBy",
    label: "Created By",
    headerClass: "w-48",
    cellClass: "",
    textClass: "font-medium text-gray-900 text-sm dark:text-gray-100",
  },
  {
    key: "leadValue",
    label: "Lead Value",
    headerClass: "w-40",
    cellClass: "text-sm font-medium text-gray-900 dark:text-gray-100",
    formatter: (value) => formatCurrency(value),
  },
  {
    key: "createdOn",
    label: "Created On",
    headerClass: "w-48",
    cellClass: "text-sm text-gray-900 dark:text-gray-100",
    formatter: (value) => formatDate(value),
  },
  {
    key: "stage",
    label: "Stage",
    headerClass: "w-40",
    cellClass: "",
    badge: true,
    badgeClass: (item) => defaultStageClass(item.stage),
  },
];

const props = defineProps({
  leads: {
    type: Array,
    default: () => [],
  },
  items: {
    type: Array,
    default: null,
  },
  searchTerm: {
    type: String,
    default: "",
  },
  selectedStages: {
    type: Array,
    default: () => [],
  },
  leadValueRange: {
    type: Object,
    default: () => ({ from: null, to: null }),
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
  columns: {
    type: Array,
    default: () => [],
  },
  searchFields: {
    type: Array,
    default: () => ["name", "phone", "email", "createdBy"],
  },
  resourceName: {
    type: String,
    default: "lead",
  },
  resourceNamePlural: {
    type: String,
    default: "leads",
  },
  selectable: {
    type: Boolean,
    default: true,
  },
  rowClickable: {
    type: Boolean,
    default: true,
  },
  rowIdKey: {
    type: String,
    default: "id",
  },
  enableDateFilter: {
    type: Boolean,
    default: true,
  },
  dateField: {
    type: String,
    default: "createdOn",
  },
  customDateFilterOptions: {
    type: Array,
    default: () => null,
  },
  emptyState: {
    type: Object,
    default: () => ({
      title: "No results match the current search",
      description: "Adjust your search or reset to see the full list again.",
      resetLabel: "Reset search",
      primaryActionLabel: "Add a new record",
    }),
  },
  pageSize: {
    type: Number,
    default: 10,
  },
});

const emit = defineEmits([
  "reset-search",
  "add-lead",
  "view-lead",
  "reset",
  "add-item",
  "view-item",
]);

const idPrefix = `table-card-${Math.random().toString(36).slice(2, 9)}`;

const dateFilter = ref("last-30-days");
const availableDateFilterOptions = computed(
  () => props.customDateFilterOptions ?? DEFAULT_DATE_FILTER_OPTIONS
);

const selectAllCheckbox = ref(null);

const resolvedColumns = computed(() => {
  const sourceColumns =
    props.columns.length > 0 ? props.columns : defaultColumns;

  return sourceColumns.map((column) => ({
    headerClass: "",
    cellClass: "",
    textClass: "",
    valueClass: "",
    formatter: undefined,
    badge: false,
    badgeClass: () => "",
    ...column,
  }));
});

const rows = computed(() => props.items ?? props.leads);

// Stage mapping from filter values to actual stage values
const stageMapping = {
  new: "New lead",
  contacted: "Contacted lead",
  won: "Won lead",
  lost: "Lost lead",
};

// Tenant ID to label mapping
const tenantMapper = (tenantId) => {
  const tenantLabels = {
    "tenant-1": "Tenant 1",
    "tenant-2": "Tenant 2",
    "tenant-3": "Tenant 3",
  };
  return tenantLabels[tenantId] || tenantId;
};

// Use table filters composable
const { filteredItems } = useTableFilters({
  items: rows,
  searchTerm: computed(() => props.searchTerm),
  searchFields: props.searchFields,
  dateFilter: props.enableDateFilter
    ? {
        enabled: true,
        field: props.dateField,
        value: dateFilter,
      }
    : null,
  stageFilter: props.selectedStages
    ? {
        selectedStages: computed(() => props.selectedStages || []),
        mapping: stageMapping,
      }
    : null,
  rangeFilter: props.leadValueRange
    ? {
        range: computed(() => props.leadValueRange || { from: null, to: null }),
        field: "leadValue",
      }
    : null,
  roleFilter: props.selectedRoles
    ? {
        selectedRoles: computed(() => props.selectedRoles || []),
        field: "role",
      }
    : null,
  tenantFilter: props.selectedTenants
    ? {
        selectedTenants: computed(() => props.selectedTenants || []),
        field: "assignedTo",
        mapper: tenantMapper,
      }
    : null,
  statusFilter: props.selectedStatuses
    ? {
        selectedStatuses: computed(() => props.selectedStatuses || []),
        field: "status",
      }
    : null,
});

// Use pagination composable
const {
  currentPage,
  totalPages,
  totalRecords,
  paginatedItems,
  showingRange,
  paginationItems,
  goToPage,
} = useTablePagination({
  items: filteredItems,
  pageSize: props.pageSize,
});

// Use selection composable
const {
  selectedRowIds,
  allSelectedOnPage,
  isIndeterminate,
  toggleSelectAll,
} = useTableSelection({
  paginatedItems,
  allItems: filteredItems,
  rowIdKey: props.rowIdKey,
  selectable: props.selectable,
});

const handleResetSearch = () => {
  emit("reset-search");
  emit("reset");
};

const handleAddItem = () => {
  emit("add-lead");
  emit("add-item");
};

const handleViewItem = (itemId) => {
  if (!props.rowClickable) return;
  if (!itemId) return;
  emit("view-lead", itemId);
  emit("view-item", itemId);
};

const resolveCellValue = (column, item) => {
  const value = item[column.key];
  if (column.formatter) {
    return column.formatter(value, item);
  }
  return value ?? "";
};

const resolveBadgeClass = (column, item) => {
  if (typeof column.badgeClass === "function") {
    return column.badgeClass(item);
  }
  return column.badgeClass || "card-chip--neutral";
};

const itemLabel = (item) =>
  item.name ?? item.title ?? `${props.resourceName} ${item[props.rowIdKey]}`;

// Reset to page 1 when search term, date filter, or other filters change
watch(
  () => props.searchTerm,
  () => {
    goToPage(1);
  }
);

watch(dateFilter, () => {
  goToPage(1);
});

watch(
  () => props.selectedStages,
  () => {
    goToPage(1);
  }
);

watch(
  () => props.leadValueRange,
  () => {
    goToPage(1);
  },
  { deep: true }
);

watch(
  () => props.selectedRoles,
  () => {
    goToPage(1);
  }
);

watch(
  () => props.selectedTenants,
  () => {
    goToPage(1);
  }
);

watch(
  () => props.selectedStatuses,
  () => {
    goToPage(1);
  }
);

watch([isIndeterminate, allSelectedOnPage], () => {
  if (selectAllCheckbox.value && props.selectable) {
    selectAllCheckbox.value.indeterminate = isIndeterminate.value;
  }
});
</script>

<style scoped>
/* Styles moved to TableDateFilter.vue */
</style>
