export const leadStageOptions = ["New Lead", "Contacted", "Won Lead", "Lost Lead"];

export const leadContactFields = [
  { label: "Name", value: "Tony Stark", icon: "name" },
  { label: "Phone Number", value: "(555) 123-4567", icon: "phone" },
  { label: "Email", value: "tony.stark@example.com", icon: "email" },
  {
    label: "Address",
    value: "10880 Malibu Point, Malibu, CA 90265",
    icon: "address",
  },
];

export const leadFinancialFields = [
  { label: "Lead Value", value: "$75,000", icon: "value" },
  { label: "Market Value", value: "$82,500", icon: "value" },
  { label: "Asking Price", value: "$78,000", icon: "value" },
];

export const leadTabs = ["Lead Log", "Lead Activity", "Files", "Notes"];

export const leadTabContent = {
  "Lead Log": [
    {
      id: "log-1",
      title: "Lead moved to Won stage",
      meta: "By Ahmed on 21/3/2025",
      type: "stage",
    },
    {
      id: "log-2",
      title: "Comment added on lead",
      meta: "By Ahmed on 21/3/2025",
      type: "comment",
    },
    {
      id: "log-3",
      title: "Comment added on lead",
      meta: "By Ahmed on 21/3/2025",
      type: "comment",
    },
    {
      id: "log-4",
      title: "Lead moved to contacted stage",
      meta: "By Ahmed on 21/3/2025",
      type: "call",
    },
    {
      id: "log-5",
      title: "Lead Created",
      meta: "By Ahmed on 20/2/2025",
      type: "plus",
    },
  ],
  "Lead Activity": [
    {
      id: "activity-1",
      title: "Email sent to client",
      meta: "By Tony on 03/4/2025",
      type: "mail",
    },
    {
      id: "activity-2",
      title: "Call scheduled with lead",
      meta: "By Priya on 02/4/2025",
      type: "calendar",
    },
  ],
  Files: [
    {
      id: "files-1",
      title: "Purchase Agreement.pdf uploaded",
      meta: "By Ahmed on 22/3/2025",
      type: "file",
    },
  ],
  Notes: [
    {
      id: "note-1",
      title: "Client prefers afternoon calls",
      meta: "By Priya on 15/3/2025",
      type: "note",
    },
  ],
};
