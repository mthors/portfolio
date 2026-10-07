import { test, expect } from "@playwright/test";

test.describe("M0 Smoke Test", () => {
  test("renders homepage, navigation shell, and featured projects", async ({ page }) => {
    await page.goto("/");

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
});
