/**
 * Theme Styles Composable
 * Provides static style objects backed by CSS custom properties.
 */

import { themeTokens } from "../styles/tokens/theme-tokens.js";

const themeStyles = {
  // Text colors
  textPrimary: { color: themeTokens.textPrimary },
  textSecondary: { color: themeTokens.textSecondary },
  textMuted: { color: themeTokens.textMuted },
  textWhite: { color: themeTokens.textWhite },

  // Background colors
  bgCard: { background: themeTokens.bgCard },
  bgSidebar: { background: themeTokens.bgSidebar },
  bgNavbar: { background: themeTokens.bgNavbar },
  bgMain: { background: themeTokens.bgMain },
  bgTertiary: { background: themeTokens.bgTertiary },

  // Border colors
  borderDefault: { borderColor: themeTokens.borderDefault },
  borderSidebar: { borderColor: themeTokens.borderSidebar },
  borderMuted: { borderColor: themeTokens.borderMuted },

  // Layout combinations
  navbarStyle: {
    background: themeTokens.bgNavbar,
    borderColor: themeTokens.borderSidebar,
  },
  footerStyle: {
    background: themeTokens.bgNavbar,
    borderColor: themeTokens.borderSidebar,
  },
  sidebarStyle: {
    background: themeTokens.bgSidebar,
    borderColor: themeTokens.borderSidebar,
  },

  // Card combinations
  cardStyle: { background: themeTokens.bgCard },
  cardWithBorder: {
    background: themeTokens.bgCard,
    borderColor: themeTokens.borderDefault,
  },
  cardWithShadow: {
    background: themeTokens.bgCard,
    boxShadow: themeTokens.shadowCard,
  },

  // Input styles
  inputStyle: {
    borderColor: themeTokens.borderMuted,
    background: themeTokens.bgTertiary,
    color: themeTokens.textPrimary,
  },
};

export function useThemeStyles() {
  return themeStyles;
}

