<template>
  <div class="stage-control">
    <div class="relative inline-flex">
      <button
        ref="buttonRef"
        type="button"
        class="stage-button"
        :id="buttonId"
        aria-haspopup="listbox"
        :aria-expanded="isOpen"
        :aria-controls="menuId"
        @click="toggleMenu"
        @keydown.enter.prevent="toggleMenu"
        @keydown.space.prevent="toggleMenu"
        @keydown.down.prevent="openMenu"
        @keydown.escape.prevent="closeMenu"
      >
        <span class="stage-button-icon">
          <LeadIcon name="lead-stage-user" size="16" />
        </span>
        <span class="stage-button-text">{{ modelValue }}</span>
        <span class="stage-button-icon">
          <LeadIcon name="chevron-down-small" size="14" />
        </span>
      </button>
      <transition name="fade">
        <div
          v-if="isOpen"
          ref="menuRef"
          :id="menuId"
          class="stage-menu"
          role="listbox"
          :aria-labelledby="buttonId"
        >
          <button
            v-for="option in options"
            :key="option"
            type="button"
            class="stage-menu-item"
            :style="{ color: getStageColor(option) }"
            @click="selectStage(option)"
            role="option"
            :aria-selected="option === modelValue"
            @keydown.enter.prevent="selectStage(option)"
            @keydown.space.prevent="selectStage(option)"
            @keydown.escape.prevent="closeMenu"
          >
            <span class="stage-menu-item-content">
              <span class="stage-menu-item-indicator" />
              <span>{{ option }}</span>
            </span>
            <LeadIcon
              v-if="option === modelValue"
              name="check"
              size="14"
              :style="{ color: getStageColor(option) }"
            />
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { nextTick, ref } from "vue";
import { useClickOutside } from "../../composables/useClickOutside.js";
import LeadIcon from "./LeadIcon.vue";

let selectorInstance = 0;

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:modelValue", "change", "toggle"]);

const isOpen = ref(false);
const buttonRef = ref(null);
const menuRef = ref(null);

const instanceId = `lead-stage-selector-${++selectorInstance}`;
const buttonId = `${instanceId}-button`;
const menuId = `${instanceId}-menu`;

const openMenu = () => {
  if (isOpen.value) return;
  isOpen.value = true;
  emit("toggle", true);
  nextTick(() => {
    const firstOption = menuRef.value?.querySelector("button");
    firstOption?.focus();
  });
};

const closeMenu = () => {
  if (!isOpen.value) return;
  isOpen.value = false;
  emit("toggle", false);
  buttonRef.value?.focus();
};

const toggleMenu = () => {
  if (isOpen.value) {
    closeMenu();
  } else {
    openMenu();
  }
};

const selectStage = (stage) => {
  emit("update:modelValue", stage);
  emit("change", stage);
  closeMenu();
};

useClickOutside([buttonRef, menuRef], () => closeMenu(), {
  enabled: () => isOpen.value,
});

const stageColorMap = Object.freeze({
  "New Lead": "#6B21A8",
  Contacted: "#FFC107",
  "Won Lead": "#28A745",
  "Closed Won": "#28A745",
  "Lost Lead": "#DC3545",
  "Closed Lost": "#DC3545",
});

const getStageColor = (stage) => stageColorMap[stage] ?? "#111928";
</script>

<style scoped>
.stage-control {
  display: flex;
  justify-content: flex-start;
  width: fit-content;
}

.stage-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 20px;
  min-width: 155px;
  height: 48px;
  border: 1px solid #5521b5;
  border-radius: 8px;
  background: #f9fafb;
  color: #5521b5;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.5;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.stage-button:hover {
  background: rgba(85, 33, 181, 0.08);
}

.stage-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(85, 33, 181, 0.3);
}

.stage-button-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.stage-button-text {
  color: inherit;
}

.stage-menu {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  min-width: 220px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 8px 0;
  box-shadow: 0px 20px 25px -5px rgba(15, 23, 42, 0.1),
    0px 10px 10px -5px rgba(15, 23, 42, 0.04);
  z-index: 50;
}

.stage-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: none;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  line-height: 1.5;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.stage-menu-item:hover {
  background: rgba(17, 25, 40, 0.04);
}

.stage-menu-item-content {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.stage-menu-item-indicator {
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  border-radius: 9999px;
  background: currentColor;
}

.stage-menu-item svg {
  color: inherit;
  width: 14px;
  height: 14px;
}

.dark .stage-control {
  color: #e5e7eb;
}

.dark .stage-button {
  background: #4b5563;
  border-color: #c4b5fd;
  color: #c4b5fd;
}

.dark .stage-button:hover {
  background: rgba(196, 181, 253, 0.12);
}

.dark .stage-button:focus {
  box-shadow: 0 0 0 3px rgba(196, 181, 253, 0.3);
}

.dark .stage-menu {
  background: #4b5563;
  border-color: #374151;
  box-shadow: 0px 20px 25px -5px rgba(15, 23, 42, 0.25),
    0px 10px 10px -5px rgba(15, 23, 42, 0.2);
}

.dark .stage-menu-item {
  color: inherit;
}

.dark .stage-menu-item:hover {
  background: rgba(249, 250, 251, 0.08);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}

@media (max-width: 420px) {
  .stage-control {
    width: 100%;
  }

  .stage-button {
    width: 100%;
    min-width: 0;
    padding: 10px 16px;
  }
}
</style>
