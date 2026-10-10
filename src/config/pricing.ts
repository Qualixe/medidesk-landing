/** Prices in BDT. The yearly saving is derived, so it stays correct if you change either price. */
export const pricing = {
  monthly: 99,
  yearly: 999,
  trialDays: 7,
} as const;

export const yearlySaving = pricing.monthly * 12 - pricing.yearly;
