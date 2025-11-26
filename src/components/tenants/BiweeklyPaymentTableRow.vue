<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <tr
      v-if="enabled"
      :key="rowKey"
      class="border-b bg-white even:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:even:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <td
        class="px-3 py-3 md:px-6 md:py-4 font-medium text-gray-900 dark:text-white"
      >
        {{ name }}
      </td>
      <td
        class="px-3 py-3 md:px-6 md:py-4 text-right font-mono text-xs md:text-sm"
      >
        {{ formatCurrency(price) }}
      </td>
      <td class="px-3 py-3 md:px-6 md:py-4 text-right">
        {{ quantity }}
      </td>
      <td
        class="px-3 py-3 md:px-6 md:py-4 text-right font-medium font-mono text-gray-900 dark:text-white text-xs md:text-sm"
      >
        {{ formatCurrency(subtotal) }}
      </td>
    </tr>
  </Transition>
</template>

<script setup>
import { formatCurrency } from "../../utils/formatters";

defineProps({
  rowKey: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: [Number, String],
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  enabled: {
    type: Boolean,
    default: false,
  },
});
</script>

