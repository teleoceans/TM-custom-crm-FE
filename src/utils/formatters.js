/**
 * Date formatting utility
 * @param {string|Date} value - Date value to format
 * @returns {string} Formatted date string
 */
export function formatDate(value) {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

/**
 * Currency formatting utility (for table display)
 * @param {number|null|undefined} value - Currency value to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(value) {
  if (value == null) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Simple currency formatter (adds $ sign)
 * @param {number|null|undefined} value - Value to format
 * @returns {string} Formatted string with $ sign
 */
export function formatCurrencySimple(value) {
  if (!value && value !== 0) return "";
  return `${value}$`;
}

