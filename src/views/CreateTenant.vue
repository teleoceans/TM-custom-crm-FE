<template>
  <div class="flex w-full flex-col -mt-6">
    <div
      class="create-tenant-header page-header-negative-margin grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div
        class="col-span-full flex flex-col gap-3 px-4 pt-4 xl:flex-row xl:items-center xl:justify-between"
      >
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Add New Tenant
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Create a new tenant with company profile, plan details, and
            assignments.
          </p>
        </div>
        <Button
          variant="muted"
          size="sm"
          class="self-start"
          @click="handleCancel"
        >
          Back to Tenants
        </Button>
      </div>
    </div>
    <div class="mx-auto w-full max-w-full py-4">
      <div class="mb-4">
        <Tabs
          v-model="activeTab"
          :tabs="tabs"
          :completed-tabs="completedTabs"
          @change="handleTabChange"
        />
      </div>
      <Card :border="true" :padding="'none'" class="overflow-hidden">
        <!-- Aria-live region for form errors -->
        <div aria-live="polite" aria-atomic="true" class="sr-only">
          <span v-if="Object.values(errors).some((e) => e)">
            Form has
            {{ Object.values(errors).filter((e) => e).length }} error(s)
          </span>
        </div>

        <div class="px-6 pb-6 pt-6">
          <CompanyProfileStep
            v-if="activeTab === 'company-profile'"
            v-model="form"
            :errors="errors"
            @clear-error="clearError"
          />

          <PlanSeatsStep
            v-else-if="activeTab === 'plan-seats'"
            :model-value="planSeatsForm"
            @update:model-value="updatePlanSeatsForm"
          />

          <ContractPaymentStep
            v-else-if="activeTab === 'contract-payment'"
            v-model="contractPaymentForm"
            @create-contract="handleCreateContract"
            @send-to-client="handleSendContractToClient"
          />

          <AssignToStep
            v-else-if="activeTab === 'assign-to'"
            v-model="assignToForm"
            @add-new-user="handleAddNewUser"
          />

          <AutomationStep
            v-else-if="activeTab === 'automation'"
            @generate-hiring-post="handleGenerateHiringPost"
            @send-to-client="handleSendToClient"
          />
        </div>

        <StepNavigation
          v-if="activeTab === 'company-profile'"
          :show-back="false"
          :show-next="true"
          @next="handleNext"
        >
          <template #before-buttons>
            <Button variant="muted" @click="handleCancel">Cancel</Button>
          </template>
        </StepNavigation>

        <StepNavigation
          v-if="activeTab === 'plan-seats'"
          :show-back="true"
          :show-next="true"
          @back="handleBack"
          @next="handleNext"
        />

        <StepNavigation
          v-if="activeTab === 'contract-payment'"
          :show-back="true"
          :show-next="true"
          @back="handleBack"
          @next="handleNext"
        />

        <StepNavigation
          v-if="activeTab === 'assign-to'"
          :show-back="true"
          :show-next="true"
          @back="handleBack"
          @next="handleNext"
        />

        <StepNavigation
          v-if="activeTab === 'automation'"
          :show-back="true"
          :show-next="false"
          :submit-mode="true"
          @back="handleBack"
          @submit="handleSubmit"
        />
      </Card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import Card from "../components/common/Card.vue";
import Tabs from "../components/common/Tabs.vue";
import Button from "../components/common/Button.vue";
import StepNavigation from "../components/common/StepNavigation.vue";
import { useStepNavigation } from "../composables/useStepNavigation";
import ProfileCardOutline from "../components/icons/outline/ProfileCardOutline.vue";
import RectangleListOutline from "../components/icons/outline/RectangleListOutline.vue";
import FilePenOutline from "../components/icons/outline/FilePenOutline.vue";
import UserOutline from "../components/icons/outline/UserOutline.vue";
import AnnotationOutline from "../components/icons/outline/AnnotationOutline.vue";
import CompanyProfileStep from "../components/tenants/CompanyProfileStep.vue";
import PlanSeatsStep from "../components/tenants/PlanSeatsStep.vue";
import ContractPaymentStep from "../components/tenants/ContractPaymentStep.vue";
import AssignToStep from "../components/tenants/AssignToStep.vue";
import AutomationStep from "../components/tenants/AutomationStep.vue";
import { sanitizeFormData } from "../utils/sanitize";
import { useFormValidation } from "../composables/useFormValidation";

const router = useRouter();

// Step order
const steps = [
  "company-profile",
  "plan-seats",
  "contract-payment",
  "assign-to",
  "automation",
];

// Use step navigation composable
const {
  currentStep: activeTab,
  completedSteps: completedTabs,
  goToNext,
  goToPrevious,
  markStepCompleted,
} = useStepNavigation(steps, "company-profile");

const tabs = [
  {
    id: "company-profile",
    label: "Company Profile",
    icon: ProfileCardOutline,
  },
  {
    id: "plan-seats",
    label: "Plan & Seats",
    icon: RectangleListOutline,
  },
  {
    id: "contract-payment",
    label: "Contract & Payment",
    icon: FilePenOutline,
  },
  {
    id: "assign-to",
    label: "Assign to",
    icon: UserOutline,
  },
  {
    id: "automation",
    label: "Automation",
    icon: AnnotationOutline,
  },
];

