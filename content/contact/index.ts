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

export function getContactConfig(): ContactConfig {
  const envNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  // Strip non-digits (e.g. spaces, dashes, '+') to adhere to official wa.me format
  const cleanNumber = envNumber ? envNumber.replace(/[^0-9]/g, "") : "";
  const whatsappUrl = cleanNumber
    ? `https://wa.me/${cleanNumber}`
    : "https://wa.me/YOUR_PHONE_NUMBER";

  return {
    whatsapp: {
      number: cleanNumber || "YOUR_PHONE_NUMBER",
      url: whatsappUrl,
      label: "WhatsApp Me",
      ariaLabel: "Chat directly with Moh Thoriqi Sahal on WhatsApp",
    },
    email: {
      address: "contact@thoriqisahal.dev",
      url: "mailto:contact@thoriqisahal.dev",
      label: "Send Email",
      ariaLabel: "Send an email to Moh Thoriqi Sahal",
    },
    github: {
      url: "https://github.com/thoriqisahal",
      label: "GitHub Profile",
      ariaLabel: "View Moh Thoriqi Sahal on GitHub",
    },
  };
}
