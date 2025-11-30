<template>
  <Button
    v-bind="$attrs"
    :type="type"
    :disabled="disabled || loading"
    :variant="variant"
    :size="size"
    :class="buttonClass"
    @click="$emit('click', $event)"
  >
    <template v-if="loading" #icon-left>
      <SpinnerIcon class="h-4 w-4" />
    </template>
    <slot>
      <span v-if="!loading">{{ defaultText }}</span>
      <span v-else>{{ loadingText }}</span>
    </slot>
  </Button>
</template>

<script setup>
import Button from "./Button.vue";
import SpinnerIcon from "../icons/common/SpinnerIcon.vue";

const props = defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "button",
  },
  variant: {
    type: String,
    default: "primary",
  },
  size: {
    type: String,
    default: "md",
  },
  defaultText: {
    type: String,
    default: "",
  },
  loadingText: {
    type: String,
    default: "Loading...",
  },
  buttonClass: {
    type: String,
    default: "",
  },
});

defineEmits(["click"]);

defineOptions({
  inheritAttrs: false,
});
</script>
