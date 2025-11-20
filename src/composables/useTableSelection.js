import { computed, ref, watch } from "vue";

/**
 * Composable for table row selection functionality
 * @param {Object} options - Configuration options
 * @param {Ref<Array>} options.paginatedItems - Currently visible items on the page
 * @param {Ref<Array>} options.allItems - All items (for cleanup)
 * @param {string} options.rowIdKey - Key to use for item IDs (default: "id")
 * @param {boolean} options.selectable - Whether selection is enabled
 * @returns {Object} Selection state and utilities
 */
export function useTableSelection({ paginatedItems, allItems, rowIdKey = "id", selectable = true }) {
  const selectedRowIds = ref([]);

  const allSelectedOnPage = computed(() => {
    if (!selectable || paginatedItems.value.length === 0) return false;
    
    return paginatedItems.value.every((item) =>
      selectedRowIds.value.includes(item[rowIdKey])
    );
  });

  const isIndeterminate = computed(() => {
    if (!selectable) return false;

    const pageRowIds = paginatedItems.value.map((item) => item[rowIdKey]);
    const selectedCount = pageRowIds.filter((id) =>
      selectedRowIds.value.includes(id)
    ).length;
    return selectedCount > 0 && selectedCount < paginatedItems.value.length;
  });

  const toggleSelectAll = (checked) => {
    const pageRowIds = paginatedItems.value.map((item) => item[rowIdKey]);

    if (checked) {
      selectedRowIds.value = Array.from(
        new Set([...selectedRowIds.value, ...pageRowIds])
      );
    } else {
      selectedRowIds.value = selectedRowIds.value.filter(
        (id) => !pageRowIds.includes(id)
      );
    }
  };

  // Clean up invalid selections when items change
  watch(
    allItems,
    (newItems) => {
      const validIds = new Set(newItems.map((item) => item[rowIdKey]));
      selectedRowIds.value = selectedRowIds.value.filter((id) => validIds.has(id));
    },
    { deep: true }
  );

  return {
    selectedRowIds,
    allSelectedOnPage,
    isIndeterminate,
    toggleSelectAll,
  };
}

