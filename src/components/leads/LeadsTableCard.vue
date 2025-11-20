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
import { DEFAULT_DATE_FILTER_OPTIONS, isWithinRange } from "../../composables/useDateFilter";
import { useTablePagination } from "../../composables/useTablePagination";
import { useTableSelection } from "../../composables/useTableSelection";

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

// Filter items by search term and date
const filteredItems = computed(() => {
  const term = props.searchTerm.trim().toLowerCase();
  const range = dateFilter.value;
  const shouldFilterByDate = props.enableDateFilter && Boolean(props.dateField);

  return rows.value.filter((item) => {
    const matchesTerm =
      !term ||
      props.searchFields
        .map((field) => item[field])
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(term));

    const matchesDate = shouldFilterByDate
      ? isWithinRange(item[props.dateField], range)
      : true;

    return matchesTerm && matchesDate;
  });
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

// Reset to page 1 when search term or date filter changes
watch(
  () => props.searchTerm,
  () => {
    goToPage(1);
  }
);

watch(dateFilter, () => {
  goToPage(1);
});

watch([isIndeterminate, allSelectedOnPage], () => {
  if (selectAllCheckbox.value && props.selectable) {
    selectAllCheckbox.value.indeterminate = isIndeterminate.value;
  }
});
</script>

<style scoped>
/* Styles moved to TableDateFilter.vue */
</style>
