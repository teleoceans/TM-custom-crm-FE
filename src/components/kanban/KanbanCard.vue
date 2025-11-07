<template>
  <div>
    <DropIndicator :before-id="id" :column="column" />
    <div
      :draggable="true"
      @dragstart="handleDragStart"
      class="flex cursor-grab flex-col items-start gap-4 rounded-lg bg-white p-4 shadow-sm active:cursor-grabbing dark:bg-gray-800"
      :style="cardStyle"
    >
      <!-- Card Header -->
      <div class="flex w-full flex-row items-center justify-between gap-[15px]">
        <h3
          class="flex items-center text-base font-semibold leading-6 text-gray-900 dark:text-white"
          :style="textPrimary"
        >
          {{ name || title }}
        </h3>
        <ActionsMenu :actions="actionsMenuItems" @select="handleMenuSelect" />
      </div>

      <!-- Card Body (Phone Number) -->
      <div v-if="phone" class="w-full">
        <p
          class="text-sm font-normal leading-[21px] text-gray-500 dark:text-gray-400"
          :style="textSecondary"
        >
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
          <span
            class="text-sm font-normal leading-[21px] text-gray-900 dark:text-white"
            :style="textPrimary"
          >
            {{ contactPerson }}
          </span>
        </div>

        <!-- Badge -->
        <div
          v-if="badge"
          class="flex flex-row items-center gap-1 rounded-md bg-gray-100 px-3 py-0.5 dark:bg-gray-700"
        >
          <span
            class="text-sm font-medium leading-[21px] text-gray-900 dark:text-white"
            :style="textPrimary"
          >
            {{ badge }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useThemeStyles } from "../../composables/useThemeStyles";
import ActionsMenu from "../common/ActionsMenu.vue";
import UserIcon from "../icons/UserIcon.vue";
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

const emit = defineEmits(["edit", "drag-start"]);

const { textPrimary, textSecondary, cardStyle } = useThemeStyles();

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
  emit("drag-start", {
    id: props.id,
    title: props.title || props.name,
    column: props.column,
  });
};
</script>

<style scoped>
/* Card specific styles matching design specs */
div[draggable="true"] {
  width: 256.8px;
  min-height: 134px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1),
    0px 1px 2px -1px rgba(0, 0, 0, 0.1);
  font-family: "Inter", sans-serif;
  flex: none;
  align-self: stretch;
}

.dark div[draggable="true"] {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.4),
    0px 1px 2px -1px rgba(0, 0, 0, 0.3);
}
</style>
