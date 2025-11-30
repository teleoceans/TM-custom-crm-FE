<template>
  <div>
    <!-- Header -->
    <div class="text-center">
      <h2
        class="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white"
      >
        {{ title }}
      </h2>
      <p v-if="subtitle" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {{ subtitle }}
      </p>
    </div>
    <!-- Form Content Slot -->
    <div class="mt-8">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: "",
  },
});
</script>

