<template>
  <AuthFormWrapper
    title="Forgot Password?"
    subtitle="Enter your email address and we'll send you a link to reset your password"
  >
    <form class="space-y-6" @submit.prevent="handleForgotPassword">
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

      <MessageAlert
        v-if="successMessage || errorMessage"
        :message="successMessage || errorMessage"
        :type="successMessage ? 'success' : 'error'"
      />

      <LoadingButton
        type="submit"
        :loading="isLoading"
        variant="primary"
        size="md"
        default-text="Send Reset Link"
        loading-text="Sending..."
        class="w-full"
      />

      <div class="text-center">
        <AuthLink to="/login">← Back to login</AuthLink>
      </div>
    </form>
  </AuthFormWrapper>
</template>

<script setup>
import { ref, reactive } from "vue";
import AuthFormWrapper from "@/components/auth/AuthFormWrapper.vue";
import AuthLink from "@/components/auth/AuthLink.vue";
import FormField from "@/components/common/FormField.vue";
import LoadingButton from "@/components/common/LoadingButton.vue";
import MessageAlert from "@/components/common/MessageAlert.vue";
import { useFormValidation } from "@/composables/useFormValidation";

const form = reactive({ email: "" });
const { errors, clearError, validate } = useFormValidation({ email: "" });
const errorMessage = ref("");
const successMessage = ref("");
const isLoading = ref(false);

const handleForgotPassword = async () => {
  errorMessage.value = "";
  successMessage.value = "";
  if (
    !validate(form, {
      email: { required: true, type: "email", label: "Email" },
    })
  ) {
    return;
  }

  isLoading.value = true;
  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    successMessage.value =
      "If an account exists with this email, we've sent you a password reset link.";
  } catch (error) {
    errorMessage.value = "An error occurred. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
