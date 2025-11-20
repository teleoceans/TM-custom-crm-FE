import { reactive } from "vue";

/**
 * Common validation patterns
 */
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^\+?[\d\s()-]+$/,
  url: /^https?:\/\/.+/,
};

/**
 * Common validation messages
 */
export const validationMessages = {
  required: (field) => `${field} is required.`,
  email: "Enter a valid email address.",
  phone: "Enter a valid phone number.",
  url: "Enter a valid URL (e.g., https://example.com).",
  passwordMatch: "Passwords do not match.",
};

/**
 * Validation rule types
 * @typedef {Object} ValidationRule
 * @property {boolean} required - Whether the field is required
 * @property {string} type - Validation type: 'email', 'phone', 'url', 'string', 'number'
 * @property {Function} custom - Custom validation function
 * @property {string} message - Custom error message
 */

/**
 * Composable for form validation
 * @param {Object} initialErrors - Initial error state object
 * @returns {Object} Validation utilities
 */
export function useFormValidation(initialErrors = {}) {
  const errors = reactive({ ...initialErrors });

  /**
   * Clear all errors
   */
  const clearErrors = () => {
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
  };

  /**
   * Clear a specific field error
   * @param {string} field - Field name to clear
   */
  const clearError = (field) => {
    if (Object.prototype.hasOwnProperty.call(errors, field)) {
      errors[field] = "";
    }
  };

  /**
   * Validate a single field
   * @param {string} field - Field name
   * @param {*} value - Field value
   * @param {ValidationRule} rule - Validation rule
   * @returns {boolean} Whether the field is valid
   */
  const validateField = (field, value, rule) => {
    // Required validation
    if (rule.required) {
      const isEmpty =
        value == null ||
        (typeof value === "string" && !value.trim()) ||
        (Array.isArray(value) && value.length === 0);

      if (isEmpty) {
        errors[field] =
          rule.message || validationMessages.required(rule.label || field);
        return false;
      }
    }

    // Skip other validations if field is empty and not required
    if (!value || (typeof value === "string" && !value.trim())) {
      return true;
    }

    // Type-based validation
    if (rule.type === "email" && !validationPatterns.email.test(value)) {
      errors[field] = rule.message || validationMessages.email;
      return false;
    }

    if (rule.type === "phone" && !validationPatterns.phone.test(value)) {
      errors[field] = rule.message || validationMessages.phone;
      return false;
    }

    if (rule.type === "url" && !validationPatterns.url.test(value)) {
      errors[field] = rule.message || validationMessages.url;
      return false;
    }

    // Custom validation
    if (rule.custom && typeof rule.custom === "function") {
      const customResult = rule.custom(value);
      if (customResult !== true) {
        errors[field] = rule.message || customResult || `${field} is invalid.`;
        return false;
      }
    }

    return true;
  };

  /**
   * Validate form with rules
   * @param {Object} formData - Form data object
   * @param {Object<string, ValidationRule>} rules - Validation rules for each field
   * @returns {boolean} Whether the form is valid
   */
  const validate = (formData, rules) => {
    clearErrors();
    let isValid = true;

    for (const [field, rule] of Object.entries(rules)) {
      const value = formData[field];
      if (!validateField(field, value, rule)) {
        isValid = false;
      }
    }

    return isValid;
  };

  /**
   * Validate password match
   * @param {string} password - Password field
   * @param {string} confirmPassword - Confirm password field
   * @param {string} fieldName - Field name for error (default: 'confirmPassword')
   * @returns {boolean} Whether passwords match
   */
  const validatePasswordMatch = (
    password,
    confirmPassword,
    fieldName = "confirmPassword"
  ) => {
    if (!confirmPassword) {
      errors[fieldName] = validationMessages.required("Confirm password");
      return false;
    }

    if (password && password !== confirmPassword) {
      errors[fieldName] = validationMessages.passwordMatch;
      return false;
    }

    return true;
  };

  return {
    errors,
    clearErrors,
    clearError,
    validate,
    validateField,
    validatePasswordMatch,
  };
}
