<template>
  <div class="flex h-full w-full flex-col -mt-6">
    <div class="relative">
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
      <PipelineFilter
        v-model="showFilter"
        :selected-stages="selectedStages"
        @update:selected-stages="selectedStages = $event"
      />
    </div>

    <div class="flex-1 overflow-hidden">
      <KanbanBoard
        :initial-cards="filteredCards"
        @cards-updated="handleCardsUpdated"
        @card-open="handleCardOpen"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import KanbanBoard from "../components/kanban/KanbanBoard.vue";
import { mockPipelineCards } from "../mock/pipeline.js";
import ManagementPageHeader from "../components/common/ManagementPageHeader.vue";
import PipelineFilter from "../components/pipeline/PipelineFilter.vue";

// Default sample data
const router = useRouter();
const defaultCards = ref([...mockPipelineCards]);

const handleCardsUpdated = (updatedCards) => {
  defaultCards.value = updatedCards;
  // Here you can save to backend/localStorage if needed
  console.log("Cards updated:", updatedCards);
};

const searchTerm = ref("");
const showFilter = ref(false);
const selectedStages = ref([]);

watch(searchTerm, (value) => {
  // Placeholder for future integration with filtering logic
  console.log("Pipeline search term:", value);
});

const handleFilter = () => {
  showFilter.value = !showFilter.value;
};

const handleAdd = () => {
  // Placeholder for future add functionality
  router.push("/leads/new");
};

const handleCardOpen = (leadId) => {
  if (!leadId) return;
  router.push({ name: "LeadInfo", params: { leadId } });
};

// Filter cards based on selected stages
const filteredCards = computed(() => {
  if (selectedStages.value.length === 0) {
    return defaultCards.value;
  }
  return defaultCards.value.filter((card) =>
    selectedStages.value.includes(card.column)
  );
});
</script>

<style scoped>
.pipeline-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
