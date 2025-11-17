<template>
  <div class="flex w-full flex-col -mt-6">
    <ManagementPageHeader
      :search-term="searchTerm"
      search-id="leads-search"
      search-label="Search leads"
      search-placeholder="Search leads"
      add-button-label="New Lead"
      header-class="leads-header page-header-negative-margin"
      @update:search-term="searchTerm = $event"
      @add="openCreateLead"
      @filter="$emit('filter')"
      @export="$emit('export')"
    />

    <LeadsTableCard
      :leads="leads"
      :search-term="searchTerm"
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
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";

const router = useRouter();
const leads = ref([...mockLeads]);
const searchTerm = ref("");

const resetSearch = () => {
  searchTerm.value = "";
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
