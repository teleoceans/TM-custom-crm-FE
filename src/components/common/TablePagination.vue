<template>
  <div
    class="flex flex-col items-center justify-between gap-4 border-t border-gray-200 px-6 py-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300 md:flex-row"
  >
    <p>
      Showing
      <span class="font-medium text-gray-900 dark:text-gray-100">{{
        showingRange
      }}</span>
      of
      <span class="font-medium text-gray-900 dark:text-gray-100">{{
        totalRecords
      }}</span>
      {{ resourceNamePlural }}
    </p>
    <nav
      class="flex items-center divide-x divide-primary-200 overflow-hidden rounded-md border border-primary-200 text-sm font-medium shadow-sm dark:divide-primary-800 dark:border-primary-800"
      aria-label="Pagination"
    >
      <button
        type="button"
        class="flex h-9 w-10 items-center justify-center bg-white text-gray-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-primary-900"
        :disabled="currentPage === 1"
        @click="$emit('go-to-page', currentPage - 1)"
        aria-label="Previous page"
      >
        ‹
      </button>
      <template v-for="item in paginationItems" :key="item.key">
        <button
          v-if="item.type === 'page'"
          type="button"
          :class="[
            'flex h-9 min-w-[2.25rem] items-center justify-center px-3 transition',
            currentPage === item.value
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-100'
              : 'bg-white text-gray-700 hover:bg-primary-50 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-primary-900',
          ]"
          @click="$emit('go-to-page', item.value)"
        >
          {{ item.value }}
        </button>
        <span
          v-else
          class="flex h-9 min-w-[2.25rem] items-center justify-center bg-white px-3 text-gray-400 dark:bg-gray-900 dark:text-gray-500"
        >
          …
        </span>
      </template>
      <button
        type="button"
        class="flex h-9 w-10 items-center justify-center bg-white text-gray-700 transition hover:bg-primary-50 disabled:cursor-not-allowed disabled:text-gray-400 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-primary-900"
        :disabled="currentPage === totalPages"
        @click="$emit('go-to-page', currentPage + 1)"
        aria-label="Next page"
      >
        ›
      </button>
    </nav>
  </div>
</template>

<script setup>
defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
  showingRange: {
    type: String,
    required: true,
  },
  totalRecords: {
    type: Number,
    required: true,
  },
  resourceNamePlural: {
    type: String,
    default: "items",
  },
  paginationItems: {
    type: Array,
    required: true,
  },
});

defineEmits(["go-to-page"]);
</script>

