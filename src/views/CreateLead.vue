<template>
  <div class="flex w-full flex-col -mt-6">
    <div
      class="create-lead-header grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div
        class="col-span-full flex flex-col gap-3 px-4 pt-4 xl:flex-row xl:items-center xl:justify-between"
      >
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Create New Lead
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Enter the lead details below. This is a placeholder form and does
            not submit data yet.
          </p>
        </div>
        <button
          type="button"
          class="inline-flex items-center self-start rounded-lg px-3 py-2 text-sm font-medium text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          @click="handleCancel"
        >
          Back to Leads
        </button>
      </div>
    </div>

    <div class="mx-auto w-full max-w-full py-4">
      <form
        class="grid gap-6 overflow-hidden rounded-xl border border-gray-300 bg-white p-6 shadow-sm dark:border-white dark:bg-gray-800"
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label
              for="lead-name"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Name
            </label>
            <input
              id="lead-name"
              v-model="form.name"
              type="text"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="Jane Doe"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="lead-email"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email
            </label>
            <input
              id="lead-email"
              v-model="form.email"
              type="email"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="jane.doe@example.com"
            />
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label
              for="lead-phone"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Phone Number
            </label>
            <input
              id="lead-phone"
              v-model="form.phone"
              type="tel"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="(555) 123-4567"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="lead-value"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Lead Value
            </label>
            <input
              id="lead-value"
              v-model="form.leadValue"
              type="number"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="5000"
              min="0"
              step="100"
            />
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label
              for="market-value"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Market Value
            </label>
            <input
              id="market-value"
              v-model="form.marketValue"
              type="number"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="7500"
              min="0"
              step="100"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="asking-price"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Asking Price
            </label>
            <input
              id="asking-price"
              v-model="form.askingPrice"
              type="number"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="6800"
              min="0"
              step="100"
            />
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label
              for="lead-address"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Address
            </label>
            <textarea
              id="lead-address"
              v-model="form.address"
              rows="3"
              class="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="123 Elm Street, Springfield"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="lead-notes"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Notes
            </label>
            <textarea
              id="lead-notes"
              v-model="form.notes"
              rows="3"
              class="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="Add context about this lead..."
            />
          </div>
        </div>

        <div
          class="flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-gray-700 md:flex-row md:justify-end"
        >
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-800"
            @click="handleCancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-200 dark:bg-primary-500 dark:hover:bg-primary-400 dark:focus:ring-primary-800"
          >
            Save Lead
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { sanitizeFormData } from "../utils/sanitize";

const router = useRouter();
const form = reactive({
  name: "",
  email: "",
  phone: "",
  leadValue: "",
  marketValue: "",
  askingPrice: "",
  address: "",
  notes: "",
});

const handleSubmit = () => {
  // Sanitize form data before submission
  const sanitizedData = sanitizeFormData(form, {
    name: { type: "string" },
    email: { type: "email" },
    phone: { type: "phone" },
    leadValue: { type: "number" },
    marketValue: { type: "number" },
    askingPrice: { type: "number" },
    address: { type: "text" },
    notes: { type: "text" },
  });

  console.info("Submitting new lead (placeholder):", sanitizedData);
};

const handleCancel = () => {
  router.push("/leads");
};
</script>

<style scoped>
.create-lead-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
