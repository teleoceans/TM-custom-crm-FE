const STATUS_CLASS_MAP = {
  Active: "card-chip--success",
  Inactive: "card-chip--danger",
};

/**
 * Shared helpers for presenting user status chips across tables or cards.
 */
export function useUserStatus() {
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

export default useUserStatus;

