<template>
  <div>
    <label
      :for="inputId"
      class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
    >
      {{ label }}
      <span v-if="required" class="text-primary-600">*</span>
    </label>
    <div class="relative">
      <input
        :id="inputId"
        :type="showPassword ? 'text' : 'password'"
        :value="modelValue"
        :placeholder="placeholder"
        :required="required"
        :autocomplete="autocomplete"
        :class="[
          'relative block w-full rounded-lg border px-3 py-2.5 pr-10 text-sm',
          'text-gray-900 placeholder-gray-500',
          'focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500',
          'dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400',
          'dark:focus:border-primary-500 dark:focus:ring-primary-500',
          'border-gray-300 bg-white',
          error && 'border-red-500 focus:border-red-500 focus:ring-red-500',
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
        @blur="$emit('blur', $event)"
        @focus="$emit('focus', $event)"
      />
      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
      >
        <EyeOffIcon v-if="showPassword" class="h-5 w-5" />
        <EyeIcon v-else class="h-5 w-5" />
      </button>
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
import { ref, computed, useId } from "vue";
import EyeIcon from "../icons/common/EyeIcon.vue";
import EyeOffIcon from "../icons/common/EyeOffIcon.vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  autocomplete: {
    type: String,
    default: "current-password",
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const showPassword = ref(false);
const generatedId = useId();
const inputId = computed(() => props.id || generatedId);
</script>
