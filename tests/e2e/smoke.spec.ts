import { test, expect } from "@playwright/test";

test.describe("M0 Smoke Test", () => {
  test("renders homepage, navigation shell, and featured projects", async ({ page }) => {
    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    // Verify Production Security Headers
    const headers = response?.headers() ?? {};
    expect(headers["x-frame-options"]?.toUpperCase()).toBe("DENY");
    expect(headers["x-content-type-options"]).toBe("nosniff");
    expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");

    // Verify Title & SEO
    await expect(page).toHaveTitle(/Moh Thoriqi Sahal/i);

    // Verify Header Navigation Shell
    const nav = page.locator("nav[aria-label='Main Navigation']");
    await expect(nav).toBeVisible();

    // Verify Hero content
    const heading = page.locator("h1");
    await expect(heading).toContainText(/Building Practical Solutions/i);

    // Verify About Section
    const aboutSection = page.locator("#about");
    await expect(aboutSection).toBeVisible();

    // Verify Experience Section
    const experienceSection = page.locator("#experience");
    await expect(experienceSection).toBeVisible();

    // Verify Projects Section and entries
    const projectSection = page.locator("#projects");
    await expect(projectSection).toBeVisible();
    await expect(page.getByText(/Lightweight Desktop Inventory System/i)).toBeVisible();
    await expect(page.getByText(/Outsole Catalog/i)).toBeVisible();

    // Verify Skills Section
    const skillsSection = page.locator("#skills");
    await expect(skillsSection).toBeVisible();

    // Verify Contact Section and CTAs (WhatsApp primary, Email, GitHub)
    const contactSection = page.locator("#contact");
    await expect(contactSection).toBeVisible();

    const whatsappCta = contactSection.getByRole("link", { name: /WhatsApp/i });
    await expect(whatsappCta).toBeVisible();
    await expect(whatsappCta).toHaveAttribute("href", /^https:\/\/wa\.me\//);
    await expect(whatsappCta).toHaveAttribute("target", "_blank");

    const emailCta = contactSection.getByRole("link", { name: /Email/i });
    await expect(emailCta).toBeVisible();
    await expect(emailCta).toHaveAttribute("href", /^mailto:/);

    const githubCta = contactSection.getByRole("link", { name: /GitHub/i });
    await expect(githubCta).toBeVisible();
    await expect(githubCta).toHaveAttribute("href", /^https:\/\/github\.com\//);

    // Verify Footer Shell
    const footer = page.locator("footer");
    await expect(footer).toBeVisible();
    await expect(footer).toContainText(/Moh Thoriqi Sahal/i);
  });

  test("serves health check endpoint with healthy status", async ({ request }) => {
    const response = await request.get("/api/health");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.status).toBe("healthy");
    expect(typeof body.uptime).toBe("number");
    expect(typeof body.timestamp).toBe("string");
  });

  test("serves robots.txt referencing canonical sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain("User-Agent: *");
    expect(text).toContain("Allow: /");
    expect(text).toContain("Sitemap:");
    expect(text).toContain("/sitemap.xml");
  });

  test("serves sitemap.xml containing indexable production URL", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    expect(response.status()).toBe(200);

    const text = await response.text();
    expect(text).toContain("<urlset");
    expect(text).toContain("<loc>");
    expect(text).toContain("</loc>");
  });

  test("renders custom 404 page on unknown routes", async ({ page }) => {
    const response = await page.goto("/this-route-does-not-exist");
    expect(response?.status()).toBe(404);

    await expect(page.getByText(/404 • NOT FOUND/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Page Not Found/i })).toBeVisible();

    const returnHomeBtn = page.getByRole("link", { name: /Return Home/i });
    await expect(returnHomeBtn).toBeVisible();
    await expect(returnHomeBtn).toHaveAttribute("href", "/");
  });
});
