import { computed, ref, watch } from "vue";

/**
 * Composable for table pagination functionality
 * @param {Object} options - Configuration options
 * @param {Ref<Array>} options.items - Items to paginate
 * @param {number} options.pageSize - Number of items per page
 * @returns {Object} Pagination state and utilities
 */
export function useTablePagination({ items, pageSize }) {
  const currentPage = ref(1);

  const totalRecords = computed(() => items.value.length);

  const totalPages = computed(() =>
    Math.max(1, Math.ceil(totalRecords.value / pageSize))
  );

  const paginatedItems = computed(() => {
    const start = (currentPage.value - 1) * pageSize;
    return items.value.slice(start, start + pageSize);
  });

  const showingRange = computed(() => {
    if (items.value.length === 0) {
      return "0 – 0";
    }

    const start = (currentPage.value - 1) * pageSize + 1;
    const end = Math.min(start + pageSize - 1, items.value.length);
    return `${start} – ${end}`;
  });

  const paginationItems = computed(() => {
    const items = [];
    const total = totalPages.value;

    const addPage = (value) => {
      items.push({ type: "page", value, key: `page-${value}` });
    };

    const addEllipsis = (key) => {
      items.push({ type: "ellipsis", key });
    };

    if (total <= 7) {
      for (let page = 1; page <= total; page += 1) addPage(page);
      return items;
    }

    if (currentPage.value <= 4) {
      for (let page = 1; page <= 5; page += 1) addPage(page);
      addEllipsis("ellipsis-tail");
      addPage(total);
      return items;
    }

    if (currentPage.value >= total - 3) {
      addPage(1);
      addEllipsis("ellipsis-head");
      for (let page = total - 4; page <= total; page += 1) addPage(page);
      return items;
    }

    addPage(1);
    addEllipsis("ellipsis-head");
    addPage(currentPage.value - 1);
    addPage(currentPage.value);
    addPage(currentPage.value + 1);
    addEllipsis("ellipsis-tail");
    addPage(total);
    return items;
  });

  const goToPage = (page) => {
    if (typeof page !== "number") return;
    if (page < 1 || page > totalPages.value) return;
    currentPage.value = page;
  };

  // Reset to page 1 when items change
  watch(
    () => items.value.length,
    () => {
      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
      }
    }
  );

  return {
    currentPage,
    totalPages,
    totalRecords,
    paginatedItems,
    showingRange,
    paginationItems,
    goToPage,
  };
}

