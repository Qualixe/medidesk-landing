import type { Dictionary } from "@/i18n/en";

/**
 * Plans shown in the pricing section, in display order.
 * Prices are in BDT. Set `monthly`/`yearly` to null for a "Contact us" plan.
 * Feature labels live in src/i18n (pricing.features); here you only choose
 * which ones each plan shows and whether they're included (✓) or not (✗).
 *
 * PLACEHOLDER: the Pro and Clinic prices and the per-plan feature split are
 * suggestions — adjust them to your real offer.
 */
export type FeatureKey = keyof Dictionary["pricing"]["features"];
export type PlanId = keyof Dictionary["pricing"]["plans"];

export interface Plan {
  id: PlanId;
  monthly: number | null;
  yearly: number | null;
  popular?: boolean;
  /** "trial" → download & start the free trial; "contact" → email us. */
  cta: "trial" | "contact";
  features: [FeatureKey, boolean][];
}

export const plans: Plan[] = [
  {
    id: "basic",
    monthly: 99,
    yearly: 999,
    cta: "trial",
    features: [
      ["doctors1", true],
      ["device1", true],
      ["patients", true],
      ["core", true],
      ["bangla", true],
      ["staff", false],
      ["doctorReports", false],
      ["prioritySupport", false],
    ],
  },
  {
    id: "pro",
    monthly: 299,
    yearly: 2999,
    popular: true,
    cta: "trial",
    features: [
      ["doctors5", true],
      ["devices3", true],
      ["patients", true],
      ["core", true],
      ["bangla", true],
      ["staff", true],
      ["doctorReports", true],
      ["prioritySupport", true],
    ],
  },
  {
    id: "clinic",
    monthly: null,
    yearly: null,
    cta: "contact",
    features: [
      ["doctorsUnlimited", true],
      ["devicesUnlimited", true],
      ["patients", true],
      ["core", true],
      ["bangla", true],
      ["staff", true],
      ["setup", true],
      ["migration", true],
    ],
  },
];

export const pricing = {
  trialDays: 7,
} as const;

/** Taka saved by paying yearly instead of 12 × monthly. */
export function yearlySaving(plan: Plan): number {
  return plan.monthly !== null && plan.yearly !== null ? plan.monthly * 12 - plan.yearly : 0;
}

/** Largest yearly discount across plans, as a whole percentage (for the toggle badge). */
export const maxYearlyDiscount = Math.max(
  ...plans.map((p) => (p.monthly && p.yearly ? Math.round((yearlySaving(p) / (p.monthly * 12)) * 100) : 0)),
);
