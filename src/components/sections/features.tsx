"use client";

import {
  ChartColumn,
  ClipboardList,
  HeartPulse,
  Languages,
  Pill,
  Receipt,
  UserCog,
  Users,
} from "lucide-react";
import { Reveal } from "@/components/motion";
import { Container, Section, SectionHeader } from "@/components/section";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/** Icon + tint per feature, in the same order as `features.items` in the dictionary. */
const META = [
  { icon: Users, tint: "bg-brand-soft text-primary-text" },
  { icon: ClipboardList, tint: "bg-info/10 text-info-text" },
  { icon: HeartPulse, tint: "bg-destructive/10 text-destructive-text" },
  { icon: Pill, tint: "bg-brand-soft text-primary-text" },
  { icon: Receipt, tint: "bg-success/10 text-success-text" },
  { icon: ChartColumn, tint: "bg-violet/10 text-violet-text" },
  { icon: Languages, tint: "bg-warning/10 text-warning-text" },
  { icon: UserCog, tint: "bg-info/10 text-info-text" },
];

export function Features() {
  const { t } = useI18n();
  return (
    <Section id="features" aria-labelledby="features-title">
      <Container>
        <SectionHeader
          id="features-title"
          eyebrow={t.features.eyebrow}
          title={t.features.title}
          subtitle={t.features.subtitle}
        />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
          {t.features.items.map((f, i) => {
            const { icon: Icon, tint } = META[i];
            return (
              <Reveal
                as="li"
                key={f.title}
                delay={(i % 4) * 0.05}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-[border-color,box-shadow] duration-200 hover:border-primary/30 hover:shadow-lifted"
              >
                <span className={cn("flex size-10 items-center justify-center rounded-xl", tint)}>
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-base font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
