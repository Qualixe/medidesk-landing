"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/motion";
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
      <Container className="flex flex-col gap-10 lg:gap-12">
        <Reveal>
          <SectionHeader id="faq-title" eyebrow={t.faq.eyebrow} title={t.faq.title} />
        </Reveal>

        <div className="mx-auto w-full max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card shadow-soft">
          {t.faq.items.map((item, i) => {
            const open = openIndex === i;
            const btnId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <Reveal key={item.q} delay={i * 0.05}>
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
                        "size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out",
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
                    "grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <p
                      className={cn(
                        "px-5 pb-5 text-sm leading-relaxed text-muted-foreground transition-[opacity,transform] duration-300 ease-out sm:px-6",
                        open ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0",
                      )}
                    >
                      {fill(item.a, vars)}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
