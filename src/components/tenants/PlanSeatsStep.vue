<template>
  <div class="grid gap-6 md:grid-cols-2">
    <!-- Left Column -->
    <div class="flex flex-col gap-6">
      <PlanSeatSection
        v-for="section in leftColumnSections"
        :key="section.key"
        :section-key="section.key"
        :label="section.label"
        :field-rows="section.fieldRows"
        :model-value="formData[section.key]"
        :enabled="formData[section.key]?.enabled || false"
        @update:model-value="updateSection(section.key, $event)"
        @update:enabled="updateField(section.key, 'enabled', $event)"
      />
    </div>

    <!-- Right Column -->
    <div class="flex flex-col gap-6">
      <PlanSeatSection
        v-for="section in rightColumnSections"
        :key="section.key"
        :section-key="section.key"
        :label="section.label"
        :field-rows="section.fieldRows"
        :model-value="formData[section.key]"
        :enabled="formData[section.key]?.enabled || false"
        @update:model-value="updateSection(section.key, $event)"
        @update:enabled="updateField(section.key, 'enabled', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, watch } from "vue";
import PlanSeatSection from "./PlanSeatSection.vue";

// Function to get default form data (defined in setup for use in computed/other functions)
const getDefaultFormData = () => ({
  coldCallers: {
    enabled: false,
    numberOfCallers: 2,
    hourlyRate: 4,
    dialerPrice: 150,
    totalCost: 0,
  },
  acquisitionManager: {
    enabled: false,
    numberOfManagers: 2,
    hourlyRate: 4,
    totalCost: 0,
  },
  dispositions: {
    enabled: false,
    numberOfDispositions: 2,
    hourlyRate: 4,
    totalCost: 0,
  },
  listPrice: {
    enabled: false,
    quantity: 1000,
    pricePerClient: 0.2,
    totalCost: 0,
  },
});

const props = defineProps({
  modelValue: {
    type: Object,
    required: false,
    // Inline function to avoid hoisting issue - cannot reference getDefaultFormData
    default: () => ({
      coldCallers: {
        enabled: false,
        numberOfCallers: 2,
        hourlyRate: 4,
        dialerPrice: 150,
        totalCost: 0,
      },
      acquisitionManager: {
        enabled: false,
        numberOfManagers: 2,
        hourlyRate: 4,
        totalCost: 0,
      },
      dispositions: {
        enabled: false,
        numberOfDispositions: 2,
        hourlyRate: 4,
        totalCost: 0,
      },
      listPrice: {
        enabled: false,
        quantity: 1000,
        pricePerClient: 0.2,
        totalCost: 0,
      },
    }),
  },
});

const emit = defineEmits(["update:modelValue"]);

// Section configurations
const leftColumnSections = [
  {
    key: "coldCallers",
    label: "Cold Callers",
    fieldRows: [
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "numberOfCallers",
            label: "Number of Cold Callers",
            type: "number",
            placeholder: "2",
          },
          {
            key: "hourlyRate",
            label: "Hourly Rate",
            type: "number",
            placeholder: "4",
          },
        ],
      },
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "dialerPrice",
            label: "Dialer Price/Month",
            type: "number",
            placeholder: "150",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "1000$",
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    key: "acquisitionManager",
    label: "Acquisition Manager",
    fieldRows: [
      {
        gridClass: "",
        fields: [
          {
            key: "numberOfManagers",
            label: "Number of Acquisition managers",
            type: "number",
            placeholder: "2",
          },
        ],
      },
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "hourlyRate",
            label: "Hourly Rate",
            type: "number",
            placeholder: "4",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "1000$",
            disabled: true,
          },
        ],
      },
    ],
  },
];

const rightColumnSections = [
  {
    key: "dispositions",
    label: "Dispositions",
    fieldRows: [
      {
        gridClass: "",
        fields: [
          {
            key: "numberOfDispositions",
            label: "Number of Dispositions",
            type: "number",
            placeholder: "2",
          },
        ],
      },
      {
        gridClass: "grid grid-cols-2 gap-4",
        fields: [
          {
            key: "hourlyRate",
            label: "Hourly Rate",
            type: "number",
            placeholder: "4",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "1000$",
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    key: "listPrice",
    label: "List Price",
    fieldRows: [
      {
        gridClass: "grid grid-cols-3 gap-4",
        fields: [
          {
            key: "quantity",
            label: "Quantity",
            type: "number",
            placeholder: "1000",
          },
          {
            key: "pricePerClient",
            label: "Price / Client",
            type: "number",
            step: "0.01",
            placeholder: "0.2",
          },
          {
            key: "totalCost",
            label: "Total Cost",
            type: "text",
            placeholder: "200$",
            disabled: true,
          },
        ],
      },
    ],
  },
];

// Safe reference to modelValue
const formData = computed(() => {
  const data = props.modelValue || {};
  const defaults = getDefaultFormData();
  return {
    coldCallers: data?.coldCallers || defaults.coldCallers,
    acquisitionManager: data?.acquisitionManager || defaults.acquisitionManager,
    dispositions: data?.dispositions || defaults.dispositions,
    listPrice: data?.listPrice || defaults.listPrice,
  };
});

// Update entire section
const updateSection = (sectionKey, sectionData) => {
  const updated = {
    ...props.modelValue,
    [sectionKey]: sectionData,
  };
  emit("update:modelValue", updated);
};

// Update single field in section
const updateField = (sectionKey, field, value) => {
  const defaults = getDefaultFormData();
  const updated = {
    ...props.modelValue,
    [sectionKey]: {
      ...(props.modelValue?.[sectionKey] || defaults[sectionKey]),
      [field]: value,
    },
  };
  emit("update:modelValue", updated);
};

// Constants
const MONTHLY_HOURS = 160;

// Computed totals - consolidated into one computed
const totals = computed(() => {
  const data = props.modelValue || {};

  return {
    coldCallers: data?.coldCallers?.enabled
      ? Number(data.coldCallers.numberOfCallers || 0) *
          Number(data.coldCallers.hourlyRate || 0) *
          MONTHLY_HOURS +
        Number(data.coldCallers.dialerPrice || 0)
      : 0,
    acquisitionManager: data?.acquisitionManager?.enabled
      ? Number(data.acquisitionManager.numberOfManagers || 0) *
        Number(data.acquisitionManager.hourlyRate || 0) *
        MONTHLY_HOURS
      : 0,
    dispositions: data?.dispositions?.enabled
      ? Number(data.dispositions.numberOfDispositions || 0) *
        Number(data.dispositions.hourlyRate || 0) *
        MONTHLY_HOURS
      : 0,
    listPrice: data?.listPrice?.enabled
      ? Number(data.listPrice.quantity || 0) *
        Number(data.listPrice.pricePerClient || 0)
      : 0,
  };
});

// Single watcher for all totals - replaces 4 separate watchers
watch(
  totals,
  (newTotals) => {
    Object.keys(newTotals).forEach((sectionKey) => {
      const currentTotal = props.modelValue?.[sectionKey]?.totalCost;
      const newTotal = isNaN(newTotals[sectionKey]) ? 0 : newTotals[sectionKey];
      if (currentTotal !== newTotal) {
        updateField(sectionKey, "totalCost", newTotal);
      }
    });
  },
  { immediate: true, deep: true }
);
</script>

<style scoped>
/* Styles moved to PlanSeatSection.vue */
</style>
