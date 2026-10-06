import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Moh Thoriqi Sahal | IT Engineer & Software Developer",
  description:
    "Production portfolio for Moh Thoriqi Sahal. Building practical solutions for real-world operations across software development, IT infrastructure, and business systems.",
  keywords: [
    "Moh Thoriqi Sahal",
    "IT Engineer",
    "Software Developer",
    "Manufacturing IT",
    "Next.js",
    "TypeScript",
    "React",
    "C#",
    "SQL Server",
  ],
  authors: [{ name: "Moh Thoriqi Sahal" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col bg-(--bg-primary) text-(--text-primary) antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
