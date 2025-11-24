<template>
  <div class="flex w-full flex-col -mt-6">
    <ManagementPageHeader
      :search-term="searchTerm"
      search-id="leadinfo-search"
      search-label="Search leads"
      search-placeholder="Search leads"
      add-button-label="New Lead"
      header-class="leads-header page-header-negative-margin"
      @update:search-term="searchTerm = $event"
      @add="openCreateLead"
      @filter="() => {}"
      @export="() => {}"
    />

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
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";
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
