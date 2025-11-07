<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="option in options"
      :key="option.value"
      type="button"
      :class="[
        'flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors',
        isSelected(option.value)
          ? 'border-primary-600 bg-primary-50 text-primary-700 dark:border-primary-400 dark:bg-primary-400/10 dark:text-primary-300'
          : 'border-gray-200 text-gray-600 hover:border-primary-300 hover:text-primary-600 dark:border-gray-700 dark:text-gray-300 dark:hover:border-primary-500 dark:hover:text-primary-400',
      ]"
      @click="select(option.value)"
    >
      <span
        class="h-3 w-3 rounded-full border border-white/40 shadow"
        :style="{ background: option.background }"
      />
      <span>{{ option.label }}</span>
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue"]);

const select = (value) => {
  emit("update:modelValue", value);
};

const isSelected = (value) => props.modelValue === value;
</script>
