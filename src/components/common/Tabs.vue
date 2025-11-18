<template>
  <div
    class="overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
  >
    <div
      class="flex min-w-full flex-row items-center gap-2 p-4 sm:gap-4 sm:p-6"
    >
      <template v-for="(tab, index) in tabs" :key="tab.id">
        <button
          type="button"
          :class="[
            'flex flex-shrink-0 flex-row items-center justify-center gap-1 rounded-md px-2 py-1 transition-colors sm:gap-1.5 sm:px-0 sm:py-0',
            isActive(tab.id) || isCompleted(tab.id)
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-gray-500 dark:text-gray-400',
          ]"
          @click="selectTab(tab.id)"
        >
          <component
            :is="tab.icon"
            :class="[
              'h-4 w-4 flex-shrink-0 sm:h-5 sm:w-5',
              isActive(tab.id) || isCompleted(tab.id)
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-400',
            ]"
          />
          <span
            :class="[
              'text-xs font-medium leading-tight sm:text-sm',
              isActive(tab.id) || isCompleted(tab.id)
                ? 'text-purple-600 dark:text-purple-400'
                : 'text-gray-500 dark:text-gray-400',
            ]"
          >
            {{ tab.label }}
          </span>
        </button>
        <div
          v-if="index < tabs.length - 1"
          :class="[
            'h-0.5 flex-1 min-w-[20px] border-t-2 sm:min-w-0',
            isCompleted(tab.id) || isActive(tab.id)
              ? 'border-purple-400 dark:border-purple-500'
              : 'border-gray-400 dark:border-gray-500',
          ]"
        >      </div>
      </template>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (tabs) =>
      tabs.every(
        (tab) =>
          tab.id &&
          typeof tab.id === "string" &&
          tab.label &&
          typeof tab.label === "string" &&
          tab.icon
      ),
  },
  modelValue: {
    type: String,
    required: true,
  },
  completedTabs: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const isActive = (tabId) => {
  return props.modelValue === tabId;
};

const isCompleted = (tabId) => {
  return props.completedTabs.includes(tabId);
};

const selectTab = (tabId) => {
  emit("update:modelValue", tabId);
  emit("change", tabId);
};
</script>

