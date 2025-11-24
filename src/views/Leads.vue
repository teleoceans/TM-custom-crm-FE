<template>
  <div class="flex w-full flex-col -mt-6">
    <div class="relative">
      <ManagementPageHeader
        :search-term="searchTerm"
        search-id="leads-search"
        search-label="Search leads"
        search-placeholder="Search leads"
        add-button-label="New Lead"
        header-class="leads-header page-header-negative-margin"
        @update:search-term="searchTerm = $event"
        @add="openCreateLead"
        @filter="handleFilter"
        @export="$emit('export')"
      />
      <LeadsFilter
        v-model="showFilter"
        :selected-stages="selectedStages"
        :lead-value-range="leadValueRange"
        @update:selected-stages="selectedStages = $event"
        @update:lead-value-range="leadValueRange = $event"
      />
    </div>

    <LeadsTableCard
      :leads="leads"
      :search-term="searchTerm"
      :selected-stages="selectedStages"
      :lead-value-range="leadValueRange"
      @reset-search="resetSearch"
      @add-lead="openCreateLead"
      @view-lead="goToLead"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { mockLeads } from "../mock/leads.js";
import LeadsTableCard from "../components/leads/LeadsTableCard.vue";
import LeadsFilter from "../components/leads/LeadsFilter.vue";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";

const router = useRouter();
const leads = ref([...mockLeads]);
const searchTerm = ref("");
const showFilter = ref(false);
const selectedStages = ref([]);
const leadValueRange = ref({ from: null, to: null });

const resetSearch = () => {
  searchTerm.value = "";
};

const handleFilter = () => {
  showFilter.value = !showFilter.value;
};

const openCreateLead = () => {
  router.push("/leads/new");
};

const goToLead = (leadId) => {
  if (!leadId) return;
  router.push({ name: "LeadInfo", params: { leadId } });
};
</script>

<style scoped>
/* Header styles moved to theme.css utility class */
</style>
