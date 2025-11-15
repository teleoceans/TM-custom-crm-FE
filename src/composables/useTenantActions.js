import useEntityActions from "./useEntityActions.js";

const formatTenantLabel = (tenant) =>
  tenant?.name || tenant?.id || "tenant";

/**
 * Centralizes tenant row actions so multiple views can share behaviour.
 * This is a wrapper around useEntityActions for backward compatibility.
 */
export function useTenantActions({
  confirmDelete,
  onEdit,
  onDelete,
  onAdd,
  onView,
} = {}) {
  const entityActions = useEntityActions({
    formatLabel: formatTenantLabel,
    confirmDelete,
    onEdit,
    onDelete,
    onAdd,
    onView,
    entityType: "tenant",
    addMethodName: "add",
  });

  return {
    ...entityActions,
    formatTenantLabel,
  };
}

export default useTenantActions;

