export const mockAllUsers = [
  {
    id: "USER-1001",
    name: "Amelia Robertson",
    email: "amelia.robertson@example.com",
    role: "Admin",
    lastLogin: "2024-11-01T09:15:00Z",
    assignedTo: "North America Sales",
    status: "Active",
  },
  {
    id: "USER-1002",
    name: "Benjamin Clark",
    email: "ben.clark@example.com",
    role: "Manager",
    lastLogin: "2024-11-07T14:32:00Z",
    assignedTo: "Enterprise Accounts",
    status: "Active",
  },
  {
    id: "USER-1003",
    name: "Charlotte Patel",
    email: "charlotte.patel@example.com",
    role: "Sales Rep",
    lastLogin: "2024-10-28T18:45:00Z",
    assignedTo: "Enterprise Accounts",
    status: "Inactive",
  },
  {
    id: "USER-1004",
    name: "Daniela Alvarez",
    email: "daniela.alvarez@example.com",
    role: "Support Specialist",
    lastLogin: "2024-11-08T11:20:00Z",
    assignedTo: "Customer Success",
    status: "Active",
  },
  {
    id: "USER-1005",
    name: "Ethan Wright",
    email: "ethan.wright@example.com",
    role: "Sales Rep",
    lastLogin: "2024-09-19T16:05:00Z",
    assignedTo: "Mid-Market",
    status: "Inactive",
  },
  {
    id: "USER-1006",
    name: "Fatima Khan",
    email: "fatima.khan@example.com",
    role: "Manager",
    lastLogin: "2024-10-31T07:55:00Z",
    assignedTo: "APAC Sales",
    status: "Active",
  },
];

export const mockNewUsers = [
  {
    id: "USER-2001",
    name: "George Liu",
    email: "george.liu@example.com",
    role: "Sales Rep",
    addedOn: "2024-11-09T10:12:00Z",
    assignedTo: "Mid-Market",
    status: "Active",
  },
  {
    id: "USER-2002",
    name: "Hannah Kim",
    email: "hannah.kim@example.com",
    role: "Support Specialist",
    addedOn: "2024-11-08T13:47:00Z",
    assignedTo: "Customer Success",
    status: "Inactive",
  },
  {
    id: "USER-2003",
    name: "Isaac Johnson",
    email: "isaac.johnson@example.com",
    role: "Admin",
    addedOn: "2024-11-07T15:22:00Z",
    assignedTo: "Global Operations",
    status: "Active",
  },
  {
    id: "USER-2004",
    name: "Julia Fernández",
    email: "julia.fernandez@example.com",
    role: "Sales Rep",
    addedOn: "2024-11-06T09:30:00Z",
    assignedTo: "LATAM Sales",
    status: "Active",
  },
  {
    id: "USER-2005",
    name: "Karim Hassan",
    email: "karim.hassan@example.com",
    role: "Product Specialist",
    addedOn: "2024-11-05T08:05:00Z",
    assignedTo: "Product Enablement",
    status: "Inactive",
  },
];

export const mockUserRoles = [
  { value: "Admin", label: "Admin" },
  { value: "Manager", label: "Manager" },
  { value: "Sales Rep", label: "Sales Rep" },
  { value: "Support Specialist", label: "Support Specialist" },
  { value: "Product Specialist", label: "Product Specialist" },
  { value: "Viewer", label: "Viewer" },
];

export const mockUserTenants = [
  { id: "tenant-1", label: "Tenant 1" },
  { id: "tenant-2", label: "Tenant 2" },
  { id: "tenant-3", label: "Tenant 3" },
];

const leadStageOptions = [
  { id: "new", label: "New Leads" },
  { id: "contacted", label: "Contacted Leads" },
  { id: "won", label: "Won Leads" },
  { id: "lost", label: "Lost Leads" },
];

