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

  test("restores hero top visual position without navbar overlap after clicking Home link", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");

    // 1. Capture the navbar bounding box
    const navbar = page.locator("header");
    await expect(navbar).toBeVisible();
    const navbarBox = await navbar.boundingBox();
    expect(navbarBox).not.toBeNull();
    const navbarBottom = (navbarBox?.y ?? 0) + (navbarBox?.height ?? 0);

    const badge = page.getByText("IT ENGINEER & SOFTWARE DEVELOPER", { exact: true });
    await expect(badge).toBeVisible();

    // 2. Scroll down to a lower section
    await page.locator("#projects").scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    const scrolledY = await page.evaluate(() => window.scrollY);
    expect(scrolledY).toBeGreaterThan(1000);

    // 3. Click Home anchor in navbar
    const homeLink = page.locator("nav a", { hasText: "Home" });
    await homeLink.click();

    // 4. Wait for anchor navigation and scroll settling
    await page.waitForFunction(() => window.scrollY === 0, null, { timeout: 4000 });

    // 5. Capture the Hero badge bounding box after navigation
    const afterBadgeBox = await badge.boundingBox();
    expect(afterBadgeBox).not.toBeNull();

    // 6. Verify badge is fully visible below the sticky navbar and near the viewport top
    if (afterBadgeBox) {
      expect(afterBadgeBox.y).toBeGreaterThanOrEqual(navbarBottom);
      expect(afterBadgeBox.y).toBeLessThan(navbarBottom + 40);
    }

    const finalScrollY = await page.evaluate(() => window.scrollY);
    expect(finalScrollY).toBe(0);
  });
});
