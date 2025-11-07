/**
 * Theme Styles Composable
 * Provides computed style objects for common theme-aware styling patterns
 * Reduces repetition of inline style strings across components
 */

import { computed } from 'vue'
import { themeTokens } from '../styles/tokens/theme-tokens.js'

/**
 * Composable for theme-aware style objects
 * @returns {Object} Style objects for common patterns
 */
export function useThemeStyles() {
  // Text color styles
  const textPrimary = computed(() => ({
    color: themeTokens.textPrimary
  }))

  const textSecondary = computed(() => ({
    color: themeTokens.textSecondary
  }))

  const textMuted = computed(() => ({
    color: themeTokens.textMuted
  }))

  const textWhite = computed(() => ({
    color: themeTokens.textWhite
  }))

  // Background color styles
  const bgCard = computed(() => ({
    background: themeTokens.bgCard
  }))

  const bgSidebar = computed(() => ({
    background: themeTokens.bgSidebar
  }))

  const bgNavbar = computed(() => ({
    background: themeTokens.bgNavbar
  }))

  const bgMain = computed(() => ({
    background: themeTokens.bgMain
  }))

  const bgTertiary = computed(() => ({
    background: themeTokens.bgTertiary
  }))

  // Border color styles
  const borderDefault = computed(() => ({
    borderColor: themeTokens.borderDefault
  }))

  const borderSidebar = computed(() => ({
    borderColor: themeTokens.borderSidebar
  }))

  const borderMuted = computed(() => ({
    borderColor: themeTokens.borderMuted
  }))

  // Combined layout styles
  const navbarStyle = computed(() => ({
    background: themeTokens.bgNavbar,
    borderColor: themeTokens.borderSidebar
  }))

  const footerStyle = computed(() => ({
    background: themeTokens.bgNavbar,
    borderColor: themeTokens.borderSidebar
  }))

  const sidebarStyle = computed(() => ({
    background: themeTokens.bgSidebar,
    borderColor: themeTokens.borderSidebar
  }))

  // Card styles
  const cardStyle = computed(() => ({
    background: themeTokens.bgCard
  }))

  const cardWithBorder = computed(() => ({
    background: themeTokens.bgCard,
    borderColor: themeTokens.borderDefault
  }))

  const cardWithShadow = computed(() => ({
    background: themeTokens.bgCard,
    boxShadow: themeTokens.shadowCard
  }))

  // Input styles
  const inputStyle = computed(() => ({
    borderColor: themeTokens.borderMuted,
    background: themeTokens.bgTertiary,
    color: themeTokens.textPrimary
  }))

  return {
    // Text colors
    textPrimary,
    textSecondary,
    textMuted,
    textWhite,
    // Backgrounds
    bgCard,
    bgSidebar,
    bgNavbar,
    bgMain,
    bgTertiary,
    // Borders
    borderDefault,
    borderSidebar,
    borderMuted,
    // Layout combinations
    navbarStyle,
    footerStyle,
    sidebarStyle,
    // Card combinations
    cardStyle,
    cardWithBorder,
    cardWithShadow,
    // Input
    inputStyle
  }
}

