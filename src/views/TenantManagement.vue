<template>
  <div>
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Tenant Management</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Manage tenants and their configurations
      </p>
    </div>

    <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Tenants</h3>
        </template>
        <p class="text-gray-600 dark:text-gray-400">
          View and manage tenant organizations.
        </p>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '../components/common/Card.vue'
</script>

