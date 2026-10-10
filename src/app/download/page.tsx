import type { Metadata } from "next";
import { DownloadPage } from "@/components/download/download-page";

export const metadata: Metadata = {
  title: "Download",
  description:
    "Download MediDesk for Windows and macOS. Installation steps, system requirements and checksums.",
  alternates: { canonical: "/download" },
  openGraph: { url: "/download" },
};

export default function Page() {
  return <DownloadPage />;
}
