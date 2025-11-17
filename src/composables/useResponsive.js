import { ref } from "vue";

// Singleton state - shared across all components
let responsiveState = null;
let resizeListener = null;
let listenerCount = 0;

/**
 * Composable for responsive breakpoint detection
 * Uses singleton pattern to ensure consistent state across all components
 * @returns {Object} Responsive state and breakpoints
 */
export function useResponsive() {
  // Create singleton state if it doesn't exist
  if (!responsiveState) {
    const width = ref(typeof window !== "undefined" ? window.innerWidth : 1024);
    const height = ref(
      typeof window !== "undefined" ? window.innerHeight : 768
    );

    const isMobile = ref(width.value < 640);
    const isTablet = ref(width.value >= 640 && width.value < 1024);
    const isDesktop = ref(width.value >= 1024);
    const isLargeDesktop = ref(width.value >= 1280);

    const updateDimensions = () => {
      width.value = window.innerWidth;
      height.value = window.innerHeight;
      isMobile.value = width.value < 640;
      isTablet.value = width.value >= 640 && width.value < 1024;
      isDesktop.value = width.value >= 1024;
      isLargeDesktop.value = width.value >= 1280;
    };

    // Initialize dimensions
    if (typeof window !== "undefined") {
      updateDimensions();
    }

    responsiveState = {
      width,
      height,
      isMobile,
      isTablet,
      isDesktop,
      isLargeDesktop,
      _updateDimensions: updateDimensions,
    };

    // Set up global resize listener (only once)
    if (typeof window !== "undefined" && !resizeListener) {
      resizeListener = () => {
        updateDimensions();
      };
      window.addEventListener("resize", resizeListener);
    }
  }

  // Track usage count for potential cleanup (though we keep listener active)
  listenerCount++;

  return {
    width: responsiveState.width,
    height: responsiveState.height,
    isMobile: responsiveState.isMobile,
    isTablet: responsiveState.isTablet,
    isDesktop: responsiveState.isDesktop,
    isLargeDesktop: responsiveState.isLargeDesktop,
  };
}
