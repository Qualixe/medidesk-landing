"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/section";
import { LanguageToggle, ThemeToggle } from "@/components/toggles";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/installation", label: t.nav.install },
    { href: "/#pricing", label: t.nav.pricing },
    { href: "/#faq", label: t.nav.faq },
  ];

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onResize = () => window.innerWidth >= 768 && setOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-[var(--header-bg)] backdrop-blur-md backdrop-saturate-150">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-md focus:bg-card focus:px-3 focus:py-2 focus:text-sm focus:shadow-soft"
      >
        {t.common.skipToContent}
      </a>
      <Container className="flex h-16 items-center gap-4">
        <Link href="/" className="-m-1 rounded-lg p-1" aria-label="MediDesk — home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-6 hidden md:block">
          <ul className="flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <LanguageToggle className="hidden sm:inline-flex" />
          <ThemeToggle />
          <Link href="/download" className={buttonVariants({ size: "sm", className: "hidden sm:inline-flex" })}>
            <Download aria-hidden="true" />
            {t.nav.download}
          </Link>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg text-foreground hover:bg-muted md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t.common.closeMenu : t.common.menu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!open}
        className={cn("border-t border-border bg-background md:hidden")}
      >
        <Container className="flex flex-col gap-1 py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-3 flex items-center gap-2 border-t border-border pt-4">
            <LanguageToggle />
            <Link
              href="/download"
              onClick={() => setOpen(false)}
              className={buttonVariants({ size: "md", className: "ml-auto" })}
            >
              <Download aria-hidden="true" />
              {t.nav.download}
            </Link>
          </div>
        </Container>
      </div>
    </header>
  );
}
