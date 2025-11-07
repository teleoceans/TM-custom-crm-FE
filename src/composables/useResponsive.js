import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Composable for responsive breakpoint detection
 * @returns {Object} Responsive state and breakpoints
 */
export function useResponsive() {
  const width = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
  const height = ref(typeof window !== 'undefined' ? window.innerHeight : 768)

  const isMobile = ref(width.value < 640)
  const isTablet = ref(width.value >= 640 && width.value < 1024)
  const isDesktop = ref(width.value >= 1024)
  const isLargeDesktop = ref(width.value >= 1280)

  const updateDimensions = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
    isMobile.value = width.value < 640
    isTablet.value = width.value >= 640 && width.value < 1024
    isDesktop.value = width.value >= 1024
    isLargeDesktop.value = width.value >= 1280
  }

  onMounted(() => {
    if (typeof window !== 'undefined') {
      updateDimensions()
      window.addEventListener('resize', updateDimensions)
    }
  })

  onUnmounted(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateDimensions)
    }
  })

  return {
    width,
    height,
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop
  }
}

