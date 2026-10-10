"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { DownloadButtons } from "@/components/download/download-buttons";
import { Container, Section, SectionHeader } from "@/components/section";
import { pricing, yearlySaving } from "@/config/pricing";
import { site } from "@/config/site";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type Period = "monthly" | "yearly";

export function Pricing() {
  const { t, num, taka } = useI18n();
  const [period, setPeriod] = useState<Period>("monthly");
  const yearly = period === "yearly";

  return (
    <Section id="pricing" aria-labelledby="pricing-title" className="bg-section">
      <Container>
        <SectionHeader
          id="pricing-title"
          eyebrow={t.pricing.eyebrow}
          title={t.pricing.title}
          subtitle={fill(t.pricing.subtitle, { days: num(pricing.trialDays) })}
        />

        {/* Monthly / Yearly — native radios, so arrow keys and screen readers just work */}
        <fieldset className="mx-auto mt-10 flex w-fit rounded-xl border border-border bg-muted p-1">
          <legend className="sr-only">{t.pricing.billingLabel}</legend>
          {(["monthly", "yearly"] as const).map((p) => (
            <label
              key={p}
              className={cn(
                "relative flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ring",
                period === p ? "bg-card text-foreground shadow-soft" : "text-muted-foreground hover:text-foreground",
              )}
            >
              <input
                type="radio"
                name="billing-period"
                value={p}
                checked={period === p}
                onChange={() => setPeriod(p)}
                className="sr-only"
              />
              {p === "monthly" ? t.pricing.monthly : t.pricing.yearly}
              {p === "yearly" && (
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-success-text">
                  {fill(t.pricing.save, { amount: taka(yearlySaving) })}
                </span>
              )}
            </label>
          ))}
        </fieldset>

        <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[1.25rem] border border-border bg-background shadow-lifted">
          <div className="bg-brand-gradient h-1" aria-hidden="true" />
          <div className="grid md:grid-cols-2">
            <div className="p-7 sm:p-10">
              <h3 className="text-xl font-semibold text-foreground">{t.pricing.planName}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{t.pricing.planDesc}</p>

              <p className="mt-8 flex items-baseline gap-1.5" aria-live="polite">
                <span className="text-5xl font-semibold tracking-tight text-foreground tabular-nums">
                  {taka(yearly ? pricing.yearly : pricing.monthly)}
                </span>
                <span className="text-base text-muted-foreground">
                  {yearly ? t.pricing.perYear : t.pricing.perMonth}
                </span>
              </p>
              <p className={cn("mt-2 h-5 text-sm font-medium text-success-text", !yearly && "invisible")}>
                {fill(t.pricing.save, { amount: taka(yearlySaving) })}
              </p>

              <p className="mt-6 rounded-lg bg-accent px-3.5 py-2.5 text-sm text-accent-foreground">
                {fill(t.pricing.trialNote, { days: num(pricing.trialDays) })}
              </p>
            </div>

            <div className="border-t border-border p-7 sm:p-10 md:border-l md:border-t-0">
              <p className="text-sm font-semibold text-foreground">{t.pricing.includesTitle}</p>
              <ul className="mt-4 flex flex-col gap-3">
                {t.pricing.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-foreground">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-primary-text">
                      <Check className="size-3.5" aria-hidden="true" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <DownloadButtons showMeta={false} stack className="mt-8" />
              <p className="mt-5 text-[0.8125rem] text-muted-foreground">
                <a
                  href={`mailto:${site.supportEmail}`}
                  className="underline decoration-current/30 underline-offset-[3px] hover:text-foreground hover:decoration-current"
                >
                  {t.pricing.moreNeeded}
                </a>
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
