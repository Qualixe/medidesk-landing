"use client";

import { LogoMark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion";
import { Container, Section, SectionHeader } from "@/components/section";
import { useI18n } from "@/i18n";

export function PrescriptionShowcase() {
  const { t, num } = useI18n();

  return (
    <Section aria-labelledby="rx-title" className="overflow-x-clip bg-section">
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

        <Reveal className="min-w-0">
          <PrescriptionPaper />
        </Reveal>
      </Container>
    </Section>
  );
}

/**
 * A printed prescription, laid out like MediDesk's real print: clinic letterhead,
 * boxed patient row, diagnosis/investigations column, ℞ list, advice box, signature and footer.
 * Always "paper white" with fixed ink colours, in both themes.
 */
function PrescriptionPaper() {
  const { t, num } = useI18n();
  const p = t.rx.paper;

  return (
    <div className="relative mx-auto max-w-[580px]">
      {/* sheet underneath */}
      <div aria-hidden="true" className="absolute inset-0 translate-x-2 translate-y-3 rotate-[1.5deg] rounded-xl bg-white/70 shadow-soft ring-1 ring-black/5 dark:bg-white/10" />
      <figure
        aria-label={p.label}
        className="relative flex flex-col rounded-xl bg-white px-5 pb-4 pt-5 text-[#0b1b36] shadow-lifted ring-1 ring-black/5 sm:px-7 sm:pt-7"
      >
        {/* Letterhead */}
        <header className="flex flex-wrap items-start gap-3 border-b-2 border-[#0c7cfc] pb-3">
          <LogoMark className="size-10 rounded-lg sm:size-11" />
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold leading-tight text-[#0149cf] sm:text-lg">{p.clinic}</p>
            <p className="text-[0.625rem] text-[#5b6b85]">{p.address}</p>
            <p className="text-[0.625rem] text-[#5b6b85]">{p.phone}</p>
          </div>
          <div className="w-full sm:w-auto sm:text-right">
            <p className="text-[0.8125rem] font-bold leading-tight sm:text-sm">{p.doctor}</p>
            <p className="text-[0.625rem] text-[#5b6b85]">{p.degrees}</p>
            <p className="text-[0.625rem] text-[#5b6b85]">{p.reg}</p>
          </div>
        </header>

        {/* Patient row */}
        <dl className="mt-3 grid grid-cols-2 gap-y-2 rounded-lg border border-[#e2e9f2] bg-[#f8fafd] px-3 py-2 text-[0.6875rem] sm:grid-cols-[1.6fr_1.2fr_1fr_1fr] sm:divide-x sm:divide-[#e2e9f2] sm:px-0">
          {[
            [p.patientLabel, p.patient],
            [p.ageSexLabel, p.ageSex],
            [p.idLabel, p.id],
            [p.dateLabel, p.date],
          ].map(([k, v]) => (
            <div key={k} className="min-w-0 sm:px-3">
              <dt className="text-[0.5625rem] font-medium text-[#0149cf]">{k}</dt>
              <dd className="truncate font-semibold">{v}</dd>
            </div>
          ))}
        </dl>

        {/* Body */}
        <div className="mt-4 grid min-h-[300px] grid-cols-[minmax(0,0.8fr)_minmax(0,1.9fr)] gap-4 sm:gap-6">
          <div className="flex flex-col justify-between gap-6 border-r border-[#e2e9f2] pr-3 text-[0.6875rem] sm:pr-5">
            <PaperList title={p.dxTitle} items={p.dx} />
            <PaperList title={p.invTitle} items={p.inv} bullets />
          </div>

          <div className="flex min-w-0 flex-col">
            <div className="flex items-start justify-between gap-2">
              <p className="font-serif text-3xl font-bold leading-none text-[#0149cf]" aria-label="Rx">
                ℞
              </p>
              <p className="truncate pt-1 text-[0.5625rem] text-[#5b6b85]">{p.rxNo}</p>
            </div>
            <ol className="mt-3 flex flex-col gap-2.5">
              {p.meds.map((med, i) => (
                <li key={med.name} className="text-[0.75rem]">
                  <p className="font-bold">
                    {num(i + 1)}. {med.name}{" "}
                    {med.strength && <span className="font-medium text-[#5b6b85]">{med.strength}</span>}
                  </p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-x-1.5 pl-3.5 text-[0.6875rem]">
                    {[med.dose, med.freq, med.duration, med.qty].filter(Boolean).map((part, j) => (
                      <span key={j} className="inline-flex items-center gap-1.5">
                        {j > 0 && <span aria-hidden="true" className="h-px w-2.5 bg-[#c3cedd]" />}
                        <span className={j === 0 ? "font-semibold tabular-nums" : undefined}>{part}</span>
                      </span>
                    ))}
                  </p>
                  <p className="pl-3.5 text-[0.625rem] italic text-[#5b6b85]">{med.note}</p>
                </li>
              ))}
            </ol>

            <div className="mt-auto pt-5">
              <div className="rounded-lg border border-[#e2e9f2] px-3 py-2">
                <p className="text-[0.5625rem] font-semibold text-[#0149cf]">{p.adviceTitle}</p>
                <p className="mt-0.5 text-[0.6875rem] leading-relaxed">{p.advice}</p>
              </div>
              <p className="mt-2 text-[0.6875rem]">
                <span className="font-bold">{p.nextVisitLabel}</span> {p.nextVisit}
              </p>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="mt-6 flex items-end justify-between gap-4">
          <p className="text-[0.625rem] text-[#5b6b85]">{p.bringNote}</p>
          <div className="shrink-0 text-center">
            <svg viewBox="0 0 120 32" className="mx-auto h-6 w-24 text-[#1e3a5f]" aria-hidden="true">
              <path
                d="M4 22c8-14 14-16 14-8s-4 12 2 6 10-14 14-6 4 8 10 2 8-10 12-4 6 6 12 0 10-6 14-2 8 4 14 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            <p className="min-w-32 border-t border-[#94a3b8] pt-1 text-[0.6875rem] font-bold">{p.doctor}</p>
            <p className="text-[0.5625rem] text-[#5b6b85]">{p.degrees}</p>
          </div>
        </div>

        {/* Footer strip */}
        <div className="mt-4 flex flex-col gap-0.5 border-t border-[#e2e9f2] pt-2 text-[0.5625rem] text-[#5b6b85] sm:flex-row sm:justify-between sm:gap-3">
          <span className="truncate">{p.footerLeft}</span>
          <span className="truncate">{p.footerRight}</span>
        </div>
      </figure>
    </div>
  );
}

function PaperList({ title, items, bullets = false }: { title: string; items: string[]; bullets?: boolean }) {
  return (
    <div>
      <p className="text-[0.5625rem] font-semibold text-[#0149cf]">{title}</p>
      <ul className="mt-1 flex flex-col gap-0.5">
        {items.map((i) => (
          <li key={i}>
            {bullets && <span aria-hidden="true" className="mb-0.5 mr-2 inline-block size-1 rounded-full bg-[#94a3b8]" />}
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
