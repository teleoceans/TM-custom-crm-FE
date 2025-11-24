<template>
  <div>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <!-- New Leads Card -->
      <StatCard
        :icon="NewLeadsIcon"
        icon-class="mb-2 h-6 w-6 text-purple-600"
        title="New Leads"
        value="1,250"
        change="7%"
        change-type="up"
        change-color-class="text-green-500 dark:text-green-400"
      />

      <!-- Contacted Leads Card -->
      <StatCard
        :icon="ContactedLeadsIcon"
        icon-class="mb-2 h-6 w-6 text-yellow-400"
        title="Contacted Leads"
        value="1,234"
        change="12%"
        change-type="up"
        change-color-class="text-green-500 dark:text-green-400"
      />

      <!-- Won Leads Card -->
      <StatCard
        :icon="WonLeadsIcon"
        icon-class="mb-2 h-6 w-6 text-green-500"
        title="Won Leads"
        value="567"
        change="8%"
        change-type="down"
        change-color-class="text-red-500 dark:text-red-400"
      />

      <!-- Lost Leads Card -->
      <StatCard
        :icon="LostLeadsIcon"
        icon-class="mb-2 h-6 w-6 text-red-500"
        title="Lost Leads"
        value="89"
        change="24%"
        change-type="up"
        change-color-class="text-green-500 dark:text-green-400"
      />
    </div>

    <!-- Revenue Chart Card -->
    <div class="mt-4">
      <RevenueChartCard
        amount="$401,857"
        description="Total revenue for flowbite.com"
        chart-id="total-sales-chart"
      >
        <template #chart>
          <BarChart
            chart-id="total-sales-chart"
            :series="chartSeries"
            :categories="chartCategories"
            :height="520"
          />
        </template>
      </RevenueChartCard>
    </div>

    <!-- Tasks and Activity Section -->
    <div class="mt-4 grid gap-4 lg:grid-cols-2">
      <!-- Task List -->
      <Card
        padding="none"
        class="overflow-hidden border border-gray-300 dark:border-white"
        :border="false"
      >
        <div class="overflow-x-auto">
          <table class="min-w-full table-fixed divide-y divide-gray-200">
            <thead>
              <tr
                class="bg-primary-800 text-left text-xs font-semibold uppercase tracking-wide text-white"
              >
                <th scope="col" class="px-6 py-4 whitespace-nowrap">TASK</th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap">
                  ASSIGNED TO
                </th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap">DATE</th>
                <th scope="col" class="px-6 py-4 whitespace-nowrap">STATUS</th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-gray-200 bg-white dark:divide-white dark:bg-gray-800"
            >
              <tr
                v-for="task in tasks"
                :key="task.id"
                class="transition hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td class="px-6 py-4 whitespace-nowrap">{{ task.task }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  {{ task.assignedTo }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">{{ task.date }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <Badge :variant="getStatusVariant(task.status)">
                    {{ task.status }}
                  </Badge>
                </td>
              </tr>
              <tr v-if="tasks.length === 0">
                <td colspan="4" class="px-6 py-4 text-center">
                  <p class="text-gray-500 dark:text-gray-400">
                    No tasks available
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <!-- Recent Activity -->
      <div class="recent-activity-card">
        <h3 class="text-lg font-semibold">Recent Activity</h3>
        <div class="recent-activity-content">
          <ul class="recent-activity-list">
            <ActivityItem
              v-for="activity in filteredActivities"
              :key="activity.id"
              :title="activity.title"
              :meta="activity.description"
            >
              <template #icon>
                <div
                  :class="[
                    'flex h-6 w-6 items-center justify-center rounded-full',
                    activity.icon === 'user-plus'
                      ? 'bg-green-100 dark:bg-green-900'
                      : 'bg-yellow-100 dark:bg-yellow-900',
                  ]"
                >
                  <svg
                    v-if="activity.icon === 'user-plus'"
                    class="h-4 w-4 text-green-600 dark:text-green-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  <svg
                    v-else-if="activity.icon === 'funnel'"
                    class="h-4 w-4 text-yellow-600 dark:text-yellow-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </div>
              </template>
            </ActivityItem>
            <li
              v-if="filteredActivities.length === 0"
              class="px-4 py-8 text-center"
            >
              <p class="text-gray-500 dark:text-gray-400">No recent activity</p>
            </li>
          </ul>
        </div>
        <div class="recent-activity-footer">
          <select
            v-model="activityFilter"
            class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:focus:border-primary-500 dark:focus:ring-primary-800"
          >
            <option value="last-7-days">Last 7 days</option>
            <option value="last-30-days">Last 30 days</option>
            <option value="all">All time</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Today's Schedule Section -->
    <div class="mt-4">
      <h3 class="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        Today's Schedule
      </h3>
      <div class="grid gap-4 lg:grid-cols-2">
        <div class="lg:col-span-1">
          <div class="space-y-2">
            <Card
              v-for="scheduleItem in todaysSchedule"
              :key="scheduleItem.id"
              class="cursor-pointer hover:shadow-md transition-shadow"
            >
              <label class="flex items-center gap-3 cursor-pointer" @click.stop>
                <input
                  :id="`schedule-${scheduleItem.id}`"
                  v-model="scheduleItem.completed"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-500"
                  @click.stop
                />
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {{ scheduleItem.time }} - {{ scheduleItem.description }}
                </span>
              </label>
            </Card>
          </div>
          <div class="mt-6">
            <Button variant="primary" class="w-full" @click="handleAddNewTask">
              <template #icon-left>
                <PlusIcon />
              </template>
              Add new task
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import StatCard from "../components/common/StatCard.vue";
import RevenueChartCard from "../components/charts/RevenueChartCard.vue";
import BarChart from "../components/charts/BarChart.vue";
import Card from "../components/common/Card.vue";
import Badge from "../components/common/Badge.vue";
import Button from "../components/common/Button.vue";
import ActivityItem from "../components/leads/ActivityItem.vue";
import PlusIcon from "../components/icons/common/PlusIcon.vue";
import NewLeadsIcon from "../components/icons/stats/NewLeads.vue";
import ContactedLeadsIcon from "../components/icons/stats/ContactedLeads.vue";
import WonLeadsIcon from "../components/icons/stats/WonLeads.vue";
import LostLeadsIcon from "../components/icons/stats/LostLeads.vue";
import {
  mockChartSeries,
  mockChartCategories,
  mockTasks,
  mockRecentActivities,
  mockTodaysSchedule,
} from "../mock/dashboard.js";

