<template>
  <div class="relative" ref="container">
    <button
      type="button"
      class="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
      @click="toggleMenu"
      ref="trigger"
      aria-haspopup="menu"
      :aria-expanded="open"
      :aria-controls="menuId"
    >
      <slot name="icon">
        <MoreVertical />
      </slot>
      <span class="sr-only">Open menu</span>
    </button>

    <transition name="fade">
      <div
        v-if="open"
        class="absolute right-0 z-20 mt-2 w-48 rounded-lg border border-gray-200 bg-white text-sm shadow-lg dark:border-gray-700 dark:bg-gray-800"
        :id="menuId"
        role="menu"
        aria-orientation="vertical"
        @keydown="handleMenuKeydown"
      >
        <button
          v-for="(action, index) in normalizedActions"
          :key="action.value || index"
          :class="[
            'flex w-full items-center gap-2 px-3 py-2 text-left transition-colors focus:outline-none',
            action.tone === 'danger'
              ? 'text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30'
              : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700',
          ]"
          role="menuitem"
          :tabindex="index === focusedIndex ? 0 : -1"
          ref="setMenuItem"
          @click="() => handleAction(action)"
        >
          <slot name="item" :action="action">
            {{ action.label }}
          </slot>
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup>
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onBeforeUpdate,
  ref,
  watch,
} from "vue";
import MoreVertical from "../icons/MoreVertical.vue";

const props = defineProps({
  actions: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["select", "open", "close"]);

const open = ref(false);
const container = ref(null);
const trigger = ref(null);
const menuItems = ref([]);
const focusedIndex = ref(0);

const menuId = `actions-menu-${Math.random().toString(36).slice(2, 8)}`;

const normalizedActions = computed(() =>
  (props.actions || []).map((action, index) => ({
    label: action.label || `Action ${index + 1}`,
    value: action.value ?? index,
    tone: action.tone || "default",
  }))
);

const toggleMenu = () => {
  open.value = !open.value;
  emit(open.value ? "open" : "close");
};

const closeMenu = () => {
  if (!open.value) return;
  open.value = false;
  emit("close");
};

const handleAction = (action) => {
  emit("select", action.value, action);
  closeMenu();
  nextTick(() => trigger.value?.focus());
};

const setMenuItem = (el) => {
  if (el) menuItems.value.push(el);
};

const focusItem = (index) => {
  const items = menuItems.value;
  if (!items.length) return;
  const boundedIndex = (index + items.length) % items.length;
  focusedIndex.value = boundedIndex;
  nextTick(() => items[boundedIndex]?.focus());
};

const handleMenuKeydown = (event) => {
  const items = menuItems.value;
  if (!items.length) return;

  switch (event.key) {
    case "ArrowDown":
    case "ArrowRight":
      event.preventDefault();
      focusItem(focusedIndex.value + 1);
      break;
    case "ArrowUp":
    case "ArrowLeft":
      event.preventDefault();
      focusItem(focusedIndex.value - 1);
      break;
    case "Home":
      event.preventDefault();
      focusItem(0);
      break;
    case "End":
      event.preventDefault();
      focusItem(items.length - 1);
      break;
    case "Escape":
      event.preventDefault();
      closeMenu();
      nextTick(() => trigger.value?.focus());
      break;
    case "Tab":
      closeMenu();
      break;
    default:
      break;
  }
};

const handleDocumentClick = (event) => {
  if (!container.value) return;
  if (!container.value.contains(event.target)) {
    closeMenu();
  }
};

watch(open, (value, previous) => {
  if (typeof document === "undefined") return;
  if (value) {
    menuItems.value = [];
    document.addEventListener("click", handleDocumentClick, true);
    nextTick(() => focusItem(0));
  } else {
    document.removeEventListener("click", handleDocumentClick, true);
    menuItems.value = [];
    if (previous) {
      nextTick(() => trigger.value?.focus());
    }
  }
});

onBeforeUpdate(() => {
  menuItems.value = [];
});

onBeforeUnmount(() => {
  if (typeof document === "undefined") return;
  document.removeEventListener("click", handleDocumentClick, true);
});
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
