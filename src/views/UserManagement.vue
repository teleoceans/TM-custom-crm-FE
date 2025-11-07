<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">User Management</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Manage users and their permissions
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Users</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-400">
          View and manage system users.
        </p>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '../components/common/Card.vue'
</script>

