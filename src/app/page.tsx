import { Faq } from "@/components/sections/faq";
import { Features } from "@/components/sections/features";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { PrescriptionShowcase } from "@/components/sections/prescription-showcase";
import { Pricing } from "@/components/sections/pricing";
import { Security } from "@/components/sections/security";
import { TrustStrip } from "@/components/sections/trust-strip";
import { downloads } from "@/config/downloads";
import { pricing } from "@/config/pricing";
import { site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "MediDesk",
  url: site.url,
  applicationCategory: "MedicalApplication",
  operatingSystem: downloads.mac.available ? "Windows 10, Windows 11, macOS 12+" : "Windows 10, Windows 11",
  softwareVersion: downloads.version,
  offers: [
    { "@type": "Offer", price: pricing.monthly, priceCurrency: "BDT", name: "Basic (monthly)" },
    { "@type": "Offer", price: pricing.yearly, priceCurrency: "BDT", name: "Basic (yearly)" },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <TrustStrip />
      <Features />
      <PrescriptionShowcase />
      <Security />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
