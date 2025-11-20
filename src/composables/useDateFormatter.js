const DEFAULT_LOCALE = "en-US";

const DEFAULT_OPTIONS = {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
};

/**
 * Provides memoizable date formatting helpers so components can remain lean.
 * @param {Object} [options]
 * @param {string} [locale]
 */
export function useDateFormatter(options = DEFAULT_OPTIONS, locale = DEFAULT_LOCALE) {
  const formatter = new Intl.DateTimeFormat(locale, options);

  const formatDateTime = (value, overrideOptions) => {
    if (!value) return "—";

    if (overrideOptions) {
      return new Intl.DateTimeFormat(locale, {
        ...options,
        ...overrideOptions,
      }).format(new Date(value));
    }

    return formatter.format(new Date(value));
  };

  return {
    formatDateTime,
  };
}

export default useDateFormatter;

