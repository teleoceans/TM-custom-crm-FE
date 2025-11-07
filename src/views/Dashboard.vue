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
  </div>
</template>

<script setup>
import { ref } from "vue";
import StatCard from "../components/common/StatCard.vue";
import RevenueChartCard from "../components/charts/RevenueChartCard.vue";
import BarChart from "../components/charts/BarChart.vue";
import NewLeadsIcon from "../components/icons/NewLeads.vue";
import ContactedLeadsIcon from "../components/icons/ContactedLeads.vue";
import WonLeadsIcon from "../components/icons/WonLeads.vue";
import LostLeadsIcon from "../components/icons/LostLeads.vue";

// Chart data
const chartSeries = ref([
  {
    name: "Templates",
    data: [631, 600, 540, 580, 490, 580, 620],
  },
  {
    name: "Icons",
    data: [460, 490, 390, 620, 410, 640, 360],
  },
  {
    name: "Illustrations",
    data: [232, 630, 341, 224, 522, 411, 243],
  },
]);

const chartCategories = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
</script>
