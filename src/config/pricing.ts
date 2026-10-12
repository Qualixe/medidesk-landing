import type { Dictionary } from "@/i18n/en";

/**
 * Plans shown in the pricing section, in display order.
 * Prices are in BDT. Set `monthly`/`yearly` to null for a "Contact us" plan.
 * Feature labels live in src/i18n (pricing.features); here you only choose
 * which ones each plan shows: true = included (✓), false = not included (✗),
 * "soon" = on the way (🕒).
 *
 * These match the plans in the desktop app: Basic is on sale, Pro is planned.
 */
export type FeatureKey = keyof Dictionary["pricing"]["features"];
export type PlanId = keyof Dictionary["pricing"]["plans"];
export type FeatureState = boolean | "soon";

export interface Plan {
  id: PlanId;
  monthly: number | null;
  yearly: number | null;
  popular?: boolean;
  /**
   * "trial"   → download & start the free trial
   * "contact" → email us
   * "soon"    → the plan isn't available yet: "Coming soon" badge and label, no button
   */
  cta: "trial" | "contact" | "soon";
  features: [FeatureKey, FeatureState][];
}

export const plans: Plan[] = [
  {
    id: "basic",
    monthly: 500,
    yearly: 5000,
    popular: true,
    cta: "trial",
    features: [
    
      ["patients", true],
      ["core", true],
      ["bangla", true],
      ["offline", true],
      ["templates", true],
      ["advancedReports", true],
      ["excelExport", true],
      ["noBranding", true],
      ["prioritySupport", true],
    ],
  },
  {
    id: "pro",
    // planned prices — Pro can't be bought yet
    monthly: 2000,
    yearly: 20000,
    cta: "soon",
    features: [
      ["everythingInBasic", true],
      ["videoConsultation", "soon"],
      ["landingPage", "soon"],
      ["mobileApp", "soon"],
      ["onlineAppointments", "soon"],
    ],
  },
];

export const pricing = {
  trialDays: 7,
} as const;

/** Plans that can be bought today (used for the yearly badge and search-engine data). */
export const availablePlans = plans.filter((p) => p.cta !== "soon");

/** Taka saved by paying yearly instead of 12 × monthly. */
export function yearlySaving(plan: Plan): number {
  return plan.monthly !== null && plan.yearly !== null ? plan.monthly * 12 - plan.yearly : 0;
}

/** Largest yearly discount across the plans on sale, as a whole percentage (for the toggle badge). */
export const maxYearlyDiscount = Math.max(
  0,
  ...availablePlans.map((p) => (p.monthly && p.yearly ? Math.round((yearlySaving(p) / (p.monthly * 12)) * 100) : 0)),
);
