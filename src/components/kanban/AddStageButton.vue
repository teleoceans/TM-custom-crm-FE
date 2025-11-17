<template>
  <DashedActionButton :width-class="width" @click="$emit('click')">
    <template #icon>
      <PlusIcon class="h-4 w-4" />
    </template>
    Add New Stage
  </DashedActionButton>
</template>

<script setup>
import PlusIcon from "../icons/common/PlusIcon.vue";
import DashedActionButton from "../common/DashedActionButton.vue";

defineProps({
  width: {
    type: String,
    default: "w-64",
  },
});

defineEmits(["click"]);
</script>
