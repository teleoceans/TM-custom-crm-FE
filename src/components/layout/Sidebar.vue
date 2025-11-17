<template>
  <!-- Mobile Sidebar with Transition -->
  <Transition
    v-if="isMobile"
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="-translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-300 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="-translate-x-full"
  >
    <aside
      v-if="isOpen"
      id="sidebar"
      :style="sidebarStyle"
      class="fixed left-0 top-0 z-50 h-screen w-64 flex-shrink-0 border-r sidebar-collapsible"
      aria-label="Sidebar"
    >
      <div class="h-full overflow-y-auto px-3 py-4">
        <ul class="space-y-2">
          <SidebarItem
            v-for="item in menuItems"
            v-memo="[item.to, isCollapsed]"
            :key="item.to"
            :to="item.to"
            :icon-outline="item.iconOutline"
            :icon-solid="item.iconSolid"
          >
            {{ item.label }}
          </SidebarItem>
        </ul>
      </div>
    </aside>
  </Transition>

  <!-- Desktop Sidebar -->
  <aside
    v-else
    id="sidebar"
    :style="sidebarStyle"
    :class="[
      'z-40 w-64 flex-shrink-0 border-r transition-transform duration-300 sidebar-collapsible',
      'relative h-full',
      isCollapsed ? 'sidebar-collapsed' : '',
    ]"
    aria-label="Sidebar"
  >
    <div class="h-full overflow-y-auto px-3 py-4">
      <ul class="space-y-2">
        <SidebarItem
          v-for="item in menuItems"
          v-memo="[item.to, isCollapsed]"
          :key="item.to"
          :to="item.to"
          :icon-outline="item.iconOutline"
          :icon-solid="item.iconSolid"
        >
          {{ item.label }}
        </SidebarItem>
      </ul>
    </div>
  </aside>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from "vue";
import { useThemeStyles } from "../../composables/useThemeStyles";
import SidebarItem from "./SidebarItem.vue";
import { useSidebar } from "../../composables/useSidebar";
import { useResponsive } from "../../composables/useResponsive";

// Outline icons
import DashboardOutlineIcon from "../icons/outline/DashboardOutline.vue";
import PipelineOutlineIcon from "../icons/outline/PipelineOutline.vue";
import LeadsOutlineIcon from "../icons/features/Leads.vue";
import UserManagementOutlineIcon from "../icons/features/userManagement.vue";
import TenantManagementOutlineIcon from "../icons/features/tenantManagement.vue";
import SettingsOutlineIcon from "../icons/features/Settings.vue";

// Solid icons
import DashboardIcon from "../icons/features/Dashboard.vue";
import PipelineIcon from "../icons/features/Pipeline.vue";
import LeadsSolidIcon from "../icons/features/LeadsSolid.vue";
import UserManagementSolidIcon from "../icons/features/UserManagementSolid.vue";
import TenantManagementSolidIcon from "../icons/features/TenantManagementSolid.vue";
import SettingsSolidIcon from "../icons/features/Settings.vue";

const { sidebarStyle } = useThemeStyles();

/**
 * Sidebar navigation component
 * @component
 */

// Menu items configuration
const menuItems = computed(() => [
  {
    to: "/dashboard",
    iconOutline: DashboardOutlineIcon,
    iconSolid: DashboardIcon,
    label: "Dashboard",
  },
  {
    to: "/pipeline",
    iconOutline: PipelineOutlineIcon,
    iconSolid: PipelineIcon,
    label: "Pipeline",
  },
  {
    to: "/leads",
    iconOutline: LeadsOutlineIcon,
    iconSolid: LeadsSolidIcon,
    label: "Leads",
  },
  {
    to: "/user-management",
    iconOutline: UserManagementOutlineIcon,
    iconSolid: UserManagementSolidIcon,
    label: "User Management",
  },
  {
    to: "/tenant-management",
    iconOutline: TenantManagementOutlineIcon,
    iconSolid: TenantManagementSolidIcon,
    label: "Tenant Management",
  },
  {
    to: "/settings",
    iconOutline: SettingsOutlineIcon,
    iconSolid: SettingsSolidIcon,
    label: "Settings",
  },
]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  isMobile: {
    type: Boolean,
    default: false,
  },
  isCollapsed: {
    type: Boolean,
    default: false,
  },
});

// Lock body scroll when mobile sidebar is open
let scrollY = 0;
watch(
  () => props.isOpen && props.isMobile,
  (shouldLock) => {
    if (typeof window === "undefined") return;

    if (shouldLock) {
      // Save current scroll position
      scrollY = window.scrollY;
      // Prevent body scroll
      document.body.style.overflow = "hidden";
      // Prevent scroll on iOS and prevent page jump
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      // Restore body scroll
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      // Restore scroll position
      window.scrollTo(0, scrollY);
    }
  },
  { immediate: true }
);

// Sync collapse state with DOM class (desktop only)
watch(
  () => props.isCollapsed,
  (collapsed) => {
    if (typeof window !== "undefined" && !props.isMobile) {
      const sidebar = document.getElementById("sidebar");
      if (sidebar) {
        if (collapsed) {
          sidebar.classList.add("sidebar-collapsed");
        } else {
          sidebar.classList.remove("sidebar-collapsed");
        }
      }
    }
  },
  { immediate: true }
);

onMounted(() => {
  // Initialize collapse state in DOM (desktop only)
  if (typeof window !== "undefined" && !props.isMobile) {
    const sidebar = document.getElementById("sidebar");
    if (sidebar && props.isCollapsed) {
      sidebar.classList.add("sidebar-collapsed");
    }
  }
});

onUnmounted(() => {
  // Cleanup: restore body scroll
  if (typeof window !== "undefined") {
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    // Restore scroll position if needed
    if (scrollY > 0) {
      window.scrollTo(0, scrollY);
    }
  }
});
</script>
