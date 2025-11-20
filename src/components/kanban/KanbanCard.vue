<template>
  <div>
    <DropIndicator :before-id="id" :column="column" />
    <div
      :draggable="true"
      @dragstart="handleDragStart"
      @dragend="handleDragEnd"
      @click="handleCardClick"
      class="kanban-card flex cursor-grab flex-col items-start gap-4 rounded-lg p-4 shadow-sm active:cursor-grabbing"
    >
      <!-- Card Header -->
      <div class="flex w-full flex-row items-center justify-between gap-[15px]">
        <h3 class="kanban-card__title">
          {{ name || title }}
        </h3>
        <ActionsMenu
          :actions="actionsMenuItems"
          @click.stop
          @select="handleMenuSelect"
        />
      </div>

      <!-- Card Body (Phone Number) -->
      <div v-if="phone" class="w-full">
        <p class="kanban-card__text-secondary">
          {{ phone }}
        </p>
      </div>

      <!-- Card Footer -->
      <div class="flex w-full flex-row items-center justify-between">
        <!-- Avatar/Contact Person -->
        <div v-if="contactPerson" class="flex flex-row items-center gap-2">
          <div
            class="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
          >
            <UserIcon class="h-3 w-3 text-gray-900 dark:text-gray-100" />
          </div>
          <span class="kanban-card__title">
            {{ contactPerson }}
          </span>
        </div>

        <!-- Badge -->
        <div
          v-if="badge"
          class="flex flex-row items-center gap-1 rounded-md bg-gray-100 px-3 py-0.5 dark:bg-gray-700"
        >
          <span class="kanban-card__title">
            {{ badge }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ActionsMenu from "../common/ActionsMenu.vue";
import UserIcon from "../icons/common/UserIcon.vue";
import DropIndicator from "./DropIndicator.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  contactPerson: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  column: {
    type: String,
    required: true,
  },
  badge: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["edit", "delete", "drag-start", "open"]);

const isDragging = ref(false);

const actionsMenuItems = [
  { label: "Edit Card", value: "edit" },
  { label: "Delete Card", value: "delete", tone: "danger" },
];

const handleMenuSelect = (value) => {
  if (value === "edit") {
    emit("edit", props.id);
  } else if (value === "delete") {
    emit("delete", props.id);
  }
};

const handleDragStart = (e) => {
  e.dataTransfer.setData("cardId", props.id);
  e.dataTransfer.effectAllowed = "move";
  isDragging.value = true;
  emit("drag-start", {
    id: props.id,
    title: props.title || props.name,
    column: props.column,
  });
};

const handleDragEnd = () => {
  isDragging.value = false;
};

const handleCardClick = () => {
  if (isDragging.value) {
    isDragging.value = false;
    return;
  }
  emit("open", props.id);
};
</script>

<style scoped>
/* Card specific styles matching design specs */
.kanban-card {
  width: 256.8px;
  min-height: 134px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;
  flex: none;
  align-self: stretch;
  background: var(--color-bg-card);
}

.dark .kanban-card {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4),
    0px 1px 2px -1px rgba(0, 0, 0, 0.3);
}

.kanban-card__title {
  flex: 1;
  display: flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  color: var(--color-text-primary);
}

.kanban-card__text-secondary {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.3125rem;
  color: var(--color-text-secondary);
}
</style>
