<template>
  <div class="h-full w-full overflow-x-auto py-4">
    <div class="flex h-full w-full flex-row gap-2">
      <KanbanColumn
        v-for="columnConfig in columns"
        :key="columnConfig.column"
        :title="columnConfig.title"
        :column="columnConfig.column"
        :heading-color="columnConfig.headingColor"
        :cards="cards"
        @update-cards="handleUpdateCards"
        @add-card="handleAddCard"
        @update-card="handleUpdateCard"
        @delete-card="handleDeleteCard"
        @edit-stage="handleEditStage"
        @delete-stage="handleDeleteStage"
        @open-card="emit('card-open', $event)"
      />
      <AddStageButton @click="openStageModal" />
    </div>

    <BaseModal
      v-model="showStageModal"
      :title="stageModalTitle"
      @close="handleStageModalClose"
    >
      <form @submit.prevent="handleStageSubmit" class="space-y-4">
        <Input
          ref="stageNameInput"
          v-model="stageForm.name"
          :id="stageFormIds.name"
          label="Stage Name"
          placeholder="Enter stage name"
          :error="stageErrors.name"
          required
        />
        <div class="space-y-2">
          <span class="text-sm font-medium text-gray-900 dark:text-white">
            Stage Color
          </span>
          <StageColorPicker
            v-model="stageForm.color"
            :options="stageColorOptions"
          />
        </div>

        <div class="flex items-center justify-end gap-3">
          <Button type="button" variant="ghost" @click="closeStageModal">
            Cancel
          </Button>
          <Button type="submit">
            {{ stageModalMode === "edit" ? "Save Changes" : "Add Stage" }}
          </Button>
        </div>
      </form>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, nextTick, reactive, ref } from "vue";
import KanbanColumn from "./KanbanColumn.vue";
import AddStageButton from "./AddStageButton.vue";
import Input from "../common/Input.vue";
import Button from "../common/Button.vue";
import StageColorPicker from "./StageColorPicker.vue";
import BaseModal from "../common/BaseModal.vue";

