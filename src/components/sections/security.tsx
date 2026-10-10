"use client";

import Link from "next/link";
import { ArrowRight, Cloud, KeyRound, Lock, UserCog } from "lucide-react";
import { Reveal } from "@/components/motion";
import { Container, Section, SectionHeader } from "@/components/section";
import { useI18n } from "@/i18n";

const ICONS = [Cloud, Lock, UserCog, KeyRound];

export function Security() {
  const { t } = useI18n();
  return (
    <Section aria-labelledby="security-title">
      <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeader
            id="security-title"
            align="start"
            eyebrow={t.security.eyebrow}
            title={t.security.title}
            subtitle={t.security.subtitle}
          />
          <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">{t.security.note}</p>
          <Link
            href="/privacy"
            className="group mt-4 inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-primary-text"
          >
            {t.security.privacyLink}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {t.security.items.map((item, i) => {
            const Icon = ICONS[i];
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.06}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <span className="flex size-10 items-center justify-center rounded-xl border border-primary/20 bg-brand-soft text-primary-text">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
