<template>
  <Card :border="false" padding="responsive">
    <component :is="icon" :class="iconClass" />
    <h3 class="text-sm" :style="textSecondary">
      {{ title }}
    </h3>
    <span class="text-2xl font-bold" :style="textPrimary">
      {{ value }}
    </span>
    <p class="mt-2 flex items-center text-sm" :style="textSecondary">
      <span
        :class="[
          'mr-1.5 flex items-center text-sm font-medium sm:text-base',
          changeColorClass
        ]"
      >
        <component :is="changeIcon" :class="changeColorClass" />
        {{ change }}
      </span>
      vs last month
    </p>
  </Card>
</template>

<script setup>
import { computed } from 'vue'
import Card from './Card.vue'
import ArrowUpIcon from '../icons/stats/ArrowUp.vue'
import ArrowDownIcon from '../icons/stats/ArrowDown.vue'
import { useThemeStyles } from '../../composables/useThemeStyles'

/**
 * Stat Card component for displaying statistics with icon, value, and change indicator
 * @component
 */

const props = defineProps({
  /**
   * Icon component
   */
  icon: {
    type: Object,
    required: true
  },
  /**
   * Icon CSS classes
   */
  iconClass: {
    type: String,
    default: 'mb-2 h-6 w-6'
  },
  /**
   * Card title
   */
  title: {
    type: String,
    required: true
  },
  /**
   * Stat value to display
   */
  value: {
    type: [String, Number],
    required: true
  },
  /**
   * Change percentage or value
   */
  change: {
    type: String,
    required: true
  },
  /**
   * Change type: 'up' or 'down'
   */
  changeType: {
    type: String,
    default: 'up',
    validator: (value) => ['up', 'down'].includes(value)
  },
  /**
   * Change color class (e.g., 'text-green-500 dark:text-green-400')
   */
  changeColorClass: {
    type: String,
    default: 'text-green-500 dark:text-green-400'
  }
})

const { textPrimary, textSecondary } = useThemeStyles()

const changeIcon = computed(() => {
  return props.changeType === 'up' ? ArrowUpIcon : ArrowDownIcon
})
</script>

