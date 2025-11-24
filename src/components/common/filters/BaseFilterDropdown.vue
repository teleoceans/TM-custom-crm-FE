<template>
  <Transition
    enter-active-class="transition ease-out duration-100"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition ease-in duration-75"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
  >
    <div
      v-if="modelValue"
      ref="dropdownRef"
      :class="[
        'absolute right-0 z-50 mt-2 rounded-lg bg-white shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700',
        width
      ]"
    >
      <div class="p-4 space-y-4">
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { useClickOutside } from "../../../composables/useClickOutside.js";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: "w-64",
  },
});

const emit = defineEmits(["update:modelValue"]);

const dropdownRef = ref(null);

// Close filter when clicking outside, but exclude button clicks
// This allows the filter button to toggle the dropdown without it closing immediately
// The parent view's handleFilter will handle the toggle
useClickOutside(
  [dropdownRef],
  (event) => {
    const target = event.target;
    const clickedButton = target.closest('button');
    
    // Don't close if clicking on a button - let the parent handle the toggle
    // This prevents the dropdown from closing when clicking the filter button
    if (clickedButton) {
      return;
    }
    
    if (props.modelValue) {
      emit("update:modelValue", false);
    }
  },
  {
    enabled: () => props.modelValue,
  }
);
</script>

