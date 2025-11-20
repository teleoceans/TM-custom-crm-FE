<template>
  <div>
    <h1 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">
      Settings
    </h1>
    <div class="grid gap-6 md:grid-cols-2">
      <!-- Profile Section -->
      <Card title="Profile">
        <div class="space-y-6">
          <!-- Profile Picture -->
          <div class="flex items-center gap-4">
            <div class="shrink-0">
              <img
                v-if="profile.profilePicture"
                :src="profile.profilePicture"
                alt="Profile picture"
                class="h-20 w-20 rounded-full object-cover"
              />
              <div
                v-else
                class="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700"
              >
                <span
                  class="text-2xl font-semibold text-gray-500 dark:text-gray-400"
                >
                  {{ profileInitials }}
                </span>
              </div>
            </div>
            <div class="flex flex-row gap-2">
              <Button @click="handleUpload" size="sm">
                <template #icon-left>
                  <UploadIcon class="h-4 w-4" />
                </template>
                Upload
              </Button>
              <Button variant="outline" size="sm" @click="handleRemove">
                Remove
              </Button>
            </div>
          </div>

          <!-- Form Fields -->
          <form @submit.prevent="handleSaveProfile" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <Input
                id="username"
                v-model="profile.username"
                label="Username"
                placeholder="Enter username"
                required
              />
              <Input
                id="fullName"
                v-model="profile.fullName"
                label="Full name"
                placeholder="Enter full name"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-4">
              <Input
                id="email"
                v-model="profile.email"
                type="email"
                label="Your email"
                placeholder="Enter email"
                required
              />
              <Select
                id="timezone"
                v-model="profile.timezone"
                label="Timezone"
                :options="timezones"
                placeholder="Select timezone"
              />
            </div>
            <Button type="submit">Save changes</Button>
          </form>

          <!-- Password Management -->
          <div class="border-t border-gray-200 pt-6 dark:border-gray-700">
            <h3
              class="mb-4 text-base font-semibold text-gray-900 dark:text-white"
            >
              Password
            </h3>
            <form @submit.prevent="handleSavePassword" class="space-y-4">
              <Input
                id="currentPassword"
                v-model="password.currentPassword"
                type="password"
                label="Enter your current password"
                placeholder="Enter current password"
              />
              <Input
                id="newPassword"
                v-model="password.newPassword"
                type="password"
                label="Your new password"
                placeholder="Enter new password"
                @input="validatePassword"
              />
              <Input
                id="confirmPassword"
                v-model="password.confirmPassword"
                type="password"
                label="Confirm new password"
                placeholder="Confirm new password"
              />

              <!-- Password Requirements -->
              <div class="space-y-2">
                <div
                  v-for="(requirement, index) in passwordRequirements"
                  :key="index"
                  class="flex items-center gap-2"
                >
                  <component
                    :is="requirement.met ? CheckIcon : XIcon"
                    :class="[
                      'h-4 w-4',
                      requirement.met
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400',
                    ]"
                  />
                  <span
                    :class="[
                      'text-sm',
                      requirement.met
                        ? 'text-gray-700 dark:text-gray-300'
                        : 'text-gray-500 dark:text-gray-400',
                    ]"
                  >
                    {{ requirement.text }}
                  </span>
                </div>
              </div>

              <Button type="submit">Save changes</Button>
            </form>
          </div>
        </div>
      </Card>

      <!-- Notifications Section -->
      <Card title="Notifications">
        <div class="space-y-6">
          <!-- Alerts & Notifications -->
          <div>
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white">
                Alerts & Notifications
              </h3>
              <button
                type="button"
                class="text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                @click="toggleAllAlerts"
              >
                Select all
              </button>
            </div>
            <div class="space-y-4">
              <div
                v-for="item in notificationItems"
                :key="item.id"
                class="flex items-center justify-between"
              >
                <div class="flex flex-col">
                  <span
                    class="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    {{ item.label }}
                  </span>
                  <span class="text-xs text-gray-500 dark:text-gray-400">
                    {{ item.description }}
                  </span>
                </div>
                <Toggle
                  :id="`toggle-${item.id}`"
                  v-model="notificationToggles[item.key]"
                />
              </div>
            </div>
          </div>

          <!-- Email me when -->
          <div>
            <div class="mb-4 flex items-center justify-between">
              <h3 class="text-base font-semibold text-gray-900 dark:text-white">
                Email me when:
              </h3>
              <button
                type="button"
                class="text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                @click="toggleAllEmails"
              >
                Select all
              </button>
            </div>
            <div class="space-y-3">
              <label
                v-for="(checked, index) in emailNotifications.leadWonStage"
                :key="`email-${index}`"
                class="flex items-center gap-3"
              >
                <input
                  :id="`email-lead-won-${index}`"
                  v-model="emailNotifications.leadWonStage[index]"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-500"
                />
                <span class="text-sm font-medium text-gray-900 dark:text-white">
                  Lead is added to won stage
                </span>
              </label>
            </div>
          </div>

          <Button @click="handleSaveNotifications">Save changes</Button>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";
