"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate, m, useInView, useMotionValue, useTransform } from "framer-motion";
import { Download, Hospital, Stethoscope, Users } from "lucide-react";
import { Container } from "@/components/section";
import { stats, type Stat } from "@/config/stats";
import { useI18n } from "@/i18n";

const ICONS: Record<Stat["key"], typeof Users> = {
  doctors: Stethoscope,
  downloads: Download,
  patients: Users,
  clinics: Hospital,
};

/** Ribbon of headline numbers under the hero. Figures come from src/config/stats.ts. */
export function StatsRibbon() {
  const { t } = useI18n();

  return (
    <section aria-label={t.stats.label} className="border-y border-border bg-card">
      <Container>
        <dl className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const Icon = ICONS[stat.key];
            return (
              <div
                key={stat.key}
                className={[
                  "flex flex-col items-center gap-1 px-4 py-7 text-center sm:py-9",
                  // dividers: between columns, and between the two rows on small screens
                  i % 2 === 1 ? "border-l border-border" : "",
                  i >= 2 ? "border-t border-border lg:border-t-0" : "",
                  i === 2 ? "lg:border-l" : "",
                ].join(" ")}
              >
                <dt className="order-2 flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <Icon className="size-4 text-primary-text" aria-hidden="true" />
                  {t.stats.labels[stat.key]}
                </dt>
                <dd className="order-1 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                  <CountUp value={stat.value} suffix={stat.suffix} delay={i * 0.12} />
                </dd>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * The visitor's reduced-motion setting. It is `false` while the page hydrates and
 * switches right after, so the server HTML and the first client render always agree.
 */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
}

/**
 * Counts from 0 to `value` once, when it scrolls into view.
 * - The final number is what's in the HTML (and what screen readers get).
 * - "pending" numbers are hidden by CSS when scripts run, so there's no flash of the final value.
 * - With prefers-reduced-motion the final number is shown straight away.
 */
function CountUp({ value, suffix = "", delay = 0 }: { value: number; suffix?: string; delay?: number }) {
  const { num } = useI18n();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -40px 0px" });
  const reduce = usePrefersReducedMotion();
  const [done, setDone] = useState(false);

  const count = useMotionValue(0);
  const text = useTransform(count, (v) => `${num(Math.round(v))}${suffix}`);

  const finished = done || reduce;
  const counting = inView && !finished;

  useEffect(() => {
    if (!counting) return;
    const controls = animate(count, value, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onComplete: () => setDone(true),
    });
    return () => controls.stop();
  }, [counting, count, value, delay]);

  const final = `${num(value)}${suffix}`;

  return (
    <span ref={ref} className="inline-block">
      <span className="sr-only">{final}</span>
      <span
        aria-hidden="true"
        data-countup={finished ? "done" : counting ? "counting" : "pending"}
        className="text-brand-gradient"
      >
        {counting ? <m.span>{text}</m.span> : final}
      </span>
    </span>
  );
}
