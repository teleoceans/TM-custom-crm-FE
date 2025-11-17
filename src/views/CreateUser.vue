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

          <div class="flex flex-col gap-2">
            <label
              for="user-password"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Password<span class="text-primary-600">*</span>
            </label>
            <input
              id="user-password"
              v-model="form.password"
              type="password"
              @input="clearError('password')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="Enter password"
            />
            <p
              v-if="errors.password"
              class="text-xs font-medium text-red-600 dark:text-red-400"
            >
              {{ errors.password }}
            </p>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label
              for="user-name"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Name of user<span class="text-primary-600">*</span>
            </label>
            <input
              id="user-name"
              v-model="form.name"
              type="text"
              @input="clearError('name')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="Ahmed Khaled"
            />
            <p
              v-if="errors.name"
              class="text-xs font-medium text-red-600 dark:text-red-400"
            >
              {{ errors.name }}
            </p>
          </div>

          <div class="flex flex-col gap-2">
            <label
              for="user-confirm-password"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Confirm Password<span class="text-primary-600">*</span>
            </label>
            <input
              id="user-confirm-password"
              v-model="form.confirmPassword"
              type="password"
              @input="clearError('confirmPassword')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="Re-enter password"
            />
            <p
              v-if="errors.confirmPassword"
              class="text-xs font-medium text-red-600 dark:text-red-400"
            >
              {{ errors.confirmPassword }}
            </p>
          </div>
        </div>

        <div class="grid gap-6 md:grid-cols-2">
          <div class="flex flex-col gap-2">
            <label
              for="user-email"
              class="text-sm font-medium text-gray-700 dark:text-gray-200"
            >
              Email<span class="text-primary-600">*</span>
            </label>
            <input
              id="user-email"
              v-model="form.email"
              type="email"
              @input="clearError('email')"
              class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-primary-400 dark:focus:ring-primary-800"
              placeholder="a.aly@gmail.com"
            />
            <p
              v-if="errors.email"
              class="text-xs font-medium text-red-600 dark:text-red-400"
            >
              {{ errors.email }}
            </p>
          </div>
        </div>

        <div class="space-y-8">
          <section
            v-for="group in permissionGroups"
            :key="group.id"
            class="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0 dark:border-gray-700"
          >
            <div class="mb-4 flex items-center justify-between">
              <h2
                class="text-lg font-semibold text-gray-900 dark:text-gray-100"
              >
                {{ group.label }}
              </h2>
              <button
                type="button"
                class="text-sm font-medium text-primary-600 transition hover:text-primary-500 dark:text-primary-400 dark:hover:text-primary-300"
                @click="toggleGroup(group.id)"
              >
                {{
                  isGroupFullySelected(group.id) ? "Clear all" : "Select all"
                }}
              </button>
            </div>
            <div class="grid gap-3 md:grid-cols-2">
              <label
                v-for="option in group.options"
                :key="option.id"
                class="flex items-center gap-3 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                <input
                  :id="`${group.id}-${option.id}`"
                  v-model="form.selections[group.id]"
                  :value="option.id"
                  type="checkbox"
                  class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-primary-500"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </section>
        </div>

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
