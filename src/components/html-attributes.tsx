"use client";

import { useEffect, useLayoutEffect } from "react";
import { useI18n } from "@/i18n";

declare global {
  interface Window {
    __medidesk?: { apply: () => void };
  }
}

/**
 * Keeps <html> attributes in sync with client state.
 * In production the inline boot script already did the work before paint;
 * this re-applies it after React's development Strict Mode remount.
 */
export function HtmlAttributes() {
  const { lang } = useI18n();

  useLayoutEffect(() => {
    window.__medidesk?.apply();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return null;
}
