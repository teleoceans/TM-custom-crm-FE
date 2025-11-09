<template>
  <Card
    class="mt-6 overflow-hidden border border-gray-300 dark:border-white"
    :border="false"
    padding="none"
  >
    <div class="leads-table-controls">
      <label for="leads-date-filter" class="sr-only"
        >Filter by date range</label
      >
      <select
        id="leads-date-filter"
        v-model="dateFilter"
        class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-primary-400 dark:focus:ring-primary-900"
      >
        <option
          v-for="option in dateFilterOptions"
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
            <th class="w-14 px-6 py-4 whitespace-nowrap">
              <input
                ref="selectAllCheckbox"
                type="checkbox"
                :checked="allSelectedOnPage"
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                @change="toggleSelectAll($event.target.checked)"
              />
              <span class="sr-only">Select all leads</span>
            </th>
            <th class="w-56 px-6 py-4 whitespace-nowrap">Name</th>
            <th class="w-44 px-6 py-4 whitespace-nowrap">Phone Number</th>
            <th class="w-56 px-6 py-4 whitespace-nowrap">Email</th>
            <th class="w-48 px-6 py-4 whitespace-nowrap">Created By</th>
            <th class="w-40 px-6 py-4 whitespace-nowrap">Lead Value</th>
            <th class="w-48 px-6 py-4 whitespace-nowrap">Created On</th>
            <th class="w-40 px-6 py-4 whitespace-nowrap">Stage</th>
          </tr>
        </thead>
        <tbody
          class="divide-y divide-gray-200 bg-white dark:divide-white dark:bg-gray-800"
        >
          <tr
            v-for="lead in paginatedLeads"
            :key="lead.id"
            class="transition hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <td class="px-6 py-4 whitespace-nowrap">
              <input
                :id="`select-lead-${lead.id}`"
                v-model="selectedLeadIds"
                type="checkbox"
                :value="lead.id"
                class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span class="sr-only">Select {{ lead.name }}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="font-semibold text-gray-900 text-sm dark:text-gray-100"
                >{{ lead.name }}</span
              >
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
            >
              {{ lead.phone }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
            >
              {{ lead.email }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="font-medium text-gray-900 text-sm dark:text-gray-100"
                >{{ lead.createdBy }}</span
              >
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100"
            >
              {{ formatCurrency(lead.leadValue) }}
            </td>
            <td
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100"
            >
              {{ formatDate(lead.createdOn) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold"
                :class="stageClass(lead.stage)"
              >
                {{ lead.stage }}
              </span>
            </td>
          </tr>
          <tr v-if="paginatedLeads.length === 0">
            <td
              colspan="8"
              class="px-6 py-16 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              <div class="mx-auto max-w-md space-y-2">
                <p
                  class="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  No leads match the current search
                </p>
                <p>
                  Adjust your search or reset to see the full list of clients
                  again.
                </p>
                <div class="flex justify-center gap-3 pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    @click="handleResetSearch"
                    >Reset search</Button
                  >
                  <Button size="sm" @click="handleAddLead">Add a lead</Button>
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
        leads
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
  </Card>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import Button from "../common/Button.vue";
import Card from "../common/Card.vue";

const stageStyles = {
  "New lead": "bg-blue-100 text-blue-700",
  "Contacted lead": "bg-yellow-100 text-yellow-700",
  "Lost lead": "bg-red-100 text-red-700",
  "Won lead": "bg-green-100 text-green-700",
  Completed: "bg-green-200 text-green-800",
};

const props = defineProps({
  leads: {
    type: Array,
    default: () => [],
  },
  searchTerm: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["reset-search", "add-lead"]);

const dateFilter = ref("last-30-days");
const dateFilterOptions = [
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "last-90-days", label: "Last 90 days" },
  { value: "this-year", label: "This year" },
  { value: "all", label: "All time" },
];

const selectedLeadIds = ref([]);
const pageSize = 10;
const currentPage = ref(1);
const selectAllCheckbox = ref(null);

const stageClass = (stage) => stageStyles[stage] ?? "bg-gray-100 text-gray-600";

const isWithinRange = (dateString, filter) => {
  if (filter === "all") return true;

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

const filteredLeads = computed(() => {
  const term = props.searchTerm.trim().toLowerCase();
  const range = dateFilter.value;

  return props.leads.filter((lead) => {
    const matchesTerm =
      !term ||
      [lead.name, lead.phone, lead.email, lead.createdBy]
        .filter(Boolean)
        .some((field) => field.toLowerCase().includes(term));

    const matchesDate = isWithinRange(lead.createdOn, range);

    return matchesTerm && matchesDate;
  });
});

const totalRecords = computed(() => filteredLeads.value.length);

const totalPages = computed(() =>
  Math.max(1, Math.ceil(totalRecords.value / pageSize))
);

const paginatedLeads = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return filteredLeads.value.slice(start, start + pageSize);
});

const showingRange = computed(() => {
  if (filteredLeads.value.length === 0) {
    return "0 – 0";
  }

  const start = (currentPage.value - 1) * pageSize + 1;
  const end = Math.min(start + pageSize - 1, filteredLeads.value.length);
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
    paginatedLeads.value.length > 0 &&
    paginatedLeads.value.every((lead) =>
      selectedLeadIds.value.includes(lead.id)
    )
);

const isIndeterminate = computed(() => {
  const pageLeadIds = paginatedLeads.value.map((lead) => lead.id);
  const selectedCount = pageLeadIds.filter((id) =>
    selectedLeadIds.value.includes(id)
  ).length;
  return selectedCount > 0 && selectedCount < paginatedLeads.value.length;
});

const goToPage = (page) => {
  if (typeof page !== "number") return;
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
};

const toggleSelectAll = (checked) => {
  const pageLeadIds = paginatedLeads.value.map((lead) => lead.id);

  if (checked) {
    selectedLeadIds.value = Array.from(
      new Set([...selectedLeadIds.value, ...pageLeadIds])
    );
  } else {
    selectedLeadIds.value = selectedLeadIds.value.filter(
      (id) => !pageLeadIds.includes(id)
    );
  }
};

const handleResetSearch = () => {
  emit("reset-search");
};

const handleAddLead = () => {
  emit("add-lead");
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

watch(filteredLeads, (newLeads) => {
  const validIds = new Set(newLeads.map((lead) => lead.id));
  selectedLeadIds.value = selectedLeadIds.value.filter((id) =>
    validIds.has(id)
  );

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
  if (selectAllCheckbox.value) {
    selectAllCheckbox.value.indeterminate = isIndeterminate.value;
  }
});
</script>

<style scoped>
.leads-table-controls {
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
