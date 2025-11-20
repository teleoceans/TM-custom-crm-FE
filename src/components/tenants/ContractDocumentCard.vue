<template>
  <div
    class="contract-document-section rounded-lg border-2 border-dashed border-purple-300 bg-purple-50/50 p-6 transition-all dark:border-purple-700 dark:bg-purple-900/10"
    :class="{
      'border-purple-400 bg-purple-100/70 dark:border-purple-600 dark:bg-purple-900/20':
        document,
    }"
  >
    <div v-if="document" class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 transition-transform dark:bg-purple-900/30"
          :class="{ 'scale-105': document }"
        >
          <DocumentIcon
            class="h-6 w-6 text-purple-600 dark:text-purple-400"
            aria-hidden="true"
          />
        </div>
        <div class="flex-1">
          <div class="flex items-center gap-2">
            <h3
              class="text-sm font-semibold text-gray-900 dark:text-white"
              :id="`contract-name-${uniqueId}`"
            >
              {{ document.name }}
            </h3>
            <Badge variant="success" v-if="document"> Generated </Badge>
          </div>
          <p
            class="text-xs text-gray-500 dark:text-gray-400"
            :aria-describedby="`contract-name-${uniqueId}`"
          >
            {{ document.pages }} Pages • {{ document.size }} •
            {{ document.format }}
          </p>
        </div>
      </div>
      <button
        type="button"
        class="rounded-lg p-2 text-gray-500 transition-all hover:bg-purple-100 hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:text-gray-400 dark:hover:bg-purple-900/30 dark:hover:text-purple-400"
        @click="handleDownload"
        :title="`Download ${document.name}`"
        aria-label="Download contract document"
      >
        <DownloadIcon class="h-5 w-5" />
      </button>
    </div>
    <div
      v-else
      class="flex flex-col items-center justify-center gap-2 py-4 text-center"
    >
      <div
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100/50 dark:bg-purple-900/20"
      >
        <DocumentIcon
          class="h-6 w-6 text-purple-400 dark:text-purple-600"
          aria-hidden="true"
        />
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400">
        Contract will be generated after clicking "Create Contract"
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Badge from "../common/Badge.vue";
import DocumentIcon from "../icons/common/DocumentIcon.vue";
import DownloadIcon from "../icons/common/DownloadIcon.vue";

const props = defineProps({
  document: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["download"]);

// Generate unique ID for accessibility
const uniqueId = ref(`doc-${Math.random().toString(36).substr(2, 9)}`);

const handleDownload = () => {
  if (!props.document?.url) {
    emit("download", { error: "No document URL available" });
    return;
  }

  try {
    const url = props.document.url;
    // Validate URL format
    if (url === "#" || !url.startsWith("http")) {
      emit("download", { error: "Invalid document URL" });
      return;
    }
    window.open(url, "_blank");
    emit("download", { success: true });
  } catch (err) {
    console.error("Failed to download document:", err);
    emit("download", { error: "Failed to open document" });
  }
};
</script>

<style scoped>
/* Contract document section animations */
.contract-document-section {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

