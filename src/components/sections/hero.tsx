"use client";

import { DownloadButtons } from "@/components/download/download-buttons";
import { Container } from "@/components/section";
import { useI18n } from "@/i18n";
import { AppMockup } from "./app-mockup";

export function Hero() {
  const { t } = useI18n();

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_0%,#000_40%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(40%_70%_at_15%_0%,color-mix(in_oklab,var(--brand-cyan)_14%,transparent),transparent),radial-gradient(45%_70%_at_85%_10%,color-mix(in_oklab,var(--brand-azure)_10%,transparent),transparent)]"
      />

      <Container className="grid items-center gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.12fr] lg:gap-10 lg:pb-28 lg:pt-24">
        <div className="max-w-xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-[0.8125rem] font-medium text-muted-foreground shadow-soft">
            <span className="size-1.5 rounded-full bg-primary" aria-hidden="true" />
            {t.hero.eyebrow}
          </p>
          <h1
            id="hero-title"
            className="mt-6 text-[2.5rem] font-semibold leading-[1.08] tracking-[-0.025em] text-balance text-foreground sm:text-5xl lg:text-[3.5rem]"
          >
            {t.hero.titleA} <span className="text-brand-gradient sm:block">{t.hero.titleB}</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-muted-foreground">{t.hero.subtitle}</p>
          <DownloadButtons className="mt-9" />
        </div>

        <div className="min-w-0 lg:pl-4">
          <AppMockup />
        </div>
      </Container>
    </section>
  );
}
