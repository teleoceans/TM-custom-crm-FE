<template>
  <FilterSection
    :title="title"
    :expanded="expanded"
    :is-last="isLast"
  >
    <div class="space-y-2">
      <label
        v-for="option in options"
        :key="option.value"
        class="flex items-center gap-3 cursor-pointer"
      >
        <input
          :id="`${idPrefix}-${option.value}`"
          type="checkbox"
          :checked="isSelected(option.value)"
          class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-500"
          :class="{
            'border-primary-600': isSelected(option.value),
          }"
          @change="handleChange(option.value, $event.target.checked)"
        />
        <span
          class="text-sm font-medium"
          :class="
            isSelected(option.value)
              ? 'text-gray-900 dark:text-white'
              : 'text-gray-700 dark:text-gray-300'
          "
        >
          {{ option.label }}
        </span>
      </label>
    </div>
  </FilterSection>
</template>

<script setup>
import { ref, computed } from "vue";
import FilterSection from "./FilterSection.vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    required: true,
    validator: (value) =>
      Array.isArray(value) &&
      value.every(
        (opt) =>
          typeof opt === "object" &&
          opt !== null &&
          "label" in opt &&
          "value" in opt
      ),
  },
  selectedValues: {
    type: Array,
    default: () => [],
  },
  allOptionLabel: {
    type: String,
    default: "All",
  },
  isLast: {
    type: Boolean,
    default: false,
  },
  idPrefix: {
    type: String,
    default: "filter",
  },
  expanded: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["update:selectedValues"]);

// Find the "all" option value
const allOption = computed(() =>
  props.options.find((opt) => opt.value === "all")
);

const isSelected = (value) => {
  if (value === "all" && allOption.value) {
    // "All" is selected if all other options are selected
    const otherOptions = props.options
      .filter((opt) => opt.value !== "all")
      .map((opt) => opt.value);
    return otherOptions.every((optValue) =>
      props.selectedValues.includes(optValue)
    );
  }
  return props.selectedValues.includes(value);
};

const handleChange = (value, checked) => {
  let newSelectedValues = [...props.selectedValues];

  if (value === "all" && allOption.value) {
    if (checked) {
      // Select all options except "all"
      newSelectedValues = props.options
        .filter((opt) => opt.value !== "all")
        .map((opt) => opt.value);
    } else {
      // Deselect all
      newSelectedValues = [];
    }
  } else {
    if (checked) {
      if (!newSelectedValues.includes(value)) {
        newSelectedValues.push(value);
      }
    } else {
      newSelectedValues = newSelectedValues.filter((val) => val !== value);
    }
  }

  emit("update:selectedValues", newSelectedValues);
};
</script>

