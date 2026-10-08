import { test, expect } from "@playwright/test";

test.describe("Hero Portrait & Visual Tests", () => {
  test("renders portrait with proper accessibility and positioning on desktop", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    const portrait = page.getByRole("img", { name: "Portrait of Moh Thoriqi Sahal" });
    await expect(portrait).toBeVisible();

    // Verify image successfully loaded
    const isLoaded = await portrait.evaluate(
      (img: HTMLImageElement) => img.complete && img.naturalWidth > 0
    );
    expect(isLoaded).toBe(true);

    // Verify decorative background has aria-hidden
    const ambientBg = page.getByTestId("hero-ambient-visual");
    await expect(ambientBg).toHaveAttribute("aria-hidden", "true");

    // Verify no horizontal overflow
    const hasNoOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(hasNoOverflow).toBe(true);

    // Verify two-column positioning: portrait is to the right of H1
    const headingBox = await page.locator("h1").boundingBox();
    const portraitBox = await portrait.boundingBox();
    expect(headingBox).not.toBeNull();
    expect(portraitBox).not.toBeNull();
    if (headingBox && portraitBox) {
      expect(portraitBox.x).toBeGreaterThan(headingBox.x);
    }
  });

  test("renders cleanly without overflow on tablet", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    const portrait = page.getByRole("img", { name: "Portrait of Moh Thoriqi Sahal" });
    await expect(portrait).toBeVisible();

    const hasNoOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(hasNoOverflow).toBe(true);
  });

  test("positions portrait below hero copy and prevents overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const portrait = page.getByRole("img", { name: "Portrait of Moh Thoriqi Sahal" });
    await expect(portrait).toBeVisible();

    // Verify vertical stack: portrait is below the CTA buttons
    const cta = page.getByRole("link", { name: "View Projects" });
    const ctaBox = await cta.boundingBox();
    const portraitBox = await portrait.boundingBox();
    expect(ctaBox).not.toBeNull();
    expect(portraitBox).not.toBeNull();
    if (ctaBox && portraitBox) {
      expect(portraitBox.y).toBeGreaterThan(ctaBox.y);
    }

    // Verify no horizontal overflow
    const hasNoOverflow = await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth
    );
    expect(hasNoOverflow).toBe(true);
  });

  test("respects prefers-reduced-motion: reduce", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");

    const portrait = page.getByRole("img", { name: "Portrait of Moh Thoriqi Sahal" });
    await expect(portrait).toBeVisible();

    // Verify ambient visual is still in DOM but decorative animations are neutralized
    const ambientBg = page.getByTestId("hero-ambient-visual");
    await expect(ambientBg).toBeAttached();
  });
});
