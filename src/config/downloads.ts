/**
 * Every piece of download information lives here.
 * Update this file for each release — the hero, pricing card, final CTA,
 * footer and /download page all read from it.
 *
 * Both installers are served from the Railway download service.
 */

export type Platform = "windows" | "mac";

export interface PlatformDownload {
  /** Direct link to the installer (e.g. a GitHub Releases asset). */
  url: string;
  /** Human readable size shown under the button, e.g. "86 MB". */
  size: string;
  /** Installer file name (for your own reference; not shown on the site). */
  fileName: string;
}

export interface DownloadsConfig {
  version: string;
  /** ISO date (YYYY-MM-DD). */
  releaseDate: string;
  windows: PlatformDownload;
  mac: PlatformDownload & {
    /** When false, the macOS button is a "Coming soon" label instead of a download link. */
    available: boolean;
  };
}

export const downloads: DownloadsConfig = {
  version: "1.0.0",
  releaseDate: "2026-10-01",
  windows: {
    url: "https://medidesk-downloads-production.up.railway.app/download",
    size: "108 MB",
    fileName: "MediDesk Setup.exe",
  },
  mac: {
    available: true,
    url: "https://medidesk-downloads-production.up.railway.app/download/mac",
    size: "221 MB",
    fileName: "MediDesk.dmg",
  },
};
