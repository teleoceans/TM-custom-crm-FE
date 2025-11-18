<template>
  <div class="grid gap-6 md:grid-cols-2">
    <!-- Left Column -->
    <div class="flex flex-col gap-4">
      <div class="purple-input">
        <Input
          :model-value="modelValue.name"
          label="Name"
          type="text"
          :required="true"
          :error="errors?.name"
          placeholder="Laila Ahmed"
          @update:model-value="updateField('name', $event)"
          @input="emit('clearError', 'name')"
        />
      </div>
      <div class="purple-input">
        <Input
          :model-value="modelValue.phoneNumber"
          label="Phone Number"
          type="tel"
          :required="true"
          :error="errors?.phoneNumber"
          placeholder="+96541598525"
          @update:model-value="updateField('phoneNumber', $event)"
          @input="emit('clearError', 'phoneNumber')"
        />
      </div>
      <div class="purple-input">
        <Input
          :model-value="modelValue.email"
          label="Email"
          type="email"
          :required="true"
          :error="errors?.email"
          placeholder="a.aly@gmail.com"
          @update:model-value="updateField('email', $event)"
          @input="emit('clearError', 'email')"
        />
      </div>

      <!-- Address Section -->
      <div class="space-y-4">
        <h2
          class="text-base font-bold text-gray-900 dark:text-gray-100"
        >
          Address
        </h2>
        <div class="purple-input">
          <Input
            :model-value="modelValue.streetAddress1"
            label="Street Address 1"
            type="text"
            :required="true"
            :error="errors?.streetAddress1"
            placeholder="123 Main St."
            @update:model-value="updateField('streetAddress1', $event)"
            @input="emit('clearError', 'streetAddress1')"
          />
        </div>
        <div class="purple-input">
          <Input
            :model-value="modelValue.streetAddress2"
            label="Street Address 2"
            type="text"
            placeholder="123 Main St."
            @update:model-value="updateField('streetAddress2', $event)"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="purple-select">
            <Select
              :model-value="modelValue.country"
              label="Country"
              :options="formOptions.countries"
              :required="true"
              :error="errors?.country"
              placeholder="Select country"
              @update:model-value="(value) => { updateField('country', value); emit('clearError', 'country'); }"
            />
          </div>
          <div class="purple-select">
            <Select
              :model-value="modelValue.city"
              label="City"
              :options="formOptions.cities"
              :required="true"
              :error="errors?.city"
              placeholder="Select city"
              @update:model-value="(value) => { updateField('city', value); emit('clearError', 'city'); }"
            />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div class="purple-select">
            <Select
              :model-value="modelValue.state"
              label="State"
              :options="formOptions.states"
              :required="true"
              :error="errors?.state"
              placeholder="Select state"
              @update:model-value="(value) => { updateField('state', value); emit('clearError', 'state'); }"
            />
          </div>
          <div class="purple-input">
            <Input
              :model-value="modelValue.zipCode"
              label="Zip Code (Optional)"
              type="text"
              placeholder="12562"
              @update:model-value="updateField('zipCode', $event)"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column -->
    <div class="flex flex-col gap-4">
      <div class="purple-select">
        <Select
          :model-value="modelValue.industry"
          label="Industry"
          :options="formOptions.industries"
          :required="true"
          :error="errors?.industry"
          placeholder="Select industry"
          @update:model-value="(value) => { updateField('industry', value); emit('clearError', 'industry'); }"
        />
      </div>
      <div class="purple-select">
        <Select
          :model-value="modelValue.timeZone"
          label="Time Zone"
          :options="formOptions.timeZones"
          :required="true"
          :error="errors?.timeZone"
          placeholder="Select time zone"
          @update:model-value="(value) => { updateField('timeZone', value); emit('clearError', 'timeZone'); }"
        />
      </div>
      <div class="purple-select">
        <Select
          :model-value="modelValue.currency"
          label="Currency"
          :options="formOptions.currencies"
          :required="true"
          :error="errors?.currency"
          placeholder="Select currency"
          @update:model-value="(value) => { updateField('currency', value); emit('clearError', 'currency'); }"
        />
      </div>
      <div class="purple-input">
        <Input
          :model-value="modelValue.whatsappNumber"
          label="WhatsApp Number (Optional)"
          type="tel"
          placeholder="+356143424"
          @update:model-value="updateField('whatsappNumber', $event)"
        />
      </div>
      <div class="purple-input">
        <Input
          :model-value="modelValue.website"
          label="Website (Optional)"
          type="url"
          :error="errors?.website"
          placeholder="https://companyname.com"
          @update:model-value="updateField('website', $event)"
          @input="emit('clearError', 'website')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import Input from "../common/Input.vue";
import Select from "../common/Select.vue";
import { tenantFormOptions } from "../../mock/tenants";

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
  errors: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["update:modelValue", "clearError"]);

const formOptions = computed(() => tenantFormOptions);

const updateField = (field, value) => {
  emit("update:modelValue", {
    ...props.modelValue,
    [field]: value,
  });
};
</script>

<style scoped>
/* Purple input and select styling for CreateTenant form */
.purple-input :deep(input) {
  border-color: rgb(233 213 255) !important; /* purple-200 */
}

.purple-input :deep(input:focus) {
  border-color: rgb(147 51 234) !important; /* purple-500 */
  --tw-ring-color: rgb(233 213 255) !important; /* purple-200 */
}

.dark .purple-input :deep(input) {
  border-color: rgb(126 34 206) !important; /* purple-700 */
}

.dark .purple-input :deep(input:focus) {
  border-color: rgb(168 85 247) !important; /* purple-400 */
  --tw-ring-color: rgb(88 28 135) !important; /* purple-800 */
}

.purple-select :deep(select) {
  border-color: rgb(233 213 255) !important; /* purple-200 */
}

.purple-select :deep(select:focus) {
  border-color: rgb(147 51 234) !important; /* purple-500 */
  --tw-ring-color: rgb(233 213 255) !important; /* purple-200 */
}

.dark .purple-select :deep(select) {
  border-color: rgb(126 34 206) !important; /* purple-700 */
}

.dark .purple-select :deep(select:focus) {
  border-color: rgb(168 85 247) !important; /* purple-400 */
  --tw-ring-color: rgb(88 28 135) !important; /* purple-800 */
}
</style>

