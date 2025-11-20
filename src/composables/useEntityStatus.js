const STATUS_CLASS_MAP = {
  Active: "card-chip--success",
  Inactive: "card-chip--danger",
};

/**
 * Generic status composable for entities (users, tenants, etc.)
 * Provides shared helpers for presenting status chips across tables or cards.
 */
export function useEntityStatus() {
  const getStatusClass = (status) =>
    STATUS_CLASS_MAP[status] ?? "card-chip--neutral";

  const getStatusVariant = (status) => {
    if (status === "Active") {
      return "success";
    }
    if (status === "Inactive") {
      return "danger";
    }
    return "neutral";
  };

  return {
    getStatusClass,
    getStatusVariant,
  };
}

export default useEntityStatus;

