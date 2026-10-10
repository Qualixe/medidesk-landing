import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How MediDesk collects, uses and protects your information and your patients' data.",
  alternates: { canonical: "/privacy" },
};

export default function Page() {
  return <LegalPage kind="privacy" />;
}
