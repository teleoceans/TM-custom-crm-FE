import { ref, onMounted, onUnmounted, nextTick } from "vue";
import {
  getDatepickerClass,
  getSelectedDate,
  findDropdown,
  formatDateToLocalString,
} from "./datepickerUtils";

/**
 * Composable for initializing and managing flowbite-datepicker
 * @param {Ref<HTMLElement>} inputRef - Reference to the input element
 * @param {Ref<HTMLElement>} containerRef - Reference to the container element (optional)
 * @param {Function} onDateChange - Callback when date changes
 * @param {string} initialDate - Initial date value (optional)
 */
export function useDatepicker(
  inputRef,
  containerRef,
  onDateChange,
  initialDate = null
) {
  const datepickerInstance = ref(null);
  const dropdownRef = ref(null);
  const isProcessingDateChange = ref(false);

  /**
   * Create date change handler that prevents duplicate callbacks
   */
  const createDateChangeHandler = () => {
    return (date) => {
      if (!date || isProcessingDateChange.value) return;

      isProcessingDateChange.value = true;
      try {
        const dateStr = formatDateToLocalString(date);
        if (dateStr) {
          onDateChange(dateStr);
        }
      } catch (error) {
        // Silently handle errors - datepicker will handle display
      } finally {
        // Reset flag after a short delay to allow hide event to complete
        setTimeout(() => {
          isProcessingDateChange.value = false;
        }, 100);
      }
    };
  };

  /**
   * Handle changeDate event (primary event for date selection)
   */
  const handleChangeDate = (e) => {
    if (e.detail?.date && !isProcessingDateChange.value) {
      const handler = createDateChangeHandler();
      handler(e.detail.date);
    }
  };

  /**
   * Handle hide event as fallback (only if changeDate didn't fire)
   */
  const handleHide = () => {
    if (!isProcessingDateChange.value) {
      requestAnimationFrame(() => {
        const dateStr = getSelectedDate(
          datepickerInstance.value,
          inputRef.value
        );
        if (dateStr) {
          isProcessingDateChange.value = true;
          try {
            onDateChange(dateStr);
          } catch (error) {
            // Silently handle errors
          } finally {
            setTimeout(() => {
              isProcessingDateChange.value = false;
            }, 100);
          }
        }
      });
    }
  };

  /**
   * Initialize the datepicker
   */
  const initializeDatepicker = () => {
    if (!inputRef.value) return;

    const DatepickerClass = getDatepickerClass();

    if (DatepickerClass) {
      try {
        // Use containerRef if provided, otherwise use document.body for fixed positioning
        const container =
          containerRef?.value ||
          (typeof document !== "undefined" ? document.body : undefined);

        datepickerInstance.value = new DatepickerClass(inputRef.value, {
          autohide: true,
          format: "mm/dd/yyyy",
          container: container,
          orientation: "bottom",
        });

        // Set initial date
        if (initialDate) {
          const date = new Date(initialDate);
          datepickerInstance.value.setDate(date, true);
        }

        // Find and store dropdown reference
        nextTick(() => {
          dropdownRef.value = findDropdown(
            inputRef.value,
            datepickerInstance.value
          );
        });

        // Listen for changeDate event (primary event for date selection)
        inputRef.value.addEventListener("changeDate", handleChangeDate);

        // Listen for hide event as fallback (only if changeDate didn't fire)
        inputRef.value.addEventListener("hide", handleHide);

        // Store handlers for cleanup
        inputRef.value._datepickerHandlers = {
          changeDate: handleChangeDate,
          hide: handleHide,
        };
      } catch (error) {
        // Silently handle initialization errors
        // The fallback handler below will attempt to work with auto-initialized datepicker
      }
    } else {
      // Fallback: listen for auto-initialized datepicker events
      const fallbackHandler = (e) => {
        if (e.detail?.date && !isProcessingDateChange.value) {
          const handler = createDateChangeHandler();
          handler(e.detail.date);
        }
      };
      inputRef.value.addEventListener("changeDate", fallbackHandler);
      inputRef.value._datepickerHandlers = {
        changeDate: fallbackHandler,
      };
    }
  };

  onMounted(() => {
    // Use a more reliable initialization check
    const tryInitialize = () => {
      if (inputRef.value && getDatepickerClass()) {
        initializeDatepicker();
      } else if (inputRef.value) {
        // Retry if datepicker class is not yet available
        setTimeout(tryInitialize, 50);
      }
    };

    nextTick(() => {
      // Try immediate initialization first
      if (inputRef.value && getDatepickerClass()) {
        initializeDatepicker();
      } else {
        // Fallback: retry after a short delay
        setTimeout(tryInitialize, 100);
      }
    });
  });

  onUnmounted(() => {
    // Remove datepicker event listeners
    if (inputRef.value?._datepickerHandlers) {
      const handlers = inputRef.value._datepickerHandlers;
      try {
        inputRef.value.removeEventListener("changeDate", handlers.changeDate);
        if (handlers.hide) {
          inputRef.value.removeEventListener("hide", handlers.hide);
        }
      } catch (error) {
        // Silently handle cleanup errors
      }
      delete inputRef.value._datepickerHandlers;
    }

    // Destroy datepicker instance
    if (datepickerInstance.value) {
      try {
        if (typeof datepickerInstance.value.destroy === "function") {
          datepickerInstance.value.destroy();
        }
      } catch (error) {
        // Silently handle destruction errors
      }
      datepickerInstance.value = null;
    }
  });

  return {
    datepickerInstance,
    show: () => {
      if (datepickerInstance.value) {
        datepickerInstance.value.show();
        // Update dropdown reference after showing
        nextTick(() => {
          dropdownRef.value = findDropdown(
            inputRef.value,
            datepickerInstance.value
          );
        });
      }
    },
    setDate: (date) => {
      if (datepickerInstance.value && date) {
        try {
          // Parse date string (YYYY-MM-DD) to Date object
          const dateObj = new Date(date);
          if (!isNaN(dateObj.getTime())) {
            datepickerInstance.value.setDate(dateObj, true);
          }
        } catch (error) {
          // Silently handle date setting errors
        }
      } else if (datepickerInstance.value && !date) {
        // Clear date if null/empty
        try {
          datepickerInstance.value.setDate(null, true);
        } catch (error) {
          // Silently handle date clearing errors
        }
      }
    },
  };
}
