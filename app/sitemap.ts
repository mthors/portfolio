import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://thorx.my.id";
  const cleanUrl = siteUrl.replace(/\/+$/, "");

  return [
    {
      url: cleanUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1.0,
    },
  ];
}
