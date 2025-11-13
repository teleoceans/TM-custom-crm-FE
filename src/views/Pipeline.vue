<template>
  <div class="flex h-full w-full flex-col -mt-6">
    <div
      class="pipeline-header grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div
        class="col-span-full flex flex-col gap-3 px-4 pt-4 xl:flex-row xl:items-center xl:justify-between"
      >
        <div class="relative w-full max-w-md">
          <label for="pipeline-search" class="sr-only">Search</label>
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
            id="pipeline-search"
            v-model="searchTerm"
            type="text"
            class="block w-[264px] rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Search pipeline"
          />
        </div>

        <Button variant="muted" size="sm" class="self-start focus:z-10">
          <template #icon-left>
            <svg
              class="h-4 w-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M5 3a2 2 0 0 0-1.5 3.3l5.4 6v5c0 .4.3.9.6 1.1l3.1 2.3c1 .7 2.5 0 2.5-1.2v-7.1l5.4-6C21.6 5 20.7 3 19 3H5Z"
              />
            </svg>
          </template>
          Filter
        </Button>
      </div>
    </div>

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
import Button from "../components/common/Button.vue";

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

const handleCardOpen = (leadId) => {
  if (!leadId) return;
  router.push({ name: "LeadInfo", params: { leadId } });
};
</script>

<style scoped>
.pipeline-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
