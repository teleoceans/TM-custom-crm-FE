<template>
  <ActionsMenu :actions="actions" @select="handleSelect">
    <template #icon>
      <MoreVertical />
    </template>
  </ActionsMenu>
</template>

<script setup>
import ActionsMenu from "../common/ActionsMenu.vue";
import MoreVertical from "../icons/MoreVertical.vue";

const emit = defineEmits(["edit", "delete"]);

const actions = [
  { label: "Edit Stage", value: "edit" },
  { label: "Delete Stage", value: "delete", tone: "danger" },
];

const handleSelect = (value) => {
  if (value === "edit") emit("edit");
  if (value === "delete") emit("delete");
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
