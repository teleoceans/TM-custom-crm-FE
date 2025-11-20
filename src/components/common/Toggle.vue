<template>
  <label
    :for="toggleId"
    class="relative inline-flex cursor-pointer items-center"
    :class="{ 'cursor-not-allowed opacity-50': disabled }"
  >
    <input
      :id="toggleId"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      class="peer sr-only"
      @change="handleChange"
    />
    <div
      :class="[
        'peer h-6 w-11 rounded-full border transition-colors',
        'after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all',
        'peer-focus:outline-none peer-focus:ring-4',
        modelValue
          ? 'border-primary-600 bg-primary-600 after:translate-x-full after:border-white peer-focus:ring-primary-300 dark:border-primary-500 dark:bg-primary-500 dark:peer-focus:ring-primary-800'
          : 'border-gray-300 bg-gray-200 peer-focus:ring-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-gray-800',
      ]"
    ></div>
  </label>
</template>

<script setup>
import { computed, useId } from "vue";

/**
 * Toggle switch component using Flowbite styling
 * @component
 */

const props = defineProps({
  /**
   * v-model value
   */
  modelValue: {
    type: Boolean,
    default: false,
  },
  /**
   * Toggle id
   */
  id: {
    type: String,
    default: "",
  },
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const generatedId = useId();
const toggleId = computed(() => props.id || generatedId);

const handleChange = (event) => {
  const newValue = event.target.checked;
  emit("update:modelValue", newValue);
  emit("change", newValue);
};
</script>

