<template>
  <div class="shrink-0" style="width: 256.8px">
    <!-- Column Header -->
    <div class="mb-3 flex items-center justify-between">
      <h3 :class="['text-sm font-bold', headingColor]">
        {{ title }}
      </h3>
      <div class="flex items-center gap-2">
        <span class="rounded text-sm text-gray-400 dark:text-gray-500">
          {{ filteredCards.length }}
        </span>
        <ColumnMenu
          @edit="emit('edit-stage', column)"
          @delete="emit('delete-stage', column)"
        />
      </div>
    </div>

    <!-- Column Drop Zone -->
    <div
      @drop="handleDragEnd"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      :class="[
        'min-h-[200px] w-full rounded-lg transition-colors',
        active ? 'bg-gray-100/50 dark:bg-gray-700/50' : 'bg-transparent',
      ]"
    >
      <!-- Cards -->
      <div class="flex flex-col gap-1">
        <KanbanCard
          v-for="card in filteredCards"
          :key="card.id"
          :id="card.id"
          :title="card.title"
          :name="card.name"
          :phone="card.phone"
          :contact-person="card.contactPerson"
          :description="card.description"
          :column="column"
          :badge="card.badge"
          @edit="handleEditCard"
          @delete="handleDeleteCard"
          @drag-start="handleCardDragStart"
          @open="handleOpenCard"
        />
      </div>

      <!-- Drop Indicator at the end -->
      <DropIndicator :before-id="null" :column="column" />

      <!-- Add Card Component -->
      <AddCard
        ref="addCardRef"
        :column="column"
        @add-card="$emit('add-card', $event)"
        @update-card="$emit('update-card', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import KanbanCard from "./KanbanCard.vue";
import DropIndicator from "./DropIndicator.vue";
import AddCard from "./AddCard.vue";
import ColumnMenu from "./ColumnMenu.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  column: {
    type: String,
    required: true,
  },
  headingColor: {
    type: String,
    required: true,
  },
  cards: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits([
  "update-cards",
  "add-card",
  "update-card",
  "delete-card",
  "edit-stage",
  "delete-stage",
  "open-card",
]);

const active = ref(false);
const addCardRef = ref(null);

const filteredCards = computed(() => {
  return props.cards.filter((c) => c.column === props.column);
});

const handleCardDragStart = (card) => {
  // Card drag start is handled by the card itself
};

const handleEditCard = (cardId) => {
  const cardData = props.cards.find((c) => c.id === cardId);
  if (!cardData) return;

  if (
    addCardRef.value &&
    typeof addCardRef.value.openEditModal === "function"
  ) {
    addCardRef.value.openEditModal(cardData);
  } else {
    emit("update-card", cardData);
  }
};

const handleDeleteCard = (card) => {
  emit("delete-card", card.id ?? card);
};

const handleOpenCard = (cardId) => {
  emit("open-card", cardId);
};

const handleDragOver = (e) => {
  e.preventDefault();
  highlightIndicator(e);
  active.value = true;
};

const handleDragLeave = () => {
  clearHighlights();
  active.value = false;
};

const handleDragEnd = (e) => {
  const cardId = e.dataTransfer.getData("cardId");
  active.value = false;
  clearHighlights();

  const indicators = getIndicators();
  const { element } = getNearestIndicator(e, indicators);

  const before = element.dataset.before || "-1";

  if (before !== cardId) {
    let copy = [...props.cards];
    let cardToTransfer = copy.find((c) => c.id === cardId);
    if (!cardToTransfer) return;

    cardToTransfer = { ...cardToTransfer, column: props.column };
    copy = copy.filter((c) => c.id !== cardId);

    const moveToBack = before === "-1";

    if (moveToBack) {
      copy.push(cardToTransfer);
    } else {
      const insertAtIndex = copy.findIndex((el) => el.id === before);
      if (insertAtIndex === undefined) return;
      copy.splice(insertAtIndex, 0, cardToTransfer);
    }

    emit("update-cards", copy);
  }
};

const clearHighlights = (els) => {
  const indicators = els || getIndicators();
  indicators.forEach((i) => {
    i.style.opacity = "0";
  });
};

const highlightIndicator = (e) => {
  const indicators = getIndicators();
  clearHighlights(indicators);
  const el = getNearestIndicator(e, indicators);
  el.element.style.opacity = "1";
};

const getNearestIndicator = (e, indicators) => {
  const DISTANCE_OFFSET = 50;
  const el = indicators.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = e.clientY - (box.top + DISTANCE_OFFSET);

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    {
      offset: Number.NEGATIVE_INFINITY,
      element: indicators[indicators.length - 1],
    }
  );

  return el;
};

const getIndicators = () => {
  return Array.from(
    document.querySelectorAll(`[data-column="${props.column}"]`)
  );
};
</script>
