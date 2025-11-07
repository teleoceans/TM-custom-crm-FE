<template>
  <footer
    class="border-t p-4 md:flex md:items-center md:justify-between"
    :style="footerStyle"
  >
    <div class="mb-4 md:mb-0 xl:flex xl:items-center xl:space-x-3">
      <p class="mb-4 text-center text-sm text-gray-500 dark:text-gray-400 xl:mb-0">
        &copy; {{ currentYear }}
        <a href="#" class="hover:underline" target="_blank">CRM</a>. All rights reserved.
      </p>
      <ul class="flex items-center justify-center">
        <li>
          <a href="#" class="me-6 text-gray-900 underline hover:no-underline dark:text-white">Privacy Policy</a>
        </li>
        <li>
          <a href="#" class="me-6 text-gray-900 underline hover:no-underline dark:text-white">API</a>
        </li>
        <li>
          <a href="#" class="text-gray-900 underline hover:no-underline dark:text-white">Contact</a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStyles } from '../../composables/useThemeStyles'

/**
 * Footer component
 * @component
 */

const { footerStyle } = useThemeStyles()
const currentYear = computed(() => new Date().getFullYear())
</script>