const form = reactive({
  name: "",
  phoneNumber: "",
  email: "",
  streetAddress1: "",
  streetAddress2: "",
  country: "",
  city: "",
  state: "",
  zipCode: "",
  industry: "",
  timeZone: "",
  currency: "",
  whatsappNumber: "",
  website: "",
});

// Plan & Seats form data
const planSeatsForm = reactive({
  coldCallers: {
    enabled: false,
    numberOfCallers: 2,
    hourlyRate: 4,
    dialerPrice: 150,
    totalCost: 1000,
  },
  acquisitionManager: {
    enabled: false,
    numberOfManagers: 2,
    hourlyRate: 4,
    totalCost: 1000,
  },
  dispositions: {
    enabled: false,
    numberOfDispositions: 2,
    hourlyRate: 4,
    totalCost: 1000,
  },
  listPrice: {
    enabled: false,
    quantity: 1000,
    pricePerClient: 0.2,
    totalCost: 200,
  },
});

// Assign to form data
const assignToForm = reactive({
  coldCallers: [],
  dispositions: [],
  acquisitionManagers: [],
});

// Contract & Payment form data
const contractPaymentForm = reactive({
  contractStartDate: "",
  paymentLink: "",
  contractDocument: null,
});

// Use validation composable
const { errors, clearErrors, clearError, validate } = useFormValidation({
  name: "",
  phoneNumber: "",
  email: "",
  streetAddress1: "",
  country: "",
  city: "",
  state: "",
  industry: "",
  timeZone: "",
  currency: "",
  website: "",
});

// Validation rules
const validationRules = {
  name: { required: true, type: "string", label: "Name" },
  phoneNumber: { required: true, type: "phone", label: "Phone number" },
  email: { required: true, type: "email", label: "Email" },
  streetAddress1: { required: true, type: "string", label: "Street address" },
  country: { required: true, type: "string", label: "Country" },
  city: { required: true, type: "string", label: "City" },
  state: { required: true, type: "string", label: "State" },
  industry: { required: true, type: "string", label: "Industry" },
  timeZone: { required: true, type: "string", label: "Time zone" },
  currency: { required: true, type: "string", label: "Currency" },
  website: { required: false, type: "url", label: "Website" },
};

const validateForm = () => {
  return validate(form, validationRules);
};

const handleTabChange = (tabId) => {
  console.log("Tab changed to:", tabId);
};

const handleNext = () => {
  // Validate company profile step before proceeding
  if (activeTab.value === "company-profile") {
    if (!validateForm()) {
      console.warn("Validation errors prevented submission.", { ...errors });
      return;
    }

    // Sanitize form data before submission
    const sanitizedData = sanitizeFormData(form, {
      name: { type: "string" },
      phoneNumber: { type: "phone" },
      email: { type: "email" },
      streetAddress1: { type: "text" },
      streetAddress2: { type: "text" },
      country: { type: "string" },
      city: { type: "string" },
      state: { type: "string" },
      zipCode: { type: "string" },
      industry: { type: "string" },
      timeZone: { type: "string" },
      currency: { type: "string" },
      whatsappNumber: { type: "phone" },
      website: { type: "url" },
    });

    console.log("Form is valid, proceeding to next step");
  }

  // Mark current step as completed and navigate to next
  markStepCompleted(activeTab.value);
  goToNext();
};

const handleBack = () => {
  goToPrevious();
};

const updatePlanSeatsForm = (value) => {
  // Update the reactive object properties directly to maintain reactivity
  if (value.coldCallers) {
    Object.assign(planSeatsForm.coldCallers, value.coldCallers);
  }
  if (value.acquisitionManager) {
    Object.assign(planSeatsForm.acquisitionManager, value.acquisitionManager);
  }
  if (value.dispositions) {
    Object.assign(planSeatsForm.dispositions, value.dispositions);
  }
  if (value.listPrice) {
    Object.assign(planSeatsForm.listPrice, value.listPrice);
  }
};

const handleAddNewUser = () => {
  // Navigate to create user page or open modal
  console.log("Add new user clicked");
  // router.push("/user-management/new");
};

const handleGenerateHiringPost = () => {
  console.log("Generate hiring post clicked");
  // Logic to generate hiring post
};

const handleSendToClient = () => {
  console.log("Send to client clicked");
  // Logic to send to client
};

const handleCreateContract = (contract) => {
  console.log("Contract created:", contract);
  // Contract is already updated in contractPaymentForm via v-model
};

const handleSendContractToClient = (data) => {
  console.log("Sending contract to client:", data);
  // Logic to send contract and payment link to client
};

const handleSubmit = () => {
  // Mark automation tab as completed
  if (!completedTabs.value.includes("automation")) {
    completedTabs.value.push("automation");
  }

  // Collect all form data
  const tenantData = {
    companyProfile: form,
    planSeats: planSeatsForm,
    contractPayment: contractPaymentForm,
    assignTo: assignToForm,
  };

  console.log("Submitting tenant data:", tenantData);
  // In a real app, this would submit to an API
  // After successful submission, navigate to tenant management
  // router.push("/tenant-management");
};

const handleCancel = () => {
  router.push("/tenant-management");
};
</script>
