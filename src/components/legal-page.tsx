"use client";

import { TriangleAlert } from "lucide-react";
import { Container } from "@/components/section";
import { site } from "@/config/site";
import { fill, useI18n } from "@/i18n";

/** PLACEHOLDER: the legal text itself lives in src/i18n/en.ts and bn.ts under `legal`. */
const LAST_UPDATED = "2026-10-01";

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t, date } = useI18n();
  const doc = t.legal[kind];

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      <div
        role="note"
        className="flex gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm text-warning-text"
      >
        <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
        <div>
          <p className="font-semibold">{t.legal.placeholderTitle}</p>
          <p className="mt-1">{t.legal.placeholderBody}</p>
        </div>
      </div>

      <article className="mt-10">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {fill(t.legal.lastUpdated, { date: date(LAST_UPDATED) })}
        </p>
        <p className="mt-8 text-base leading-relaxed text-foreground">{doc.intro}</p>
        {doc.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-xl font-semibold text-foreground">{s.h}</h2>
            <p className="mt-3 text-base leading-relaxed text-muted-foreground">
              {fill(s.p, { email: site.supportEmail })}
            </p>
          </section>
        ))}
      </article>
    </Container>
  );
}
