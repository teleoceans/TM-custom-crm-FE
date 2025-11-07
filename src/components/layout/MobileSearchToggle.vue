<template>
  <button
    id="toggleSidebarMobileSearch"
    type="button"
    class="rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600 lg:hidden"
    @click="$emit('click')"
  >
    <span class="sr-only">Search</span>
    <svg
      class="h-6 w-6"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
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
  </button>
</template>

<script setup>
/**
 * Mobile search toggle button component
 * @component
 */

defineEmits(['click'])
</script>

