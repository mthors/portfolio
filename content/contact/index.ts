export const contactConfig = {
  email: "mtsthor@gmail.com",
  github: "https://github.com/mthors",
  whatsapp: "6285730279779",
} as const;

export interface ContactConfig {
  whatsapp: {
    number: string;
    url: string;
    label: string;
    ariaLabel: string;
  };
  email: {
    address: string;
    url: string;
    label: string;
    ariaLabel: string;
  };
  github: {
    url: string;
    label: string;
    ariaLabel: string;
  };
}

/**
 * Strips non-digits (spaces, dashes, '+') to format into standard wa.me link
 */
export function formatWhatsAppUrl(number: string): string {
  const cleanNumber = number.replace(/[^0-9]/g, "");
  return `https://wa.me/${cleanNumber}`;
}

export function getContactConfig(): ContactConfig {
  const cleanWhatsAppNumber = contactConfig.whatsapp.replace(/[^0-9]/g, "");
  const whatsappUrl = formatWhatsAppUrl(contactConfig.whatsapp);

  return {
    whatsapp: {
      number: cleanWhatsAppNumber,
      url: whatsappUrl,
      label: "WhatsApp Me",
      ariaLabel: "Chat directly with Moh Thoriqi Sahal on WhatsApp",
    },
    email: {
      address: contactConfig.email,
      url: `mailto:${contactConfig.email}`,
      label: "Send Email",
      ariaLabel: "Send an email to Moh Thoriqi Sahal",
    },
    github: {
      url: contactConfig.github,
      label: "GitHub Profile",
      ariaLabel: "View Moh Thoriqi Sahal on GitHub",
    },
  };
}
