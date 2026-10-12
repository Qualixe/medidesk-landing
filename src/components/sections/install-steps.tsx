"use client";

import Image, { type StaticImageData } from "next/image";
import step1 from "@/assets/install/step-1-more-info.png";
import step2 from "@/assets/install/step-2-run-anyway.png";
import step3 from "@/assets/install/step-3-only-for-me.png";
import step4 from "@/assets/install/step-4-install.png";
import { Reveal } from "@/components/motion";
import { Container, Section, SectionHeader } from "@/components/section";
import { useI18n } from "@/i18n";

/** Screenshots, in the same order as `install.steps` in the dictionary. */
const SCREENSHOTS: StaticImageData[] = [step1, step2, step3, step4];

/** Step-by-step Windows install guide with real screenshots of the installer (2 × 2 grid). */
export function InstallSteps() {
  const { t, num } = useI18n();

  return (
    <Section id="install" aria-labelledby="install-title">
      <Container>
        <SectionHeader
          id="install-title"
          eyebrow={t.install.eyebrow}
          title={t.install.title}
          subtitle={t.install.subtitle}
        />

        <ol className="mx-auto mt-14 grid max-w-6xl gap-6 lg:mt-16 lg:grid-cols-2 lg:gap-8">
          {t.install.steps.map((step, i) => (
            <Reveal
              as="li"
              key={step.title}
              delay={(i % 2) * 0.06}
              className="flex flex-col rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-5"
            >
              <div className="flex aspect-[53/50] items-center justify-center overflow-hidden rounded-xl border border-border bg-muted p-3 sm:p-5">
                <Image
                  src={SCREENSHOTS[i]}
                  alt={step.alt}
                  sizes="(min-width: 1024px) 540px, 92vw"
                  quality={90}
                  className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-lifted"
                />
              </div>
              <div className="mt-5 flex gap-3 px-1 pb-1">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary-solid text-sm font-semibold text-white">
                  {num(i + 1)}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground sm:text-base">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
