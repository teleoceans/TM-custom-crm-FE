<template>
  <div
    :style="border ? cardWithBorder : cardStyle"
    :class="['rounded-lg shadow-sm', border ? 'border' : '', paddingClass]"
  >
    <div
      v-if="$slots.header || title"
      class="border-b px-6 py-4"
      :style="borderDefault"
    >
      <slot name="header">
        <h3 class="text-lg font-semibold" :style="textPrimary">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div :class="bodyClass">
      <slot />
    </div>
    <div v-if="$slots.footer" class="border-t px-6 py-4" :style="borderDefault">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useThemeStyles } from "../../composables/useThemeStyles";

/**
 * Card component for content containers
 * @component
 */

const { cardStyle, cardWithBorder, borderDefault, textPrimary } =
  useThemeStyles();

const props = defineProps({
  /**
   * Card title
   */
  title: {
    type: String,
    default: "",
  },
  /**
   * Padding size
   * @type {'sm' | 'md' | 'lg' | 'none' | 'responsive'}
   */
  padding: {
    type: String,
    default: "md",
    validator: (value) =>
      ["sm", "md", "lg", "none", "responsive"].includes(value),
  },
  /**
   * Show border
   */
  border: {
    type: Boolean,
    default: true,
  },
});

const paddingClass = computed(() => {
  const paddingMap = {
    sm: "p-4",
    md: "",
    lg: "p-8",
    none: "",
    responsive: "p-4 md:p-6",
  };
  return paddingMap[props.padding];
});

const bodyClass = computed(() => {
  if (props.padding === "none") return "";
  if (props.padding === "responsive") return "";
  const paddingMap = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };
  return paddingMap[props.padding] || "p-6";
});
</script>
