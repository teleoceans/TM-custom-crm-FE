/**
 * Theme constants
 * Centralized theme configuration
 */

import { colors } from '../styles/tokens/colors.js'
import { spacing } from '../styles/tokens/spacing.js'
import { typography } from '../styles/tokens/typography.js'
import { componentRadius } from '../styles/tokens/borders.js'
import { componentShadows } from '../styles/tokens/shadows.js'

/**
 * Theme configuration object
 */
export const theme = {
  colors: {
    primary: colors.primary,
    gray: colors.gray,
    success: colors.success,
    warning: colors.warning,
    danger: colors.danger,
    info: colors.info
  },
  spacing,
  typography,
  borderRadius: componentRadius,
  shadows: componentShadows
}

/**
 * Default theme values for components
 */
export const defaultTheme = {
  primaryColor: colors.primary[700],
  primaryColorDark: colors.primary[600],
  textColor: colors.gray[900],
  textColorDark: colors.gray[100],
  backgroundColor: colors.gray[50],
  backgroundColorDark: colors.gray[900],
  borderColor: colors.gray[200],
  borderColorDark: colors.gray[700],
  cardRadius: componentRadius.card,
  buttonRadius: componentRadius.button,
  inputRadius: componentRadius.input
}

/**
 * CSS Variable references for theme-aware styling
 * Re-exported from theme-tokens for backward compatibility
 * @deprecated Use themeTokens from '../styles/tokens/theme-tokens' instead
 */
export { themeTokens as cssVariables } from '../styles/tokens/theme-tokens.js'

export default theme

