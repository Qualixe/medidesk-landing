"use client";

import { Reveal } from "@/components/motion";
import { Container, Section, SectionHeader } from "@/components/section";
import { useI18n } from "@/i18n";

export function PrescriptionShowcase() {
  const { t, num } = useI18n();

  return (
    <Section aria-labelledby="rx-title" className="overflow-x-clip bg-card dark:bg-[#0d1924]">
      <Container className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeader
            id="rx-title"
            align="start"
            eyebrow={t.rx.eyebrow}
            title={t.rx.title}
            subtitle={t.rx.subtitle}
          />
          <ol className="mt-10 flex flex-col gap-7">
            {t.rx.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="flex gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary-solid text-sm font-semibold text-white shadow-soft">
                  {num(i + 1)}
                </span>
                <div className="pt-1">
                  <h3 className="text-base font-semibold text-foreground">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal>
          <PrescriptionPaper />
        </Reveal>
      </Container>
    </Section>
  );
}

/** A printed prescription. Always "paper white", with fixed ink colours, in both themes. */
function PrescriptionPaper() {
  const { t, num } = useI18n();
  const p = t.rx.paper;

  return (
    <div className="relative mx-auto max-w-[560px]">
      {/* sheets underneath */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-3 rotate-[1.5deg] rounded-xl bg-white/70 shadow-soft ring-1 ring-black/5 dark:bg-white/10" />
      <figure
        aria-label={p.label}
        className="relative rounded-xl bg-white p-5 text-[#0f1d2e] shadow-lifted ring-1 ring-black/5 sm:p-8"
      >
        {/* Letterhead */}
        <header className="flex flex-col gap-3 border-b-2 border-[#0e8a8f] pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-bold text-[#0a6e73] sm:text-xl">{p.doctor}</p>
            <p className="text-[0.75rem] font-medium text-[#334155]">{p.degrees}</p>
            <p className="text-[0.75rem] text-[#5b697e]">{p.specialty}</p>
          </div>
          <div className="text-[0.6875rem] leading-relaxed text-[#5b697e] sm:text-right">
            <p>{p.chamber}</p>
            <p>{p.hours}</p>
          </div>
        </header>

        {/* Patient line */}
        <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 border-b border-dashed border-[#cfd6e0] pb-3 text-[0.75rem] sm:grid-cols-[2fr_1fr_1fr_1.3fr]">
          {[
            [p.patientLabel, p.patient],
            [p.ageLabel, p.age],
            [p.sexLabel, p.sex],
            [p.dateLabel, p.date],
          ].map(([k, v]) => (
            <div key={k} className="flex gap-1.5">
              <dt className="text-[#5b697e]">{k}:</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Body */}
        <div className="mt-4 grid grid-cols-[minmax(0,0.85fr)_minmax(0,1.6fr)] gap-4 sm:gap-6">
          <div className="flex flex-col gap-3 border-r border-[#e6eaf0] pr-3 text-[0.6875rem] sm:pr-5 sm:text-[0.75rem]">
            <PaperList title={p.ccTitle} items={p.cc} />
            <PaperList title={p.oeTitle} items={p.oe} />
            <PaperList title={p.dxTitle} items={p.dx} />
            <PaperList title={p.invTitle} items={p.inv} />
          </div>

          <div className="min-w-0">
            <p className="font-serif text-3xl font-bold leading-none text-[#0a6e73]" aria-label="Rx">
              ℞
            </p>
            <ol className="mt-3 flex flex-col gap-3">
              {p.meds.map((med, i) => (
                <li key={med.name} className="text-[0.75rem] sm:text-[0.8125rem]">
                  <p className="font-semibold">
                    <span className="text-[#5b697e]">{num(i + 1)}. </span>
                    {med.name}
                  </p>
                  <p className="mt-0.5 flex flex-wrap gap-x-2 pl-3.5 text-[#334155]">
                    <span className="font-medium tabular-nums">{med.dose}</span>
                    <span className="text-[#5b697e]">— {med.note}</span>
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Advice + signature */}
        <div className="mt-5 flex flex-col gap-5 border-t border-[#e6eaf0] pt-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="text-[0.75rem]">
            <p className="font-semibold">{p.adviceTitle}</p>
            <ul className="mt-1 list-disc pl-4 text-[#334155] marker:text-[#0e8a8f]">
              {p.advice.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <p className="mt-2 font-medium text-[#0a6e73]">{p.followUp}</p>
          </div>
          <div className="text-center sm:min-w-36">
            <svg viewBox="0 0 120 32" className="mx-auto h-7 w-28 text-[#1e3a5f]" aria-hidden="true">
              <path
                d="M4 22c8-14 14-16 14-8s-4 12 2 6 10-14 14-6 4 8 10 2 8-10 12-4 6 6 12 0 10-6 14-2 8 4 14 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <p className="border-t border-[#94a3b8] pt-1 text-[0.6875rem] text-[#5b697e]">{p.signature}</p>
          </div>
        </div>
      </figure>
    </div>
  );
}

function PaperList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="font-semibold text-[#0f1d2e]">{title}</p>
      <ul className="mt-0.5 text-[#334155]">
        {items.map((i) => (
          <li key={i}>• {i}</li>
        ))}
      </ul>
    </div>
  );
}
