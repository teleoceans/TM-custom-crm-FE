<template>
  <div class="purple-input relative">
    <label
      :for="inputId"
      class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
    >
      Contract Start Date
      <span v-if="required" class="text-red-500" aria-label="required">*</span>
    </label>
    <div class="relative" ref="dateInputContainer">
      <div
        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        aria-hidden="true"
      >
        <CalendarIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
      </div>
      <input
        :id="inputId"
        ref="dateInput"
        type="text"
        :value="formattedDate"
        placeholder="Select date"
        class="block w-full rounded-lg border border-purple-200 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 transition-colors focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 dark:focus:ring-purple-800 datepicker-input"
        data-datepicker
        data-datepicker-autohide
        data-datepicker-format="mm/dd/yyyy"
        readonly
        :aria-label="`Contract start date${required ? ' (required)' : ''}`"
        :aria-required="required"
        :aria-describedby="`${inputId}-helper`"
        @click="showDatepicker"
        @keydown.enter.prevent="showDatepicker"
      />
    </div>
    <p
      :id="`${inputId}-helper`"
      class="mt-1.5 text-xs text-gray-500 dark:text-gray-400"
    >
      Select the date when the contract will begin
    </p>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import CalendarIcon from "../icons/common/Calendar.vue";
import { useDatepicker } from "../../composables/useDatepicker";
import { useDateFormatter } from "../../composables/useDateFormatter";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: true,
  },
  inputId: {
    type: String,
    default: "contract-start-date",
  },
});

const emit = defineEmits(["update:modelValue"]);

const dateInput = ref(null);
const dateInputContainer = ref(null);

const { formatDateTime } = useDateFormatter(
  { month: "2-digit", day: "2-digit", year: "numeric" },
  "en-US"
);

const formattedDate = computed(() => {
  return props.modelValue ? formatDateTime(props.modelValue) : "";
});

const handleDateChange = (dateString) => {
  emit("update:modelValue", dateString || "");
};

const { show: showDatepicker, setDate: setDatepickerDate } = useDatepicker(
  dateInput,
  dateInputContainer,
  handleDateChange,
  props.modelValue
);

// Watch for external date changes
watch(
  () => props.modelValue,
  (newDate) => {
    if (newDate) {
      setDatepickerDate(newDate);
    } else {
      setDatepickerDate(null);
    }
  },
  { immediate: true }
);
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
</style>

