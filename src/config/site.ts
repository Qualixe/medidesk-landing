/**
 * Site-wide settings and contact details.
 * PLACEHOLDER: replace the URL, email and WhatsApp number with your real ones.
 */
export const site = {
  name: "MediDesk",
  /** Production URL, no trailing slash. Used for canonical links, sitemap and OG tags. */
  url: "https://medidesk.app",
  supportEmail: "support@medidesk.app",
  /** WhatsApp number in international format, digits only (used in the wa.me link). */
  whatsappNumber: "8801700000000",
  /** How the number is displayed on the page. */
  whatsappDisplay: "+880 1700-000000",
  companyName: "MediDesk",
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}`;
