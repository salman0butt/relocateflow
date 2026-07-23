import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RelocateFlow — Your move, mapped beautifully",
  description:
    "A personalized relocation workspace for skilled professionals moving across Europe.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
