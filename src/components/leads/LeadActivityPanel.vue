<template>
  <div class="lead-activity">
    <div class="segmented-control" role="tablist" aria-orientation="horizontal">
      <button
        v-for="tab in tabsWithIds"
        :key="tab.id"
        type="button"
        class="segmented-control__button"
        :class="{ 'is-active': tab.label === modelValue }"
        @click="onSelectTab(tab.label)"
        role="tab"
        :id="tab.id"
        :aria-selected="tab.label === modelValue"
        :aria-controls="panelId"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="lead-card">
      <div
        class="activity-content"
        role="tabpanel"
        :id="panelId"
        :aria-labelledby="labelledBy"
      >
        <ul class="activity-list">
          <ActivityItem
            v-for="item in activeItems"
            :key="item.id"
            :title="item.title"
            :meta="item.meta"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import ActivityItem from "./ActivityItem.vue";
import { LEAD_ACTIVITY_ITEMS, NOTES_ITEMS } from "../../mock/leadInfo.js";

let panelInstance = 0;

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  tabs: {
    type: Array,
    default: () => [],
  },
  itemsByTab: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue", "change"]);

const instanceId = `lead-activity-panel-${++panelInstance}`;
const panelId = `${instanceId}-panel`;

const tabsWithIds = computed(() =>
  props.tabs.map((label, index) => ({
    label,
    id: `${instanceId}-tab-${index}`,
  }))
);

const selectedTabEntry = computed(
  () =>
    tabsWithIds.value.find((entry) => entry.label === props.modelValue) ??
    tabsWithIds.value[0]
);

const labelledBy = computed(() => selectedTabEntry.value?.id);


const activeItems = computed(() => {
  if (props.modelValue === "Lead Activity") {
    return LEAD_ACTIVITY_ITEMS;
  }

  if (props.modelValue === "Notes") {
    return NOTES_ITEMS;
  }

  return props.itemsByTab[props.modelValue] ?? [];
});

const onSelectTab = (tabLabel) => {
  if (tabLabel === props.modelValue) return;
  emit("update:modelValue", tabLabel);
  emit("change", tabLabel);
};
</script>

<style scoped>
.lead-activity {
  display: flex;
  flex-direction: column;
  gap: 16px;
  --lead-activity-tab-bg: var(--lead-activity-tab-bg-light, #ffffff);
  --lead-activity-tab-text: var(--lead-activity-tab-text-light, #4b5563);
  --lead-activity-tab-border: var(--lead-activity-tab-border-light, #e5e7eb);
  --lead-activity-tab-hover-bg: var(
    --lead-activity-tab-hover-bg-light,
    #f3f4f6
  );
  --lead-activity-tab-active-bg: var(
    --lead-activity-tab-active-bg-light,
    #e5e7eb
  );
  --lead-activity-tab-active-text: var(
    --lead-activity-tab-active-text-light,
    #5b21b6
  );
  --lead-activity-tab-active-border: var(
    --lead-activity-tab-active-border-light,
    #e5e7eb
  );
}

.dark .lead-activity {
  --lead-activity-tab-bg: var(--lead-activity-tab-bg-dark, #1f2a37);
  --lead-activity-tab-text: var(--lead-activity-tab-text-dark, #ffffff);
  --lead-activity-tab-border: var(--lead-activity-tab-border-dark, #ffffff);
  --lead-activity-tab-hover-bg: var(
    --lead-activity-tab-hover-bg-dark,
    rgba(156, 163, 175, 0.2)
  );
  --lead-activity-tab-active-bg: var(
    --lead-activity-tab-active-bg-dark,
    #9ca3af
  );
  --lead-activity-tab-active-text: var(
    --lead-activity-tab-active-text-dark,
    #ffffff
  );
  --lead-activity-tab-active-border: var(
    --lead-activity-tab-active-border-dark,
    #edebfe
  );
}

.lead-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  align-self: stretch;
}

.activity-content {
  width: 100%;
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dark .lead-card {
  background: #1f2937;
  border-color: #ffffff;
}
</style>

<style>
/* Import shared segmented control styles */
@import "../../styles/components/segmented-control.css";
</style>
