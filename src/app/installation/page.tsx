import type { Metadata } from "next";
import { InstallationPage } from "@/components/installation-page";

export const metadata: Metadata = {
  title: "Installation",
  description:
    "How to install MediDesk on Windows, step by step with screenshots: get past the SmartScreen warning, install, and start your free trial.",
  alternates: { canonical: "/installation" },
  openGraph: { url: "/installation" },
};

export default function Page() {
  return <InstallationPage />;
}
