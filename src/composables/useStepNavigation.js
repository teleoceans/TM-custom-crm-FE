import { ref } from "vue";

/**
 * Composable for step-based navigation
 * @param {Array<string>} steps - Array of step IDs in order
 * @param {string} initialStep - Initial step ID
 * @returns {Object} Navigation state and utilities
 */
export function useStepNavigation(steps, initialStep = null) {
  const currentStep = ref(initialStep || steps[0]);
  const completedSteps = ref([]);

  /**
   * Get the next step ID
   * @param {string} stepId - Current step ID
   * @returns {string|null} Next step ID or null if at last step
   */
  const getNextStep = (stepId) => {
    const currentIndex = steps.indexOf(stepId);
    if (currentIndex === -1 || currentIndex === steps.length - 1) {
      return null;
    }
    return steps[currentIndex + 1];
  };

  /**
   * Get the previous step ID
   * @param {string} stepId - Current step ID
   * @returns {string|null} Previous step ID or null if at first step
   */
  const getPreviousStep = (stepId) => {
    const currentIndex = steps.indexOf(stepId);
    if (currentIndex <= 0) {
      return null;
    }
    return steps[currentIndex - 1];
  };

  /**
   * Navigate to next step
   * @param {Function} onBeforeNext - Optional callback before navigation (returns boolean to allow/deny)
   * @returns {boolean} True if navigation succeeded
   */
  const goToNext = (onBeforeNext = null) => {
    const nextStep = getNextStep(currentStep.value);
    if (!nextStep) return false;

    // Call optional before navigation callback
    if (onBeforeNext && !onBeforeNext(currentStep.value)) {
      return false;
    }

    // Mark current step as completed
    if (!completedSteps.value.includes(currentStep.value)) {
      completedSteps.value.push(currentStep.value);
    }

    currentStep.value = nextStep;
    return true;
  };

  /**
   * Navigate to previous step
   */
  const goToPrevious = () => {
    const previousStep = getPreviousStep(currentStep.value);
    if (previousStep) {
      currentStep.value = previousStep;
    }
  };

  /**
   * Navigate to a specific step
   * @param {string} stepId - Step ID to navigate to
   */
  const goToStep = (stepId) => {
    if (steps.includes(stepId)) {
      currentStep.value = stepId;
    }
  };

  /**
   * Check if a step is completed
   * @param {string} stepId - Step ID to check
   * @returns {boolean} True if step is completed
   */
  const isStepCompleted = (stepId) => {
    return completedSteps.value.includes(stepId);
  };

  /**
   * Mark a step as completed
   * @param {string} stepId - Step ID to mark as completed
   */
  const markStepCompleted = (stepId) => {
    if (!completedSteps.value.includes(stepId)) {
      completedSteps.value.push(stepId);
    }
  };

  /**
   * Check if at first step
   * @returns {boolean} True if at first step
   */
  const isFirstStep = () => {
    return steps.indexOf(currentStep.value) === 0;
  };

  /**
   * Check if at last step
   * @returns {boolean} True if at last step
   */
  const isLastStep = () => {
    return steps.indexOf(currentStep.value) === steps.length - 1;
  };

  return {
    currentStep,
    completedSteps,
    getNextStep,
    getPreviousStep,
    goToNext,
    goToPrevious,
    goToStep,
    isStepCompleted,
    markStepCompleted,
    isFirstStep,
    isLastStep,
  };
}

