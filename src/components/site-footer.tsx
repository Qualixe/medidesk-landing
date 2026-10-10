"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Mail } from "lucide-react";
import { Container } from "@/components/section";
import { downloads } from "@/config/downloads";
import { site } from "@/config/site";
import { fill, useI18n } from "@/i18n";

const noopSubscribe = () => () => {};

export function SiteFooter() {
  const { t, num } = useI18n();
  // Prerendered with the release year; the visitor's browser fills in the current year.
  const year = useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => Number(downloads.releaseDate.slice(0, 4)),
  );

  const linkClass = "rounded-sm transition-colors hover:text-foreground";

  return (
    <footer className="border-t border-border bg-card">
      <Container className="flex flex-col gap-4 py-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>{fill(t.footer.rights, { year: num(String(year)), company: site.companyName })}</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link className={linkClass} href="/privacy">
                {t.footer.links.privacy}
              </Link>
            </li>
            <li>
              <Link className={linkClass} href="/terms">
                {t.footer.links.terms}
              </Link>
            </li>
            <li>
              <a className={`${linkClass} inline-flex items-center gap-1.5`} href={`mailto:${site.supportEmail}`}>
                <Mail className="size-3.5 text-primary-text" aria-hidden="true" />
                <span className="sr-only">{t.footer.links.contact}: </span>
                {site.supportEmail}
              </a>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
}
