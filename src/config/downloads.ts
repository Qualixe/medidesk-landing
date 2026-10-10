/**
 * Every piece of download information lives here.
 * Update this file for each release — the hero, pricing card, final CTA,
 * footer and /download page all read from it.
 *
 * PLACEHOLDER: replace the URLs, sizes and checksums with your real release assets.
 */

export type Platform = "windows" | "mac";

export interface PlatformDownload {
  /** Direct link to the installer (e.g. a GitHub Releases asset). */
  url: string;
  /** Human readable size shown under the button, e.g. "86 MB". */
  size: string;
  /** Installer file name shown on the /download page. */
  fileName: string;
  /** SHA-256 checksum of the installer. */
  sha256: string;
}

export interface DownloadsConfig {
  version: string;
  /** ISO date (YYYY-MM-DD). */
  releaseDate: string;
  /** Link to full release notes / changelog. */
  releaseNotesUrl: string;
  windows: PlatformDownload;
  mac: PlatformDownload & {
    /** When false, the macOS button shows "Coming soon" and a "Notify me" field. */
    available: boolean;
  };
  /**
   * Where "Notify me" submissions go. Leave `endpoint` empty to fall back to
   * opening the visitor's email app addressed to `fallbackEmail`.
   * Any form service that accepts a POST with an `email` field works
   * (Formspree, Basin, Getform, a Google Apps Script URL, …).
   */
  notify: {
    endpoint: string;
    fallbackEmail: string;
  };
}

export const downloads: DownloadsConfig = {
  version: "1.0.0",
  releaseDate: "2026-10-01",
  releaseNotesUrl: "https://github.com/your-org/medidesk/releases/latest",
  windows: {
    url: "https://github.com/your-org/medidesk/releases/latest/download/MediDesk-Setup-1.0.0-x64.exe",
    size: "86 MB",
    fileName: "MediDesk-Setup-1.0.0-x64.exe",
    sha256: "REPLACE_WITH_SHA256_OF_WINDOWS_INSTALLER",
  },
  mac: {
    available: true,
    url: "https://github.com/your-org/medidesk/releases/latest/download/MediDesk-1.0.0-universal.dmg",
    size: "112 MB",
    fileName: "MediDesk-1.0.0-universal.dmg",
    sha256: "REPLACE_WITH_SHA256_OF_MAC_INSTALLER",
  },
  notify: {
    endpoint: "",
    fallbackEmail: "hello@medidesk.app",
  },
};
