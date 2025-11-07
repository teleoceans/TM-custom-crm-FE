<template>
  <div>
    <div class="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white">Leads</h1>
      <Button @click="showModal = true">Add Lead</Button>
    </div>
    <Card>
      <Table :columns="columns" :data="leads">
        <template #cell-status="{ value }">
          <Badge :variant="getStatusVariant(value)">{{ value }}</Badge>
        </template>
        <template #actions="{ row }">
          <Button variant="ghost" size="sm">View</Button>
          <Button variant="ghost" size="sm">Convert</Button>
        </template>
      </Table>
    </Card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card from '../components/common/Card.vue'
import Table from '../components/common/Table.vue'
import Button from '../components/common/Button.vue'
import Badge from '../components/common/Badge.vue'
import Modal from '../components/common/Modal.vue'

const showModal = ref(false)

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'company', label: 'Company' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' }
]

const leads = ref([
  { id: 1, name: 'Alice Williams', company: 'Acme Corp', email: 'alice@acme.com', status: 'New' },
  { id: 2, name: 'Charlie Brown', company: 'Tech Inc', email: 'charlie@tech.com', status: 'Contacted' },
  { id: 3, name: 'Diana Prince', company: 'Wonder Co', email: 'diana@wonder.com', status: 'Qualified' }
])

const getStatusVariant = (status) => {
  const map = {
    New: 'info',
    Contacted: 'warning',
    Qualified: 'success',
    Lost: 'danger'
  }
  return map[status] || 'gray'
}
</script>

