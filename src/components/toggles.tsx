"use client";

import { Moon, Sun } from "lucide-react";
import { useI18n } from "@/i18n";
import { THEME_STORAGE_KEY } from "@/lib/storage-keys";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { t } = useI18n();

  function toggle() {
    const root = document.documentElement;
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* storage unavailable */
    }
  }

  // The icon is chosen purely with CSS (dark: variant), so it never flashes.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t.common.toggleTheme}
      title={t.common.toggleTheme}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
        className,
      )}
    >
      <Moon className="size-[18px] dark:hidden" aria-hidden="true" />
      <Sun className="hidden size-[18px] dark:block" aria-hidden="true" />
    </button>
  );
}

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, t, setLang } = useI18n();
  const next = lang === "en" ? "bn" : "en";

  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      title={t.common.switchLanguageLabel}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent",
        className,
      )}
    >
      <span aria-hidden="true" className="text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
        {lang === "en" ? "EN" : "বাং"}
      </span>
      <span aria-hidden="true" className="h-3.5 w-px bg-border" />
      <span lang={next}>{t.common.switchLanguage}</span>
    </button>
  );
}
