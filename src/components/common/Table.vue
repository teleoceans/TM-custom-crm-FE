<template>
  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table class="w-full text-left text-sm text-gray-500 dark:text-gray-400">
      <thead
        class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            scope="col"
            :class="[
              'px-6 py-3',
              column.align === 'right'
                ? 'text-right'
                : column.align === 'center'
                ? 'text-center'
                : 'text-left',
            ]"
          >
            {{ column.label }}
          </th>
          <th v-if="$slots.actions" scope="col" class="px-6 py-3 text-right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in data"
          v-memo="[row, rowIndex]"
          :key="rowIndex"
          class="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :class="[
              'px-6 py-4',
              column.align === 'right'
                ? 'text-right'
                : column.align === 'center'
                ? 'text-center'
                : '',
            ]"
          >
            <slot
              :name="`cell-${column.key}`"
              :row="row"
              :value="row[column.key]"
            >
              {{ row[column.key] }}
            </slot>
          </td>
          <td v-if="$slots.actions" class="px-6 py-4 text-right">
            <slot name="actions" :row="row" :index="rowIndex" />
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td
            :colspan="columns.length + ($slots.actions ? 1 : 0)"
            class="px-6 py-4 text-center"
          >
            <slot name="empty">
              <p class="text-gray-500 dark:text-gray-400">No data available</p>
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
/**
 * Responsive table component
 * @component
 */

defineProps({
  /**
   * Table columns configuration
   * @type {Array<{key: string, label: string, align?: 'left' | 'center' | 'right'}>}
   */
  columns: {
    type: Array,
    required: true,
  },
  /**
   * Table data
   */
  data: {
    type: Array,
    default: () => [],
  },
});
</script>
