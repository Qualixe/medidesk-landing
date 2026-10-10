import { useCallback, useSyncExternalStore } from "react";
import { bn } from "./bn";
import { LANG_STORAGE_KEY } from "@/lib/storage-keys";
import { en, type Dictionary } from "./en";

export type Lang = "en" | "bn";
export type { Dictionary };

const dictionaries: Record<Lang, Dictionary> = { en, bn };

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

/** Replace ASCII digits with Bangla digits. */
export function toBnDigits(value: string | number): string {
  return String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);
}

/** Fill `{name}` placeholders in a template string. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

/* ---------- tiny external store, so every component shares one language ---------- */

const listeners = new Set<() => void>();
let current: Lang | null = null;

function readStored(): Lang {
  try {
    return localStorage.getItem(LANG_STORAGE_KEY) === "bn" ? "bn" : "en";
  } catch {
    return "en";
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === LANG_STORAGE_KEY) {
      current = readStored();
      listeners.forEach((l) => l());
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): Lang {
  if (current === null) current = readStored();
  return current;
}

/** The server always renders English; the client switches after hydration. */
function getServerSnapshot(): Lang {
  return "en";
}

export function setLang(lang: Lang) {
  current = lang;
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {
    /* storage unavailable — the choice just won't persist */
  }
  document.documentElement.lang = lang;
  listeners.forEach((l) => l());
}

export function useI18n() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const t = dictionaries[lang];

  /** Format a number (or numeric string) with the right digits and grouping. */
  const num = useCallback(
    (value: number | string) => {
      const s = typeof value === "number" ? value.toLocaleString("en-IN") : value;
      return lang === "bn" ? toBnDigits(s) : s;
    },
    [lang],
  );

  /** Taka amount, e.g. ৳99 / ৳৯৯. */
  const taka = useCallback((value: number) => `৳${num(value)}`, [num]);

  /** Format an ISO date (YYYY-MM-DD) without depending on the visitor's time zone. */
  const date = useCallback(
    (iso: string) => {
      const d = new Date(`${iso}T00:00:00Z`);
      return new Intl.DateTimeFormat(lang === "bn" ? "bn-BD" : "en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "UTC",
      }).format(d);
    },
    [lang],
  );

  return { lang, t, num, taka, date, setLang };
}
