import useEntityActions from "./useEntityActions.js";

const formatUserLabel = (user) =>
  user?.name || user?.email || user?.id || "user";

/**
 * Centralizes user row actions so multiple views can share behaviour.
 * This is a wrapper around useEntityActions for backward compatibility.
 */
export function useUserActions({
  confirmDelete,
  onEdit,
  onDelete,
  onInvite,
  onView,
} = {}) {
  const entityActions = useEntityActions({
    formatLabel: formatUserLabel,
    confirmDelete,
    onEdit,
    onDelete,
    onInvite,
    onView,
    entityType: "user",
    addMethodName: "invite",
  });

  return {
    ...entityActions,
    formatUserLabel,
  };
}

export default useUserActions;

