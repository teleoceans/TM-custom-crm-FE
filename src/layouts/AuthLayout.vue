<template>
  <div
    class="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col lg:flex-row"
  >
    <!-- Left Side - Logo with Background Image -->
    <div
      class="hidden lg:flex lg:w-[36%] lg:min-h-screen items-center justify-center px-8 relative bg-cover bg-center bg-no-repeat"
      :style="{ backgroundImage: `url(${loginPhoto})` }"
    >
      <div class="flex items-center justify-center">
        <Logo className="h-12 w-auto lg:h-14 xl:h-16" />
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="flex-1 bg-gray-50 dark:bg-gray-900 relative min-h-screen">
      <!-- Mobile Logo (shown only on mobile) -->
      <div
        class="text-center lg:hidden absolute top-12 left-1/2 transform -translate-x-1/2"
      >
        <div class="flex justify-center">
          <Logo className="h-10 w-auto" />
        </div>
      </div>

      <!-- Content Container -->
      <div
        class="w-[calc(100%-2rem)] max-w-[480px] h-auto min-h-[520px] bg-white dark:bg-gray-800 rounded-2xl shadow-[0px_4px_4px_rgba(0,0,0,0.25)] dark:shadow-[0px_4px_4px_rgba(0,0,0,0.5)] p-6 sm:p-8 space-y-6 flex flex-col justify-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <router-view />
      </div>
      <!-- End Content Container -->
    </div>
  </div>
</template>

<script setup>
import Logo from "@/components/auth/Logo.vue";

const loginPhoto = "/images/loginphoto.png";
</script>

