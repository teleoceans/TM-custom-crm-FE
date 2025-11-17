<template>
  <div
    :class="[headerClass, 'grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800']"
  >
    <div
      class="col-span-full flex flex-col gap-3 px-4 pt-4 md:flex-row md:items-center md:justify-between"
    >
      <div class="relative w-full max-w-md">
        <label :for="searchId" class="sr-only">{{ searchLabel }}</label>
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
          :id="searchId"
          :value="searchTerm"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-9 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
          :placeholder="searchPlaceholder"
          @input="$emit('update:searchTerm', $event.target.value)"
        />
      </div>
      <div class="flex items-center gap-3">
        <Button variant="muted" size="sm" @click="$emit('filter')">
          <template #icon-left>
            <FilterIcon class="h-4 w-4" />
          </template>
          Filter
        </Button>
        <Button variant="muted" size="sm" @click="$emit('add')">
          <template #icon-left>
            <PlusIcon class="h-4 w-4" />
          </template>
          {{ addButtonLabel }}
        </Button>
        <Button
          v-if="showExport"
          variant="muted"
          size="sm"
          @click="$emit('export')"
        >
          <template #icon-left>
            <ExportIcon class="h-4 w-4" />
          </template>
          Export
        </Button>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from "./Button.vue";
import FilterIcon from "../icons/common/FilterIcon.vue";
import PlusIcon from "../icons/common/PlusIcon.vue";
import ExportIcon from "../icons/common/ExportIcon.vue";

defineProps({
  searchTerm: {
    type: String,
    default: "",
  },
  searchId: {
    type: String,
    required: true,
  },
  searchLabel: {
    type: String,
    default: "Search",
  },
  searchPlaceholder: {
    type: String,
    default: "Search...",
  },
  addButtonLabel: {
    type: String,
    default: "New Item",
  },
  headerClass: {
    type: String,
    default: "",
  },
  showExport: {
    type: Boolean,
    default: true,
  },
});

defineEmits(["update:searchTerm", "filter", "add", "export"]);
</script>

<style scoped>
/* Header styles moved to theme.css utility class - use page-header-negative-margin */
</style>

