<template>
  <AuthFormWrapper
    v-if="!showSuccess"
    title="Reset Password"
    subtitle="Enter your new password below"
  >
    <form class="space-y-6" @submit.prevent="handleResetPassword">
      <div class="space-y-4">
        <!-- Password Input -->
        <PasswordField
          id="password"
          label="New Password"
          v-model="form.password"
          placeholder="Enter your new password"
          :required="true"
          :error="errors.password"
          autocomplete="new-password"
          @input="clearError('password')"
        />

        <!-- Confirm Password Input -->
        <PasswordField
          id="confirmPassword"
          label="Confirm New Password"
          v-model="form.confirmPassword"
          placeholder="Confirm your new password"
          :required="true"
          :error="errors.confirmPassword"
          autocomplete="new-password"
          @input="clearError('confirmPassword')"
        />
      </div>

      <!-- Error Message -->
      <MessageAlert v-if="errorMessage" :message="errorMessage" type="error" />

      <!-- Submit Button -->
      <LoadingButton
        type="submit"
        :loading="isLoading"
        variant="primary"
        size="md"
        default-text="Reset Password"
        loading-text="Resetting..."
        class="w-full"
      />

      <!-- Back to Login -->
      <div class="text-center">
        <AuthLink to="/login">← Back to login</AuthLink>
      </div>
    </form>
  </AuthFormWrapper>

  <!-- Success Message -->
  <div
    v-if="showSuccess"
    class="flex flex-col items-center gap-8 absolute w-[calc(100%-2rem)] max-w-[406px] min-h-[260px] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 px-4"
    style="gap: 32px"
  >
    <!-- Content Container -->
    <div
      class="flex flex-col justify-center items-center gap-6 w-full max-w-[354px] min-h-[180px] flex-none order-0"
    >
      <!-- Title -->
      <h2
        class="w-full text-xl sm:text-2xl font-bold text-center text-gray-900 dark:text-white flex-none order-0"
        style="line-height: 31px"
      >
        Password Reset Successful
      </h2>

      <!-- Check Icon Container -->
      <div
        class="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-gray-800 border-[3px] border-primary-600 rounded-full relative flex-none order-1"
      >
        <!-- Check Icon -->
        <svg
          class="w-12 h-12 sm:w-16 sm:h-16 text-primary-600 flex-none order-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="3"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <!-- Description Text -->
      <p
        class="w-full max-w-[325px] text-sm sm:text-base font-semibold text-center text-gray-900 dark:text-white flex-none order-2"
        style="line-height: 21px"
      >
        You can now login with your new password
      </p>
    </div>

    <!-- Back to Login Button -->
    <router-link
      to="/login"
      class="w-full max-w-[406px] h-12 bg-primary-600 rounded-lg flex items-center justify-center text-white text-sm sm:text-base font-semibold hover:bg-primary-700 transition-colors flex-none order-1"
      style="line-height: 21px"
    >
      Back to login
    </router-link>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper.vue";
import AuthLink from "@/components/auth/AuthLink.vue";
import PasswordField from "@/components/common/PasswordField.vue";
import LoadingButton from "@/components/common/LoadingButton.vue";
import MessageAlert from "@/components/common/MessageAlert.vue";
import { useFormValidation } from "@/composables/useFormValidation";

const router = useRouter();

const form = reactive({
  password: "",
  confirmPassword: "",
});

const { errors, clearError, validate, validatePasswordMatch } =
  useFormValidation({
    password: "",
    confirmPassword: "",
  });

const errorMessage = ref("");
const isLoading = ref(false);
const showSuccess = ref(false);

const validationRules = {
  password: {
    required: true,
    type: "string",
    label: "Password",
    custom: (value) => {
      if (value.length < 8) {
        return "Password must be at least 8 characters";
      }
      return true;
    },
  },
  confirmPassword: {
    required: true,
    type: "string",
    label: "Confirm Password",
  },
};

const handleResetPassword = async () => {
  errorMessage.value = "";
  if (!validate(form, validationRules)) {
    return;
  }

  // Validate password match
  if (!validatePasswordMatch(form.password, form.confirmPassword)) {
    return;
  }

  isLoading.value = true;
  try {
    // TODO: Replace with actual API call
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Show success message
    showSuccess.value = true;
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
    console.error("Reset password error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
