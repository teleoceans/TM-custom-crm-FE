<template>
  <li>
    <router-link
      v-if="to"
      :to="to"
      data-sidebar-collapse-item
      :class="[
        'group flex h-10 w-full items-center rounded-lg p-2 text-base font-medium transition-colors',
        isActive ? '' : 'sidebar-item-hover'
      ]"
      :style="isActive ? { 
        background: isDark ? 'var(--color-sidebar-active, #4b5563)' : 'var(--indigo-800, #42389D)' 
      } : {}"
    >
      <slot name="icon">
        <component
          v-if="iconOutline && iconSolid"
          :is="isActive ? iconSolid : iconOutline"
          :style="{
            color: isActive ? 'var(--color-text-white)' : 'var(--color-text-muted)'
          }"
          class="h-5 w-5 shrink-0 transition-colors"
        />
        <component
          v-else-if="iconComponent"
          :is="iconComponent"
          :style="{
            color: isActive ? 'var(--color-text-white)' : 'var(--color-text-muted)'
          }"
          class="h-5 w-5 shrink-0 transition-colors"
        />
        <svg
          v-else-if="icon"
          :style="{
            color: isActive ? 'var(--color-text-white)' : 'var(--color-text-muted)'
          }"
          class="h-5 w-5 shrink-0 transition-colors"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path :d="icon" />
        </svg>
      </slot>
      <span 
        data-sidebar-collapse-hide
        class="ml-3 flex-1 whitespace-nowrap text-left"
        :style="{
          color: isActive ? 'var(--color-text-white)' : 'var(--color-text-primary)'
        }"
      >
        <slot />
      </span>
    </router-link>
    <button
      v-else
      type="button"
      data-sidebar-collapse-item
      :class="[
        'group flex h-10 w-full items-center rounded-lg p-2 text-base font-medium transition-colors',
        'sidebar-item-hover'
      ]"
      @click="toggle"
    >
      <slot name="icon">
        <component
          v-if="iconOutline && iconSolid"
          :is="isActive ? iconSolid : iconOutline"
          :style="{
            color: isActive ? 'var(--color-text-white)' : 'var(--color-text-muted)'
          }"
          class="h-5 w-5 shrink-0 transition-colors"
        />
        <component
          v-else-if="iconComponent"
          :is="iconComponent"
          :style="{
            color: 'var(--color-text-muted)'
          }"
          class="h-5 w-5 shrink-0 transition-colors"
        />
        <svg
          v-else-if="icon"
          :style="{
            color: 'var(--color-text-muted)'
          }"
          class="h-5 w-5 shrink-0 transition-colors"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path :d="icon" />
        </svg>
      </slot>
      <span 
        data-sidebar-collapse-hide
        class="ml-3 flex-1 whitespace-nowrap text-left"
        :style="{
          color: isActive ? 'var(--color-text-white)' : 'var(--color-text-primary)'
        }"
      >
        <slot />
      </span>
      <svg
        v-if="hasChildren"
        class="h-5 w-5"
        :class="{ 'rotate-180': isExpanded }"
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
          stroke-linejoin="round"
          stroke-width="2"
          d="m19 9-7 7-7-7"
        />
      </svg>
    </button>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <ul v-if="hasChildren && isExpanded" class="space-y-2 py-2">
        <slot name="children" />
      </ul>
    </Transition>
  </li>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '../../composables/useTheme'

/**
 * Sidebar menu item component
 * @component
 */

const props = defineProps({
  /**
   * Route path
   */
  to: {
    type: String,
    default: ''
  },
  /**
   * SVG icon path
   */
  icon: {
    type: String,
    default: ''
  },
  /**
   * Icon component (deprecated - use iconOutline and iconSolid)
   */
  iconComponent: {
    type: Object,
    default: null
  },
  /**
   * Outline icon component (shown when not active)
   */
  iconOutline: {
    type: Object,
    default: null
  },
  /**
   * Solid icon component (shown when active)
   */
  iconSolid: {
    type: Object,
    default: null
  },
  /**
   * Has child items
   */
  hasChildren: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()
const { isDark } = useTheme()
const isExpanded = ref(false)

const isActive = computed(() => {
  if (!props.to) return false
  return route.path === props.to || route.path.startsWith(props.to + '/')
})

const toggle = () => {
  if (props.hasChildren) {
    isExpanded.value = !isExpanded.value
  }
}
</script>

<style scoped>
.sidebar-item-hover:hover {
  background-color: var(--color-sidebar-hover);
}
</style>

