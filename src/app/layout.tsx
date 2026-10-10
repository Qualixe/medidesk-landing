import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import { HtmlAttributes } from "@/components/html-attributes";
import { MotionProvider } from "@/components/motion";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/config/site";
import { bootScript } from "@/lib/boot-script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Bangla glyphs only load when Bangla text is on screen (unicode-range), so don't preload.
const notoBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  display: "swap",
  preload: false,
});

const description =
  "MediDesk is a desktop practice-management app for doctors and small clinics in Bangladesh: patients, appointments, prescriptions and billing in one place, in English and Bangla.";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "MediDesk — Practice management for doctors in Bangladesh",
    template: "%s · MediDesk",
  },
  description,
  applicationName: "MediDesk",
  keywords: [
    "MediDesk",
    "clinic management software Bangladesh",
    "doctor chamber software",
    "prescription software",
    "practice management",
    "Bangla prescription",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "MediDesk",
    title: "MediDesk — Run your chamber, not paperwork",
    description,
    locale: "en_US",
    alternateLocale: ["bn_BD"],
  },
  twitter: {
    card: "summary_large_image",
    title: "MediDesk — Run your chamber, not paperwork",
    description,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1520" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${inter.variable} ${notoBengali.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <MotionProvider>
          <HtmlAttributes />
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
