import { createRouter, createWebHistory } from "vue-router";
import MainLayout from "../layouts/MainLayout.vue";

const routes = [
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
        path: "user-management",
        name: "UserManagement",
        component: () => import("../views/UserManagement.vue"),
      },
      {
        path: "tenant-management",
        name: "TenantManagement",
        component: () => import("../views/TenantManagement.vue"),
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
