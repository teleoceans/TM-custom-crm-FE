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

        <button
          type="button"
          class="inline-flex items-center self-start rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
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
      </div>
    </div>

    <div class="flex-1 overflow-hidden">
      <KanbanBoard
        :initial-cards="defaultCards"
        @cards-updated="handleCardsUpdated"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import KanbanBoard from "../components/kanban/KanbanBoard.vue";

// Default sample data
const defaultCards = ref([
  // New Leads
  {
    id: "1",
    column: "new-leads",
    name: "David Johns",
    phone: "+26534567894",
    contactPerson: "A.Ali",
    badge: "User",
  },
  {
    id: "2",
    column: "new-leads",
    name: "Sarah Williams",
    phone: "+1234567890",
    contactPerson: "B.Smith",
  },
  {
    id: "3",
    column: "new-leads",
    name: "Michael Brown",
    phone: "+9876543210",
    contactPerson: "C.Jones",
  },

  // Contacted
  {
    id: "4",
    column: "contacted",
    name: "Emily Davis",
    phone: "+1122334455",
    contactPerson: "D.Wilson",
    badge: "High",
  },
  {
    id: "5",
    column: "contacted",
    name: "James Miller",
    phone: "+5566778899",
    contactPerson: "E.Moore",
  },
  {
    id: "6",
    column: "contacted",
    name: "Lisa Anderson",
    phone: "+9988776655",
    contactPerson: "F.Taylor",
  },

  // Won Leads
  {
    id: "7",
    column: "won-leads",
    name: "Robert Thomas",
    phone: "+4433221100",
    contactPerson: "G.Jackson",
    badge: "Won",
  },
  {
    id: "8",
    column: "won-leads",
    name: "Jennifer White",
    phone: "+7788990011",
    contactPerson: "H.Harris",
  },

  // Lost Leads
  {
    id: "9",
    column: "lost-leads",
    name: "Christopher Martin",
    phone: "+3344556677",
    contactPerson: "I.Clark",
    badge: "Lost",
  },
  {
    id: "10",
    column: "lost-leads",
    name: "Amanda Lewis",
    phone: "+6677889900",
    contactPerson: "J.Robinson",
  },
]);

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
</script>

<style scoped>
.pipeline-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
