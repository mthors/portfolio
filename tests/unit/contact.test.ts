import { describe, it, expect } from "vitest";
import { contactConfig, getContactConfig, formatWhatsAppUrl } from "@/content/contact";

describe("Contact Configuration (Public Source of Truth)", () => {
  it("provides the canonical contactConfig with real public contact destinations", () => {
    expect(contactConfig.email).toBe("mtsthor@gmail.com");
    expect(contactConfig.github).toBe("https://github.com/mthors");
    expect(contactConfig.whatsapp).toBe("6285730279779");
  });

  it("returns fully structured contact options matching the real destinations", () => {
    const config = getContactConfig();

    // WhatsApp
    expect(config.whatsapp.label).toBe("WhatsApp Me");
    expect(config.whatsapp.number).toBe("6285730279779");
    expect(config.whatsapp.url).toBe("https://wa.me/6285730279779");
    expect(config.whatsapp.ariaLabel).toContain("WhatsApp");

    // Email
    expect(config.email.label).toBe("Send Email");
    expect(config.email.address).toBe("mtsthor@gmail.com");
    expect(config.email.url).toBe("mailto:mtsthor@gmail.com");
    expect(config.email.ariaLabel).toContain("email");

    // GitHub
    expect(config.github.label).toBe("GitHub Profile");
    expect(config.github.url).toBe("https://github.com/mthors");
    expect(config.github.ariaLabel).toContain("GitHub");
  });

  it("formats international phone numbers by stripping non-digits into wa.me format", () => {
    expect(formatWhatsAppUrl("+62 857-3027-9779")).toBe("https://wa.me/6285730279779");
    expect(formatWhatsAppUrl("62 857 3027 9779")).toBe("https://wa.me/6285730279779");
    expect(formatWhatsAppUrl("6285730279779")).toBe("https://wa.me/6285730279779");
  });
});
