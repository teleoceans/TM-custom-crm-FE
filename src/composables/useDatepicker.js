import { ref, onMounted, onUnmounted, nextTick } from "vue";

/**
 * Composable for initializing and managing flowbite-datepicker
 * @param {Ref<HTMLElement>} inputRef - Reference to the input element
 * @param {Ref<HTMLElement>} containerRef - Reference to the container element (optional)
 * @param {Function} onDateChange - Callback when date changes
 * @param {string} initialDate - Initial date value (optional)
 */
export function useDatepicker(inputRef, containerRef, onDateChange, initialDate = null) {
  const datepickerInstance = ref(null);

  const getDatepickerClass = () => {
    if (typeof window === "undefined") return null;
    return (
      window.Datepicker ||
      (window.flowbite && window.flowbite.Datepicker) ||
      null
    );
  };

  const initializeDatepicker = () => {
    if (!inputRef.value) return;

    const DatepickerClass = getDatepickerClass();

    if (DatepickerClass) {
      try {
        datepickerInstance.value = new DatepickerClass(inputRef.value, {
          autohide: true,
          format: "mm/dd/yyyy",
          container: containerRef?.value || undefined,
          orientation: "bottom",
        });

        // Set initial date
        if (initialDate) {
          const date = new Date(initialDate);
          datepickerInstance.value.setDate(date, true);
        }

        // Listen for date changes
        inputRef.value.addEventListener("changeDate", (e) => {
          if (e.detail?.date) {
            onDateChange(e.detail.date.toISOString().split("T")[0]);
          }
        });

        // Store instance on input for easy access
        inputRef.value._datepicker = datepickerInstance.value;
      } catch (error) {
        console.warn("Datepicker initialization failed:", error);
      }
    } else {
      // Fallback: listen for auto-initialized datepicker events
      inputRef.value.addEventListener("changeDate", (e) => {
        if (e.detail?.date) {
          onDateChange(e.detail.date.toISOString().split("T")[0]);
        }
      });
    }
  };

  onMounted(() => {
    nextTick(() => {
      setTimeout(initializeDatepicker, 100);
    });
  });

  onUnmounted(() => {
    if (datepickerInstance.value) {
      datepickerInstance.value.destroy();
    }
  });

  return {
    datepickerInstance,
    show: () => datepickerInstance.value?.show(),
    setDate: (date) => {
      if (datepickerInstance.value && date) {
        datepickerInstance.value.setDate(new Date(date), true);
      }
    },
  };
}

