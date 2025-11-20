<template>
  <div class="flex flex-col gap-6">
    <!-- Top Action Buttons -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <button
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-800"
        @click="handleGenerateHiringPost"
      >
        <span>Generate Hiring Post</span>
      </button>

      <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div class="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-700 dark:bg-gray-800">
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
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
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span class="text-sm text-gray-600 dark:text-gray-300">
            This will send CRM Login & Onboarding Video to Client
          </span>
        </div>
        <button
          type="button"
          class="inline-flex items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-purple-500 dark:hover:bg-purple-400 dark:focus:ring-purple-800"
          @click="handleSendToClient"
        >
          <span>Send to Client</span>
        </button>
      </div>
    </div>

    <!-- Job Posts -->
    <div class="flex flex-col gap-4">
      <div
        v-for="(jobPost, index) in jobPosts"
        :key="index"
        class="relative rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      >
        <!-- Copy Icon -->
        <button
          type="button"
          class="absolute right-4 top-4 rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200"
          @click="copyJobPost(jobPost)"
          :title="'Copy job post ' + (index + 1)"
        >
          <svg
            class="h-5 w-5"
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
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>

        <!-- Job Post Content -->
        <div class="pr-10">
          <h3 class="mb-4 text-base font-bold text-gray-900 dark:text-gray-100">
            Job Post
          </h3>
          <ul class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            <li>
              <strong class="font-semibold text-gray-900 dark:text-gray-100"
                >{{ jobPost.position }}</strong
              >
            </li>
            <li>{{ jobPost.title }}</li>
            <li>{{ jobPost.account }}</li>
            <li>{{ jobPost.location }}</li>
            <li>{{ jobPost.shift }}</li>
            <li>{{ jobPost.timeZone }}</li>
            <li>{{ jobPost.offDays }}</li>
            <li>{{ jobPost.pay }}</li>
            <li>{{ jobPost.experience }}</li>
            <li>{{ jobPost.startDate }}</li>
            <li>{{ jobPost.requirements }}</li>
            <li>{{ jobPost.instructions }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["generateHiringPost", "sendToClient"]);

// Mock job posts data
const jobPosts = ref([
  {
    position: "Disposition Manager Real Estate",
    title: "Teleoceans LLC. is Hiring for Real Estate Disposition Manager",
    account: "Real Estate Account",
    location: "Working from home",
    shift: "Full Time Shift 8 + 1 Break Super Fluent / Native Speaker",
    timeZone: "USA Time Zone",
    offDays: "Fixed off Saturday - Sunday",
    pay: "Base Pay $700 KPI + Commission",
    experience: "EXPERIENCE is a must. 1+ Year",
    startDate: "STARTING ASAP",
    requirements: "(Egyptians only)",
    instructions:
      "If interested, send a voice note introducing yourself and talking about your past experience",
  },
  {
    position: "Disposition Manager Real Estate",
    title: "Teleoceans LLC. is Hiring for Real Estate Disposition Manager",
    account: "Real Estate Account",
    location: "Working from home",
    shift: "Full Time Shift 8 + 1 Break Super Fluent / Native Speaker",
    timeZone: "USA Time Zone",
    offDays: "Fixed off Saturday - Sunday",
    pay: "Base Pay $700 KPI + Commission",
    experience: "EXPERIENCE is a must. 1+ Year",
    startDate: "STARTING ASAP",
    requirements: "(Egyptians only)",
    instructions:
      "If interested, send a voice note introducing yourself and talking about your past experience",
  },
  {
    position: "Disposition Manager Real Estate",
    title: "Teleoceans LLC. is Hiring for Real Estate Disposition Manager",
    account: "Real Estate Account",
    location: "Working from home",
    shift: "Full Time Shift 8 + 1 Break Super Fluent / Native Speaker",
    timeZone: "USA Time Zone",
    offDays: "Fixed off Saturday - Sunday",
    pay: "Base Pay $700 KPI + Commission",
    experience: "EXPERIENCE is a must. 1+ Year",
    startDate: "STARTING ASAP",
    requirements: "(Egyptians only)",
    instructions:
      "If interested, send a voice note introducing yourself and talking about your past experience",
  },
]);

const handleGenerateHiringPost = () => {
  emit("generateHiringPost");
  // In a real app, this would generate a new job post
  console.log("Generate hiring post clicked");
};

const handleSendToClient = () => {
  emit("sendToClient");
  console.log("Send to client clicked");
};

const copyJobPost = (jobPost) => {
  const jobPostText = `Job Post
${jobPost.position}
${jobPost.title}
${jobPost.account}
${jobPost.location}
${jobPost.shift}
${jobPost.timeZone}
${jobPost.offDays}
${jobPost.pay}
${jobPost.experience}
${jobPost.startDate}
${jobPost.requirements}
${jobPost.instructions}`;

  navigator.clipboard
    .writeText(jobPostText)
    .then(() => {
      console.log("Job post copied to clipboard");
      // You could add a toast notification here
    })
    .catch((err) => {
      console.error("Failed to copy job post:", err);
    });
};
</script>
