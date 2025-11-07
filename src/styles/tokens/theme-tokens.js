/**
 * Theme Tokens Utility
 * Provides programmatic access to CSS custom properties
 * Use these for inline styles or JavaScript-based theming
 */

/**
 * CSS variable names for semantic tokens
 */
export const themeTokens = {
  // Background colors
  bgPrimary: 'var(--color-bg-primary)',
  bgSecondary: 'var(--color-bg-secondary)',
  bgTertiary: 'var(--color-bg-tertiary)',
  bgCard: 'var(--color-bg-card)',
  bgSidebar: 'var(--color-bg-sidebar)',
  bgNavbar: 'var(--color-bg-navbar)',
  bgMain: 'var(--color-bg-main)',
  bgOverlay: 'var(--color-bg-overlay)',

  // Text colors
  textPrimary: 'var(--color-text-primary)',
  textSecondary: 'var(--color-text-secondary)',
  textMuted: 'var(--color-text-muted)',
  textInverse: 'var(--color-text-inverse)',
  textWhite: 'var(--color-text-white)',

  // Border colors
  borderDefault: 'var(--color-border-default)',
  borderMuted: 'var(--color-border-muted)',
  borderFocus: 'var(--color-border-focus)',
  borderSidebar: 'var(--color-border-sidebar)',

  // Semantic colors
  primary: 'var(--color-primary)',
  primaryHover: 'var(--color-primary-hover)',
  success: 'var(--color-success)',
  warning: 'var(--color-warning)',
  danger: 'var(--color-danger)',
  info: 'var(--color-info)',

  // Shadows
  shadowCard: 'var(--shadow-card)',
  shadowCardHover: 'var(--shadow-card-hover)',
  shadowButton: 'var(--shadow-button)',
  shadowInput: 'var(--shadow-input)',
  shadowModal: 'var(--shadow-modal)'
}

/**
 * Get computed CSS variable value
 * @param {string} variableName - CSS variable name (e.g., '--color-bg-primary')
 * @returns {string} - Computed value
 */
export function getThemeValue(variableName) {
  if (typeof window === 'undefined') return ''
  return getComputedStyle(document.documentElement)
    .getPropertyValue(variableName)
    .trim()
}

/**
 * Get theme token value
 * @param {string} tokenKey - Token key from themeTokens object
 * @returns {string} - Computed value
 */
export function getTokenValue(tokenKey) {
  const token = themeTokens[tokenKey]
  if (!token) return ''
  const variableName = token.replace('var(', '').replace(')', '')
  return getThemeValue(variableName)
}

export default themeTokens

