<template>
  <router-link to="/" class="mr-4 flex items-center">
    <img v-if="currentLogo" :src="currentLogo" class="mr-3 h-8" :alt="alt" />
    <span
      v-if="brandName || $slots.default"
      class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
    >
      <slot>{{ brandName }}</slot>
    </span>
  </router-link>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "../../composables/useTheme";

/**
 * Navbar logo/brand component
 * Supports different logos for light and dark modes
 * @component
 */

const props = defineProps({
  /**
   * Logo image URL for light mode
   * Default: /images/logoL.svg
   */
  logoLight: {
    type: String,
    default: "/images/logoL.svg",
  },
  /**
   * Logo image URL for dark mode
   * Default: /images/logoD.svg
   */
  logoDark: {
    type: String,
    default: "/images/logoD.svg",
  },
  /**
   * Fallback logo URL (if logoLight/logoDark not provided)
   */
  logoUrl: {
    type: String,
    default: "",
  },
  /**
   * Brand name
   */
  brandName: {
    type: String,
    default: "",
  },
  /**
   * Logo alt text
   */
  alt: {
    type: String,
    default: "Logo",
  },
});

const { isDark } = useTheme();

const currentLogo = computed(() => {
  if (props.logoUrl) {
    return props.logoUrl;
  }
  return isDark.value ? props.logoDark : props.logoLight;
});
</script>
