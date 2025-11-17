<template>
  <BaseIcon
    viewBox="0 0 21 20"
    :size="size"
    :decorative="decorative"
    :title="title"
  >
    <path
      d="M5.07407 5.83317H14.2407M5.07407 9.99984H10.1667M18.3148 1.6665H2.01852C1.74839 1.6665 1.48933 1.77625 1.29832 1.9716C1.10731 2.16695 1 2.4319 1 2.70817V13.1248C1 13.4011 1.10731 13.6661 1.29832 13.8614C1.48933 14.0568 1.74839 14.1665 2.01852 14.1665H6.09259L9.65741 18.3332L13.2222 14.1665H18.3148C18.5849 14.1665 18.844 14.0568 19.035 13.8614C19.226 13.6661 19.3333 13.4011 19.3333 13.1248V2.70817C19.3333 2.4319 19.226 2.16695 19.035 1.9716C18.844 1.77625 18.5849 1.6665 18.3148 1.6665Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
  </BaseIcon>
</template>

<script setup>
import BaseIcon from "../BaseIcon.vue";

defineProps({
  size: {
    type: [Number, String],
    default: 20,
  },
  decorative: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
});
</script>
