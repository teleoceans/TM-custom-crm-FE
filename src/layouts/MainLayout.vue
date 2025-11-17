<template>
  <div
    class="flex h-screen flex-col overflow-hidden antialiased"
    :style="bgMain"
  >
    <!-- Skip to main content link for accessibility -->
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg focus:outline-none focus:ring-4 focus:ring-primary-200"
    >
      Skip to main content
    </a>

    <!-- Navbar: Full width at top -->
    <Navbar @toggle-sidebar="handleToggleSidebar" />

    <!-- Mobile Sidebar Backdrop -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="responsive.isMobile.value && sidebar.isOpen.value"
        class="fixed inset-0 z-40 lg:hidden"
        :style="{ backgroundColor: 'var(--color-bg-overlay)' }"
        @click="sidebar.close()"
      />
    </Transition>

    <!-- Bottom Section: SideNavbar + Content (side by side) -->
    <div class="flex flex-1 overflow-hidden pt-16">
      <!-- SideNavbar: Left side -->
      <Sidebar
        :is-open="sidebar.isOpen.value"
        :is-mobile="responsive.isMobile.value"
        :is-collapsed="sidebar.isCollapsed.value"
      />

      <!-- Content: Right side (beside Sidebar) -->
      <div
        id="main-content"
        class="flex flex-1 flex-col overflow-hidden"
        :style="bgMain"
      >
        <main class="flex-1 overflow-y-auto">
          <div class="px-4 py-6">
            <router-view />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useThemeStyles } from "../composables/useThemeStyles";
import Navbar from "../components/layout/Navbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import Footer from "../components/layout/Footer.vue";
import { useSidebar } from "../composables/useSidebar";
import { useResponsive } from "../composables/useResponsive";

const { bgMain } = useThemeStyles();

/**
 * Main application layout
 * @component
 */

const sidebar = useSidebar();
const responsive = useResponsive();

const handleToggleSidebar = () => {
  // On mobile: toggle open/close
  // On desktop: toggle collapse
  if (responsive.isMobile.value) {
    sidebar.toggle();
  } else {
    sidebar.toggleCollapse();
  }
};

// Update sidebar state on window resize
const updateSidebarState = () => {
  sidebar.setMobile(responsive.isMobile.value);
};

onMounted(() => {
  sidebar.setMobile(responsive.isMobile.value);
  if (!responsive.isMobile.value) {
    sidebar.open();
  }
  window.addEventListener("resize", updateSidebarState);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateSidebarState);
});
</script>
