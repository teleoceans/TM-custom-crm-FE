import { ref, computed } from 'vue'

/**
 * Composable for managing sidebar state
 * @returns {Object} Sidebar state and methods
 */
export function useSidebar() {
  const isOpen = ref(false)
  const isMobile = ref(false)
  const isCollapsed = ref(false)

  /**
   * Toggle sidebar open/closed state (for mobile)
   */
  const toggle = () => {
    isOpen.value = !isOpen.value
  }

  /**
   * Toggle sidebar collapse state (for desktop)
   */
  const toggleCollapse = () => {
    isCollapsed.value = !isCollapsed.value
  }

  /**
   * Open sidebar
   */
  const open = () => {
    isOpen.value = true
  }

  /**
   * Close sidebar
   */
  const close = () => {
    isOpen.value = false
  }

  /**
   * Check if sidebar should be visible on current screen size
   */
  const isVisible = computed(() => {
    if (isMobile.value) {
      return isOpen.value
    }
    return true
  })

  /**
   * Set mobile state
   */
  const setMobile = (value) => {
    isMobile.value = value
    if (!value) {
      // On desktop, sidebar is always open by default
      isOpen.value = true
    }
  }

  return {
    isOpen,
    isMobile,
    isCollapsed,
    isVisible,
    toggle,
    toggleCollapse,
    open,
    close,
    setMobile
  }
}

