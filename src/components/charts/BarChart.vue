<template>
  <div
    :id="chartId"
    ref="chartContainer"
    class="w-full overflow-hidden max-w-full"
  ></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, ref, computed, nextTick } from "vue";
import ApexCharts from "apexcharts";
import { useTheme } from "../../composables/useTheme";
import { useResponsive } from "../../composables/useResponsive";
import { useSidebar } from "../../composables/useSidebar";

/**
 * Bar Chart component using ApexCharts
 * @component
 */

const props = defineProps({
  /**
   * Chart container ID
   */
  chartId: {
    type: String,
    required: true,
  },
  /**
   * Chart data series
   */
  series: {
    type: Array,
    default: () => [],
  },
  /**
   * Chart categories (x-axis labels)
   */
  categories: {
    type: Array,
    default: () => [],
  },
  /**
   * Chart height
   */
  height: {
    type: [String, Number],
    default: 520,
  },
  /**
   * Chart colors
   */
  colors: {
    type: Array,
    default: () => ["#5521B5", "#FDBA8C", "#16BDCA"], // purple-800, orange-300, teal-400
  },
});

const { isDark } = useTheme();
const { isMobile, isTablet } = useResponsive();
const { isCollapsed } = useSidebar();
const chartContainer = ref(null);
let chart = null;
let resizeObserver = null;

// Helper function to get CSS variable value
const getThemeVar = (varName) => {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
};

const textColor = computed(
  () => getThemeVar("--color-text-secondary") || "#9CA3AF"
);
const gridColor = computed(
  () => getThemeVar("--color-border-default") || "#374151"
);
const bgColor = computed(() => getThemeVar("--color-bg-card") || "#1F2937");

// Responsive column width: smaller on all devices
const columnWidth = computed(() => {
  if (isMobile.value) return "12px";
  if (isTablet.value) return "20px";
  return "36px";
});

const createChart = () => {
  if (!chartContainer.value) return;

  const containerWidth = chartContainer.value.clientWidth || "100%";

  const options = {
    series: props.series,
    chart: {
      type: "bar",
      height: props.height,
      width: containerWidth,
      background: bgColor.value,
      toolbar: {
        show: false,
      },
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 300,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: columnWidth.value,
        barHeight: "100%",
        borderRadius: 8,
        borderRadiusApplication: "end", // Apply radius only to the top (end) of vertical bars
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 0,
      colors: ["transparent"],
    },
    xaxis: {
      categories: props.categories,
      labels: {
        style: {
          colors: textColor.value,
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: textColor.value,
          fontSize: "12px",
          fontFamily: "Inter, sans-serif",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    colors: props.colors,
    legend: {
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      fontFamily: "Inter, sans-serif",
      labels: {
        colors: textColor.value,
      },
    },
    grid: {
      borderColor: gridColor.value,
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    theme: {
      mode: isDark.value ? "dark" : "light",
    },
  };

  chart = new ApexCharts(chartContainer.value, options);
  chart.render();
};

// Handle resize for responsiveness (window resize or container size change)
const handleResize = () => {
  if (chart && chartContainer.value) {
    const newWidth = chartContainer.value.clientWidth || "100%";
    chart.updateOptions({
      chart: {
        width: newWidth,
      },
    });
    chart.resize();
  }
};

onMounted(() => {
  // Wait for next tick to ensure container is properly sized
  setTimeout(() => {
    createChart();
    window.addEventListener("resize", handleResize);

    // Use ResizeObserver to detect container width changes (e.g., when sidebar collapses)
    if (chartContainer.value && typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(chartContainer.value);
    }
  }, 0);
});

watch(
  () => [props.series, props.categories],
  () => {
    if (chart) {
      chart.updateOptions({
        series: props.series,
        xaxis: {
          categories: props.categories,
        },
      });
    }
  },
  { deep: true }
);

// Watch sidebar collapse state to trigger chart resize
watch([isCollapsed], async () => {
  if (chart) {
    // Wait for sidebar transition to complete (300ms)
    await nextTick();
    setTimeout(() => {
      handleResize();
    }, 350); // Slightly longer than sidebar transition (300ms)
  }
});

watch([isDark, columnWidth], async () => {
  if (chart) {
    // Wait for DOM to update and CSS variables to be recalculated
    await nextTick();
    // Add small delay to ensure CSS variables are updated after class change
    setTimeout(() => {
      if (!chart) return;

      // Get fresh values from CSS variables after theme change
      const currentBgColor =
        getThemeVar("--color-bg-card") ||
        (isDark.value ? "#1F2937" : "#ffffff");
      const currentTextColor =
        getThemeVar("--color-text-secondary") ||
        (isDark.value ? "#9CA3AF" : "#6b7280");
      const currentGridColor =
        getThemeVar("--color-border-default") ||
        (isDark.value ? "#374151" : "#e5e7eb");

      chart.updateOptions({
        chart: {
          background: currentBgColor,
          animations: {
            enabled: true,
            easing: "easeinout",
            speed: 300,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: columnWidth.value,
          },
        },
        theme: {
          mode: isDark.value ? "dark" : "light",
        },
        xaxis: {
          categories: props.categories,
          labels: {
            style: {
              colors: currentTextColor,
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: currentTextColor,
              fontSize: "12px",
              fontFamily: "Inter, sans-serif",
            },
          },
        },
        legend: {
          labels: {
            colors: currentTextColor,
          },
        },
        grid: {
          borderColor: currentGridColor,
          strokeDashArray: 4,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
      });
    }, 50); // Small delay to ensure CSS variables are updated (matches CSS transition)
  }
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  if (chart) {
    chart.destroy();
  }
});
</script>
