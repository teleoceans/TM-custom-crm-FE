<template>
  <div class="rounded-lg p-4 md:p-6" :style="cardWithShadow">
    <div class="items-start justify-between sm:flex">
      <div class="mb-4 sm:mb-0">
        <h2 class="mb-1 text-2xl font-bold leading-none" :style="textPrimary">
          {{ amount }}
        </h2>
        <p :style="textSecondary">{{ description }}</p>
      </div>
      <div>
        <div date-rangepicker datepicker-autohide class="flex items-center">
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
            >
              <CalendarIcon :style="textSecondary" />
            </div>
            <input
              name="start"
              type="text"
              class="block w-32 rounded-lg border p-2 ps-9 text-sm datepicker-input"
              :style="inputStyle"
              placeholder="Start date"
            />
          </div>
          <span class="mx-4" :style="textSecondary">to</span>
          <div class="relative">
            <div
              class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
            >
              <CalendarIcon :style="textSecondary" />
            </div>
            <input
              name="end"
              type="text"
              class="block w-32 rounded-lg border p-2 ps-9 text-sm datepicker-input"
              :style="inputStyle"
              placeholder="End date"
            />
          </div>
        </div>
      </div>
    </div>
    <div :id="chartId" class="w-full overflow-hidden" style="min-height: 535px">
      <slot name="chart">
        <!-- Chart placeholder - Replace with actual chart component -->
        <div class="h-[520px] w-full rounded" :style="bgTertiary"></div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import CalendarIcon from "../icons/Calendar.vue";
import { useThemeStyles } from "../../composables/useThemeStyles";

/**
 * Revenue Chart Card component
 * Displays a revenue amount with description, date range picker, and chart
 * @component
 */

const { cardWithShadow, textPrimary, textSecondary, inputStyle, bgTertiary } =
  useThemeStyles();

const props = defineProps({
  /**
   * Revenue amount to display
   */
  amount: {
    type: String,
    required: true,
  },
  /**
   * Description text below the amount
   */
  description: {
    type: String,
    required: true,
  },
  /**
   * Chart container ID
   */
  chartId: {
    type: String,
    default: "total-sales-chart",
  },
});
</script>

<style scoped>
.datepicker-input:focus {
  border-color: var(--color-border-focus) !important;
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.dark .datepicker-input:focus {
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.2);
}
</style>
