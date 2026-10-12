"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, Check, Clock, Hospital, Sparkles, User, Users, X } from "lucide-react";
import { Reveal } from "@/components/motion";
import { buttonVariants } from "@/components/ui/button";
import { Container, Section, SectionHeader } from "@/components/section";
import { maxYearlyDiscount, plans, pricing, yearlySaving, type Plan, type PlanId } from "@/config/pricing";
import { site } from "@/config/site";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type Period = "monthly" | "yearly";

const PLAN_ICONS: Record<PlanId, typeof User> = { basic: User, pro: Users, clinic: Hospital };

export function Pricing() {
  const { t, num } = useI18n();
  const [period, setPeriod] = useState<Period>("monthly");

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
              {p === "yearly" && maxYearlyDiscount > 0 && (
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-success-text">
                  {fill(t.pricing.saveUpTo, { percent: num(maxYearlyDiscount) })}
                </span>
              )}
            </label>
          ))}
        </fieldset>

        <ul className="mx-auto mt-14 grid max-w-6xl items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          {plans.map((plan, i) => (
            <Reveal as="li" key={plan.id} delay={i * 0.06} className="flex">
              <PlanCard plan={plan} period={period} />
            </Reveal>
          ))}
        </ul>

        {/* Every plan includes */}
        <div className="mx-auto mt-10 flex max-w-6xl flex-col items-center gap-3 rounded-2xl border border-border bg-card px-6 py-5 text-sm sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8">
          <p className="font-semibold text-foreground">{t.pricing.allIncludeTitle}</p>
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {t.pricing.allInclude.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-muted-foreground">
                <Check className="size-4 text-primary" aria-hidden="true" />
                {fill(item, { days: num(pricing.trialDays) })}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function PlanCard({ plan, period }: { plan: Plan; period: Period }) {
  const { t, num, taka } = useI18n();
  const copy = t.pricing.plans[plan.id];
  const Icon = PLAN_ICONS[plan.id];
  const popular = !!plan.popular;
  const soon = plan.cta === "notify";
  const yearly = period === "yearly";

  return (
    <article
      aria-labelledby={`plan-${plan.id}`}
      className={cn(
        "relative flex w-full flex-col rounded-[1.25rem] border bg-card p-7 sm:p-8",
        popular
          ? "border-2 border-primary-solid bg-[linear-gradient(180deg,var(--accent)_0%,var(--card)_38%)] shadow-lifted lg:-my-4 lg:py-12"
          : "border-border shadow-soft",
      )}
    >
      {popular && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-primary-solid px-3.5 py-1 text-xs font-semibold text-white shadow-soft">
          <Sparkles className="size-3.5" aria-hidden="true" />
          {t.pricing.popular}
        </span>
      )}
      {soon && (
        <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full border border-violet/30 bg-card px-3.5 py-1 text-xs font-semibold text-violet-text shadow-soft">
          <Clock className="size-3.5" aria-hidden="true" />
          {t.pricing.comingSoon}
        </span>
      )}

      {/* Name */}
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-xl",
            popular ? "bg-primary-solid text-white" : "bg-brand-soft text-primary-text",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <h3 id={`plan-${plan.id}`} className="text-xl font-semibold text-foreground">
          {copy.name}
        </h3>
      </div>
      <p className="mt-3 min-h-[2.75rem] text-sm leading-relaxed text-muted-foreground">{copy.desc}</p>

      {/* Price */}
      <div className="mt-6 min-h-[7.5rem]">
        {plan.monthly === null || plan.yearly === null ? (
          <>
            <p className="h-5" aria-hidden="true" />
            <p className="mt-1 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">{t.pricing.custom}</p>
            <p className="mt-2 text-sm text-muted-foreground">{t.pricing.customNote}</p>
          </>
        ) : (
          <>
            {/* crossed-out price + saving, hosting style (keeps its line in monthly view so cards don't jump) */}
            <p className={cn("flex h-5 items-center gap-2 text-sm", !yearly && "invisible")} aria-hidden={!yearly}>
              <s className="text-muted-foreground">{taka(plan.monthly * 12)}</s>
              <span className="rounded-full bg-success/10 px-2 py-0.5 text-[0.6875rem] font-semibold text-success-text">
                {fill(t.pricing.save, { amount: taka(yearlySaving(plan)) })}
              </span>
            </p>
            <p className="mt-1 flex items-baseline gap-1.5">
              <span className="text-4xl font-semibold tracking-tight text-foreground tabular-nums sm:text-5xl">
                {taka(yearly ? plan.yearly : plan.monthly)}
              </span>
              <span className="text-base text-muted-foreground">{yearly ? t.pricing.perYear : t.pricing.perMonth}</span>
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {soon
                ? t.pricing.availableSoon
                : yearly
                  ? fill(t.pricing.perMonthEquivalent, { amount: taka(Math.round(plan.yearly / 12)) })
                  : t.pricing.billedMonthly}
            </p>
          </>
        )}
      </div>

      {/* CTA */}
      {plan.cta === "trial" ? (
        <Link
          href="/download"
          className={buttonVariants({ variant: popular ? "primary" : "secondary", size: "lg", className: "mt-6 w-full" })}
        >
          {fill(t.pricing.ctaTrial, { days: num(pricing.trialDays) })}
        </Link>
      ) : soon ? (
        <a
          href={`mailto:${site.supportEmail}?subject=${encodeURIComponent(t.pricing.notifySubject)}`}
          className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-6 w-full" })}
        >
          <Bell aria-hidden="true" />
          {t.pricing.ctaNotify}
        </a>
      ) : (
        <a
          href={`mailto:${site.supportEmail}?subject=${encodeURIComponent(t.pricing.contactSubject)}`}
          className={buttonVariants({ variant: "secondary", size: "lg", className: "mt-6 w-full" })}
        >
          {t.pricing.ctaContact}
        </a>
      )}

      {/* Features */}
      <div className="mt-8 border-t border-border pt-6">
        <p className="text-sm font-semibold text-foreground">{t.pricing.includesTitle}</p>
        <ul className="mt-4 flex flex-col gap-3">
          {plan.features.map(([key, state]) => (
            <li
              key={key}
              className={cn("flex items-start gap-3 text-sm", state === false ? "text-muted-foreground" : "text-foreground")}
            >
              <span
                className={cn(
                  "mt-px flex size-5 shrink-0 items-center justify-center rounded-full",
                  state === true && "bg-brand-soft text-primary-text",
                  state === "soon" && "bg-violet/10 text-violet-text",
                  state === false && "bg-muted text-muted-foreground",
                )}
              >
                {state === true ? (
                  <Check className="size-3.5" aria-hidden="true" />
                ) : state === "soon" ? (
                  <Clock className="size-3" aria-hidden="true" />
                ) : (
                  <X className="size-3" aria-hidden="true" />
                )}
              </span>
              <span>
                {state === false && <span className="sr-only">{t.pricing.notIncluded}: </span>}
                {state === "soon" && <span className="sr-only">{t.pricing.soonLabel}: </span>}
                {t.pricing.features[key]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