const props = defineProps({
  initialCards: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits([
  "cards-updated",
  "card-edited",
  "stages-updated",
  "card-open",
]);

const cards = ref([...props.initialCards]);

const showStageModal = ref(false);
const stageModalMode = ref("create");
const editingStageKey = ref(null);

const stageModalTitle = computed(() =>
  stageModalMode.value === "edit" ? "Edit Stage" : "Add New Stage"
);

const defaultHeadingColor = "text-purple-600 dark:text-purple-400";

const stageColorOptions = [
  {
    label: "Purple",
    value: "text-purple-600 dark:text-purple-400",
    background: "var(--purple-800, #5521B5)",
  },
  {
    label: "Yellow",
    value: "text-yellow-600 dark:text-yellow-400",
    background: "#FFC107",
  },
  {
    label: "Green",
    value: "text-green-600 dark:text-green-400",
    background: "#28A745",
  },
  {
    label: "Red",
    value: "text-red-600 dark:text-red-400",
    background: "#DC3545",
  },
  {
    label: "Blue",
    value: "text-blue-600 dark:text-blue-400",
    background: "#42389D",
  },
];

const columns = ref([
  {
    title: "New Leads",
    column: "new-leads",
    headingColor: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "Contacted",
    column: "contacted",
    headingColor: "text-yellow-600 dark:text-yellow-400",
  },
  {
    title: "Won Leads",
    column: "won-leads",
    headingColor: "text-green-600 dark:text-green-400",
  },
  {
    title: "Lost Leads",
    column: "lost-leads",
    headingColor: "text-red-600 dark:text-red-400",
  },
]);

const handleUpdateCards = (updatedCards) => {
  cards.value = updatedCards;
  emit("cards-updated", updatedCards);
};

const handleEditCard = (card) => {
  emit("card-edited", card);
  // You can implement edit functionality here
  console.log("Edit card:", card);
};

const handleAddCard = (newCard) => {
  cards.value = [...cards.value, newCard];
  emit("cards-updated", cards.value);
};

const handleUpdateCard = (updatedCard) => {
  cards.value = cards.value.map((card) =>
    card.id === updatedCard.id ? { ...card, ...updatedCard } : card
  );
  emit("cards-updated", cards.value);
};

const handleDeleteCard = (cardId) => {
  cards.value = cards.value.filter((card) => card.id !== cardId);
  emit("cards-updated", cards.value);
};

const openStageModal = () => {
  stageModalMode.value = "create";
  editingStageKey.value = null;
  showStageModal.value = true;
  stageForm.name = "";
  stageForm.color = defaultHeadingColor;
  stageErrors.name = "";
  nextTick(() => {
    stageNameInput.value?.focus();
  });
};

const closeStageModal = () => {
  showStageModal.value = false;
  stageErrors.name = "";
  stageModalMode.value = "create";
  editingStageKey.value = null;
};

const handleStageModalClose = () => {
  stageErrors.name = "";
  stageModalMode.value = "create";
  editingStageKey.value = null;
};

const stageNameInput = ref(null);

const stageForm = reactive({
  name: "",
  color: defaultHeadingColor,
});

const stageErrors = reactive({
  name: "",
});

const stageFormIds = {
  name: `stage-name-${Math.random().toString(36).slice(2, 8)}`,
};

const stageNames = computed(() =>
  columns.value.map((col) => ({
    key: col.column,
    name: col.title.toLowerCase(),
  }))
);
const stageKeys = computed(() => columns.value.map((col) => col.column));

const generateColumnKey = (name) => {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
  let key = base || `stage-${Math.random().toString(36).slice(2, 6)}`;
  let suffix = 1;
  while (stageKeys.value.includes(key)) {
    key = `${base}-${suffix}`;
    suffix += 1;
  }
  return key;
};

const handleStageSubmit = () => {
  stageErrors.name = "";

  if (!stageForm.name.trim()) {
    stageErrors.name = "Stage name is required";
    return;
  }

  const normalizedName = stageForm.name.trim().toLowerCase();
  const selectedColor = stageForm.color || defaultHeadingColor;

  const duplicate = stageNames.value.some(({ key, name }) => {
    if (stageModalMode.value === "edit" && key === editingStageKey.value)
      return false;
    return name === normalizedName;
  });

  if (duplicate) {
    stageErrors.name = "Stage name already exists";
    return;
  }

  if (stageModalMode.value === "edit" && editingStageKey.value) {
    const updated = columns.value.map((col) => {
      if (col.column !== editingStageKey.value) return col;
      return {
        ...col,
        title: stageForm.name.trim(),
        headingColor: selectedColor,
      };
    });
    columns.value = updated;
    emit("stages-updated", columns.value);
    closeStageModal();
    return;
  }

  const columnKey = generateColumnKey(stageForm.name);

  const newStage = {
    title: stageForm.name.trim(),
    column: columnKey,
    headingColor: selectedColor,
  };

  columns.value = [...columns.value, newStage];
  emit("stages-updated", columns.value);

  closeStageModal();
};

const handleEditStage = (columnKey) => {
  const stage = columns.value.find((col) => col.column === columnKey);
  if (!stage) return;
  stageModalMode.value = "edit";
  editingStageKey.value = stage.column;
  stageForm.name = stage.title;
  stageForm.color = stage.headingColor || defaultHeadingColor;
  stageErrors.name = "";
  showStageModal.value = true;
  nextTick(() => {
    stageNameInput.value?.focus();
  });
};

const handleDeleteStage = (columnKey) => {
  const stage = columns.value.find((col) => col.column === columnKey);
  if (!stage) return;
  const confirmed = window.confirm(
    `Delete stage "${stage.title}" and all cards within it?`
  );
  if (!confirmed) return;

  columns.value = columns.value.filter((col) => col.column !== columnKey);
  const updatedCards = cards.value.filter((card) => card.column !== columnKey);
  cards.value = updatedCards;
  emit("stages-updated", columns.value);
  emit("cards-updated", updatedCards);
};
</script>

<style scoped>
/* Ensure horizontal scrolling on all screen sizes */
.flex {
  min-width: fit-content;
}
</style>
