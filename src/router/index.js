import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";
import AuthLayout from "../layouts/AuthLayout.vue";

const routes = [
  {
    path: "/login",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("../views/auth/Login.vue"),
      },
    ],
  },
  {
    path: "/forgot-password",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "ForgotPassword",
        component: () => import("../views/auth/ForgotPassword.vue"),
      },
    ],
  },
  {
    path: "/reset-password",
    component: AuthLayout,
    children: [
      {
        path: "",
        name: "ResetPassword",
        component: () => import("../views/auth/ResetPassword.vue"),
      },
    ],
  },
  {
    path: "/",
    component: MainLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("../views/Dashboard.vue"),
      },
      {
        path: "pipeline",
        name: "Pipeline",
        component: () => import("../views/Pipeline.vue"),
      },
      {
        path: "leads",
        name: "Leads",
        component: () => import("../views/Leads.vue"),
      },
      {
        path: "leads/new",
        name: "CreateLead",
        component: () => import("../views/CreateLead.vue"),
      },
      {
        path: "leads/:leadId",
        name: "LeadInfo",
        component: () => import("../views/LeadInfo.vue"),
      },
      {
        path: "user-management",
        name: "UserManagement",
        component: () => import("../views/UserManagement.vue"),
      },
      {
        path: "user-management/new",
        name: "CreateUser",
        component: () => import("../views/CreateUser.vue"),
      },
      {
        path: "user-management/:userId",
        name: "UserInfo",
        component: () => import("../views/UserInfo.vue"),
      },
      {
        path: "tenant-management",
        name: "TenantManagement",
        component: () => import("../views/TenantManagement.vue"),
      },
      {
        path: "tenant-management/new",
        name: "CreateTenant",
        component: () => import("../views/CreateTenant.vue"),
      },
      {
        path: "tenant-management/:tenantId",
        name: "TenantInfo",
        component: () => import("../views/TenantInfo.vue"),
      },
      {
        path: "tenant-management/:tenantId/assigned-users",
        name: "TenantAssignedUsers",
        component: () => import("../views/TenantAssignedUsers.vue"),
      },
      {
        path: "settings",
        name: "Settings",
        component: () => import("../views/Settings.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
