<template>
  <div class="flex w-full flex-col -mt-6">
    <div
      class="create-user-header grid grid-cols-12 gap-4 border-b border-gray-200 bg-white pb-4 dark:border-gray-700 dark:bg-gray-800"
    >
      <div
        class="col-span-full flex flex-col gap-3 px-4 pt-4 xl:flex-row xl:items-center xl:justify-between"
      >
        <div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Add New User
          </h1>
          <p class="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Configure access, notifications, and tenant assignments for the new
            teammate.
          </p>
        </div>
        <Button
          variant="muted"
          size="sm"
          class="self-start"
          @click="handleCancel"
        >
          Back to Users
        </Button>
      </div>
    </div>

    <div class="mx-auto w-full max-w-full py-4">
      <!-- Aria-live region for form errors -->
      <div aria-live="polite" aria-atomic="true" class="sr-only">
        <span v-if="Object.values(errors).some((e) => e)">
          Form has {{ Object.values(errors).filter((e) => e).length }} error(s)
        </span>
      </div>

      <form
        class="grid gap-6 overflow-hidden rounded-xl border border-gray-300 bg-white p-6 shadow-sm dark:border-white dark:bg-gray-800"
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label
              for="user-role"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Role<span class="text-primary-600">*</span>
            </label>
            <select
              id="user-role"
              v-model="form.role"
              @change="clearError('role')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:focus:border-primary-400 dark:focus:ring-primary-800"
            >
              <option disabled value="">Select role</option>
              <option
                v-for="role in roles"
                :key="role.value"
                :value="role.value"
              >
                {{ role.label }}
              </option>
            </select>
            <p
              v-if="errors.role"
              class="text-xs font-medium text-red-600 dark:text-red-400"
            >
              {{ errors.role }}
            </p>
          </div>

          <FormField
            id="user-password"
            label="Password"
            type="password"
            v-model="form.password"
            placeholder="Enter password"
            :required="true"
            :error="errors.password"
            @input="clearError('password')"
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <FormField
            id="user-name"
            label="Name of user"
            type="text"
            v-model="form.name"
            placeholder="Ahmed Khaled"
            :required="true"
            :error="errors.name"
            @input="clearError('name')"
          />

          <FormField
            id="user-confirm-password"
            label="Confirm Password"
            type="password"
            v-model="form.confirmPassword"
            placeholder="Re-enter password"
            :required="true"
            :error="errors.confirmPassword"
            @input="clearError('confirmPassword')"
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <FormField
            id="user-email"
            label="Email"
            type="email"
            v-model="form.email"
            placeholder="a.aly@gmail.com"
            :required="true"
            :error="errors.email"
            @input="clearError('email')"
          />
        </div>

        <PermissionGroupsSelector
          :permission-groups="permissionGroups"
          :model-value="form.selections"
          @update:model-value="form.selections = $event"
          @toggle-group="toggleGroup"
        />

        <div
          class="flex flex-col gap-3 border-t border-gray-200 pt-4 dark:border-gray-700 md:flex-row md:justify-end"
        >
          <Button variant="muted" @click="handleCancel">Cancel</Button>
          <Button type="submit">Save User</Button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { mockUserPermissionGroups, mockUserRoles } from "../mock/users";
import Button from "../components/common/Button.vue";
import FormField from "../components/common/FormField.vue";
import PermissionGroupsSelector from "../components/users/PermissionGroupsSelector.vue";
import { sanitizeFormData, sanitizeEmail } from "../utils/sanitize";
import { useFormValidation } from "../composables/useFormValidation";

const router = useRouter();

const roles = mockUserRoles;
const permissionGroups = mockUserPermissionGroups;
const ASSIGN_GROUP_ID = "assign-tenants";

const buildEmptySelections = (groups) => {
  return groups.reduce((acc, group) => {
    acc[group.id] = [];
    return acc;
  }, {});
};

const selections = reactive(buildEmptySelections(permissionGroups));

const form = reactive({
  role: roles[0]?.value ?? "",
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  selections,
});

// Use validation composable
const { errors, clearErrors, clearError, validate, validatePasswordMatch } =
  useFormValidation({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

// Validation rules
const validationRules = {
  role: { required: true, type: "string", label: "Role" },
  name: { required: true, type: "string", label: "Name" },
  email: { required: true, type: "email", label: "Email" },
  password: { required: true, type: "string", label: "Password" },
};

const validateForm = () => {
  let isValid = validate(form, validationRules);

  // Validate password match separately
  if (isValid) {
    isValid = validatePasswordMatch(form.password, form.confirmPassword);
  }

  return isValid;
};

const toggleGroup = (groupId) => {
  const group = permissionGroups.find((item) => item.id === groupId);
  if (!group) return;

  const currentSelection = form.selections[groupId] || [];
  const allValues = group.options.map((option) => option.id);
  const isFullySelected = currentSelection.length === allValues.length;

  form.selections[groupId] = isFullySelected ? [] : [...allValues];
};

const isGroupFullySelected = (groupId) => {
  const group = permissionGroups.find((item) => item.id === groupId);
  if (!group) return false;

  const currentSelection = form.selections[groupId] || [];
  return currentSelection.length === group.options.length;
};

const handleSubmit = () => {
  if (!validateForm()) {
    console.warn("Validation errors prevented submission.", { ...errors });
    return;
  }

  // Sanitize form data before submission
  const sanitizedData = sanitizeFormData(
    {
      role: form.role,
      name: form.name,
      email: form.email,
      // Note: Passwords should NOT be sanitized in the same way as other fields
      // They are handled separately and never logged
    },
    {
      role: { type: "string" },
      name: { type: "string" },
      email: { type: "email" },
    }
  );

  const permissions = permissionGroups
    .filter((group) => group.id !== ASSIGN_GROUP_ID)
    .reduce((acc, group) => {
      acc[group.id] = [...(form.selections[group.id] || [])];
      return acc;
    }, {});

  const assignedTenants = [...(form.selections[ASSIGN_GROUP_ID] || [])];

  // NEVER log passwords - security risk
  console.info("Submitting new user (placeholder):", {
    role: sanitizedData.role,
    name: sanitizedData.name,
    email: sanitizedData.email,
    permissions,
    tenants: assignedTenants,
  });
};

const handleCancel = () => {
  router.push("/user-management");
};
</script>

<style scoped>
.create-user-header {
  margin-left: -1rem;
  margin-right: -1rem;
}
</style>
