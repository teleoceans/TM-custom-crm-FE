<template>
  <BaseIcon
    v-if="definition"
    :viewBox="definition.viewBox"
    :size="size"
    :decorative="decorative"
    :title="title"
    v-bind="attrs"
  >
    <path
      v-for="(path, index) in definition.paths"
      :key="index"
      v-bind="path"
    />
  </BaseIcon>
</template>

<script setup>
import { ref, useAttrs, watch } from "vue";
import BaseIcon from "../icons/BaseIcon.vue";
import { getLeadIcon } from "./leadIcons";

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: [Number, String],
    default: null,
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

const attrs = useAttrs();

const definition = ref(null);
let requestId = 0;

watch(
  () => props.name,
  async (name) => {
    requestId += 1;
    const currentRequest = requestId;

    definition.value = null;

    if (!name) {
      return;
    }

    const icon = await getLeadIcon(name);

    if (currentRequest === requestId) {
      definition.value = icon;
    }
  },
  { immediate: true }
);
</script>