import Card from "../components/common/Card.vue";
import Button from "../components/common/Button.vue";
import Input from "../components/common/Input.vue";
import Select from "../components/common/Select.vue";
import Toggle from "../components/common/Toggle.vue";
import UploadIcon from "../components/icons/common/UploadIcon.vue";
import CheckIcon from "../components/icons/common/CheckIcon.vue";
import XIcon from "../components/icons/common/XIcon.vue";
import {
  mockProfile,
  mockNotificationToggles,
  mockEmailNotifications,
  mockSecurity,
  notificationItems,
  passwordRequirements as passwordRequirementsConfig,
  timezones,
} from "../mock/settings.js";

const profile = ref({ ...mockProfile });
const notificationToggles = ref({ ...mockNotificationToggles });
const emailNotifications = ref({
  leadWonStage: [false, false, false], // Three checkboxes
});

const password = ref({ ...mockSecurity });

// Initialize password requirements with met property
const passwordRequirements = ref(
  passwordRequirementsConfig.map((req) => ({
    ...req,
    met: false,
  }))
);

const profileInitials = computed(() => {
  if (!profile.value.fullName) return "?";
  const names = profile.value.fullName.split(" ");
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase();
  }
  return names[0][0].toUpperCase();
});

const handleUpload = () => {
  // UI-only for now - placeholder for future file upload functionality
  console.log("Upload profile picture clicked");
};

const handleRemove = () => {
  // UI-only for now
  profile.value.profilePicture = null;
  console.log("Remove profile picture clicked");
};

const handleSaveProfile = () => {
  console.log("Saving profile:", profile.value);
  // TODO: Implement actual save logic
};

const handleSaveNotifications = () => {
  console.log("Saving notifications:", {
    toggles: notificationToggles.value,
    emails: emailNotifications.value,
  });
  // TODO: Implement actual save logic
};

const toggleAllAlerts = () => {
  const allSelected = notificationItems.every(
    (item) => notificationToggles.value[item.key] === true
  );
  const newValue = !allSelected;
  notificationItems.forEach((item) => {
    notificationToggles.value[item.key] = newValue;
  });
};

const toggleAllEmails = () => {
  const allSelected = emailNotifications.value.leadWonStage.every(
    (value) => value === true
  );
  const newValue = !allSelected;
  emailNotifications.value.leadWonStage = [newValue, newValue, newValue];
};

const validatePassword = () => {
  const pwd = password.value.newPassword;
  passwordRequirements.value.forEach((req) => {
    req.met = req.validator(pwd, password.value.currentPassword);
  });
};

const handleSavePassword = () => {
  validatePassword();
  const allMet = passwordRequirements.value.every((req) => req.met);
  if (!allMet) {
    console.warn("Password does not meet all requirements");
    return;
  }
  if (password.value.newPassword !== password.value.confirmPassword) {
    console.warn("Passwords do not match");
    return;
  }
  console.log("Saving password");
  // TODO: Implement actual save logic
};

// Watch for password changes and validate
watch(
  () => password.value.newPassword,
  () => {
    validatePassword();
  }
);

// Initialize validation on mount
onMounted(() => {
  validatePassword();
});
</script>
