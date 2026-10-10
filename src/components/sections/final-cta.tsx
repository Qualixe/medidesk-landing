"use client";

import { DownloadButtons } from "@/components/download/download-buttons";
import { Container } from "@/components/section";
import { pricing } from "@/config/pricing";
import { fill, useI18n } from "@/i18n";

export function FinalCta() {
  const { t, num } = useI18n();
  return (
    <section aria-labelledby="cta-title" className="pb-20 sm:pb-24 lg:pb-32">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#0e8a8f] to-[#0a6e73] px-6 py-16 text-center shadow-lifted sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="bg-grid absolute inset-0 -z-10 opacity-60 [--grid-line:rgb(255_255_255/0.07)] [mask-image:radial-gradient(60%_70%_at_50%_0%,#000,transparent)]"
          />
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 -z-10 size-72 rounded-full bg-white/10 blur-3xl"
          />
          <h2 id="cta-title" className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance text-white sm:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl font-semibold text-pretty text-white">
            {fill(t.cta.subtitle, { days: num(pricing.trialDays) })}
          </p>
          <DownloadButtons tone="inverse" align="center" showMeta={false} className="mt-10" />
        </div>
      </Container>
    </section>
  );
}
