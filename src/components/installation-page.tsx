"use client";

import { Check } from "lucide-react";
import { WindowsIcon } from "@/components/brand/os-icons";
import { DownloadButtons } from "@/components/download/download-buttons";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, SectionHeader } from "@/components/section";
import { InstallStepsGrid } from "@/components/sections/install-steps";
import { pricing } from "@/config/pricing";
import { site, whatsappUrl } from "@/config/site";
import { fill, useI18n } from "@/i18n";

/** /installation — the full Windows install guide. */
export function InstallationPage() {
  const { t, num } = useI18n();
  const ip = t.installPage;
  const days = num(pricing.trialDays);

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-x-0 top-0 -z-10 h-[420px] [mask-image:radial-gradient(70%_80%_at_50%_0%,#000_30%,transparent)]"
      />

      {/* Header + download */}
      <Container className="pb-4 pt-16 sm:pt-20">
        <header className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Eyebrow>{ip.eyebrow}</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            {ip.title}
          </h1>
          <p className="mt-3 text-base text-pretty text-muted-foreground">{fill(ip.subtitle, { days })}</p>
          <DownloadButtons align="center" className="mt-8" />
        </header>
      </Container>

      {/* The four installer screenshots */}
      <section aria-labelledby="install-steps-title" className="py-16 sm:py-20">
        <Container>
          <SectionHeader
            id="install-steps-title"
            eyebrow={ip.stepsEyebrow}
            title={ip.stepsTitle}
            subtitle={ip.stepsSubtitle}
          />
          <InstallStepsGrid columns={1} className="mt-12" />
        </Container>
      </section>

      {/* After installing */}
      <section aria-labelledby="after-title" className="bg-section py-16 sm:py-20">
        <Container>
          <h2 id="after-title" className="text-center text-3xl font-semibold tracking-tight text-foreground">
            {ip.afterTitle}
          </h2>
          <ol className="mx-auto mt-10 grid max-w-5xl gap-5 md:grid-cols-3">
            {ip.after.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 0.06} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary-solid text-sm font-semibold text-white">
                  {num(i + 5)}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{fill(step.body, { days })}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Requirements + help */}
      <Container className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <WindowsIcon className="size-5" />
            {ip.requirementsTitle}
          </h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {t.downloadPage.winReqs.map((r) => (
              <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {r}
              </li>
            ))}
          </ul>
        </div>

        <p className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground">
          {ip.help.split(/(\{email\}|\{whatsapp\})/).map((part, i) =>
            part === "{email}" ? (
              <a key={i} href={`mailto:${site.supportEmail}`} className="font-medium text-primary-text hover:underline">
                {site.supportEmail}
              </a>
            ) : part === "{whatsapp}" ? (
              <a
                key={i}
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary-text hover:underline"
              >
                {num(site.whatsappDisplay)}
              </a>
            ) : (
              <span key={i}>{part}</span>
            ),
          )}
        </p>
      </Container>
    </div>
  );
}
