<template>
  <!-- Desktop Sidebar Toggle -->
  <button
    v-if="variant === 'desktop'"
    id="toggleSidebarButton"
    aria-expanded="true"
    aria-controls="sidebar"
    class="me-2 hidden cursor-pointer rounded-sm p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:-ms-1 lg:inline"
    @click="$emit('click')"
  >
    <svg
      class="h-7 w-7"
      data-sidebar-toggle-collapse-icon
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10" />
    </svg>
  </button>
  <!-- Mobile Sidebar Toggle -->
  <button
    v-else
    data-drawer-target="sidebar"
    data-drawer-toggle="sidebar"
    aria-expanded="false"
    aria-controls="sidebar"
    class="me-2 inline cursor-pointer rounded-sm p-1.5 text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white sm:-ms-1 lg:hidden"
    @click="$emit('click')"
  >
    <svg
      class="h-7 w-7"
      data-sidebar-toggle-collapse-icon
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h10" />
    </svg>
  </button>
</template>

<script setup>
/**
 * Sidebar toggle button component
 * @component
 */

defineProps({
  /**
   * Toggle variant
   * @type {'desktop' | 'mobile'}
   */
  variant: {
    type: String,
    default: 'mobile',
    validator: (value) => ['desktop', 'mobile'].includes(value)
  }
})

defineEmits(['click'])
</script>

