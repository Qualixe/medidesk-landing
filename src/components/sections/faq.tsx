"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/section";
import { downloads } from "@/config/downloads";
import { site } from "@/config/site";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

export function Faq() {
  const { t, num } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  const vars = {
    email: site.supportEmail,
    whatsapp: num(site.whatsappDisplay),
    macStatus: downloads.mac.available ? t.faq.macAvailable : t.faq.macSoon,
  };

  return (
    <Section id="faq" aria-labelledby="faq-title">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <SectionHeader
          id="faq-title"
          align="start"
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
          className="lg:sticky lg:top-28 lg:self-start"
        />

        <div className="divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center gap-4 px-5 py-5 text-left text-[0.9375rem] font-medium text-foreground transition-colors hover:text-primary-text sm:px-6"
                  >
                    <span className="flex-1">{item.q}</span>
                    <ChevronDown
                      className={cn(
                        "size-5 shrink-0 text-muted-foreground transition-transform duration-200",
                        open && "rotate-180 text-primary-text",
                      )}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  inert={!open}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-200 ease-out",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground sm:px-6">
                      {fill(item.a, vars)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
