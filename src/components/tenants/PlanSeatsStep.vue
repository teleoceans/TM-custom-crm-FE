<template>
  <div class="flex flex-col gap-6">
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Left Column -->
      <div class="flex flex-col gap-6">
        <PlanSeatSection
          v-for="section in leftColumnSections"
          :key="section.key"
          :section-key="section.key"
          :label="section.label"
          :field-rows="section.fieldRows"
          :model-value="formData[section.key]"
          :enabled="formData[section.key]?.enabled || false"
          @update:model-value="updateSection(section.key, $event)"
          @update:enabled="updateField(section.key, 'enabled', $event)"
        />
      </div>

      <!-- Right Column -->
      <div class="flex flex-col gap-6">
        <PlanSeatSection
          v-for="section in rightColumnSections"
          :key="section.key"
          :section-key="section.key"
          :label="section.label"
          :field-rows="section.fieldRows"
          :model-value="formData[section.key]"
          :enabled="formData[section.key]?.enabled || false"
          @update:model-value="updateSection(section.key, $event)"
          @update:enabled="updateField(section.key, 'enabled', $event)"
        />
      </div>
    </div>

    <!-- Biweekly Payments Summary Table -->
    <Card :border="true" :padding="'none'" class="mt-6 w-full max-w-3xl">
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100">
            BIWEEKLY PAYMENTS
          </h3>
          <button
            v-if="hasAnyEnabledService"
            type="button"
            class="rounded-lg p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300"
            @click="downloadTable"
            title="Download table as CSV"
            aria-label="Download biweekly payments table"
          >
            <DownloadIcon class="h-5 w-5" />
          </button>
        </div>
      </template>
      <div class="overflow-x-auto">
        <table
          class="min-w-[600px] w-full text-left text-sm text-gray-500 dark:text-gray-400"
        >
          <thead
            class="sticky top-0 z-10 bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-3 py-3 md:px-6">Name</th>
              <th scope="col" class="px-3 py-3 text-right md:px-6">Price</th>
              <th scope="col" class="px-3 py-3 text-right md:px-6">QTY</th>
              <th scope="col" class="px-3 py-3 text-right md:px-6">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            <BiweeklyPaymentTableRow
              v-for="row in tableRows"
              :key="row.key"
              :row-key="row.key"
              :name="row.name"
              :price="row.price"
              :quantity="row.quantity"
              :subtotal="row.subtotal"
              :enabled="row.enabled"
            />

            <!-- Empty state -->
            <tr
              v-if="!hasAnyEnabledService"
              class="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td
                colspan="4"
                class="px-3 py-8 md:px-6 text-center text-gray-500 dark:text-gray-400"
              >
                <div class="flex flex-col items-center gap-2">
                  <svg
                    class="h-12 w-12 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p class="text-sm font-medium">No services enabled</p>
                  <p class="text-xs">
                    Enable services above to see payment calculations
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot
            v-if="hasAnyEnabledService"
            class="bg-gray-50 dark:bg-gray-700 border-t-2 border-gray-300 dark:border-gray-600"
          >
            <tr>
              <td
                colspan="2"
                class="px-3 py-3 md:px-6 md:py-4 text-sm md:text-base font-semibold text-gray-900 dark:text-white"
              >
                Total Per Month :
              </td>
              <td colspan="2" class="px-3 py-3 md:px-6 md:py-4 text-right">
                <span
                  class="text-lg md:text-xl font-bold font-mono text-gray-900 dark:text-white bg-purple-50 dark:bg-purple-900/20 px-2 md:px-3 py-1 rounded"
                >
                  {{ formatCurrency(totalPerMonth) }}
                </span>
              </td>
            </tr>
            <tr>
              <td
                colspan="2"
                class="px-3 py-3 md:px-6 md:py-4 text-xs md:text-sm text-gray-900 dark:text-white"
              >
                {{ formatCurrency(biweeklyForAgentsOnly) }} / Biweekly for the
                agents only
              </td>
              <td colspan="2" class="px-3 py-3 md:px-6 md:py-4 text-right">
                <span
                  class="text-base md:text-lg font-semibold font-mono text-gray-900 dark:text-white"
                >
                  {{ formatCurrency(biweeklyForAgentsOnly) }}
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import PlanSeatSection from "./PlanSeatSection.vue";
import BiweeklyPaymentTableRow from "./BiweeklyPaymentTableRow.vue";
import Card from "../common/Card.vue";
import DownloadIcon from "../icons/common/DownloadIcon.vue";
import { formatCurrency } from "../../utils/formatters";
import {
  PRICING,
  getDefaultFormData,
  leftColumnSections,
  rightColumnSections,
} from "../../config/planSeatsConfig";

