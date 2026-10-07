import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { getContactConfig } from "@/content/contact";

describe("Contact Configuration", () => {
  const originalEnv = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  });

  afterEach(() => {
    if (originalEnv !== undefined) {
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = originalEnv;
    } else {
      delete process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
    }
  });

  it("returns default contact options with placeholder WhatsApp URL when env is unset", () => {
    const config = getContactConfig();
    expect(config.whatsapp.label).toBe("WhatsApp Me");
    expect(config.whatsapp.url).toBe("https://wa.me/YOUR_PHONE_NUMBER");
    expect(config.whatsapp.ariaLabel).toContain("WhatsApp");

    expect(config.email.label).toBe("Send Email");
    expect(config.email.url).toBe("mailto:contact@thoriqisahal.dev");
    expect(config.email.ariaLabel).toContain("email");

    expect(config.github.label).toBe("GitHub Profile");
    expect(config.github.url).toBe("https://github.com/thoriqisahal");
    expect(config.github.ariaLabel).toContain("GitHub");
  });

  it("formats international phone numbers by stripping non-digits into wa.me format", () => {
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER = "+62 812-3456-7890";
    const config = getContactConfig();
    expect(config.whatsapp.url).toBe("https://wa.me/6281234567890");
    expect(config.whatsapp.number).toBe("6281234567890");
  });
});
