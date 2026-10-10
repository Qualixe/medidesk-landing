"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  CalendarDays,
  ChartColumn,
  FileText,
  LayoutDashboard,
  Plus,
  Printer,
  Receipt,
  Users,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

const NAV_ICONS = [LayoutDashboard, Users, CalendarDays, FileText, Receipt, ChartColumn];
/** Daily revenue (thousand ৳) — illustrative only. */
const REVENUE = [12.4, 15.1, 9.8, 16.2, 14.0, 8.5, 18.4];

const STATUS_STYLE: Record<string, string> = {
  waiting: "bg-warning/10 text-warning-text",
  consult: "bg-info/10 text-info-text",
  done: "bg-success/10 text-success-text",
};

export function AppMockup() {
  const { t } = useI18n();
  const mk = t.mock;

  return (
    <div className="relative">
      {/* soft glow behind the window */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-6 -inset-y-10 -z-10 rounded-[3rem] bg-[radial-gradient(60%_60%_at_60%_40%,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_70%)]"
      />

      <div
        role="img"
        aria-label={t.hero.mockupLabel}
        className="overflow-hidden rounded-2xl border border-border bg-card shadow-lifted"
      >
        <TitleBar title={mk.appTitle} />

        <div className="flex min-h-0">
          {/* Sidebar */}
          <div className="flex w-12 shrink-0 flex-col gap-1 bg-gradient-to-b from-[#0b7b80] to-[#0a6e73] p-2 text-white sm:w-40 sm:p-3">
            <div className="mb-3 hidden items-center gap-2 px-1.5 sm:flex">
              <LogoMark className="size-6 [&>rect]:fill-white/15" />
              <span className="text-[0.8125rem] font-semibold">MediDesk</span>
            </div>
            {mk.nav.map((label, i) => {
              const Icon = NAV_ICONS[i];
              const active = i === 0;
              return (
                <div
                  key={label}
                  className={cn(
                    "flex items-center justify-center gap-2 rounded-md px-1.5 py-1.5 text-[0.75rem] sm:justify-start",
                    active ? "bg-white/18 font-medium text-white" : "text-white/90",
                  )}
                >
                  <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                  <span className="hidden truncate sm:inline">{label}</span>
                </div>
              );
            })}
          </div>

          {/* Main */}
          <div className="min-w-0 flex-1 bg-background p-3 sm:p-4">
            <div className="flex items-center gap-3">
              <div className="min-w-0">
                <p className="truncate text-[0.8125rem] font-semibold text-foreground sm:text-sm">{mk.greeting}</p>
                <p className="truncate text-[0.6875rem] text-muted-foreground">{mk.date}</p>
              </div>
              <span className="ml-auto inline-flex h-7 shrink-0 items-center gap-1 rounded-md bg-primary-solid px-2 text-[0.6875rem] font-medium text-white">
                <Plus className="size-3" aria-hidden="true" />
                <span className="hidden sm:inline">{mk.newPatient}</span>
              </span>
            </div>

            {/* Stat cards */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              {mk.stats.map((s, i) => (
                <div key={s.label} className="rounded-lg border border-border bg-card p-2 sm:p-2.5">
                  <p className="truncate text-[0.625rem] text-muted-foreground sm:text-[0.6875rem]">{s.label}</p>
                  <p
                    className={cn(
                      "mt-0.5 text-sm font-semibold tabular-nums sm:text-base",
                      i === 2 ? "text-primary-text" : "text-foreground",
                    )}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2 grid gap-2 sm:grid-cols-[1.6fr_1fr]">
              {/* Queue */}
              <div className="rounded-lg border border-border bg-card p-2.5">
                <p className="text-[0.6875rem] font-semibold text-foreground">{mk.queueTitle}</p>
                <ul className="mt-1.5 flex flex-col">
                  {mk.queue.map((q) => (
                    <li
                      key={q.name}
                      className="flex items-center gap-2 border-t border-border py-1.5 first:border-t-0"
                    >
                      <span
                        aria-hidden="true"
                        className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[0.5625rem] font-semibold text-primary-text"
                      >
                        {q.name.replace(/^(Md\.|মো\.)\s*/, "").charAt(0)}
                      </span>
                      <span className="min-w-0 flex-1 truncate text-[0.6875rem] text-foreground">{q.name}</span>
                      <span className="hidden text-[0.625rem] tabular-nums text-muted-foreground min-[400px]:inline lg:hidden">
                        {q.time}
                      </span>
                      <span
                        className={cn(
                          "shrink-0 rounded-full px-1.5 py-0.5 text-[0.5625rem] font-medium",
                          STATUS_STYLE[q.status],
                        )}
                      >
                        {mk.status[q.status as keyof typeof mk.status]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Revenue chart */}
              <div className="hidden rounded-lg border border-border bg-card p-2.5 sm:block">
                <p className="text-[0.6875rem] font-semibold text-foreground">{mk.chartTitle}</p>
                <RevenueBars />
                <div className="mt-1 grid grid-cols-7 text-center text-[0.5625rem] text-muted-foreground">
                  {mk.days.map((d, i) => (
                    <span key={i}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingCard
        className="-bottom-7 -left-6 hidden lg:flex xl:-left-12"
        icon={<Printer className="size-4" aria-hidden="true" />}
        title={mk.floatRx}
        sub={mk.floatRxSub}
        delay={0}
      />
      <FloatingCard
        className="-bottom-6 -right-3 hidden sm:flex xl:-right-8"
        icon={<BadgeCheck className="size-4" aria-hidden="true" />}
        title={mk.floatPay}
        sub={mk.floatPaySub}
        delay={1.2}
      />
    </div>
  );
}

function TitleBar({ title }: { title: string }) {
  return (
    <div className="relative flex h-9 items-center border-b border-border bg-muted px-3">
      {/* macOS: traffic lights on the left */}
      <div className="hidden items-center gap-1.5 os-mac:flex">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
      </div>
      <p className="truncate text-[0.6875rem] font-medium text-muted-foreground os-mac:absolute os-mac:inset-x-20 os-mac:text-center">
        {title}
      </p>
      {/* Windows: minimise / maximise / close on the right */}
      <div className="-mr-3 ml-auto flex h-full items-stretch text-muted-foreground os-mac:hidden" aria-hidden="true">
        <span className="flex w-10 items-center justify-center">
          <svg viewBox="0 0 10 10" className="size-2.5"><path d="M0 5h10" stroke="currentColor" /></svg>
        </span>
        <span className="flex w-10 items-center justify-center">
          <svg viewBox="0 0 10 10" className="size-2.5"><rect x=".5" y=".5" width="9" height="9" fill="none" stroke="currentColor" /></svg>
        </span>
        <span className="flex w-10 items-center justify-center">
          <svg viewBox="0 0 10 10" className="size-2.5"><path d="M0 0l10 10M10 0 0 10" stroke="currentColor" /></svg>
        </span>
      </div>
    </div>
  );
}

/** Single-series bar chart: today's bar in full brand teal, earlier days lighter. */
function RevenueBars() {
  const max = Math.max(...REVENUE);
  const w = 140;
  const h = 64;
  const slot = w / REVENUE.length;
  const barW = slot - 6;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 h-16 w-full" preserveAspectRatio="none" aria-hidden="true">
      <line x1="0" y1={h - 0.5} x2={w} y2={h - 0.5} stroke="var(--border)" strokeWidth="1" />
      {REVENUE.map((v, i) => {
        const bh = Math.max(4, (v / max) * (h - 6));
        const x = i * slot + 3;
        const y = h - 1 - bh;
        const r = Math.min(4, barW / 2);
        const today = i === REVENUE.length - 1;
        return (
          <path
            key={i}
            d={`M${x},${h - 1} V${y + r} Q${x},${y} ${x + r},${y} H${x + barW - r} Q${x + barW},${y} ${x + barW},${y + r} V${h - 1} Z`}
            fill="var(--primary)"
            opacity={today ? 1 : 0.35}
          />
        );
      })}
    </svg>
  );
}

function FloatingCard({
  className,
  icon,
  title,
  sub,
  delay,
}: {
  className?: string;
  icon: React.ReactNode;
  title: string;
  sub: string;
  delay: number;
}) {
  const reduce = useReducedMotion();
  return (
    <m.div
      aria-hidden="true"
      className={cn(
        "absolute z-10 items-center gap-2.5 rounded-xl border border-border bg-card/95 py-2.5 pl-2.5 pr-4 shadow-lifted backdrop-blur",
        className,
      )}
      animate={reduce ? undefined : { y: [0, -6, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand-soft text-primary-text">{icon}</span>
      <span className="flex flex-col">
        <span className="text-[0.75rem] font-semibold text-foreground">{title}</span>
        <span className="text-[0.6875rem] text-muted-foreground">{sub}</span>
      </span>
    </m.div>
  );
}
