<template>
  <svg
    v-bind="svgAttrs"
    xmlns="http://www.w3.org/2000/svg"
    :aria-hidden="ariaHidden"
    :role="role"
    :aria-labelledby="titleId"
  >
    <title v-if="titleId" :id="titleId">{{ title }}</title>
    <slot />
  </svg>
</template>

<script setup>
import { computed, useAttrs } from "vue";

let iconInstanceId = 0;

const props = defineProps({
  viewBox: {
    type: String,
    required: true,
  },
  decorative: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "",
  },
  size: {
    type: [Number, String],
    default: null,
  },
  width: {
    type: [Number, String],
    default: null,
  },
  height: {
    type: [Number, String],
    default: null,
  },
});

const attrs = useAttrs();

const instanceId = `tm-icon-${++iconInstanceId}`;

const titleId = computed(() => {
  if (!props.title) {
    return undefined;
  }
  return `${instanceId}-title`;
});

const ariaHidden = computed(() => {
  if (props.decorative && !props.title) {
    return "true";
  }

  return "false";
});

const role = computed(() => {
  if (props.decorative && !props.title) {
    return undefined;
  }

  return "img";
});

const resolvedWidth = computed(() => {
  if (props.size != null) {
    return props.size;
  }

  if (props.width != null) {
    return props.width;
  }

  return attrs.width;
});

const resolvedHeight = computed(() => {
  if (props.size != null) {
    return props.size;
  }

  if (props.height != null) {
    return props.height;
  }

  return attrs.height;
});

const svgAttrs = computed(() => ({
  ...attrs,
  focusable: "false",
  viewBox: props.viewBox,
  width: resolvedWidth.value ?? undefined,
  height: resolvedHeight.value ?? undefined,
}));
</script>
