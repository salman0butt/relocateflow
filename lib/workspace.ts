export type RelocationProfile = {
  name: string;
  currentCity: string;
  destination: string;
  profession: string;
  experience: string;
  moveType: string;
  priorities: string[];
  budget: string;
  timeline: string;
};

export type WorkspaceTask = {
  id: number;
  title: string;
  category: string;
  due: string;
  priority: "High" | "Medium" | "Low";
  done: boolean;
};

export type WorkspaceDocument = {
  id: number;
  name: string;
  status: "Verified" | "In review" | "Missing";
  meta: string;
};

export type WorkspaceBudget = {
  id: number;
  label: string;
  value: number;
  category: string;
};

export type WorkspaceCity = {
  name: string;
  country: string;
  flag: string;
  match: number;
  rent: number;
  salary: number;
  jobs: number;
  safety: number;
  lifestyle: number;
  english: number;
};

export const defaultProfile: RelocationProfile = {
  name: "Alex Morgan",
  currentCity: "Lahore",
  destination: "Germany",
  profession: "Senior Frontend Engineer",
  experience: "6–10 years",
  moveType: "Just me",
  priorities: ["Career growth", "Safety", "English-friendly"],
  budget: "€8,000–€12,000",
  timeline: "3–6 months",
};

export const destinationDetails: Record<string, { city: string; flag: string; currency: string }> = {
  Germany: { city: "Berlin", flag: "🇩🇪", currency: "EUR" },
  Netherlands: { city: "Amsterdam", flag: "🇳🇱", currency: "EUR" },
  Portugal: { city: "Lisbon", flag: "🇵🇹", currency: "EUR" },
  Sweden: { city: "Stockholm", flag: "🇸🇪", currency: "SEK" },
};

const cityPool: WorkspaceCity[] = [
  { name: "Berlin", country: "Germany", flag: "🇩🇪", match: 86, rent: 1320, salary: 67000, jobs: 92, safety: 84, lifestyle: 88, english: 86 },
  { name: "Munich", country: "Germany", flag: "🇩🇪", match: 80, rent: 1780, salary: 76000, jobs: 90, safety: 94, lifestyle: 89, english: 82 },
  { name: "Amsterdam", country: "Netherlands", flag: "🇳🇱", match: 84, rent: 1850, salary: 72000, jobs: 94, safety: 90, lifestyle: 91, english: 98 },
  { name: "Lisbon", country: "Portugal", flag: "🇵🇹", match: 78, rent: 1150, salary: 47000, jobs: 72, safety: 91, lifestyle: 97, english: 87 },
  { name: "Stockholm", country: "Sweden", flag: "🇸🇪", match: 81, rent: 1490, salary: 65000, jobs: 86, safety: 92, lifestyle: 93, english: 96 },
  { name: "Rotterdam", country: "Netherlands", flag: "🇳🇱", match: 76, rent: 1420, salary: 64000, jobs: 82, safety: 87, lifestyle: 84, english: 96 },
];

export const baseDocuments: WorkspaceDocument[] = [
  { id: 1, name: "Passport", status: "Verified", meta: "Expires May 2031" },
  { id: 2, name: "Employment contract", status: "Verified", meta: "Uploaded recently" },
  { id: 3, name: "Degree certificate", status: "In review", meta: "Translation attached" },
  { id: 4, name: "Health insurance", status: "Missing", meta: "Required before appointment" },
  { id: 5, name: "Proof of funds", status: "Missing", meta: "Bank statement or blocked account" },
];

export const baseBudget: WorkspaceBudget[] = [
  { id: 1, label: "Visa and legal", value: 1250, category: "Legal" },
  { id: 2, label: "Temporary housing", value: 3850, category: "Housing" },
  { id: 3, label: "Travel", value: 1650, category: "Travel" },
  { id: 4, label: "Arrival setup", value: 3050, category: "Setup" },
];

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "RF";
}

export function budgetLimit(profile: RelocationProfile) {
  if (profile.budget.includes("12,000+")) return 15000;
  if (profile.budget.includes("8,000")) return 10000;
  if (profile.budget.includes("5,000–€8,000")) return 7000;
  return 5000;
}

export function calculateReadiness(profile: RelocationProfile, tasks: WorkspaceTask[], documents: WorkspaceDocument[]) {
  let score = 38;
  if (profile.profession.trim()) score += 8;
  if (profile.experience !== "0–2 years") score += 7;
  score += Math.min(profile.priorities.length * 3, 12);
  score += Math.round((tasks.filter((task) => task.done).length / Math.max(tasks.length, 1)) * 18);
  score += Math.round((documents.filter((document) => document.status === "Verified").length / Math.max(documents.length, 1)) * 17);
  return Math.min(score, 96);
}

export function buildTasks(profile: RelocationProfile): WorkspaceTask[] {
  const destination = destinationDetails[profile.destination]?.city ?? profile.destination;
  const tasks: WorkspaceTask[] = [
    { id: 1, title: `Review ${profile.destination} visa pathway`, category: "Visa", due: "Today", priority: "High", done: true },
    { id: 2, title: "Book visa appointment", category: "Visa", due: "Jul 28", priority: "High", done: false },
    { id: 3, title: "Request degree recognition", category: "Career", due: "Aug 02", priority: "High", done: false },
    { id: 4, title: "Compare health insurance", category: "Health", due: "Aug 06", priority: "Medium", done: false },
    { id: 5, title: `Shortlist temporary housing in ${destination}`, category: "Housing", due: "Aug 14", priority: "Medium", done: false },
    { id: 6, title: "Prepare proof of funds", category: "Finance", due: "Aug 18", priority: "High", done: false },
  ];

  if (profile.moveType === "With my partner") {
    tasks.push({ id: 7, title: "Prepare partner visa documents", category: "Family", due: "Aug 20", priority: "High", done: false });
  }

  if (profile.moveType === "With family") {
    tasks.push(
      { id: 7, title: "Research international schools", category: "Family", due: "Aug 10", priority: "Medium", done: false },
      { id: 8, title: "Prepare dependant documents", category: "Family", due: "Aug 20", priority: "High", done: false },
    );
  }

  return tasks;
}

export function rankCities(profile: RelocationProfile) {
  const weights = {
    jobs: profile.priorities.includes("Career growth") ? 1.6 : 1,
    safety: profile.priorities.includes("Safety") ? 1.5 : 1,
    lifestyle: profile.priorities.includes("Family wellbeing") ? 1.4 : 1,
    english: profile.priorities.includes("English-friendly") ? 1.5 : 1,
    affordability: profile.priorities.includes("Affordable living") ? 1.5 : 1,
  };

  return cityPool
    .map((city) => {
      const destinationBonus = city.country === profile.destination ? 8 : 0;
      const affordability = Math.max(45, 100 - Math.round(city.rent / 24));
      const weighted =
        city.jobs * weights.jobs +
        city.safety * weights.safety +
        city.lifestyle * weights.lifestyle +
        city.english * weights.english +
        affordability * weights.affordability;
      const divisor = weights.jobs + weights.safety + weights.lifestyle + weights.english + weights.affordability;
      return { ...city, match: Math.min(98, Math.round(weighted / divisor) + destinationBonus) };
    })
    .sort((a, b) => b.match - a.match);
}

export function moveDateLabel(profile: RelocationProfile) {
  if (profile.timeline === "Within 3 months") return "October 2026";
  if (profile.timeline === "3–6 months") return "December 2026";
  if (profile.timeline === "6–12 months") return "Spring 2027";
  return "Exploration phase";
}
