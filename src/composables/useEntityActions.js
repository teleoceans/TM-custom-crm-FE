const DEFAULT_ACTIONS = Object.freeze([
  { label: "Edit", value: "edit" },
  { label: "Delete", value: "delete", tone: "danger" },
]);

const defaultConfirmDelete = (label) =>
  window.confirm(
    `Are you sure you want to delete ${label}? This action cannot be undone.`
  );

const defaultLogger = (message, payload) => {
  // eslint-disable-next-line no-console
  console.info(message, payload);
};

/**
 * Generic entity actions composable for handling row actions (users, tenants, etc.)
 * @param {Object} options - Configuration options
 * @param {Function} options.formatLabel - Function to format entity label (e.g., (entity) => entity.name || entity.id)
 * @param {Function} options.confirmDelete - Custom delete confirmation function
 * @param {Function} options.onEdit - Edit callback
 * @param {Function} options.onDelete - Delete callback
 * @param {Function} options.onAdd - Add/create callback (for entities that use "add" instead of "invite")
 * @param {Function} options.onInvite - Invite callback (for entities that use "invite" instead of "add")
 * @param {Function} options.onView - View callback
 * @param {string} options.entityType - Entity type name for logging (e.g., "user", "tenant")
 * @param {string} options.addMethodName - Method name for add action ("add" or "invite")
 */
export function useEntityActions({
  formatLabel = (entity) => entity?.name || entity?.id || "entity",
  confirmDelete = defaultConfirmDelete,
  onEdit = (entity) => defaultLogger("Edit entity", formatLabel(entity)),
  onDelete = (entity) => defaultLogger("Delete entity", formatLabel(entity)),
  onAdd = () => defaultLogger("Add entity action triggered"),
  onInvite = () => defaultLogger("Invite entity action triggered"),
  onView = (entityId) => defaultLogger("View entity", entityId),
  entityType = "entity",
  addMethodName = "add",
} = {}) {
  const add = () => {
    onAdd();
  };

  const invite = () => {
    onInvite();
  };

  const view = (entityId) => {
    if (!entityId) return;
    onView(entityId);
  };

  const edit = (entity) => {
    if (!entity) return;
    onEdit(entity);
  };

  const remove = (entity) => {
    if (!entity) return;
    const label = formatLabel(entity);
    const confirmed = confirmDelete(label);

    if (!confirmed) return;

    onDelete(entity);
  };

  const handleRowAction = (action, entity) => {
    if (!entity) return;

    if (action === "edit") {
      edit(entity);
      return;
    }

    if (action === "delete") {
      remove(entity);
    }
  };

  const result = {
    rowActions: DEFAULT_ACTIONS,
    view,
    edit,
    remove,
    handleRowAction,
    formatLabel,
  };

  // Add either "add" or "invite" method based on configuration
  if (addMethodName === "invite") {
    result.invite = invite;
  } else {
    result.add = add;
  }

  return result;
}

export default useEntityActions;

