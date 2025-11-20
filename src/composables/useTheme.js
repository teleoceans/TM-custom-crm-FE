import { ref } from "vue";

// Singleton theme state - shared across all components
let themeState = null;
let themeListeners = [];
let mediaQueryListener = null;
let mediaQuery = null;

/**
 * Apply theme to document
 */
function applyTheme(dark) {
  if (typeof window === "undefined") return;

  if (dark) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    // Ensure dark class is completely removed
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }

  // Force a reflow to ensure CSS variables are recalculated
  document.documentElement.offsetHeight;
}

/**
 * Composable for managing theme (light/dark mode)
 * @returns {Object} Theme state and methods
 */
export function useTheme() {
  /**
   * Get theme from localStorage or system preference
   */
  const getInitialTheme = () => {
    if (typeof window === "undefined") return false;

    const stored = localStorage.getItem("theme");
    if (stored) {
      return stored === "dark";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  // Use singleton state if it exists, otherwise create it
  if (!themeState) {
    themeState = ref(getInitialTheme());

    // Initialize theme on first load
    if (typeof window !== "undefined") {
      applyTheme(themeState.value);

      // Watch for system theme changes (only if user hasn't set a preference)
      mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e) => {
        // Only update if user hasn't manually set a theme
        if (!localStorage.getItem("theme")) {
          themeState.value = e.matches;
          applyTheme(e.matches);
          // Notify all listeners
          themeListeners.forEach((listener) => listener(e.matches));
        }
      };

      // Store listener reference for cleanup
      mediaQueryListener = handleChange;

      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", mediaQueryListener);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(mediaQueryListener);
      }
    }
  }

  const isDark = themeState;

  /**
   * Toggle theme
   */
  const toggle = () => {
    isDark.value = !isDark.value;
    applyTheme(isDark.value);
    // Notify all listeners
    themeListeners.forEach((listener) => listener(isDark.value));
  };

  /**
   * Set theme
   */
  const setTheme = (dark) => {
    isDark.value = dark;
    applyTheme(dark);
    // Notify all listeners
    themeListeners.forEach((listener) => listener(dark));
  };

  /**
   * Cleanup function to remove event listeners
   * Should be called when the app is unmounted
   */
  const cleanup = () => {
    if (typeof window !== "undefined" && mediaQuery && mediaQueryListener) {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", mediaQueryListener);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(mediaQueryListener);
      }
      mediaQueryListener = null;
      mediaQuery = null;
    }
  };

  return {
    isDark,
    toggle,
    setTheme,
    cleanup,
  };
}
