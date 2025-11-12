<template>
  <Card
    class="mt-6 overflow-hidden border border-gray-300 dark:border-white"
    :border="false"
    padding="none"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <div v-if="enableDateFilter" class="table-card-controls">
      <label :for="`${idPrefix}-date-filter`" class="sr-only">
        Filter by date range
      </label>
      <select
        :id="`${idPrefix}-date-filter`"
        v-model="dateFilter"
        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-primary-400 dark:focus:ring-primary-900"
      >
        <option
          v-for="option in availableDateFilterOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
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
          <tr v-if="paginatedItems.length === 0">
            <td
              :colspan="resolvedColumns.length + (selectable ? 1 : 0)"
              class="px-6 py-16 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              <div class="mx-auto max-w-md space-y-2">
                <p
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {{ emptyState.title }}
                </p>
                <p>{{ emptyState.description }}</p>
                <div class="flex justify-center gap-3 pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    @click="handleResetSearch"
                    >{{ emptyState.resetLabel }}</Button
                  >
                  <Button size="sm" @click="handleAddItem">{{
                    emptyState.primaryActionLabel
                  }}</Button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      class="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-6 py-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300 md:flex-row"
    >
      <p>
        Showing
        <span class="font-medium text-gray-900 dark:text-gray-100">{{
          showingRange
        }}</span>
        of
        <span class="font-medium text-gray-900 dark:text-gray-100">{{
          totalRecords
        }}</span>
        {{ resourceNamePlural }}
      </p>
      <nav
        class="flex items-center divide-x divide-primary-200 overflow-hidden rounded-md border border-primary-200 text-sm font-medium shadow-sm dark:divide-primary-800 dark:border-primary-800"
        aria-label="Pagination"
      >
        <button
          type="button"
          class="flex h-9 w-10 items-center justify-center bg-white text-gray-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-primary-900"
          :disabled="currentPage === 1"
          @click="goToPage(currentPage - 1)"
          aria-label="Previous page"
        >
          ‹
        </button>
        <template v-for="item in paginationItems" :key="item.key">
          <button
            v-if="item.type === 'page'"
            type="button"
            :class="[
              'flex h-9 min-w-[2.25rem] items-center justify-center px-3 transition',
              currentPage === item.value
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
                : 'bg-white text-gray-700 hover:bg-primary-50 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-primary-900',
            ]"
            @click="goToPage(item.value)"
          >
            {{ item.value }}
          </button>
          <span
            v-else
            class="flex h-9 min-w-[2.25rem] items-center justify-center bg-white px-3 text-gray-400 dark:bg-gray-900 dark:text-gray-500"
          >
            …
          </span>
        </template>
        <button
          type="button"
          class="flex h-9 w-10 items-center justify-center bg-white text-gray-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-primary-900"
          :disabled="currentPage === totalPages"
          @click="goToPage(currentPage + 1)"
          aria-label="Next page"
        >
          ›
        </button>
      </nav>
    </div>
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </Card>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Button from "../common/Button.vue";
import Card from "../common/Card.vue";
import CardChip from "../common/CardChip.vue";

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

function formatDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function formatCurrency(value) {
  if (value == null) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
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
const defaultDateFilterOptions = [
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "last-90-days", label: "Last 90 days" },
  { value: "this-year", label: "This year" },
  { value: "all", label: "All time" },
];

const availableDateFilterOptions = computed(
  () => props.customDateFilterOptions ?? defaultDateFilterOptions
);

const selectedRowIds = ref([]);
const currentPage = ref(1);
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

const isWithinRange = (dateString, filter) => {
  if (filter === "all" || !dateString) return true;

  const targetDate = new Date(dateString);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInDays = (today - targetDate) / (1000 * 60 * 60 * 24);

  switch (filter) {
    case "last-7-days":
      return diffInDays <= 7;
    case "last-30-days":
      return diffInDays <= 30;
    case "last-90-days":
      return diffInDays <= 90;
    case "this-year":
      return targetDate.getFullYear() === today.getFullYear();
    default:
      return true;
  }
};

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

const totalRecords = computed(() => filteredItems.value.length);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalRecords.value / props.pageSize))
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * props.pageSize;
  return filteredItems.value.slice(start, start + props.pageSize);
});

const showingRange = computed(() => {
  if (filteredItems.value.length === 0) {
    return "0 – 0";
  }

  const start = (currentPage.value - 1) * props.pageSize + 1;
  const end = Math.min(start + props.pageSize - 1, filteredItems.value.length);
  return `${start} – ${end}`;
});

const paginationItems = computed(() => {
  const items = [];
  const total = totalPages.value;

  const addPage = (value) => {
    items.push({ type: "page", value, key: `page-${value}` });
  };

  const addEllipsis = (key) => {
    items.push({ type: "ellipsis", key });
  };

  if (total <= 7) {
    for (let page = 1; page <= total; page += 1) addPage(page);
    return items;
  }

  if (currentPage.value <= 4) {
    for (let page = 1; page <= 5; page += 1) addPage(page);
    addEllipsis("ellipsis-tail");
    addPage(total);
    return items;
  }

  if (currentPage.value >= total - 3) {
    addPage(1);
    addEllipsis("ellipsis-head");
    for (let page = total - 4; page <= total; page += 1) addPage(page);
    return items;
  }

  addPage(1);
  addEllipsis("ellipsis-head");
  addPage(currentPage.value - 1);
  addPage(currentPage.value);
  addPage(currentPage.value + 1);
  addEllipsis("ellipsis-tail");
  addPage(total);
  return items;
});

const allSelectedOnPage = computed(
  () =>
    props.selectable &&
    paginatedItems.value.length > 0 &&
    paginatedItems.value.every((item) =>
      selectedRowIds.value.includes(item[props.rowIdKey])
    )
);

const isIndeterminate = computed(() => {
  if (!props.selectable) return false;

  const pageRowIds = paginatedItems.value.map((item) => item[props.rowIdKey]);
  const selectedCount = pageRowIds.filter((id) =>
    selectedRowIds.value.includes(id)
  ).length;
  return selectedCount > 0 && selectedCount < paginatedItems.value.length;
});

const goToPage = (page) => {
  if (typeof page !== "number") return;
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const toggleSelectAll = (checked) => {
  const pageRowIds = paginatedItems.value.map((item) => item[props.rowIdKey]);

  if (checked) {
    selectedRowIds.value = Array.from(
      new Set([...selectedRowIds.value, ...pageRowIds])
    );
  } else {
    selectedRowIds.value = selectedRowIds.value.filter(
      (id) => !pageRowIds.includes(id)
    );
  }
};

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

watch(filteredItems, (newItems) => {
  const validIds = new Set(newItems.map((item) => item[props.rowIdKey]));
  selectedRowIds.value = selectedRowIds.value.filter((id) => validIds.has(id));

  if (currentPage.value > totalPages.value) {
    currentPage.value = totalPages.value;
  }
});

watch(
  () => props.searchTerm,
  () => {
    currentPage.value = 1;
  }
);

watch(dateFilter, () => {
  currentPage.value = 1;
});

watch([isIndeterminate, allSelectedOnPage], () => {
  if (selectAllCheckbox.value && props.selectable) {
    selectAllCheckbox.value.indeterminate = isIndeterminate.value;
  }
});
</script>

<style scoped>
.table-card-controls {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  gap: 10px;
  width: 182px;
  height: 69px;
  flex: none;
  order: 0;
  flex-grow: 0;
}
</style>
