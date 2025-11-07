<template>
  <div v-if="loading" :class="['flex items-center justify-center', containerClass]">
    <div class="relative">
      <div
        class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary-600 dark:border-gray-700 dark:border-t-primary-500"
      />
      <div
        v-if="showText"
        class="absolute inset-0 flex items-center justify-center text-xs font-medium text-primary-600 dark:text-primary-400"
      >
        {{ text }}
      </div>
    </div>
    <p v-if="message" class="ml-3 text-sm text-gray-600 dark:text-gray-400">
      {{ message }}
    </p>
  </div>
  <slot v-else />
</template>

<script setup>
import { computed } from 'vue'

/**
 * Loading component with spinner
 * @component
 */

const props = defineProps({
  /**
   * Loading state
   */
  loading: {
    type: Boolean,
    default: true
  },
  /**
   * Loading message
   */
  message: {
    type: String,
    default: ''
  },
  /**
   * Show text in spinner
   */
  showText: {
    type: Boolean,
    default: false
  },
  /**
   * Text to show in spinner
   */
  text: {
    type: String,
    default: ''
  },
  /**
   * Full screen overlay
   */
  fullScreen: {
    type: Boolean,
    default: false
  }
})

const containerClass = computed(() => {
  if (props.fullScreen) {
    return 'fixed inset-0 z-50 bg-white bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75'
  }
  return 'py-8'
})
</script>
