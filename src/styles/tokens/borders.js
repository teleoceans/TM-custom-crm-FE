/**
 * Design tokens for borders
 */

export const borderRadius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px'
}

export const borderWidth = {
  0: '0',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px'
}

/**
 * Common border radius for components
 */
export const componentRadius = {
  button: borderRadius.lg,      // 8px
  input: borderRadius.lg,       // 8px
  card: borderRadius.lg,        // 8px
  modal: borderRadius.xl,      // 12px
  badge: borderRadius.full,     // pill
  dropdown: borderRadius.md,    // 6px
  avatar: borderRadius.full     // pill
}

