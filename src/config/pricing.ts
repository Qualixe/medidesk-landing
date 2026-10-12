import type { Dictionary } from "@/i18n/en";

/**
 * Plans shown in the pricing section, in display order.
 * Prices are in BDT. Set `monthly`/`yearly` to null for a "Contact us" plan.
 * Feature labels live in src/i18n (pricing.features); here you only choose
 * which ones each plan shows: true = included (✓), false = not included (✗),
 * "soon" = on the way (🕒).
 *
 * PLACEHOLDER: the Pro and Clinic prices are suggestions — adjust them to your real offer.
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
   * "notify"  → the plan isn't available yet: "Coming soon" badge + "Notify me" email
   */
  cta: "trial" | "contact" | "notify";
  features: [FeatureKey, FeatureState][];
}

export const plans: Plan[] = [
  {
    id: "basic",
    monthly: 99,
    yearly: 999,
    popular: true,
    cta: "trial",
    features: [
      ["doctors1", true],
      ["device1", true],
      ["patients", true],
      ["core", true],
      ["bangla", true],
    ],
  },
  {
    id: "pro",
    monthly: 299,
    yearly: 2999,
    cta: "notify",
    features: [
      ["everythingInBasic", true],
      ["videoConsultation", "soon"],
      ["landingPage", "soon"],
      ["mobileApp", "soon"],
      ["onlineAppointments", "soon"],
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

/** Plans that can be bought today (used for the yearly badge and search-engine data). */
export const availablePlans = plans.filter((p) => p.cta !== "notify");

/** Taka saved by paying yearly instead of 12 × monthly. */
export function yearlySaving(plan: Plan): number {
  return plan.monthly !== null && plan.yearly !== null ? plan.monthly * 12 - plan.yearly : 0;
}

/** Largest yearly discount across the plans on sale, as a whole percentage (for the toggle badge). */
export const maxYearlyDiscount = Math.max(
  0,
  ...availablePlans.map((p) => (p.monthly && p.yearly ? Math.round((yearlySaving(p) / (p.monthly * 12)) * 100) : 0)),
);
