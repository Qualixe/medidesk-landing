"use client";

import { Languages, Monitor, Printer, ShieldCheck } from "lucide-react";
import { Container } from "@/components/section";
import { useI18n } from "@/i18n";

const ICONS = [ShieldCheck, Languages, Printer, Monitor];

export function TrustStrip() {
  const { t } = useI18n();
  return (
    <section aria-label="Highlights" className="border-y border-border bg-card">
      <Container>
        <ul className="grid grid-cols-1 divide-y divide-border sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4">
          {t.trust.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <li key={item} className="flex items-center gap-3 py-5 sm:px-4 lg:justify-center lg:py-6 lg:first:pl-0 lg:last:pr-0">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-primary-text">
                  <Icon className="size-[18px]" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium leading-snug text-foreground">{item}</span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
