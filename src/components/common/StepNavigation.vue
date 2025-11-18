<template>
  <div
    class="flex flex-col gap-3 border-t border-gray-200 px-6 py-4 dark:border-gray-700 md:flex-row md:justify-end"
  >
    <slot name="before-buttons" />
    <button
      v-if="showBack"
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 dark:focus:ring-gray-800"
      @click="$emit('back')"
    >
      <svg
        class="h-4 w-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>{{ backLabel || "Back" }}</span>
    </button>
    <button
      v-if="showNext && !submitMode"
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-800"
      @click="$emit('next')"
    >
      <span>{{ nextLabel || "Next" }}</span>
      <svg
        v-if="nextIcon"
        class="h-4 w-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
    <button
      v-if="submitMode"
      type="button"
      class="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-800"
      @click="$emit('submit')"
    >
      <span>{{ submitLabel || "Submit" }}</span>
      <svg
        class="h-4 w-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </button>
  </div>
</template>

<script setup>
defineProps({
  showBack: {
    type: Boolean,
    default: false,
  },
  showNext: {
    type: Boolean,
    default: true,
  },
  backLabel: {
    type: String,
    default: "Back",
  },
  nextLabel: {
    type: String,
    default: "Next",
  },
  submitLabel: {
    type: String,
    default: "Submit",
  },
  nextIcon: {
    type: Boolean,
    default: true,
  },
  submitMode: {
    type: Boolean,
    default: false,
  },
});

defineEmits(["back", "next", "submit"]);
</script>

