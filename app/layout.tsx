import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://thorx.my.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moh Thoriqi Sahal | IT Engineer & Software Developer",
    template: "%s | Moh Thoriqi Sahal",
  },
  description:
    "Portfolio of Moh Thoriqi Sahal: IT Staff and Software Developer. Building practical desktop tools, modern web applications, and solving operational challenges in manufacturing IT.",
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
  authors: [{ name: "Moh Thoriqi Sahal", url: siteUrl }],
  creator: "Moh Thoriqi Sahal",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Moh Thoriqi Sahal | IT Engineer & Software Developer",
    description:
      "Portfolio of Moh Thoriqi Sahal: IT Staff and Software Developer. Building practical desktop tools, modern web applications, and solving operational challenges in manufacturing IT.",
    url: siteUrl,
    siteName: "Moh Thoriqi Sahal Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moh Thoriqi Sahal | IT Engineer & Software Developer",
    description:
      "Portfolio of Moh Thoriqi Sahal: IT Staff and Software Developer. Building practical desktop tools, modern web applications, and solving operational challenges in manufacturing IT.",
  },
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
