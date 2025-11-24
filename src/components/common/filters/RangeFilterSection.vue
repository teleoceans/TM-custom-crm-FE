<template>
  <FilterSection
    :title="title"
    :expanded="expanded"
    :is-last="isLast"
  >
    <div :class="wrapperClass">
      <div :class="inputLayoutClass">
      <div>
        <label
          :for="`${idPrefix}-from`"
          class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          From
        </label>
        <input
          :id="`${idPrefix}-from`"
          type="number"
          :value="range.from"
          :min="min"
          :max="max"
          :step="step"
          :class="inputClass"
          :placeholder="placeholders?.from || '0'"
          @input="handleChange('from', $event.target.value)"
        />
      </div>
      <div>
        <label
          :for="`${idPrefix}-to`"
          class="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          To
        </label>
        <input
          :id="`${idPrefix}-to`"
          type="number"
          :value="range.to"
          :min="min"
          :max="max"
          :step="step"
          :class="inputClass"
          :placeholder="placeholders?.to || '0'"
          @input="handleChange('to', $event.target.value)"
        />
      </div>
    </div>
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
  range: {
    type: Object,
    required: true,
    validator: (value) =>
      typeof value === "object" &&
      value !== null &&
      ("from" in value || "to" in value),
  },
  min: {
    type: Number,
    default: undefined,
  },
  max: {
    type: Number,
    default: undefined,
  },
  step: {
    type: [Number, String],
    default: undefined,
  },
  placeholders: {
    type: Object,
    default: () => ({ from: "0", to: "0" }),
  },
  isLast: {
    type: Boolean,
    default: false,
  },
  idPrefix: {
    type: String,
    default: "range",
  },
  expanded: {
    type: Boolean,
    default: true,
  },
  inputClass: {
    type: String,
    default:
      "block w-full rounded-lg border border-purple-200 bg-white p-2.5 text-sm text-gray-900 focus:border-purple-500 focus:ring-purple-500 dark:border-purple-700 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-purple-500 dark:focus:ring-purple-500",
  },
  inputLayoutClass: {
    type: String,
    default: "grid grid-cols-2 gap-3",
  },
  wrapperClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:range"]);

const handleChange = (field, value) => {
  const numValue = value === "" ? null : Number(value);
  emit("update:range", {
    ...props.range,
    [field]: numValue,
  });
};
</script>

