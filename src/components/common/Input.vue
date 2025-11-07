<template>
  <div class="w-full">
    <label
      v-if="label"
      :for="inputId"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <div
        v-if="$slots.prefix || prefixIcon"
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
      >
        <slot name="prefix">
          <component
            :is="prefixIcon"
            v-if="prefixIcon"
            class="h-5 w-5 text-gray-500 dark:text-gray-400"
          />
        </slot>
      </div>
      <input
        ref="inputElement"
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :autofocus="autofocus"
        :class="[
          'block w-full rounded-lg border p-2.5 text-sm transition-colors',
          'focus:border-primary-500 focus:ring-primary-500 dark:focus:border-primary-500 dark:focus:ring-primary-500',
          'disabled:cursor-not-allowed disabled:opacity-50',
          'border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',
          ($slots.prefix || prefixIcon) && 'pl-10',
          ($slots.suffix || suffixIcon) && 'pr-10',
          error &&
            'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500',
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <div
        v-if="$slots.suffix || suffixIcon"
        class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
      >
        <slot name="suffix">
          <component
            :is="suffixIcon"
            v-if="suffixIcon"
            class="h-5 w-5 text-gray-500 dark:text-gray-400"
          />
        </slot>
      </div>
    </div>
    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-400">
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
 * Input component with validation and icons
 * @component
 */

const props = defineProps({
  /**
   * Input type
   */
  type: {
    type: String,
    default: "text",
  },
  /**
   * v-model value
   */
  modelValue: {
    type: [String, Number],
    default: "",
  },
  /**
   * Input label
   */
  label: {
    type: String,
    default: "",
  },
  /**
   * Input id
   */
  id: {
    type: String,
    default: "",
  },
  /**
   * Placeholder text
   */
  placeholder: {
    type: String,
    default: "",
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
   * Prefix icon component
   */
  prefixIcon: {
    type: Object,
    default: null,
  },
  /**
   * Autofocus the input
   */
  autofocus: {
    type: Boolean,
    default: false,
  },
  /**
   * Suffix icon component
   */
  suffixIcon: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const inputElement = ref(null);

const generatedId = useId();

const inputId = computed(() => props.id || generatedId);

const focus = () => {
  inputElement.value?.focus();
};

const blur = () => {
  inputElement.value?.blur();
};

defineExpose({ focus, blur });
</script>