const props = defineProps({
  modelValue: {
    type: Object,
    required: false,
    default: getDefaultFormData,
  },
});

const emit = defineEmits(["update:modelValue"]);

// Safe reference to modelValue
const formData = computed(() => {
  const data = props.modelValue || {};
  const defaults = getDefaultFormData();
  return {
    coldCallers: data?.coldCallers || defaults.coldCallers,
    acquisitionManager: data?.acquisitionManager || defaults.acquisitionManager,
    dispositions: data?.dispositions || defaults.dispositions,
    listPrice: data?.listPrice || defaults.listPrice,
  };
});

// Update entire section
const updateSection = (sectionKey, sectionData) => {
  const updated = {
    ...props.modelValue,
    [sectionKey]: sectionData,
  };
  emit("update:modelValue", updated);
};

// Update single field in section
const updateField = (sectionKey, field, value) => {
  const defaults = getDefaultFormData();
  const updated = {
    ...props.modelValue,
    [sectionKey]: {
      ...(props.modelValue?.[sectionKey] || defaults[sectionKey]),
      [field]: value,
    },
  };
  emit("update:modelValue", updated);
};

// Computed totals - consolidated into one computed
const totals = computed(() => {
  const data = props.modelValue || {};

  return {
    coldCallers: data?.coldCallers?.enabled
      ? Number(data.coldCallers.numberOfCallers || 0) * PRICING.COLD_CALLER
      : 0,
    dialer: data?.coldCallers?.enabled
      ? Number(data.coldCallers.numberOfDialers || 0) * PRICING.DIALER_MONTHLY
      : 0,
    acquisitionManager: data?.acquisitionManager?.enabled
      ? Number(data.acquisitionManager.numberOfManagers || 0) *
        PRICING.ACQUISITION_MANAGER
      : 0,
    dispositions: data?.dispositions?.enabled
      ? Number(data.dispositions.numberOfDispositions || 0) *
        PRICING.DISPOSITION_MANAGER
      : 0,
    listPrice: data?.listPrice?.enabled ? PRICING.LIST : 0,
  };
});

// Computed table rows for biweekly payments summary
const tableRows = computed(() => {
  const data = formData.value;
  const rows = [];

  // Cold Calling For Real Estate
  if (data.coldCallers?.enabled) {
    rows.push({
      key: "coldCallers",
      name: "Cold Calling For Real Estate",
      price: PRICING.COLD_CALLER,
      quantity: data.coldCallers.numberOfCallers || 0,
      subtotal: totals.value.coldCallers,
      enabled: true,
    });
  }

  // Acquisition Manager
  if (data.acquisitionManager?.enabled) {
    rows.push({
      key: "acquisitionManager",
      name: "Acquisition Manager",
      price: PRICING.ACQUISITION_MANAGER,
      quantity: data.acquisitionManager.numberOfManagers || 0,
      subtotal: totals.value.acquisitionManager,
      enabled: true,
    });
  }

  // Disposition Manager
  if (data.dispositions?.enabled) {
    rows.push({
      key: "dispositions",
      name: "Disposition Manager",
      price: PRICING.DISPOSITION_MANAGER,
      quantity: data.dispositions.numberOfDispositions || 0,
      subtotal: totals.value.dispositions,
      enabled: true,
    });
  }

  // Lists (50,000 Records)
  if (data.listPrice?.enabled) {
    rows.push({
      key: "listPrice",
      name: "Lists (50,000 Records)",
      price: PRICING.LIST,
      quantity: 1,
      subtotal: totals.value.listPrice,
      enabled: true,
    });
  }

  // Dialer Monthly Fee
  if (data.coldCallers?.enabled && data.coldCallers.numberOfDialers > 0) {
    rows.push({
      key: "dialer",
      name: "Dialer Monthly Fee (Monthly)",
      price: PRICING.DIALER_MONTHLY,
      quantity: data.coldCallers.numberOfDialers || 0,
      subtotal: totals.value.dialer,
      enabled: true,
    });
  }

  return rows;
});

