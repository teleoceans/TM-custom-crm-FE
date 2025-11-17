<template>
  <div>
    <DashedActionButton
      :width-class="buttonWidthClass"
      @click="openCreateModal"
    >
      <template #icon>
        <PlusIcon class="h-4 w-4" />
      </template>
      Add New Lead
    </DashedActionButton>

    <BaseModal
      v-model="showModal"
      :title="modalTitle"
      @close="handleModalClose"
    >
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <Input
          ref="leadNameInput"
          v-model="form.name"
          :id="formIds.name"
          label="Lead Name"
          placeholder="Enter lead name"
          :error="errors.name"
          required
        />
        <Input
          v-model="form.email"
          :id="formIds.email"
          type="email"
          label="Email"
          placeholder="jane.doe@example.com"
        />
        <Input
          v-model="form.phone"
          :id="formIds.phone"
          type="tel"
          label="Phone Number"
          placeholder="(555) 123-4567"
        />
        <Input
          v-model="form.leadValue"
          :id="formIds.leadValue"
          type="number"
          label="Lead Value"
          placeholder="5000"
        />
        <Input
          v-model="form.marketValue"
          :id="formIds.marketValue"
          type="number"
          label="Market Value"
          placeholder="7500"
        />
        <Input
          v-model="form.askingPrice"
          :id="formIds.askingPrice"
          type="number"
          label="Asking Price"
          placeholder="6800"
        />
        <div class="space-y-2">
          <label
            :for="formIds.address"
            class="text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <textarea
            :id="formIds.address"
            v-model="form.address"
            rows="3"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="123 Elm Street, Springfield"
          />
        </div>
        <div class="space-y-2">
          <label
            :for="formIds.notes"
            class="text-sm font-medium text-gray-900 dark:text-white"
          >
            Notes
          </label>
          <textarea
            :id="formIds.notes"
            v-model="form.notes"
            rows="3"
            class="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 transition-colors focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
            placeholder="Add context about this lead..."
          />
        </div>

        <div class="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" @click="closeModal">
            Cancel
          </Button>
          <Button type="submit">{{ submitLabel }}</Button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from "vue";
import PlusIcon from "../icons/common/PlusIcon.vue";
import Input from "../common/Input.vue";
import Button from "../common/Button.vue";
import DashedActionButton from "../common/DashedActionButton.vue";
import BaseModal from "../common/BaseModal.vue";
import { sanitizeFormData } from "../../utils/sanitize";

const props = defineProps({
  column: {
    type: String,
    required: true,
  },
  buttonWidth: {
    type: String,
    default: "w-64",
  },
});

const emit = defineEmits(["add-card", "update-card"]);

const showModal = ref(false);
const mode = ref("create");
const editingCardId = ref(null);

const buttonWidthClass = computed(() => props.buttonWidth || "w-64");

const modalTitle = computed(() =>
  mode.value === "edit" ? "Edit Lead" : "Add New Lead"
);

const submitLabel = computed(() =>
  mode.value === "edit" ? "Save Changes" : "Add Lead"
);

const form = reactive({
  name: "",
  email: "",
  phone: "",
  leadValue: "",
  marketValue: "",
  askingPrice: "",
  address: "",
  notes: "",
});

const errors = reactive({
  name: "",
});

const leadNameInput = ref(null);
const formIds = {
  name: `lead-name-${Math.random().toString(36).slice(2, 8)}`,
  email: `lead-email-${Math.random().toString(36).slice(2, 8)}`,
  phone: `lead-phone-${Math.random().toString(36).slice(2, 8)}`,
  leadValue: `lead-value-${Math.random().toString(36).slice(2, 8)}`,
  marketValue: `lead-market-${Math.random().toString(36).slice(2, 8)}`,
  askingPrice: `lead-asking-${Math.random().toString(36).slice(2, 8)}`,
  address: `lead-address-${Math.random().toString(36).slice(2, 8)}`,
  notes: `lead-notes-${Math.random().toString(36).slice(2, 8)}`,
};

const clearErrors = () => {
  errors.name = "";
};

const resetForm = () => {
  form.name = "";
  form.email = "";
  form.phone = "";
  form.leadValue = "";
  form.marketValue = "";
  form.askingPrice = "";
  form.address = "";
  form.notes = "";
};

const openCreateModal = () => {
  resetForm();
  clearErrors();
  mode.value = "create";
  editingCardId.value = null;
  showModal.value = true;
  nextTick(() => {
    leadNameInput.value?.focus();
  });
};

const openEditModal = (card) => {
  if (!card) return;
  form.name = card.name || card.title || "";
  form.email = card.email || "";
  form.phone = card.phone || "";
  form.leadValue =
    card.leadValue !== undefined && card.leadValue !== null
      ? String(card.leadValue)
      : "";
  form.marketValue =
    card.marketValue !== undefined && card.marketValue !== null
      ? String(card.marketValue)
      : "";
  form.askingPrice =
    card.askingPrice !== undefined && card.askingPrice !== null
      ? String(card.askingPrice)
      : "";
  form.address = card.address || "";
  form.notes = card.notes || "";
  editingCardId.value = card.id;
  mode.value = "edit";
  clearErrors();
  showModal.value = true;
  nextTick(() => {
    leadNameInput.value?.focus();
  });
};

const closeModal = () => {
  showModal.value = false;
  clearErrors();
  resetForm();
  mode.value = "create";
  editingCardId.value = null;
};

const handleModalClose = () => {
  clearErrors();
  resetForm();
  mode.value = "create";
  editingCardId.value = null;
  showModal.value = false;
};

const handleSubmit = () => {
  clearErrors();

  if (!form.name.trim()) {
    errors.name = "Lead name is required";
    return;
  }

  // Sanitize form data before submission
  const sanitizedForm = sanitizeFormData(form, {
    name: { type: "string" },
    email: { type: "email" },
    phone: { type: "phone" },
    leadValue: { type: "number" },
    marketValue: { type: "number" },
    askingPrice: { type: "number" },
    address: { type: "text" },
    notes: { type: "text" },
  });

  const payload = {
    name: sanitizedForm.name,
    email: sanitizedForm.email,
    phone: sanitizedForm.phone,
    leadValue: sanitizedForm.leadValue,
    marketValue: sanitizedForm.marketValue,
    askingPrice: sanitizedForm.askingPrice,
    address: sanitizedForm.address,
    notes: sanitizedForm.notes,
  };

  if (mode.value === "edit" && editingCardId.value) {
    const updatedCard = {
      id: editingCardId.value,
      column: props.column,
      ...payload,
    };
    emit("update-card", updatedCard);
  } else {
    const newCard = {
      column: props.column,
      ...payload,
      id: Math.random().toString(),
    };
    emit("add-card", newCard);
  }
  closeModal();
};

defineExpose({ openCreateModal, openEditModal });
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
