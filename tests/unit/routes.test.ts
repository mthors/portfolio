import { describe, it, expect, beforeEach, afterEach } from "vitest";
import robots from "@/app/robots";
import sitemap from "@/app/sitemap";

describe("Robots and Sitemap generation", () => {
  const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
  });

  afterEach(() => {
    if (originalSiteUrl !== undefined) {
      process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
    } else {
      delete process.env.NEXT_PUBLIC_SITE_URL;
    }
  });

  it("generates robots.txt rules allowing all crawlers and pointing to canonical sitemap", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://thorx.my.id";
    const result = robots();

    expect(result.rules).toEqual({
      userAgent: "*",
      allow: "/",
    });
    expect(result.sitemap).toBe("https://thorx.my.id/sitemap.xml");
  });

  it("falls back to default production domain when NEXT_PUBLIC_SITE_URL is unset in robots", () => {
    const result = robots();
    expect(result.sitemap).toBe("https://thorx.my.id/sitemap.xml");
  });

  it("generates sitemap with root url using configured NEXT_PUBLIC_SITE_URL", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://custom-domain.example.com";
    const result = sitemap();

    expect(result).toHaveLength(1);
    expect(result[0].url).toBe("https://custom-domain.example.com");
    expect(result[0].priority).toBe(1.0);
  });
});