// Chart data
const chartSeries = ref(mockChartSeries.map((series) => ({ ...series })));

const chartCategories = ref([...mockChartCategories]);

// Tasks data
const tasks = ref([...mockTasks]);

// Activity data
const activities = ref([...mockRecentActivities]);
const activityFilter = ref("last-7-days");

// Filter activities based on selected time range
const filteredActivities = computed(() => {
  // For now, return all activities. Can be enhanced with actual date filtering
  return activities.value;
});

// Today's Schedule data
const todaysSchedule = ref(mockTodaysSchedule.map((item) => ({ ...item })));

// Map status to badge variant
const getStatusVariant = (status) => {
  const statusMap = {
    Completed: "success",
    Cancelled: "danger",
    "In progress": "warning",
  };
  return statusMap[status] || "gray";
};

// Handle add new task
const handleAddNewTask = () => {
  // TODO: Implement add new task functionality
  console.log("Add new task clicked");
};
</script>

<style scoped>
.recent-activity-card {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 20px;
  gap: 16px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  align-self: stretch;
}

.recent-activity-card h3 {
  margin: 0;
  width: 100%;
}

.recent-activity-content {
  width: 100%;
  flex: 1;
}

.recent-activity-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.recent-activity-footer {
  width: 100%;
  margin-top: auto;
}

.dark .recent-activity-card {
  background: #1f2937;
  border-color: #ffffff;
}
</style>