// Single watcher for all totals - replaces 4 separate watchers
watch(
  totals,
  (newTotals) => {
    // Update coldCallers totalCost (includes dialer cost)
    const coldCallersTotal =
      (newTotals.coldCallers || 0) + (newTotals.dialer || 0);
    const currentColdCallersTotal =
      props.modelValue?.coldCallers?.totalCost || 0;
    if (currentColdCallersTotal !== coldCallersTotal) {
      updateField("coldCallers", "totalCost", coldCallersTotal);
    }

    // Update other section totals
    const sectionsToUpdate = [
      "acquisitionManager",
      "dispositions",
      "listPrice",
    ];
    sectionsToUpdate.forEach((sectionKey) => {
      const currentTotal = props.modelValue?.[sectionKey]?.totalCost;
      const newTotal = isNaN(newTotals[sectionKey]) ? 0 : newTotals[sectionKey];
      if (currentTotal !== newTotal) {
        updateField(sectionKey, "totalCost", newTotal);
      }
    });
  },
  { immediate: true, deep: true }
);

// Check if any service is enabled
const hasAnyEnabledService = computed(() => {
  const data = props.modelValue || {};
  return (
    data?.coldCallers?.enabled ||
    data?.acquisitionManager?.enabled ||
    data?.dispositions?.enabled ||
    data?.listPrice?.enabled
  );
});

// Calculate total per month
const totalPerMonth = computed(() => {
  return (
    totals.value.coldCallers +
    totals.value.dialer +
    totals.value.acquisitionManager +
    totals.value.dispositions +
    totals.value.listPrice
  );
});

// Calculate biweekly for agents only (Cold Callers + Acquisition Manager + Disposition Manager) / 2
const biweeklyForAgentsOnly = computed(() => {
  const agentsTotal =
    totals.value.coldCallers +
    totals.value.acquisitionManager +
    totals.value.dispositions;
  return Math.round(agentsTotal / 2);
});

// Download table as CSV
const downloadTable = () => {
  if (!hasAnyEnabledService.value) return;

  // Prepare CSV data
  const headers = ["Name", "Price", "QTY", "Subtotal"];
  const rows = tableRows.value.map((row) => [
    row.name,
    formatCurrency(row.price),
    row.quantity.toString(),
    formatCurrency(row.subtotal),
  ]);

  // Add footer rows
  const footerRows = [
    ["Total Per Month", "", "", formatCurrency(totalPerMonth.value)],
    [
      `${formatCurrency(
        biweeklyForAgentsOnly.value
      )} / Biweekly for the agents only`,
      "",
      "",
      formatCurrency(biweeklyForAgentsOnly.value),
    ],
  ];

  // Combine all data
  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
    ...footerRows.map((row) => row.join(",")),
  ].join("\n");

  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute(
    "download",
    `biweekly-payments-${new Date().toISOString().split("T")[0]}.csv`
  );
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
/* Styles moved to PlanSeatSection.vue */
</style>
