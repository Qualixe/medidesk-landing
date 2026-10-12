/**
 * Site-wide settings and contact details.
 * PLACEHOLDER: replace the URL with your real domain.
 */
export const site = {
  name: "MediDesk",
  /** Production URL, no trailing slash. Used for canonical links, sitemap and OG tags. */
  url: "https://medidesk.app",
  supportEmail: "qualixe.info@gmail.com",
  /** WhatsApp number in international format, digits only (used in the wa.me link). */
  whatsappNumber: "8801318552266",
  /** How the number is displayed on the page. */
  whatsappDisplay: "+880 1318-552266",
  companyName: "MediDesk",
} as const;

export const whatsappUrl = `https://wa.me/${site.whatsappNumber}`;
