import { ref, onUnmounted } from "vue";

/**
 * Composable for managing success and error messages with auto-clear
 * @param {number} autoClearDelay - Delay in milliseconds before auto-clearing messages (default: 5000)
 * @returns {Object} Message handler utilities
 */
export function useMessageHandler(autoClearDelay = 5000) {
  const successMessage = ref("");
  const errorMessage = ref("");
  const messageTimeout = ref(null);

  /**
   * Set a success message
   * @param {string} message - Success message to display
   */
  const setSuccess = (message) => {
    errorMessage.value = "";
    successMessage.value = message;
    scheduleClear();
  };

  /**
   * Set an error message
   * @param {string} message - Error message to display
   */
  const setError = (message) => {
    successMessage.value = "";
    errorMessage.value = message;
    scheduleClear();
  };

  /**
   * Clear all messages immediately
   */
  const clearMessages = () => {
    if (messageTimeout.value) {
      clearTimeout(messageTimeout.value);
      messageTimeout.value = null;
    }
    successMessage.value = "";
    errorMessage.value = "";
  };

  /**
   * Schedule automatic message clearing
   */
  const scheduleClear = () => {
    // Clear existing timeout if any
    if (messageTimeout.value) {
      clearTimeout(messageTimeout.value);
    }
    // Set new timeout
    messageTimeout.value = setTimeout(() => {
      successMessage.value = "";
      errorMessage.value = "";
      messageTimeout.value = null;
    }, autoClearDelay);
  };

  // Cleanup timeout on unmount
  onUnmounted(() => {
    if (messageTimeout.value) {
      clearTimeout(messageTimeout.value);
      messageTimeout.value = null;
    }
  });

  return {
    successMessage,
    errorMessage,
    setSuccess,
    setError,
    clearMessages,
  };
}

