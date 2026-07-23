export const relocationPlan = {
  user: {
    name: "Alex Morgan",
    initials: "AM",
    role: "Senior Product Designer",
    route: "Lahore → Berlin",
    moveDate: "18 October 2026",
    daysLeft: 87,
  },
  readiness: 72,
  tasksCompleted: 14,
  totalTasks: 21,
  budgetSpent: 4120,
  budgetTotal: 9800,
  documentsReady: 8,
  documentsTotal: 11,
};

export const tasks = [
  { id: 1, title: "Book visa appointment", category: "Visa", due: "Today", priority: "High", done: false },
  { id: 2, title: "Request degree recognition", category: "Career", due: "Jul 28", priority: "High", done: true },
  { id: 3, title: "Compare health insurance", category: "Health", due: "Aug 02", priority: "Medium", done: false },
  { id: 4, title: "Prepare blocked account", category: "Finance", due: "Aug 08", priority: "High", done: false },
  { id: 5, title: "Shortlist temporary housing", category: "Housing", due: "Aug 14", priority: "Medium", done: true },
];

export const timeline = [
  { month: "July", title: "Documentation", detail: "Credentials, translations and visa file", state: "current" },
  { month: "August", title: "Applications", detail: "Visa, insurance and housing", state: "next" },
  { month: "September", title: "Move logistics", detail: "Flights, banking and shipping", state: "next" },
  { month: "October", title: "Arrival week", detail: "Registration and local setup", state: "next" },
];

export const cities = [
  { name: "Berlin", country: "Germany", match: 94, rent: "€1,320", salary: "€67k", jobs: 88, lifestyle: 92 },
  { name: "Amsterdam", country: "Netherlands", match: 88, rent: "€1,850", salary: "€72k", jobs: 91, lifestyle: 89 },
  { name: "Lisbon", country: "Portugal", match: 82, rent: "€1,150", salary: "€47k", jobs: 71, lifestyle: 96 },
];

export const budget = [
  { label: "Visa & legal", value: 1250, percentage: 13 },
  { label: "Housing", value: 3850, percentage: 39 },
  { label: "Travel", value: 1650, percentage: 17 },
  { label: "Setup fund", value: 3050, percentage: 31 },
];

export const documents = [
  { name: "Passport", status: "Verified", meta: "Expires May 2031" },
  { name: "Employment contract", status: "Verified", meta: "Uploaded Jul 12" },
  { name: "Degree certificate", status: "In review", meta: "Translation attached" },
  { name: "Health insurance", status: "Missing", meta: "Required before appointment" },
];

export const activity = [
  { title: "Degree recognition marked complete", time: "42 minutes ago", type: "done" },
  { title: "Berlin rent estimate was updated", time: "Yesterday", type: "info" },
  { title: "Visa appointment deadline is near", time: "Yesterday", type: "alert" },
];
