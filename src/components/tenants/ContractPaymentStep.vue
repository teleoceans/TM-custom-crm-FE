<template>
  <div class="flex flex-col gap-6">
    <!-- Aria-live region for dynamic updates -->
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      <span v-if="successMessage">{{ successMessage }}</span>
      <span v-if="errorMessage">{{ errorMessage }}</span>
    </div>

    <!-- Contract Start Date -->
    <ContractDatePicker
      :model-value="props.modelValue.contractStartDate"
      :required="true"
      @update:model-value="updateField('contractStartDate', $event)"
    />

    <!-- Contract Document Section -->
    <ContractDocumentCard
      :document="contractDocument"
      @download="handleDocumentDownload"
    />

    <!-- Payment Link Section -->
    <PaymentLinkInput
      :model-value="props.modelValue.paymentLink"
      :error="paymentLinkError"
      @update:model-value="updateField('paymentLink', $event)"
      @blur="validatePaymentLink"
      @copy="handleCopyLink"
    />

    <!-- Success/Error Messages -->
    <MessageAlert
      v-if="successMessage"
      :message="successMessage"
      type="success"
    />
    <MessageAlert v-if="errorMessage" :message="errorMessage" type="error" />

    <!-- Action Buttons -->
    <div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Button
        variant="primary"
        :disabled="!canCreateContract"
        @click="handleCreateContract"
        aria-label="Create contract document"
      >
        <template #icon-left>
          <SpinnerIcon
            v-if="isCreatingContract"
            class="h-4 w-4"
            aria-hidden="true"
          />
          <DocumentIcon v-else class="h-4 w-4" aria-hidden="true" />
        </template>
        <span v-if="isCreatingContract">Preparing...</span>
        <span v-else>Create Contract</span>
      </Button>
      <Button
        variant="secondary"
        :disabled="!contractDocument || isSending"
        @click="handleSendToClient"
        aria-label="Send contract to client"
      >
        <template #icon-left>
          <SpinnerIcon v-if="isSending" class="h-4 w-4" aria-hidden="true" />
          <SendIcon v-else class="h-4 w-4" aria-hidden="true" />
        </template>
        <span v-if="isSending">Sending...</span>
        <span v-else>Send to Client</span>
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import Button from "../common/Button.vue";
import DocumentIcon from "../icons/common/DocumentIcon.vue";
import SpinnerIcon from "../icons/common/SpinnerIcon.vue";
import SendIcon from "../icons/common/SendIcon.vue";
import ContractDatePicker from "./ContractDatePicker.vue";
import ContractDocumentCard from "./ContractDocumentCard.vue";
import PaymentLinkInput from "./PaymentLinkInput.vue";
import MessageAlert from "../common/MessageAlert.vue";
import { useMessageHandler } from "../../composables/useMessageHandler";
import {
  validationPatterns,
  validationMessages,
} from "../../composables/useFormValidation";

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

const isCreatingContract = ref(false);
const isSending = ref(false);
const paymentLinkError = ref("");

// Use message handler composable
const { successMessage, errorMessage, setSuccess, setError } =
  useMessageHandler();

// Button is enabled when date is selected - payment link is NOT required
const canCreateContract = computed(() => {
  const contractStartDate = props.modelValue?.contractStartDate;
  const hasDate = !!contractStartDate && String(contractStartDate).length > 0;
  const notCreating = !isCreatingContract.value;
  return hasDate && notCreating;
});

const contractDocument = computed(() => props.modelValue.contractDocument);

const updateField = (field, value) => {
  const updated = {
    ...props.modelValue,
    [field]: value,
  };
  emit("update:modelValue", updated);
  // Clear error when user starts typing
  if (field === "paymentLink") {
    paymentLinkError.value = "";
  }
};

const validatePaymentLink = () => {
  if (!props.modelValue.paymentLink) {
    paymentLinkError.value = "";
    return true;
  }

  if (!validationPatterns.url.test(props.modelValue.paymentLink)) {
    paymentLinkError.value = validationMessages.url;
    return false;
  }

  paymentLinkError.value = "";
  return true;
};

const handleCreateContract = async () => {
  if (!props.modelValue.contractStartDate) {
    setError("Please select a contract start date");
    return;
  }

  isCreatingContract.value = true;
  setError("");
  setSuccess("");

  setTimeout(async () => {
    const mockContract = {
      name: "Client Contract",
      pages: 12,
      size: "18 MB",
      format: "PDF",
      url: "#",
    };
    // Update the contract document
    updateField("contractDocument", mockContract);

    // Wait for Vue to process the update
    await nextTick();

    isCreatingContract.value = false;
    setSuccess("Contract generated successfully!");
    emit("create-contract", mockContract);
  }, 2000);
};

const handleSendToClient = async () => {
  if (!contractDocument.value) {
    setError("Please create a contract first");
    return;
  }

  if (!props.modelValue.paymentLink) {
    setError("Please enter a payment link");
    return;
  }

  if (!validatePaymentLink()) {
    setError("Please enter a valid payment link URL");
    return;
  }

  isSending.value = true;
  setError("");
  setSuccess("");

  setTimeout(() => {
    isSending.value = false;
    setSuccess("Contract sent to client successfully!");
    emit("send-to-client", {
      contract: contractDocument.value,
      paymentLink: props.modelValue.paymentLink,
    });
  }, 1500);
};

const handleDocumentDownload = ({ error }) => {
  if (error) {
    setError(error);
  }
};

const handleCopyLink = ({ error }) => {
  if (error) {
    setError(error);
  }
};
</script>

<style scoped>
/* Screen reader only class */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Smooth transitions for interactive elements */
button {
  transition: all 0.2s ease-in-out;
}
</style>
