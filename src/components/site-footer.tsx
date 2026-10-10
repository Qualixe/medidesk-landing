"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { Mail, MessageCircle } from "lucide-react";
import { downloads } from "@/config/downloads";
import { Logo } from "@/components/brand/logo";
import { DownloadButtons } from "@/components/download/download-buttons";
import { Container } from "@/components/section";
import { site, whatsappUrl } from "@/config/site";
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

  const linkClass =
    "text-sm text-muted-foreground transition-colors hover:text-foreground rounded-sm";

  return (
    <footer className="border-t border-border bg-card">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="max-w-sm">
            <Link href="/" className="-m-1 inline-block rounded-lg p-1" aria-label="MediDesk — home">
              <Logo />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{t.footer.description}</p>
            <DownloadButtons showMeta={false} stack className="mt-6" />
          </div>

          <nav aria-labelledby="footer-product">
            <h2 id="footer-product" className="text-sm font-semibold text-foreground">
              {t.footer.product}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link className={linkClass} href="/download">{t.footer.links.download}</Link></li>
              <li><Link className={linkClass} href="/#pricing">{t.footer.links.pricing}</Link></li>
              <li><Link className={linkClass} href="/#faq">{t.footer.links.faq}</Link></li>
            </ul>
          </nav>

          <nav aria-labelledby="footer-legal">
            <h2 id="footer-legal" className="text-sm font-semibold text-foreground">
              {t.footer.legal}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li><Link className={linkClass} href="/privacy">{t.footer.links.privacy}</Link></li>
              <li><Link className={linkClass} href="/terms">{t.footer.links.terms}</Link></li>
              <li><a className={linkClass} href={`mailto:${site.supportEmail}`}>{t.footer.links.contact}</a></li>
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold text-foreground">{t.footer.contact}</h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a className={`${linkClass} inline-flex items-center gap-2`} href={`mailto:${site.supportEmail}`}>
                  <Mail className="size-4 text-primary" aria-hidden="true" />
                  <span className="sr-only">{t.footer.email}: </span>
                  {site.supportEmail}
                </a>
              </li>
              <li>
                <a
                  className={`${linkClass} inline-flex items-center gap-2`}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4 text-primary" aria-hidden="true" />
                  <span className="sr-only">{t.footer.whatsapp}: </span>
                  {num(site.whatsappDisplay)}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-border pt-6 text-[0.8125rem] text-muted-foreground sm:flex-row sm:justify-between">
          <p>{fill(t.footer.rights, { year: num(String(year)), company: site.companyName })}</p>
          <p>{t.footer.madeFor}</p>
        </div>
      </Container>
    </footer>
  );
}
