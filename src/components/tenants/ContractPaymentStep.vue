<template>
  <div class="flex flex-col gap-6">
    <!-- Contract Start Date -->
    <div class="purple-input relative">
      <label
        for="contract-start-date"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
      >
        Contract Start Date
      </label>
      <div class="relative" ref="dateInputContainer">
        <div
          class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
        >
          <CalendarIcon class="h-5 w-5 text-gray-500 dark:text-gray-400" />
        </div>
        <input
          id="contract-start-date"
          ref="dateInput"
          type="text"
          :value="formattedDate"
          placeholder="Select date"
          class="block w-full rounded-lg border border-purple-200 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 transition-colors focus:border-purple-500 focus:ring-4 focus:ring-purple-200 dark:border-purple-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-400 dark:focus:ring-purple-800 datepicker-input"
          data-datepicker
          data-datepicker-autohide
          data-datepicker-format="mm/dd/yyyy"
          readonly
          @click="showDatepicker"
          @change="handleDateChange"
        />
      </div>
    </div>

    <!-- Contract Document Section -->
    <div
      class="rounded-lg border-2 border-dashed border-purple-300 bg-purple-50/50 p-6 dark:border-purple-700 dark:bg-purple-900/10"
    >
      <div v-if="contractDocument" class="flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div
            class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/30"
          >
            <DocumentIcon
              class="h-6 w-6 text-purple-600 dark:text-purple-400"
            />
          </div>
          <div>
            <h3 class="text-sm font-semibold text-gray-900 dark:text-white">
              {{ contractDocument.name }}
            </h3>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              {{ contractDocument.pages }} Pages • {{ contractDocument.size }} •
              {{ contractDocument.format }}
            </p>
          </div>
        </div>
        <button
          type="button"
          class="rounded-lg p-2 text-gray-500 transition-colors hover:bg-purple-100 hover:text-purple-600 dark:text-gray-400 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
          @click="handleDownload"
          :title="`Download ${contractDocument.name}`"
        >
          <DownloadIcon class="h-5 w-5" />
        </button>
      </div>
      <div v-else class="text-center">
        <p class="text-sm text-gray-500 dark:text-gray-400">
          Contract will be generated after clicking "Create Contract"
        </p>
      </div>
    </div>

    <!-- Payment Link Section -->
    <div class="space-y-2">
      <label
        for="payment-link"
        class="block text-sm font-medium text-gray-900 dark:text-white"
      >
        Payment Link
      </label>
      <div class="flex gap-2">
        <div class="purple-input flex-1">
          <Input
            id="payment-link"
            :model-value="modelValue.paymentLink || ''"
            type="url"
            placeholder="https://pay.link/xyz123"
            @update:model-value="updateField('paymentLink', $event)"
          />
        </div>
        <button
          type="button"
          class="inline-flex items-center justify-center rounded-lg border border-purple-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-purple-50 focus:outline-none focus:ring-4 focus:ring-purple-200 dark:border-purple-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-purple-900/20 dark:focus:ring-purple-800"
          @click="handleCopyLink"
          :title="'Copy payment link'"
        >
          <CopyIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Button
        variant="primary"
        :disabled="isCreatingContract || !modelValue.contractStartDate"
        @click="handleCreateContract"
      >
        <span v-if="isCreatingContract">Preparing...</span>
        <span v-else>Create Contract</span>
      </Button>
      <Button
        variant="primary"
        :disabled="!contractDocument || isSending"
        @click="handleSendToClient"
      >
        <span v-if="isSending">Sending...</span>
        <span v-else>Send to Client</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import Input from "../common/Input.vue";
import Button from "../common/Button.vue";
import CalendarIcon from "../icons/common/Calendar.vue";
import DocumentIcon from "../icons/common/DocumentIcon.vue";
import DownloadIcon from "../icons/common/DownloadIcon.vue";
import CopyIcon from "../icons/common/CopyIcon.vue";
import { useDatepicker } from "../../composables/useDatepicker";
import { useDateFormatter } from "../../composables/useDateFormatter";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      contractStartDate: "",
      paymentLink: "",
      contractDocument: null,
    }),
  },
});

const emit = defineEmits([
  "update:modelValue",
  "create-contract",
  "send-to-client",
]);

const dateInput = ref(null);
const dateInputContainer = ref(null);
const isCreatingContract = ref(false);
const isSending = ref(false);

const { formatDateTime } = useDateFormatter(
  { month: "2-digit", day: "2-digit", year: "numeric" },
  "en-US"
);

const formattedDate = computed(() => {
  return props.modelValue.contractStartDate
    ? formatDateTime(props.modelValue.contractStartDate)
    : "";
});

const contractDocument = computed(() => props.modelValue.contractDocument);

const updateField = (field, value) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [field]: value,
  });
};

const handleDateChange = (dateString) => {
  updateField("contractStartDate", dateString || "");
};

const { show: showDatepicker, setDate: setDatepickerDate } = useDatepicker(
  dateInput,
  dateInputContainer,
  handleDateChange,
  props.modelValue.contractStartDate
);

// Watch for external date changes
watch(
  () => props.modelValue.contractStartDate,
  (newDate) => {
    if (newDate && dateInput.value) {
      const formatted = formatDateTime(newDate);
      if (dateInput.value.value !== formatted) {
        dateInput.value.value = formatted;
        setDatepickerDate(newDate);
      }
    } else if (!newDate && dateInput.value) {
      dateInput.value.value = "";
      setDatepickerDate(null);
    }
  },
  { immediate: true }
);

const handleCreateContract = async () => {
  if (!props.modelValue.contractStartDate) return;

  isCreatingContract.value = true;
  setTimeout(() => {
    const mockContract = {
      name: "Client Contract",
      pages: 12,
      size: "18 MB",
      format: "PDF",
      url: "#",
    };
    updateField("contractDocument", mockContract);
    isCreatingContract.value = false;
    emit("create-contract", mockContract);
  }, 2000);
};

const handleSendToClient = async () => {
  if (!contractDocument.value) return;
  isSending.value = true;
  setTimeout(() => {
    isSending.value = false;
    emit("send-to-client", {
      contract: contractDocument.value,
      paymentLink: props.modelValue.paymentLink,
    });
  }, 1500);
};

const handleDownload = () => {
  contractDocument.value?.url &&
    window.open(contractDocument.value.url, "_blank");
};

const handleCopyLink = async () => {
  if (!props.modelValue.paymentLink) return;
  try {
    await navigator.clipboard.writeText(props.modelValue.paymentLink);
    console.log("Payment link copied to clipboard");
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};
</script>

<style scoped>
/* Purple input styling for CreateTenant form */
.purple-input :deep(input) {
  border-color: rgb(233 213 255) !important; /* purple-200 */
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

/* Ensure datepicker calendar is positioned correctly and stays visible */
:deep(.datepicker-dropdown) {
  position: absolute !important;
  z-index: 1000;
}

:deep(.datepicker-picker) {
  position: absolute !important;
}

/* Prevent calendar from disappearing on scroll */
:deep(.datepicker) {
  position: relative;
}
</style>
