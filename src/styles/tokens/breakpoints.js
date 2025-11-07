/**
 * Design tokens for responsive breakpoints
 * Matches Tailwind CSS default breakpoints
 */

export const breakpoints = {
  sm: '640px',   // Small devices (landscape phones)
  md: '768px',   // Medium devices (tablets)
  lg: '1024px',  // Large devices (desktops)
  xl: '1280px',  // Extra large devices (large desktops)
  '2xl': '1536px' // 2X Extra large devices (larger desktops)
}

/**
 * Media query helpers
 */
export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  maxSm: `(max-width: ${parseInt(breakpoints.sm) - 1}px)`,
  maxMd: `(max-width: ${parseInt(breakpoints.md) - 1}px)`,
  maxLg: `(max-width: ${parseInt(breakpoints.lg) - 1}px)`,
  maxXl: `(max-width: ${parseInt(breakpoints.xl) - 1}px)`
}

/**
 * Container max widths
 */
export const containerMaxWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
  full: '100%'
}