const cloneLeadStageOptions = (prefix) =>
  leadStageOptions.map((option) => ({
    id: `${prefix}-${option.id}`,
    label: option.label,
  }));

export const mockUserPermissionGroups = [
  {
    id: "general-actions",
    label: "General Actions",
    options: [
      { id: "general-create-lead", label: "Create New Lead" },
      { id: "general-edit-lead", label: "Edit or Update Lead" },
    ],
  },
  {
    id: "view-only",
    label: "View Only",
    options: cloneLeadStageOptions("view"),
  },
  {
    id: "drag-drop",
    label: "Drag & Drop Stages",
    options: cloneLeadStageOptions("drag"),
  },
  {
    id: "notifications",
    label: "Get Notified For",
    options: cloneLeadStageOptions("notify"),
  },
  {
    id: "assign-tenants",
    label: "Assign User to",
    options: mockUserTenants.map((tenant) => ({
      id: tenant.id,
      label: tenant.label,
    })),
  },
];

const createBasePermissionSelections = () => ({
  "general-actions": ["general-create-lead", "general-edit-lead"],
  "view-only": ["view-new", "view-contacted", "view-won", "view-lost"],
  "drag-drop": ["drag-new", "drag-contacted", "drag-won", "drag-lost"],
  notifications: [
    "notify-new",
    "notify-contacted",
    "notify-won",
    "notify-lost",
  ],
  "assign-tenants": ["tenant-1"],
});

const createUserDetail = ({
  id,
  name,
  role,
  email,
  lastLogin,
  addedOn,
  assignedTo,
  password = "••••••",
  phone = "+1 (555) 010-0000",
  permissions = {},
}) => {
  const baseSelections = createBasePermissionSelections();
  return {
    id,
    profile: {
      name,
      role,
      email,
      password,
      phone,
      addedOn: addedOn ?? lastLogin ?? new Date().toISOString(),
      assignedTo,
    },
    permissions: Object.fromEntries(
      Object.entries({ ...baseSelections, ...permissions }).map(
        ([groupId, values]) => [
          groupId,
          Array.isArray(values) ? [...values] : baseSelections[groupId] ?? [],
        ]
      )
    ),
  };
};

