import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of MediDesk.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return <LegalPage kind="terms" />;
}
