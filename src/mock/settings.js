export const mockProfile = {
  username: "BonnieG",
  fullName: "Bonnie Green",
  email: "name@flowbite.com",
  timezone: "America/Los_Angeles",
  profilePicture: null,
};

export const mockNotificationToggles = {
  newLeadAdded: false,
  leadMovedStage: true,
  newNoteAdded: false,
  newUserAdded: false,
  newTenantCreated: false,
};

// Notification items configuration for rendering
export const notificationItems = [
  {
    id: "newLeadAdded",
    key: "newLeadAdded",
    label: "New Lead Added",
    description: "Notify me when a new lead is created",
  },
  {
    id: "leadMovedStage",
    key: "leadMovedStage",
    label: "Lead moved to another stage",
    description: "Notify me when lead's pipeline stage changes",
  },
  {
    id: "newNoteAdded",
    key: "newNoteAdded",
    label: "New Note Added",
    description: "Notify me when a team member adds a new note to a lead",
  },
  {
    id: "newUserAdded",
    key: "newUserAdded",
    label: "New User Added",
    description: "Notify me when a new user is added",
  },
  {
    id: "newTenantCreated",
    key: "newTenantCreated",
    label: "New Tenant Created",
    description: "Notify me when a new tenant is added",
  },
];

export const mockEmailNotifications = {
  leadWonStage: false,
};

export const mockSecurity = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

// Password requirements configuration
export const passwordRequirements = [
  {
    text: "At least 10 characters (and up to 100 characters)",
    validator: (pwd) => pwd.length >= 10 && pwd.length <= 100,
  },
  {
    text: "At least one lowercase character",
    validator: (pwd) => /[a-z]/.test(pwd),
  },
  {
    text: "Inclusion of at least one special character, e.g., ! @ # ?",
    validator: (pwd) => /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd),
  },
  {
    text: "Significantly different from your previous passwords",
    validator: (pwd, currentPassword) => {
      // For now, just check if password is different from current
      // In real implementation, this would check against password history
      return pwd !== currentPassword && pwd.length > 0;
    },
  },
];

// Common timezones list
export const timezones = [
  { value: "America/Los_Angeles", label: "Pacific Daylight Time (GMT-7)" },
  { value: "America/Denver", label: "Mountain Daylight Time (GMT-6)" },
  { value: "America/Chicago", label: "Central Daylight Time (GMT-5)" },
  { value: "America/New_York", label: "Eastern Daylight Time (GMT-4)" },
  { value: "America/Phoenix", label: "Mountain Standard Time (GMT-7)" },
  { value: "America/Anchorage", label: "Alaska Daylight Time (GMT-8)" },
  { value: "Pacific/Honolulu", label: "Hawaii Standard Time (GMT-10)" },
  { value: "Europe/London", label: "Greenwich Mean Time (GMT+0)" },
  { value: "Europe/Paris", label: "Central European Time (GMT+1)" },
  { value: "Asia/Tokyo", label: "Japan Standard Time (GMT+9)" },
  { value: "Asia/Shanghai", label: "China Standard Time (GMT+8)" },
  { value: "Australia/Sydney", label: "Australian Eastern Time (GMT+10)" },
];
