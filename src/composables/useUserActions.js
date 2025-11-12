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

const formatUserLabel = (user) =>
  user?.name || user?.email || user?.id || "user";

/**
 * Centralizes user row actions so multiple views can share behaviour.
 */
export function useUserActions({
  confirmDelete = defaultConfirmDelete,
  onEdit = (user) => defaultLogger("Edit user", formatUserLabel(user)),
  onDelete = (user) => defaultLogger("Delete user", formatUserLabel(user)),
  onInvite = () => defaultLogger("Invite user action triggered"),
  onView = (userId) => defaultLogger("View user", userId),
} = {}) {
  const invite = () => {
    onInvite();
  };

  const view = (userId) => {
    if (!userId) return;
    onView(userId);
  };

  const edit = (user) => {
    if (!user) return;
    onEdit(user);
  };

  const remove = (user) => {
    if (!user) return;
    const label = formatUserLabel(user);
    const confirmed = confirmDelete(label);

    if (!confirmed) return;

    onDelete(user);
  };

  const handleRowAction = (action, user) => {
    if (!user) return;

    if (action === "edit") {
      edit(user);
      return;
    }

    if (action === "delete") {
      remove(user);
    }
  };

  return {
    rowActions: DEFAULT_ACTIONS,
    invite,
    view,
    edit,
    remove,
    handleRowAction,
    formatUserLabel,
  };
}

export default useUserActions;

