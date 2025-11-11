<template>
  <div class="flex w-full flex-col -mt-6">
    <div
      class="leads-header grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div
        class="col-span-full flex flex-col gap-3 px-4 pt-4 md:flex-row md:items-center md:justify-between"
      >
        <div class="relative w-full max-w-md">
          <label for="leadinfo-search" class="sr-only">Search leads</label>
          <div
            class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
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
            id="leadinfo-search"
            v-model="searchTerm"
            type="text"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Search leads"
          />
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <svg
              class="me-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z"
              />
            </svg>
            Filter
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
            @click="openCreateLead"
          >
            <svg
              class="me-2 h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 5a1 1 0 0 1 1 1v5h5a1 1 0 1 1 0 2h-5v5a1 1 0 1 1-2 0v-5H6a1 1 0 1 1 0-2h5V6a1 1 0 0 1 1-1Z"
              />
            </svg>
            New Lead
          </button>
          <button
            type="button"
            class="inline-flex items-center rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <svg
              class="me-2 h-4 w-4"
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
            Export
          </button>
        </div>
      </div>
    </div>

    <div
      class="grid grid-cols-1 gap-4 py-6 lg:grid-cols-12 lg:items-start lg:gap-4"
    >
      <div class="flex flex-col gap-4 lg:col-span-6">
        <LeadStageSelector v-model="selectedStage" :options="stageOptions" />

        <LeadDetailsCard :fields="contactFields" />

        <LeadDetailsCard :fields="financialFields" />
      </div>
      <div class="flex flex-col gap-4 lg:col-span-6">
        <LeadActivityPanel
          v-model="selectedTab"
          :tabs="tabs"
          :items-by-tab="tabContent"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import LeadActivityPanel from "../components/leads/LeadActivityPanel.vue";
import LeadDetailsCard from "../components/leads/LeadDetailsCard.vue";
import LeadStageSelector from "../components/leads/LeadStageSelector.vue";
import {
  leadStageOptions,
  leadTabContent,
  leadTabs,
} from "../mock/leadInfo.js";
import { mockLeads } from "../mock/leads.js";

const router = useRouter();
const route = useRoute();

const searchTerm = ref("");
const stageOptions = [...leadStageOptions];
const tabs = [...leadTabs];
const selectedTab = ref(tabs[0]);
const tabContent = ref(
  Object.fromEntries(
    Object.entries(leadTabContent).map(([key, items]) => [
      key,
      items.map((item) => ({ ...item })),
    ])
  )
);

const leadId = computed(() => route.params.leadId?.toString() ?? "");

const selectedLead = computed(() => {
  const lead =
    mockLeads.find((record) => record.id === leadId.value) ?? mockLeads[0];
  return lead ?? null;
});

const selectedStage = ref(stageOptions[0]);

const normalizeStage = (stage) => {
  if (!stage) return stageOptions[0];
  const match = stageOptions.find(
    (option) => option.toLowerCase() === stage.toLowerCase()
  );
  return match ?? stage;
};

watch(
  () => selectedLead.value?.stage,
  (stage) => {
    selectedStage.value = normalizeStage(stage);
  },
  { immediate: true }
);

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0);

const contactFields = computed(() => {
  const lead = selectedLead.value;
  if (!lead) return [];
  return [
    { label: "Name", value: lead.name ?? "—", icon: "name" },
    { label: "Phone Number", value: lead.phone ?? "—", icon: "phone" },
    { label: "Email", value: lead.email ?? "—", icon: "email" },
    { label: "Company", value: lead.company ?? "—", icon: "address" },
  ];
});

const financialFields = computed(() => {
  const lead = selectedLead.value;
  if (!lead) return [];
  return [
    {
      label: "Lead Value",
      value: formatCurrency(lead.leadValue),
      icon: "value",
    },
    {
      label: "Market Value",
      value: formatCurrency(lead.marketValue ?? lead.leadValue),
      icon: "value",
    },
    {
      label: "Asking Price",
      value: formatCurrency(lead.askingPrice ?? lead.leadValue),
      icon: "value",
    },
  ];
});

const openCreateLead = () => {
  router.push("/leads/new");
};
</script>

<style scoped>
.leads-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
