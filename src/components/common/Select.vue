<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="selectId"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <select
      ref="selectElement"
      :id="selectId"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
      :autofocus="autofocus"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error ? `${selectId}-error` : undefined"
      :class="[
        'block w-full rounded-lg border p-2.5 text-sm transition-colors',
        'focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white',
        error &&
          'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500',
      ]"
      @change="handleChange"
      @blur="$emit('blur', $event)"
      @focus="$emit('focus', $event)"
    >
      <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
      <option
        v-for="option in options"
        :key="getOptionValue(option)"
        :value="getOptionValue(option)"
      >
        {{ getOptionLabel(option) }}
      </option>
    </select>
    <p
      v-if="error"
      :id="`${selectId}-error`"
      class="mt-2 text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </p>
    <p v-else-if="hint" class="mt-2 text-sm text-gray-500 dark:text-gray-400">
      {{ hint }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref, useId } from "vue";

/**
 * Select component with validation and styling
 * @component
 */

const props = defineProps({
  /**
   * v-model value
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },
  /**
   * Select label
   */
  label: {
    type: String,
    default: "",
  },
  /**
   * Select id
   */
  id: {
    type: String,
    default: "",
  },
  /**
   * Placeholder text (shown as disabled option)
   */
  placeholder: {
    type: String,
    default: "",
  },
  /**
   * Options array - can be array of strings or objects with {value, label}
   */
  options: {
    type: Array,
    required: true,
  },
  /**
   * Error message
   */
  error: {
    type: String,
    default: "",
  },
  /**
   * Hint text
   */
  hint: {
    type: String,
    default: "",
  },
  /**
   * Required field
   */
  required: {
    type: Boolean,
    default: false,
  },
  /**
   * Disabled state
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * Autofocus the select
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus", "change"]);

const selectElement = ref(null);

const generatedId = useId();

const selectId = computed(() => props.id || generatedId);

const getOptionValue = (option) => {
  if (typeof option === "string") {
    return option;
  }
  return option.value ?? option.id ?? option;
};

const getOptionLabel = (option) => {
  if (typeof option === "string") {
    return option;
  }
  return option.label ?? option.name ?? option.value ?? option.id ?? option;
};

const handleChange = (event) => {
  emit("update:modelValue", event.target.value);
  emit("change", event.target.value);
};

const focus = () => {
  selectElement.value?.focus();
};

const blur = () => {
  selectElement.value?.blur();
};

defineExpose({ focus, blur });
</script>
