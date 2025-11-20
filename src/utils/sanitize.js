/**
 * Input sanitization utilities
 * Sanitizes user input to prevent XSS and other security issues
 */

/**
 * Sanitize a string by removing potentially dangerous characters
 * @param {string} input - The input string to sanitize
 * @param {Object} options - Sanitization options
 * @returns {string} Sanitized string
 */
export function sanitizeString(input, options = {}) {
  if (input == null) return "";

  const {
    trim = true,
    removeHtml = true,
    maxLength = null,
    allowNewlines = false,
  } = options;

  let sanitized = String(input);

  // Trim whitespace
  if (trim) {
    sanitized = sanitized.trim();
  }

  // Remove HTML tags if needed
  if (removeHtml) {
    sanitized = sanitized.replace(/<[^>]*>/g, "");
  }

  // Remove control characters except newlines if allowed
  if (allowNewlines) {
    sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, "");
  } else {
    sanitized = sanitized.replace(/[\x00-\x1F\x7F]/g, "");
  }

  // Limit length if specified
  if (maxLength && sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
}

/**
 * Sanitize an email address
 * @param {string} email - Email to sanitize
 * @returns {string} Sanitized email
 */
export function sanitizeEmail(email) {
  if (!email) return "";
  return sanitizeString(email, {
    trim: true,
    removeHtml: true,
    maxLength: 255,
  });
}

/**
 * Sanitize a phone number
 * @param {string} phone - Phone number to sanitize
 * @returns {string} Sanitized phone number
 */
export function sanitizePhone(phone) {
  if (!phone) return "";
  // Allow common phone characters: +, -, (, ), spaces, digits
  return sanitizeString(phone, { trim: true, removeHtml: true }).replace(
    /[^\d+\-()\s]/g,
    ""
  );
}

/**
 * Sanitize a URL
 * @param {string} url - URL to sanitize
 * @returns {string} Sanitized URL
 */
export function sanitizeUrl(url) {
  if (!url) return "";
  return sanitizeString(url, { trim: true, removeHtml: true, maxLength: 2048 });
}

/**
 * Sanitize a number value
 * @param {string|number} value - Number to sanitize
 * @returns {string} Sanitized number string
 */
export function sanitizeNumber(value) {
  if (value == null || value === "") return "";
  const numStr = String(value).trim();
  // Remove all non-numeric characters except decimal point and minus sign
  return numStr.replace(/[^\d.-]/g, "");
}

/**
 * Sanitize text that may contain newlines (like notes, addresses)
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export function sanitizeText(text) {
  if (!text) return "";
  return sanitizeString(text, {
    trim: true,
    removeHtml: true,
    allowNewlines: true,
  });
}

/**
 * Sanitize an entire form object
 * @param {Object} formData - Form data object
 * @param {Object} fieldConfig - Configuration for each field type
 * @returns {Object} Sanitized form data
 */
export function sanitizeFormData(formData, fieldConfig = {}) {
  const sanitized = {};

  for (const [key, value] of Object.entries(formData)) {
    if (value == null) {
      sanitized[key] = "";
      continue;
    }

    // Use field-specific config if available
    const config = fieldConfig[key];
    if (config) {
      if (config.type === "email") {
        sanitized[key] = sanitizeEmail(value);
      } else if (config.type === "phone") {
        sanitized[key] = sanitizePhone(value);
      } else if (config.type === "url") {
        sanitized[key] = sanitizeUrl(value);
      } else if (config.type === "number") {
        sanitized[key] = sanitizeNumber(value);
      } else if (config.type === "text") {
        sanitized[key] = sanitizeText(value);
      } else {
        sanitized[key] = sanitizeString(value, config.options || {});
      }
    } else {
      // Default sanitization
      sanitized[key] = sanitizeString(value);
    }
  }

  return sanitized;
}
