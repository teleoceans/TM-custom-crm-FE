<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 overflow-y-auto"
        @click.self="handleBackdropClick"
      >
        <div class="fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80" />
        <div class="flex min-h-screen items-center justify-center p-4">
          <Transition
            enter-active-class="transition ease-out duration-300"
            enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to-class="opacity-100 translate-y-0 sm:scale-100"
            leave-active-class="transition ease-in duration-200"
            leave-from-class="opacity-100 translate-y-0 sm:scale-100"
            leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              v-if="modelValue"
              :class="[
                'relative z-10 w-full max-w-lg rounded-lg bg-white shadow-xl dark:bg-gray-800',
                sizeClass
              ]"
            >
              <div v-if="$slots.header || title" class="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                <slot name="header">
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                    {{ title }}
                  </h3>
                </slot>
                <button
                  v-if="closable"
                  type="button"
                  class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                  @click="close"
                >
                  <span class="sr-only">Close</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div class="px-6 py-4">
                <slot />
              </div>
              <div v-if="$slots.footer" class="flex items-center justify-end space-x-2 border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                <slot name="footer" />
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'

/**
 * Modal component for dialogs
 * @component
 */

const props = defineProps({
  /**
   * v-model for modal visibility
   */
  modelValue: {
    type: Boolean,
    default: false
  },
  /**
   * Modal title
   */
  title: {
    type: String,
    default: ''
  },
  /**
   * Show close button
   */
  closable: {
    type: Boolean,
    default: true
  },
  /**
   * Close on backdrop click
   */
  closeOnBackdrop: {
    type: Boolean,
    default: true
  },
  /**
   * Modal size
   * @type {'sm' | 'md' | 'lg' | 'xl'}
   */
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const emit = defineEmits(['update:modelValue', 'close'])

const sizeClass = computed(() => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  }
  return sizes[props.size]
})

const close = () => {
  emit('update:modelValue', false)
  emit('close')
}

const handleBackdropClick = () => {
  if (props.closeOnBackdrop) {
    close()
  }
}
</script>

