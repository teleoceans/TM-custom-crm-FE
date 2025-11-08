/**
 * Theme constants
 * Centralized theme configuration using CSS variable tokens
 */

import { themeTokens } from "../styles/tokens/theme-tokens.js";

/**
 * Theme configuration object exposing semantic CSS variables.
 */
export const theme = {
  tokens: themeTokens,
};

/**
 * Default theme surface references for components.
 * Values reference CSS custom properties to stay in sync with Tailwind theme definitions.
 */
export const defaultTheme = {
  primaryColor: themeTokens.primary,
  primaryColorHover: themeTokens.primaryHover,
  textColor: themeTokens.textPrimary,
  textColorMuted: themeTokens.textSecondary,
  backgroundColor: themeTokens.bgPrimary,
  backgroundColorAlt: themeTokens.bgSecondary,
  cardBackground: themeTokens.bgCard,
  borderColor: themeTokens.borderDefault,
  borderColorMuted: themeTokens.borderMuted,
  shadowCard: themeTokens.shadowCard,
};

export { themeTokens as cssVariables } from "../styles/tokens/theme-tokens.js";

export default theme;

