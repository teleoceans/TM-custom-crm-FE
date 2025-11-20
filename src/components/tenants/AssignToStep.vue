<template>
  <div class="flex flex-col gap-6">
    <!-- Cold Callers Section -->
    <section class="border-b border-gray-200 pb-6 last:border-b-0 dark:border-gray-700">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-base font-bold text-gray-900 dark:text-gray-100">
          Cold Callers
        </h2>
        <button
          type="button"
          class="text-sm font-medium text-purple-600 transition hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          @click="toggleSelectAll('coldCallers')"
        >
          {{ isGroupFullySelected('coldCallers') ? 'Clear all' : 'Select all' }}
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <label
          v-for="user in users.coldCallers"
          :key="user.id"
          class="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          <input
            :id="`cold-callers-${user.id}`"
            :checked="isUserSelected('coldCallers', user.id)"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-purple-500"
            @change="toggleUser('coldCallers', user.id, $event.target.checked)"
          />
          <span>{{ user.name }}</span>
        </label>
      </div>
    </section>

    <!-- Dispositions Section -->
    <section class="border-b border-gray-200 pb-6 last:border-b-0 dark:border-gray-700">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-base font-bold text-gray-900 dark:text-gray-100">
          Dispositions
        </h2>
        <button
          type="button"
          class="text-sm font-medium text-purple-600 transition hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          @click="toggleSelectAll('dispositions')"
        >
          {{ isGroupFullySelected('dispositions') ? 'Clear all' : 'Select all' }}
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <label
          v-for="user in users.dispositions"
          :key="user.id"
          class="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          <input
            :id="`dispositions-${user.id}`"
            :checked="isUserSelected('dispositions', user.id)"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-purple-500"
            @change="toggleUser('dispositions', user.id, $event.target.checked)"
          />
          <span>{{ user.name }}</span>
        </label>
      </div>
    </section>

    <!-- Acquisition Managers Section -->
    <section class="border-b border-gray-200 pb-6 last:border-b-0 dark:border-gray-700">
      <div class="mb-4 flex items-center justify-between">
        <h2 class="text-base font-bold text-gray-900 dark:text-gray-100">
          Acquisition Managers
        </h2>
        <button
          type="button"
          class="text-sm font-medium text-purple-600 transition hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300"
          @click="toggleSelectAll('acquisitionManagers')"
        >
          {{ isGroupFullySelected('acquisitionManagers') ? 'Clear all' : 'Select all' }}
        </button>
      </div>
      <div class="flex flex-col gap-3">
        <label
          v-for="user in users.acquisitionManagers"
          :key="user.id"
          class="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          <input
            :id="`acquisition-managers-${user.id}`"
            :checked="isUserSelected('acquisitionManagers', user.id)"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-purple-500"
            @change="toggleUser('acquisitionManagers', user.id, $event.target.checked)"
          />
          <span>{{ user.name }}</span>
        </label>
      </div>
    </section>

    <!-- Add New User Button -->
    <div class="flex justify-start">
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-800"
        @click="handleAddNewUser"
      >
        <svg
          class="h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
        <span>Add New User</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      coldCallers: [],
      dispositions: [],
      acquisitionManagers: [],
    }),
  },
});

const emit = defineEmits(["update:modelValue", "addNewUser"]);

// Mock users data - in a real app, this would come from props or API
const users = reactive({
  coldCallers: [
    { id: "cc1", name: "User 1" },
    { id: "cc2", name: "User 2" },
    { id: "cc3", name: "User 3" },
    { id: "cc4", name: "User 4" },
  ],
  dispositions: [
    { id: "d1", name: "User 1" },
    { id: "d2", name: "User 2" },
    { id: "d3", name: "User 3" },
    { id: "d4", name: "User 4" },
  ],
  acquisitionManagers: [
    { id: "am1", name: "User 1" },
    { id: "am2", name: "User 2" },
    { id: "am3", name: "User 3" },
    { id: "am4", name: "User 4" },
  ],
});

// Check if a user is selected in a group
const isUserSelected = (groupKey, userId) => {
  const currentSelection = props.modelValue[groupKey] || [];
  return currentSelection.includes(userId);
};

// Toggle individual user selection
const toggleUser = (groupKey, userId, checked) => {
  const currentSelection = [...(props.modelValue[groupKey] || [])];
  
  if (checked) {
    // Add user if not already in array
    if (!currentSelection.includes(userId)) {
      currentSelection.push(userId);
    }
  } else {
    // Remove user from array
    const index = currentSelection.indexOf(userId);
    if (index > -1) {
      currentSelection.splice(index, 1);
    }
  }

  emit("update:modelValue", {
    ...props.modelValue,
    [groupKey]: currentSelection,
  });
};

const toggleSelectAll = (groupKey) => {
  const groupUsers = users[groupKey];
  const currentSelection = props.modelValue[groupKey] || [];
  const allIds = groupUsers.map((user) => user.id);
  const isFullySelected = currentSelection.length === allIds.length;

  emit("update:modelValue", {
    ...props.modelValue,
    [groupKey]: isFullySelected ? [] : [...allIds],
  });
};

const isGroupFullySelected = (groupKey) => {
  const groupUsers = users[groupKey];
  const currentSelection = props.modelValue[groupKey] || [];
  return currentSelection.length === groupUsers.length;
};

const handleAddNewUser = () => {
  emit("addNewUser");
};
</script>
