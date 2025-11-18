import { computed } from "vue";

/**
 * Default date filter options
 */
export const DEFAULT_DATE_FILTER_OPTIONS = [
  { value: "last-7-days", label: "Last 7 days" },
  { value: "last-30-days", label: "Last 30 days" },
  { value: "last-90-days", label: "Last 90 days" },
  { value: "this-year", label: "This year" },
  { value: "all", label: "All time" },
];

/**
 * Check if a date is within the specified filter range
 * @param {string|Date} dateString - Date to check
 * @param {string} filter - Filter type (last-7-days, last-30-days, etc.)
 * @returns {boolean} True if date is within range
 */
export function isWithinRange(dateString, filter) {
  if (filter === "all" || !dateString) return true;

  const targetDate = new Date(dateString);
  const today = new Date();

  targetDate.setHours(0, 0, 0, 0);
  today.setHours(0, 0, 0, 0);

  const diffInDays = (today - targetDate) / (1000 * 60 * 60 * 24);

  switch (filter) {
    case "last-7-days":
      return diffInDays <= 7;
    case "last-30-days":
      return diffInDays <= 30;
    case "last-90-days":
      return diffInDays <= 90;
    case "this-year":
      return targetDate.getFullYear() === today.getFullYear();
    default:
      return true;
  }
}

/**
 * Composable for date filtering functionality
 * @param {Object} options - Configuration options
 * @param {Ref<string>} options.dateFilter - Reactive date filter value
 * @param {Ref<Array>} options.items - Items to filter
 * @param {string} options.dateField - Field name containing the date
 * @param {boolean} options.enabled - Whether date filtering is enabled
 * @returns {Object} Filtered items and utilities
 */
export function useDateFilter({ dateFilter, items, dateField, enabled }) {
  const filteredItems = computed(() => {
    if (!enabled || !dateField) {
      return items.value;
    }

    return items.value.filter((item) => {
      return isWithinRange(item[dateField], dateFilter.value);
    });
  });

  return {
    filteredItems,
  };
}

