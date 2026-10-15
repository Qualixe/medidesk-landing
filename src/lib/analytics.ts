import { sendGAEvent } from "@next/third-parties/google";
import type { Platform } from "@/config/downloads";

/**
 * Records a download-button click in GA4 (`download_click`) and Meta Pixel (`DownloadClick`).
 * Both are no-ops outside production, where the trackers aren't loaded.
 */
export function trackDownload(platform: Platform) {
  if (process.env.NODE_ENV !== "production") return;
  sendGAEvent("event", "download_click", {
    platform,
    page_path: window.location.pathname,
  });
  window.fbq?.("trackCustom", "DownloadClick", { platform });
}
