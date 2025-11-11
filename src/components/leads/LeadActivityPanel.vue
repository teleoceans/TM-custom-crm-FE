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
          <li v-for="item in activeItems" :key="item.id" class="activity-item">
            <div class="activity-body">
              <p class="activity-title">{{ item.title }}</p>
              <p class="activity-meta">{{ item.meta }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

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

const LEAD_ACTIVITY_ITEMS = Object.freeze([
  {
    id: "default-lead-activity-1",
    title: "Follow Up Call",
    meta: "Called by Ahmed on 21/3/2025",
  },
  {
    id: "default-lead-activity-2",
    title: "Follow Up Call",
    meta: "Called by Ahmed on 21/3/2025",
  },
  {
    id: "default-lead-activity-3",
    title: "Follow Up Call",
    meta: "Called by Ahmed on 21/3/2025",
  },
  {
    id: "default-lead-activity-4",
    title: "Follow Up Call",
    meta: "Called by Ahmed on 21/3/2025",
  },
  {
    id: "default-lead-activity-5",
    title: "Deal Closed",
    meta: "Lead is a won deal",
  },
]);

const NOTES_ITEMS = Object.freeze([
  {
    id: "default-notes-1",
    title: "Client mention they are interested but still comparing prices",
    meta: "By Ahmed on 21/3/2025",
  },
  {
    id: "default-notes-2",
    title: "Follow up call done, client asked for details to be sent by email",
    meta: "By Ahmed on 21/3/2025",
  },
  {
    id: "default-notes-3",
    title: "First call , client prefers to be contacted after 6 pm",
    meta: "By Ahmed on 21/3/2025",
  },
  {
    id: "default-notes-4",
    title: "First call , client prefers to be contacted after 6 pm",
    meta: "By Ahmed on 21/3/2025",
  },
  {
    id: "default-notes-5",
    title: "First call , client prefers to be contacted after 6 pm",
    meta: "By Ahmed on 21/3/2025",
  },
]);

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

.segmented-control {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0;
  gap: 0;
  border-radius: 6px;
  background: #1f2a37;
  width: 100%;
  overflow: hidden;
}

.segmented-control__button {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 16px;
  font-family: "Inter", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: var(--lead-activity-tab-text);
  background: var(--lead-activity-tab-bg);
  border: 1px solid var(--lead-activity-tab-border);
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
  height: 48px;
}

@media (max-width: 540px) {
  .segmented-control {
    flex-direction: row;
    border-radius: 8px;
  }

  .segmented-control__button {
    width: 100%;
    border-radius: 0;
    margin-left: 0 !important;
    border-left: 1px solid #ffffff;
  }

  .segmented-control__button:first-child {
    border-radius: 8px 8px 0 0;
  }

  .segmented-control__button:last-child {
    border-radius: 0 0 8px 8px;
  }
}

.segmented-control__button:first-child {
  border-radius: 6px 0 0 6px;
}

.segmented-control__button:last-child {
  border-radius: 0 6px 6px 0;
}

.segmented-control__button:not(:first-child):not(:last-child) {
  border-radius: 0;
  margin-left: -1px;
}

.segmented-control__button.is-active {
  background: var(--lead-activity-tab-active-bg);
  color: var(--lead-activity-tab-active-text);
  border-color: var(--lead-activity-tab-active-border);
}

.segmented-control__button.is-active:hover {
  background: var(--lead-activity-tab-active-bg);
  color: var(--lead-activity-tab-active-text);
}

.segmented-control__button:hover {
  background: var(--lead-activity-tab-hover-bg);
  color: var(--lead-activity-tab-text);
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

.activity-item {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

@media (max-width: 480px) {
  .activity-item {
    align-items: flex-start;
    gap: 12px;
  }

  .activity-body {
    gap: 6px;
  }
}

.activity-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.activity-body {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.activity-title {
  font-family: "Inter", sans-serif;
  font-size: 15px;
  font-weight: 600;
  color: #111928;
}

.activity-meta {
  font-family: "Inter", sans-serif;
  font-size: 13px;
  color: #6b7280;
}

.dark .segmented-control {
  background: #1f2a37;
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

.dark .lead-card {
  background: #1f2937;
  border-color: #ffffff;
}

.dark .activity-item {
  border-color: #ffffff;
}

.dark .activity-title {
  color: #f9fafb;
}

.dark .activity-meta {
  color: #9ca3af;
}
</style>
