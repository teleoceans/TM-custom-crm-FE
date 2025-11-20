<template>
  <div class="space-y-2">
    <label
      :for="inputId"
      class="block text-sm font-medium text-gray-900 dark:text-white"
    >
      Payment Link
    </label>
    <div class="flex gap-2">
      <div class="purple-input flex-1 relative">
        <Input
          :id="inputId"
          :model-value="modelValue || ''"
          type="text"
          placeholder="https://pay.link/xyz123"
          :error="error"
          @update:model-value="handleUpdate"
          @blur="handleBlur"
          aria-label="Payment link URL (optional)"
          :aria-describedby="`${inputId}-helper`"
        />
        <div
          v-if="modelValue && isValidUrl"
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3"
          aria-hidden="true"
        >
          <CheckIcon class="h-5 w-5 text-green-500 dark:text-green-400" />
        </div>
      </div>
      <button
        type="button"
        class="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-all hover:bg-purple-50 hover:border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-200 dark:border-purple-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20 dark:hover:border-purple-600 dark:focus:ring-purple-800"
        :class="{
          'border-green-300 bg-green-50 text-green-700 dark:border-green-600 dark:bg-green-900/20 dark:text-green-400':
            copySuccess,
        }"
        @click="handleCopy"
        :title="copySuccess ? 'Copied!' : 'Copy payment link'"
        :aria-label="
          copySuccess ? 'Link copied to clipboard' : 'Copy payment link'
        "
      >
        <CheckIcon v-if="copySuccess" class="h-5 w-5" aria-hidden="true" />
        <CopyIcon v-else class="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
    <p
      :id="`${inputId}-helper`"
      class="text-xs text-gray-500 dark:text-gray-400"
    >
      Optional: Enter a payment link URL (e.g., https://pay.link/xyz123)
    </p>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Input from "../common/Input.vue";
import CopyIcon from "../icons/common/CopyIcon.vue";
import CheckIcon from "../icons/common/CheckIcon.vue";
import { validationPatterns } from "../../composables/useFormValidation";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  inputId: {
    type: String,
    default: "payment-link",
  },
});

const emit = defineEmits(["update:modelValue", "copy", "blur"]);

const copySuccess = ref(false);

const isValidUrl = computed(() => {
  if (!props.modelValue) return false;
  return validationPatterns.url.test(props.modelValue);
});

const handleUpdate = (value) => {
  emit("update:modelValue", value);
};

const handleBlur = () => {
  emit("blur");
};

const handleCopy = async () => {
  if (!props.modelValue) {
    emit("copy", { error: "No payment link to copy" });
    return;
  }

  try {
    await navigator.clipboard.writeText(props.modelValue);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
    emit("copy", { success: true });
  } catch (err) {
    console.error("Failed to copy link:", err);
    emit("copy", { error: "Failed to copy link to clipboard" });
  }
};
</script>

<style scoped>
/* Purple input styling for CreateTenant form */
.purple-input :deep(input) {
  border-color: rgb(233 213 255) !important; /* purple-200 */
  transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.purple-input :deep(input:focus) {
  border-color: rgb(147 51 234) !important; /* purple-500 */
  --tw-ring-color: rgb(233 213 255) !important; /* purple-200 */
}

.dark .purple-input :deep(input) {
  border-color: rgb(126 34 206) !important; /* purple-700 */
}

.dark .purple-input :deep(input:focus) {
  border-color: rgb(168 85 247) !important; /* purple-400 */
  --tw-ring-color: rgb(88 28 135) !important; /* purple-800 */
}

/* Copy button success state animation */
button[aria-label*="copied"] {
  animation: pulse 0.3s ease-in-out;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}
</style>
