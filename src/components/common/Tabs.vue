<template>
  <div
    class="flex flex-row items-center gap-4 rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
  >
    <template v-for="(tab, index) in tabs" :key="tab.id">
      <button
        type="button"
        :class="[
          'flex flex-row items-center justify-center gap-1.5 rounded-md px-0 py-0',
          'transition-colors',
          isActive(tab.id)
            ? 'text-purple-600 dark:text-purple-400'
            : 'text-gray-500 dark:text-gray-400',
        ]"
        @click="selectTab(tab.id)"
      >
        <component
          :is="tab.icon"
          :class="[
            'h-5 w-5 flex-shrink-0',
            isActive(tab.id)
              ? 'text-purple-600 dark:text-purple-400'
              : 'text-gray-500 dark:text-gray-400',
          ]"
        />
        <span
          :class="[
            'text-sm font-medium leading-tight',
            isActive(tab.id) ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500 dark:text-gray-400',
          ]"
        >
          {{ tab.label }}
        </span>
      </button>
      <div
        v-if="index < tabs.length - 1"
        class="h-px flex-1 border-t border-gray-400 dark:border-gray-500"
      >      </div>
    </template>
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
});

const emit = defineEmits(["update:modelValue", "change"]);

const isActive = (tabId) => {
  return props.modelValue === tabId;
};

const selectTab = (tabId) => {
  emit("update:modelValue", tabId);
  emit("change", tabId);
};
</script>

