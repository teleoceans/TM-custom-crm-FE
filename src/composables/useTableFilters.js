import { computed } from "vue";
import { isWithinRange } from "./useDateFilter.js";

/**
 * Composable for filtering table items with multiple filter types
 * @param {Object} options - Configuration options
 * @param {Ref<Array>} options.items - Items to filter
 * @param {Ref<string>} options.searchTerm - Search term
 * @param {Array} options.searchFields - Fields to search in
 * @param {Object} options.dateFilter - Date filter configuration
 * @param {Ref<string>} options.dateFilter.value - Date filter value (e.g., "last-30-days")
 * @param {boolean} options.dateFilter.enabled - Whether date filtering is enabled
 * @param {string} options.dateFilter.field - Field name containing the date
 * @param {Object} options.stageFilter - Stage filter configuration
 * @param {Ref<Array>} options.stageFilter.selectedStages - Selected stage values
 * @param {Object} options.stageFilter.mapping - Mapping from filter values to actual stage values
 * @param {Object} options.rangeFilter - Range filter configuration
 * @param {Ref<Object>} options.rangeFilter.range - Range object with from/to
 * @param {string} options.rangeFilter.field - Field name to filter by range
 * @param {Object} options.roleFilter - Role filter configuration
 * @param {Ref<Array>} options.roleFilter.selectedRoles - Selected role values
 * @param {string} options.roleFilter.field - Field name containing the role (default: "role")
 * @param {Object} options.tenantFilter - Tenant filter configuration
 * @param {Ref<Array>} options.tenantFilter.selectedTenants - Selected tenant IDs
 * @param {string} options.tenantFilter.field - Field name containing tenant info (default: "assignedTo")
 * @param {Function} options.tenantFilter.mapper - Function to map tenant ID to label
 * @param {Object} options.statusFilter - Status filter configuration
 * @param {Ref<Array>} options.statusFilter.selectedStatuses - Selected status values
 * @param {string} options.statusFilter.field - Field name containing the status (default: "status")
 * @returns {Object} Filtered items
 */
export function useTableFilters({
  items,
  searchTerm = { value: "" },
  searchFields = [],
  dateFilter = null,
  stageFilter = null,
  rangeFilter = null,
  roleFilter = null,
  tenantFilter = null,
  statusFilter = null,
}) {
  const filteredItems = computed(() => {
    const term = (searchTerm.value || "").trim().toLowerCase();
    const shouldFilterByDate =
      dateFilter?.enabled && Boolean(dateFilter.field);

    return items.value.filter((item) => {
      // Search term filter
      const matchesTerm =
        !term ||
        searchFields
          .map((field) => item[field])
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(term));

      if (!matchesTerm) return false;

      // Date filter
      const matchesDate = shouldFilterByDate
        ? isWithinRange(item[dateFilter.field], dateFilter.value)
        : true;

      if (!matchesDate) return false;

      // Stage filter
      if (stageFilter?.selectedStages?.value) {
        const selectedStages = stageFilter.selectedStages.value;
        if (selectedStages.length > 0) {
          const matchesStage = selectedStages.some((filterStage) => {
            const mappedStage = stageFilter.mapping?.[filterStage] || filterStage;
            return item.stage === mappedStage;
          });
          if (!matchesStage) return false;
        }
      }

      // Range filter
      if (rangeFilter?.range?.value && rangeFilter.field) {
        const range = rangeFilter.range.value;
        if (range.from !== null || range.to !== null) {
          const fieldValue = item[rangeFilter.field] || 0;
          const from = range.from !== null ? range.from : -Infinity;
          const to = range.to !== null ? range.to : Infinity;
          if (fieldValue < from || fieldValue > to) return false;
        }
      }

      // Role filter
      if (roleFilter?.selectedRoles?.value) {
        const selectedRoles = roleFilter.selectedRoles.value;
        if (selectedRoles.length > 0) {
          const roleField = roleFilter.field || "role";
          if (item[roleField]) {
            if (!selectedRoles.includes(item[roleField])) return false;
          } else {
            // If item doesn't have role field, skip this filter
            // (e.g., for tenants that don't have direct role field)
          }
        }
      }

      // Tenant filter
      if (tenantFilter?.selectedTenants?.value) {
        const selectedTenants = tenantFilter.selectedTenants.value;
        if (selectedTenants.length > 0) {
          const tenantField = tenantFilter.field || "assignedTo";
          const mapper = tenantFilter.mapper || ((id) => id);
          const matchesTenant = selectedTenants.some((tenantId) => {
            const tenantLabel = mapper(tenantId);
            const fieldValue = item[tenantField];
            return (
              tenantLabel &&
              fieldValue &&
              String(fieldValue).includes(tenantLabel)
            );
          });
          if (!matchesTenant) return false;
        }
      }

      // Status filter
      if (statusFilter?.selectedStatuses?.value) {
        const selectedStatuses = statusFilter.selectedStatuses.value;
        if (selectedStatuses.length > 0) {
          const statusField = statusFilter.field || "status";
          if (!selectedStatuses.includes(item[statusField])) return false;
        }
      }

      return true;
    });
  });

  return {
    filteredItems,
  };
}

