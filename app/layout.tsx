import type { Metadata } from "next";
import "./globals.css";
import "./workspace.css";

export const metadata: Metadata = {
  title: {
    default: "RelocateFlow — Your move, mapped beautifully",
    template: "%s · RelocateFlow",
  },
  description:
    "A personalized relocation workspace for skilled professionals moving across Europe.",
  applicationName: "RelocateFlow",
  keywords: ["relocation planner", "Europe relocation", "visa checklist", "moving budget", "Next.js portfolio"],
  openGraph: {
    title: "RelocateFlow — Your move, mapped beautifully",
    description: "Plan documents, tasks, budget, destinations, and milestones in one personalized relocation workspace.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
