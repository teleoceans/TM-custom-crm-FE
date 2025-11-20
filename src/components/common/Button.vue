<template>
  <button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center rounded-lg font-medium transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50',
      sizeClasses,
      buttonClasses
    ]"
    @click="$emit('click', $event)"
  >
    <slot name="icon-left" />
    <span
      v-if="$slots.default"
      :class="{
        'ml-2': $slots['icon-left'],
        'mr-2': $slots['icon-right']
      }"
    >
      <slot />
    </span>
    <slot name="icon-right" />
  </button>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Button component with multiple variants
 * @component
 */

const props = defineProps({
  /**
   * Button variant style
   * @type {'primary' | 'secondary' | 'danger' | 'ghost' | 'outline' | 'muted'}
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'ghost', 'outline', 'muted'].includes(value)
  },
  /**
   * Button size
   * @type {'sm' | 'md' | 'lg'}
   */
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  /**
   * HTML button type
   */
  type: {
    type: String,
    default: 'button'
  },
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])

const sizeClasses = computed(() => {
  return {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }[props.size]
})

const buttonClasses = computed(() => {
  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-800',
    secondary:
      'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-300 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600',
    danger:
      'bg-red-700 text-white hover:bg-red-800 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800',
    ghost:
      'text-gray-700 hover:bg-gray-100 focus:ring-gray-300 dark:text-gray-300 dark:hover:bg-gray-700 dark:focus:ring-gray-600',
    outline:
      'border-2 border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-600',
    muted:
      'text-gray-600 hover:bg-gray-100 hover:text-gray-700 focus:ring-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800'
  }[props.variant]

  return variants
})
</script>

