<template>
  <div class="flex items-center">
    <img
      v-if="currentLogo"
      :src="currentLogo"
      :class="[logoClass, className]"
      :alt="alt"
    />
    <span
      v-if="brandName || $slots.default"
      class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
    >
      <slot>{{ brandName }}</slot>
    </span>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useTheme } from "../../composables/useTheme";

const props = defineProps({
  logoLight: {
    type: String,
    default: "/images/logoL.svg",
  },
  logoDark: {
    type: String,
    default: "/images/logoD.svg",
  },
  logoUrl: {
    type: String,
    default: "",
  },
  brandName: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "Logo",
  },
  logoClass: {
    type: String,
    default: "h-12 w-auto",
  },
  className: {
    type: String,
    default: "",
  },
});

defineOptions({
  inheritAttrs: false,
});

const { isDark } = useTheme();

const currentLogo = computed(() => {
  if (props.logoUrl) {
    return props.logoUrl;
  }
  return isDark.value ? props.logoDark : props.logoLight;
});
</script>
