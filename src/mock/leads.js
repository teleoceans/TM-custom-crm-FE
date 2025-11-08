export const baseLeads = [
  {
    name: "Sophia Carter",
    company: "Carter Consulting",
    phone: "(555) 482-1930",
    email: "sophia.carter@carterco.com",
    createdBy: "Olivia Martinez",
    team: "Enterprise Sales",
    leadValue: 18500,
    stage: "New lead",
  },
  {
    name: "Liam Johnson",
    company: "Johnson Logistics",
    phone: "(555) 671-2389",
    email: "liam.johnson@johnsonlogistics.com",
    createdBy: "Noah Patel",
    team: "Mid-Market",
    leadValue: 12400,
    stage: "Contacted lead",
  },
  {
    name: "Ava Thompson",
    company: "Thompson Retail",
    phone: "(555) 713-9823",
    email: "ava.thompson@thompsonretail.com",
    createdBy: "Mia Chen",
    team: "Enterprise Sales",
    leadValue: 31200,
    stage: "Won lead",
  },
  {
    name: "Noah Ramirez",
    company: "Ramirez Manufacturing",
    phone: "(555) 812-4576",
    email: "noah.ramirez@ramirezmanufacturing.com",
    createdBy: "Ethan Wright",
    team: "SMB",
    leadValue: 9800,
    stage: "Lost lead",
  },
  {
    name: "Isabella Hughes",
    company: "Hughes Financial",
    phone: "(555) 347-8901",
    email: "isabella.hughes@hughesfinancial.com",
    createdBy: "Charlotte Rivera",
    team: "Enterprise Sales",
    leadValue: 25600,
    stage: "Completed",
  },
];

const baseDate = new Date("2024-03-20T00:00:00Z");

export function createMockLeads(total = 1000) {
  const records = [];

  for (let index = 0; index < total; index += 1) {
    const sample = baseLeads[index % baseLeads.length];
    const localPart = sample.email.split("@")[0].replace(/[^a-z0-9]/gi, "");
    const domain = sample.email.split("@")[1];
    const recordDate = new Date(baseDate);
    recordDate.setDate(baseDate.getDate() - index);

    records.push({
      id: `LEAD-${3001 + index}`,
      name: index < baseLeads.length ? sample.name : `${sample.name} #${index + 1}`,
      company: sample.company,
      phone: sample.phone,
      email: `${localPart}.${index + 1}@${domain}`,
      createdBy: sample.createdBy,
      team: sample.team,
      leadValue: sample.leadValue + (index % 5) * 150,
      createdOn: recordDate.toISOString().split("T")[0],
      stage: sample.stage,
    });
  }

  return records;
}

export const mockLeads = createMockLeads();
