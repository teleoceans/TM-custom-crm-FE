<template>
  <div
    :data-before="beforeId || '-1'"
    :data-column="column"
    class="my-0.5 h-0.5 w-full bg-primary-400 opacity-0 transition-opacity"
  />
</template>

<script setup>
defineProps({
  beforeId: {
    type: String,
    default: null,
  },
  column: {
    type: String,
    required: true,
  },
});
</script>

