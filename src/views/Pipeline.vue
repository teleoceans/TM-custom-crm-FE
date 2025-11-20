<template>
  <div class="flex h-full w-full flex-col -mt-6">
    <ManagementPageHeader
      :search-term="searchTerm"
      search-id="pipeline-search"
      search-label="Search pipeline"
      search-placeholder="Search pipeline"
      add-button-label="New Lead"
      header-class="pipeline-header page-header-negative-margin"
      :show-export="false"
      @update:search-term="searchTerm = $event"
      @filter="handleFilter"
      @add="handleAdd"
    />

    <div class="flex-1 overflow-hidden">
      <KanbanBoard
        :initial-cards="defaultCards"
        @cards-updated="handleCardsUpdated"
        @card-open="handleCardOpen"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import KanbanBoard from "../components/kanban/KanbanBoard.vue";
import { mockPipelineCards } from "../mock/pipeline.js";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";

// Default sample data
const router = useRouter();
const defaultCards = ref([...mockPipelineCards]);

const handleCardsUpdated = (updatedCards) => {
  defaultCards.value = updatedCards;
  // Here you can save to backend/localStorage if needed
  console.log("Cards updated:", updatedCards);
};

const searchTerm = ref("");

watch(searchTerm, (value) => {
  // Placeholder for future integration with filtering logic
  console.log("Pipeline search term:", value);
});

const handleFilter = () => {
  // Placeholder for future filter functionality
  console.log("Filter clicked");
};

const handleAdd = () => {
  // Placeholder for future add functionality
  router.push("/leads/new");
};

const handleCardOpen = (leadId) => {
  if (!leadId) return;
  router.push({ name: "LeadInfo", params: { leadId } });
};
</script>

<style scoped>
/* Header styles moved to theme.css utility class */
</style>
