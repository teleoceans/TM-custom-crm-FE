<template>
  <router-link
    :to="to"
    class="text-sm font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
  >
    <slot />
  </router-link>
</template>

<script setup>
defineProps({
  to: {
    type: String,
    required: true,
  },
});
</script>

