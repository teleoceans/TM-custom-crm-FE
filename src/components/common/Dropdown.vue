<template>
  <div class="relative inline-block text-left">
    <button
      ref="buttonRef"
      type="button"
      :class="[
        'inline-flex items-center justify-center rounded-lg px-3 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-primary-600',
        buttonClass
      ]"
      @click="toggle"
    >
      <slot name="trigger">
        {{ label }}
        <svg class="-mr-1 ml-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </slot>
    </button>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        ref="dropdownRef"
        :class="[
          'absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700',
          positionClass
        ]"
        role="menu"
      >
        <div class="py-1">
          <slot />
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * Dropdown component for menus
 * @component
 */

const props = defineProps({
  /**
   * Dropdown label
   */
  label: {
    type: String,
    default: ''
  },
  /**
   * Button class
   */
  buttonClass: {
    type: String,
    default: ''
  },
  /**
   * Dropdown position
   * @type {'left' | 'right'}
   */
  position: {
    type: String,
    default: 'right',
    validator: (value) => ['left', 'right'].includes(value)
  }
})

const isOpen = ref(false)
const buttonRef = ref(null)
const dropdownRef = ref(null)

const positionClass = computed(() => {
  return props.position === 'left' ? 'left-0' : 'right-0'
})

const toggle = () => {
  isOpen.value = !isOpen.value
}

const close = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (
    isOpen.value &&
    buttonRef.value &&
    dropdownRef.value &&
    !buttonRef.value.contains(event.target) &&
    !dropdownRef.value.contains(event.target)
  ) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
