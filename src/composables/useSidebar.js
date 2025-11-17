import { ref, computed } from "vue";

// Singleton state - shared across all components
let sidebarState = null;

/**
 * Composable for managing sidebar state
 * Uses singleton pattern to ensure consistent state across all components
 * @returns {Object} Sidebar state and methods
 */
export function useSidebar() {
  // Create singleton state if it doesn't exist
  if (!sidebarState) {
    const isOpen = ref(false);
    const isMobile = ref(false);
    const isCollapsed = ref(false);

    /**
     * Toggle sidebar open/closed state (for mobile)
     */
    const toggle = () => {
      isOpen.value = !isOpen.value;
    };

    /**
     * Toggle sidebar collapse state (for desktop)
     */
    const toggleCollapse = () => {
      isCollapsed.value = !isCollapsed.value;
    };

    /**
     * Open sidebar
     */
    const open = () => {
      isOpen.value = true;
    };

    /**
     * Close sidebar
     */
    const close = () => {
      isOpen.value = false;
    };

    /**
     * Check if sidebar should be visible on current screen size
     */
    const isVisible = computed(() => {
      if (isMobile.value) {
        return isOpen.value;
      }
      return true;
    });

    /**
     * Set mobile state
     */
    const setMobile = (value) => {
      isMobile.value = value;
      if (!value) {
        // On desktop, sidebar is always open by default
        isOpen.value = true;
      }
    };

    sidebarState = {
      isOpen,
      isMobile,
      isCollapsed,
      isVisible,
      toggle,
      toggleCollapse,
      open,
      close,
      setMobile,
    };
  }

  return sidebarState;
}
