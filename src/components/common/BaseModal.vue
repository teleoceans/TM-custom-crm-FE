<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div
          class="absolute inset-0 bg-gray-900/60 dark:bg-gray-900/70"
          @click="handleOverlayClick"
        />
        <div
          class="relative z-10 w-full rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800"
          :class="maxWidth"
          role="dialog"
          aria-modal="true"
          :aria-label="title || undefined"
        >
          <div v-if="hasHeader" class="mb-4 flex items-center justify-between">
            <slot name="header">
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                {{ title }}
              </h2>
            </slot>
            <button
              v-if="showClose"
              type="button"
              class="rounded-md p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-200"
              @click="close"
            >
              <span class="sr-only">Close modal</span>
              <svg
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <slot />
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { computed, onBeforeUnmount, watch, useSlots } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  maxWidth: {
    type: String,
    default: "max-w-lg",
  },
  closeOnOverlay: {
    type: Boolean,
    default: true,
  },
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  showClose: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:modelValue", "close"]);

const slots = useSlots();

const hasHeader = computed(() => !!(props.title || slots.header));

const close = () => {
  emit("update:modelValue", false);
  emit("close");
};

const handleOverlayClick = () => {
  if (props.closeOnOverlay) {
    close();
  }
};

const handleKeydown = (event) => {
  if (!props.closeOnEsc) return;
  if (event.key === "Escape") {
    close();
  }
};

const lockBody = () => {
  if (typeof document === "undefined") return;
  document.body.classList.add("overflow-hidden");
};

const unlockBody = () => {
  if (typeof document === "undefined") return;
  document.body.classList.remove("overflow-hidden");
};

watch(
  () => props.modelValue,
  (value) => {
    if (typeof document === "undefined") return;
    if (value) {
      if (props.closeOnEsc) {
        document.addEventListener("keydown", handleKeydown);
      }
      lockBody();
    } else {
      if (props.closeOnEsc) {
        document.removeEventListener("keydown", handleKeydown);
      }
      unlockBody();
    }
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  if (typeof document === "undefined") return;
  document.removeEventListener("keydown", handleKeydown);
  unlockBody();
});
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
