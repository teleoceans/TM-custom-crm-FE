<template>
  <AuthFormWrapper
    title="Welcome Back !"
    subtitle="Sign in to your account to continue"
  >
    <form class="space-y-6" @submit.prevent="handleLogin">
      <div class="space-y-4">
        <!-- Email Input -->
        <FormField
          id="email"
          label="Email address"
          type="email"
          v-model="form.email"
          placeholder="Enter your email"
          :required="true"
          :error="errors.email"
          @input="clearError('email')"
        />

        <!-- Password Input -->
        <PasswordField
          id="password"
          label="Password"
          v-model="form.password"
          placeholder="Enter your password"
          :required="true"
          :error="errors.password"
          autocomplete="current-password"
          @input="clearError('password')"
        />
      </div>

      <!-- Remember Me & Forgot Password -->
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            v-model="form.rememberMe"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label
            for="remember-me"
            class="ml-2 block text-sm text-gray-900 dark:text-gray-300"
          >
            Remember me
          </label>
        </div>
        <div class="text-sm">
          <router-link
            to="/forgot-password"
            class="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Forgot password?
          </router-link>
        </div>
      </div>

      <!-- Error Message -->
      <MessageAlert v-if="errorMessage" :message="errorMessage" type="error" />

      <!-- Submit Button -->
      <LoadingButton
        type="submit"
        :loading="isLoading"
        variant="primary"
        size="md"
        default-text="Sign in"
        loading-text="Signing in..."
        class="w-full"
      />
    </form>
  </AuthFormWrapper>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper.vue";
import FormField from "@/components/common/FormField.vue";
import PasswordField from "@/components/common/PasswordField.vue";
import LoadingButton from "@/components/common/LoadingButton.vue";
import MessageAlert from "@/components/common/MessageAlert.vue";
import { useFormValidation } from "@/composables/useFormValidation";

const router = useRouter();

const form = reactive({
  email: "",
  password: "",
  rememberMe: false,
});

const { errors, clearError, validate } = useFormValidation({
  email: "",
  password: "",
});

const errorMessage = ref("");
const isLoading = ref(false);

const validationRules = {
  email: { required: true, type: "email", label: "Email" },
  password: {
    required: true,
    type: "string",
    label: "Password",
    custom: (value) => {
      if (value.length < 6) {
        return "Password must be at least 6 characters";
      }
      return true;
    },
  },
};

const handleLogin = async () => {
  errorMessage.value = "";
  if (!validate(form, validationRules)) {
    return;
  }

  isLoading.value = true;
  try {
    // TODO: Replace with actual API call
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock authentication - replace with real API
    if (form.email && form.password) {
      // Store auth token (mock)
      if (form.rememberMe) {
        localStorage.setItem("authToken", "mock-token");
      } else {
        sessionStorage.setItem("authToken", "mock-token");
      }

      // Redirect to dashboard
      router.push({ name: "Dashboard" });
    } else {
      errorMessage.value = "Invalid email or password";
    }
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
    console.error("Login error:", error);
  } finally {
    isLoading.value = false;
  }
};
</script>
