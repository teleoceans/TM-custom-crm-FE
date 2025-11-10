<template>
  <div>
    <h1 class="mb-6 text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
    <div class="grid gap-6 md:grid-cols-2">
      <Card title="Profile Settings">
        <form class="space-y-4">
          <Input label="Name" v-model="profile.name" placeholder="Enter your name" />
          <Input label="Email" type="email" v-model="profile.email" placeholder="Enter your email" />
          <Input label="Phone" v-model="profile.phone" placeholder="Enter your phone" />
          <Button>Save Changes</Button>
        </form>
      </Card>
      <Card title="Notification Preferences">
        <div class="space-y-4">
          <label class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Email Notifications</span>
            <input type="checkbox" v-model="notifications.email" class="rounded" />
          </label>
          <label class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900 dark:text-white">SMS Notifications</span>
            <input type="checkbox" v-model="notifications.sms" class="rounded" />
          </label>
          <label class="flex items-center justify-between">
            <span class="text-sm font-medium text-gray-900 dark:text-white">Push Notifications</span>
            <input type="checkbox" v-model="notifications.push" class="rounded" />
          </label>
        </div>
      </Card>
      <Card title="Security">
        <form class="space-y-4">
          <Input label="Current Password" type="password" v-model="security.currentPassword" />
          <Input label="New Password" type="password" v-model="security.newPassword" />
          <Input label="Confirm Password" type="password" v-model="security.confirmPassword" />
          <Button variant="danger">Change Password</Button>
        </form>
      </Card>
      <Card title="Appearance">
        <div class="space-y-4">
          <p class="text-sm text-gray-600 dark:text-gray-400">Choose your preferred theme</p>
          <div class="flex gap-4">
            <Button variant="outline">Light</Button>
            <Button variant="outline">Dark</Button>
            <Button variant="outline">System</Button>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../components/common/Card.vue'
import Button from '../components/common/Button.vue'
import Input from '../components/common/Input.vue'
import {
  mockProfile,
  mockNotifications,
  mockSecurity,
} from '../mock/settings.js'

const profile = ref({ ...mockProfile })

const notifications = ref({ ...mockNotifications })

const security = ref({ ...mockSecurity })
</script>

