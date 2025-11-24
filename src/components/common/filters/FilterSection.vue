<template>
  <div
    :class="[
      'border-b border-gray-200 pb-4 dark:border-gray-700',
      { 'last:border-b-0': isLast }
    ]"
  >
    <div class="mb-3 flex items-center justify-between">
      <h3 class="text-base font-bold text-gray-900 dark:text-white">
        {{ title }}
      </h3>
      <button
        type="button"
        class="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
        @click="handleToggle"
      >
              <svg
                class="h-5 w-5 transition-transform"
                :class="{ 'rotate-180': !localExpanded }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
      </button>
    </div>

    <div v-if="localExpanded">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  expanded: {
    type: Boolean,
    default: true,
  },
  isLast: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["toggle"]);

const localExpanded = ref(props.expanded);

const handleToggle = () => {
  localExpanded.value = !localExpanded.value;
  emit("toggle", localExpanded.value);
};
</script>

