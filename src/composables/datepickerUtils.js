/**
 * Utility functions for datepicker operations
 */

/**
 * Get the Datepicker class from window object
 * @returns {Function|null} Datepicker class or null
 */
export function getDatepickerClass() {
  if (typeof window === "undefined") return null;
  return (
    window.Datepicker ||
    (window.flowbite && window.flowbite.Datepicker) ||
    null
  );
}

/**
 * Format a Date object to YYYY-MM-DD string using local date components
 * @param {Date} date - Date object to format
 * @returns {string} Formatted date string (YYYY-MM-DD)
 */
export function formatDateToLocalString(date) {
  if (!date) return null;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/**
 * Parse date from input value (MM/DD/YYYY format) to YYYY-MM-DD
 * @param {string} inputValue - Input value in MM/DD/YYYY format
 * @returns {string|null} Formatted date string (YYYY-MM-DD) or null
 */
export function parseDateFromInput(inputValue) {
  if (!inputValue) return null;

  const parts = inputValue.split("/");
  if (parts.length !== 3) return null;

  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);

  // Validate date components
  if (month < 0 || month > 11 || day < 1 || day > 31 || year <= 0) {
    return null;
  }

  // Use local date to avoid timezone issues
  const date = new Date(year, month, day);
  if (isNaN(date.getTime())) {
    return null;
  }

  // Format as YYYY-MM-DD using local date components
  return formatDateToLocalString(date);
}

/**
 * Get the selected date from datepicker instance
 * @param {Object} datepickerInstance - Datepicker instance
 * @param {HTMLElement} inputElement - Input element (for fallback parsing)
 * @returns {string|null} Formatted date string (YYYY-MM-DD) or null
 */
export function getSelectedDate(datepickerInstance, inputElement) {
  if (!datepickerInstance) return null;

  try {
    const date = datepickerInstance.getDate();
    if (!date) return null;
    return formatDateToLocalString(date);
  } catch (error) {
    // Fallback: parse from input value (MM/DD/YYYY format)
    if (inputElement?.value) {
      return parseDateFromInput(inputElement.value);
    }
    return null;
  }
}

/**
 * Find the dropdown element associated with a datepicker instance
 * @param {HTMLElement} inputElement - Input element
 * @param {Object} datepickerInstance - Datepicker instance
 * @returns {HTMLElement|null} Dropdown element or null
 */
export function findDropdown(inputElement, datepickerInstance) {
  if (!inputElement || !datepickerInstance) return null;

  try {
    // The datepicker should have a reference to its picker element
    // Try multiple possible property names
    const picker =
      datepickerInstance.picker ||
      datepickerInstance._picker ||
      datepickerInstance._datepicker;

    if (picker?.element) {
      return picker.element;
    }

    // If picker has a direct reference to the dropdown
    if (picker?.dropdown) {
      return picker.dropdown;
    }

    // Fallback: find by data attribute or proximity to input
    const inputId = inputElement.id;
    const allDropdowns = document.querySelectorAll(
      ".datepicker-dropdown, [data-datepicker-dropdown]"
    );

    if (allDropdowns.length === 1) {
      return allDropdowns[0];
    }

    // If multiple, try to find the one associated with this input
    for (const dropdown of allDropdowns) {
      if (
        dropdown.dataset.inputId === inputId ||
        dropdown.getAttribute("data-input-id") === inputId
      ) {
        return dropdown;
      }
    }

    // Last resort: find by proximity to input
    if (allDropdowns.length > 0) {
      const inputRect = inputElement.getBoundingClientRect();
      for (const dropdown of allDropdowns) {
        const dropdownRect = dropdown.getBoundingClientRect();
        // Check if dropdown is near the input (within reasonable distance)
        if (
          Math.abs(dropdownRect.top - inputRect.bottom) < 300 &&
          Math.abs(dropdownRect.left - inputRect.left) < 200
        ) {
          return dropdown;
        }
      }
    }
  } catch (error) {
    // Silently fail - dropdown finding is not critical
  }

  return null;
}

