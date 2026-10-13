import type { Dictionary } from "@/i18n/en";

/**
 * Numbers shown in the ribbon under the hero.
 *
 * PLACEHOLDER: these are made-up numbers for layout only. Replace them with
 * real figures before the site goes live. Labels are in src/i18n (stats).
 */
export interface Stat {
  key: keyof Dictionary["stats"]["labels"];
  value: number;
  /** Shown after the number, e.g. "+". */
  suffix?: string;
}

export const stats: Stat[] = [
  { key: "doctors", value: 60, suffix: "+" },
  { key: "downloads", value: 250, suffix: "+" },
  { key: "patients", value: 4500, suffix: "+" },
  { key: "clinics", value: 45, suffix: "+" },
];