export const mockUserDetailsById = {
  "USER-1001": createUserDetail({
    id: "USER-1001",
    name: "Amelia Robertson",
    role: "Admin",
    email: "amelia.robertson@example.com",
    lastLogin: "2024-11-01T09:15:00Z",
    assignedTo: "North America Sales",
    phone: "+1 (555) 201-3344",
    password: "AmeR0b@2024",
    permissions: {
      notifications: ["notify-new", "notify-contacted"],
      "assign-tenants": ["tenant-1", "tenant-2"],
    },
  }),
  "USER-1002": createUserDetail({
    id: "USER-1002",
    name: "Benjamin Clark",
    role: "Manager",
    email: "ben.clark@example.com",
    lastLogin: "2024-11-07T14:32:00Z",
    assignedTo: "Enterprise Accounts",
    phone: "+1 (555) 218-9021",
    password: "BenC!423",
    permissions: {
      notifications: ["notify-contacted", "notify-won"],
      "assign-tenants": ["tenant-2"],
    },
  }),
  "USER-1003": createUserDetail({
    id: "USER-1003",
    name: "Charlotte Patel",
    role: "Sales Rep",
    email: "charlotte.patel@example.com",
    lastLogin: "2024-10-28T18:45:00Z",
    assignedTo: "Enterprise Accounts",
    phone: "+1 (555) 332-7890",
    password: "CharPa#55",
    permissions: {
      "general-actions": ["general-create-lead"],
      "assign-tenants": ["tenant-3"],
    },
  }),
  "USER-1004": createUserDetail({
    id: "USER-1004",
    name: "Daniela Alvarez",
    role: "Support Specialist",
    email: "daniela.alvarez@example.com",
    lastLogin: "2024-11-08T11:20:00Z",
    assignedTo: "Customer Success",
    phone: "+1 (555) 770-1155",
    password: "DanAlv!8",
    permissions: {
      "drag-drop": ["drag-new", "drag-contacted"],
      notifications: ["notify-new"],
    },
  }),
  "USER-1005": createUserDetail({
    id: "USER-1005",
    name: "Ethan Wright",
    role: "Sales Rep",
    email: "ethan.wright@example.com",
    lastLogin: "2024-09-19T16:05:00Z",
    assignedTo: "Mid-Market",
    phone: "+1 (555) 441-2211",
    password: "EthWr!ght",
    permissions: {
      "view-only": ["view-new", "view-contacted"],
      notifications: ["notify-new"],
      "assign-tenants": ["tenant-1"],
    },
  }),
  "USER-1006": createUserDetail({
    id: "USER-1006",
    name: "Fatima Khan",
    role: "Manager",
    email: "fatima.khan@example.com",
    lastLogin: "2024-10-31T07:55:00Z",
    assignedTo: "APAC Sales",
    phone: "+971 50 123 4567",
    password: "FatKh@n87",
    permissions: {
      notifications: ["notify-new", "notify-won", "notify-lost"],
      "assign-tenants": ["tenant-1", "tenant-3"],
    },
  }),
  "USER-2001": createUserDetail({
    id: "USER-2001",
    name: "George Liu",
    role: "Sales Rep",
    email: "george.liu@example.com",
    addedOn: "2024-11-09T10:12:00Z",
    assignedTo: "Mid-Market",
    phone: "+1 (555) 674-1102",
    password: "GeoLiu99",
    permissions: {
      "general-actions": ["general-create-lead"],
      "assign-tenants": ["tenant-2"],
    },
  }),
  "USER-2002": createUserDetail({
    id: "USER-2002",
    name: "Hannah Kim",
    role: "Support Specialist",
    email: "hannah.kim@example.com",
    addedOn: "2024-11-08T13:47:00Z",
    assignedTo: "Customer Success",
    phone: "+82 10-1234-5678",
    password: "HanKim!2",
    permissions: {
      notifications: ["notify-contacted", "notify-lost"],
      "assign-tenants": ["tenant-3"],
    },
  }),
  "USER-2003": createUserDetail({
    id: "USER-2003",
    name: "Isaac Johnson",
    role: "Admin",
    email: "isaac.johnson@example.com",
    addedOn: "2024-11-07T15:22:00Z",
    assignedTo: "Global Operations",
    phone: "+1 (555) 778-9900",
    password: "IsaJ0hn!",
    permissions: {
      notifications: ["notify-new", "notify-contacted", "notify-won"],
      "assign-tenants": ["tenant-1", "tenant-2", "tenant-3"],
    },
  }),
  "USER-2004": createUserDetail({
    id: "USER-2004",
    name: "Julia Fernández",
    role: "Sales Rep",
    email: "julia.fernandez@example.com",
    addedOn: "2024-11-06T09:30:00Z",
    assignedTo: "LATAM Sales",
    phone: "+54 9 11 2345-6789",
    password: "JulFer77",
    permissions: {
      "view-only": ["view-new", "view-contacted", "view-won"],
      notifications: ["notify-won"],
      "assign-tenants": ["tenant-2"],
    },
  }),
  "USER-2005": createUserDetail({
    id: "USER-2005",
    name: "Karim Hassan",
    role: "Product Specialist",
    email: "karim.hassan@example.com",
    addedOn: "2024-11-05T08:05:00Z",
    assignedTo: "Product Enablement",
    phone: "+20 100 555 7890",
    password: "KarHas$5",
    permissions: {
      "general-actions": ["general-create-lead"],
      "drag-drop": ["drag-new"],
      notifications: ["notify-new", "notify-lost"],
      "assign-tenants": ["tenant-1"],
    },
  }),
};

export const defaultUserDetailId = "USER-1001";
