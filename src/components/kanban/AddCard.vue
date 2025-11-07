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
          v-model="form.phone"
          :id="formIds.phone"
          label="Phone Number"
          placeholder="+1 (555) 000-0000"
        />
        <Input
          v-model="form.contactPerson"
          :id="formIds.contactPerson"
          label="Contact Person"
          placeholder="Assign owner"
        />
        <Input
          v-model="form.badge"
          :id="formIds.badge"
          label="Badge"
          placeholder="Optional label"
        />

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
import PlusIcon from "../icons/PlusIcon.vue";
import Input from "../common/Input.vue";
import Button from "../common/Button.vue";
import DashedActionButton from "../common/DashedActionButton.vue";
import BaseModal from "../common/BaseModal.vue";

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
  phone: "",
  contactPerson: "",
  badge: "",
});

const errors = reactive({
  name: "",
});

const leadNameInput = ref(null);
const formIds = {
  name: `lead-name-${Math.random().toString(36).slice(2, 8)}`,
  phone: `lead-phone-${Math.random().toString(36).slice(2, 8)}`,
  contactPerson: `lead-contact-${Math.random().toString(36).slice(2, 8)}`,
  badge: `lead-badge-${Math.random().toString(36).slice(2, 8)}`,
};

const clearErrors = () => {
  errors.name = "";
};

const resetForm = () => {
  form.name = "";
  form.phone = "";
  form.contactPerson = "";
  form.badge = "";
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
  form.phone = card.phone || "";
  form.contactPerson = card.contactPerson || "";
  form.badge = card.badge || "";
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

  if (mode.value === "edit" && editingCardId.value) {
    const updatedCard = {
      id: editingCardId.value,
      column: props.column,
      name: form.name.trim(),
      phone: form.phone.trim(),
      contactPerson: form.contactPerson.trim(),
      badge: form.badge.trim(),
    };
    emit("update-card", updatedCard);
  } else {
    const newCard = {
      column: props.column,
      name: form.name.trim(),
      phone: form.phone.trim(),
      contactPerson: form.contactPerson.trim(),
      badge: form.badge.trim(),
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
