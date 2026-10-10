"use client";

import { m, useReducedMotion } from "framer-motion";
import {
  BadgeCheck,
  Bell,
  CalendarDays,
  CalendarPlus,
  ChartColumn,
  ChevronDown,
  CircleDollarSign,
  FilePlus,
  FileText,
  Hospital,
  Hourglass,
  LayoutGrid,
  Pill,
  Printer,
  Receipt,
  Search,
  Settings,
  Stethoscope,
  UserPlus,
  Users,
} from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

/** Sidebar icons, in the same order as `mock.groups[].items` in the dictionary. */
const GROUP_ICONS = [
  [LayoutGrid, Users, CalendarDays, Stethoscope, FileText],
  [Pill, Receipt, ChartColumn],
  [Settings],
];
const STAT_META = [
  { icon: Users, tint: "bg-brand-soft text-primary-text" },
  { icon: CalendarDays, tint: "bg-info/10 text-info-text" },
  { icon: Hourglass, tint: "bg-warning/10 text-warning-text" },
  { icon: CircleDollarSign, tint: "bg-success/10 text-success-text" },
];
const QUICK_META = [
  { icon: UserPlus, tint: "bg-brand-soft text-primary-text" },
  { icon: CalendarPlus, tint: "bg-info/10 text-info-text" },
  { icon: Stethoscope, tint: "bg-violet/10 text-violet-text" },
  { icon: FilePlus, tint: "bg-warning/10 text-warning-text" },
];
const STATUS_STYLE: Record<string, string> = {
  waiting: "bg-warning/10 text-warning-text",
  consult: "bg-info/10 text-info-text",
  done: "bg-success/10 text-success-text",
};
/** Daily income for the last 7 days (thousand ৳) — illustrative only. */
const INCOME = [12.4, 15.1, 9.8, 16.2, 14.0, 8.5, 18.4];

/**
 * A scaled-down replica of the MediDesk desktop dashboard, built in HTML/CSS.
 * Layout mirrors the real app: sidebar groups, top bar with search / clinic / doctor,
 * greeting, stat cards, today's appointments and quick actions.
 */
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
          <div className="flex w-11 shrink-0 flex-col border-r border-border bg-card px-1.5 py-2.5 sm:w-36 sm:px-2.5">
            <div className="mb-2 flex items-center justify-center gap-2 sm:justify-start sm:px-1">
              <LogoMark className="size-6 rounded-md" />
              <div className="hidden min-w-0 leading-tight sm:block">
                <p className="text-[0.75rem] font-bold text-foreground">MediDesk</p>
                <p className="truncate text-[0.5625rem] text-muted-foreground">{mk.suite}</p>
              </div>
            </div>
            {mk.groups.map((group, gi) => (
              <div key={group.label} className="mt-1 first:mt-0">
                <p className="mb-0.5 hidden px-1.5 text-[0.5625rem] font-semibold text-muted-foreground sm:block">
                  {group.label}
                </p>
                {group.items.map((label, i) => {
                  const Icon = GROUP_ICONS[gi][i];
                  const active = gi === 0 && i === 0;
                  return (
                    <div
                      key={label}
                      className={cn(
                        "flex items-center justify-center gap-2 rounded-md px-1.5 py-[3px] text-[0.6875rem] sm:justify-start",
                        active ? "bg-brand-soft font-medium text-primary-text" : "text-foreground/80",
                      )}
                    >
                      <Icon className="size-3.5 shrink-0" aria-hidden="true" />
                      <span className="hidden truncate sm:inline">{label}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Main column */}
          <div className="flex min-w-0 flex-1 flex-col">
            {/* Top bar */}
            <div className="flex h-10 items-center gap-2 border-b border-border bg-card px-2.5">
              <div className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[0.5625rem] text-muted-foreground sm:max-w-48">
                <Search className="size-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{mk.search}</span>
                <span className="ml-auto hidden shrink-0 rounded border border-border bg-card px-1 text-[0.5rem] md:inline">
                  Ctrl K
                </span>
              </div>
              <div className="ml-auto hidden items-center gap-1.5 rounded-md border border-border bg-background px-1.5 py-1 xl:flex">
                <Hospital className="size-3 text-primary-text" aria-hidden="true" />
                <div className="leading-tight">
                  <p className="text-[0.5625rem] font-semibold text-foreground">{mk.clinic}</p>
                  <p className="flex items-center gap-1 text-[0.5rem] text-muted-foreground">
                    <span className="size-1 rounded-full bg-success" aria-hidden="true" />
                    {mk.trial}
                  </p>
                </div>
              </div>
              <span className="hidden size-6 items-center justify-center rounded-md border border-border text-muted-foreground sm:flex">
                <Bell className="size-3" aria-hidden="true" />
              </span>
              <div className="flex items-center gap-1.5">
                <span className="relative flex size-6 items-center justify-center rounded-full bg-primary-solid text-[0.5625rem] font-semibold text-white">
                  AR
                  <span className="absolute -bottom-px -right-px size-1.5 rounded-full bg-success ring-1 ring-card" />
                </span>
                <div className="hidden leading-tight 2xl:block">
                  <p className="text-[0.5625rem] font-semibold text-foreground">{mk.doctor}</p>
                  <p className="text-[0.5rem] text-muted-foreground">{mk.degrees}</p>
                </div>
                <ChevronDown className="hidden size-3 text-muted-foreground sm:block" aria-hidden="true" />
              </div>
            </div>

            {/* Dashboard */}
            <div className="flex-1 bg-background p-2.5 sm:p-3">
              <div className="flex items-end gap-2">
                <div className="min-w-0">
                  <p className="flex items-center gap-1 text-[0.5625rem] text-muted-foreground">
                    <CalendarDays className="size-2.5" aria-hidden="true" />
                    {mk.date}
                  </p>
                  <p className="mt-0.5 truncate text-[0.8125rem] font-bold text-foreground sm:text-sm">{mk.greeting}</p>
                  <p className="hidden truncate text-[0.5625rem] text-muted-foreground sm:block">{mk.summary}</p>
                </div>
                <div className="ml-auto flex shrink-0 gap-1.5">
                  <span className="hidden h-6 items-center gap-1 rounded-md border border-border bg-card px-1.5 text-[0.5625rem] font-medium text-foreground 2xl:inline-flex">
                    <CalendarPlus className="size-3" aria-hidden="true" />
                    {mk.newAppointment}
                  </span>
                  <span className="inline-flex h-6 items-center gap-1 rounded-md bg-primary-solid px-1.5 text-[0.5625rem] font-medium text-white shadow-soft">
                    <UserPlus className="size-3" aria-hidden="true" />
                    <span className="hidden min-[400px]:inline">{mk.newPatient}</span>
                  </span>
                </div>
              </div>

              {/* Stat cards */}
              <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                {mk.stats.map((s, i) => {
                  const { icon: Icon, tint } = STAT_META[i];
                  return (
                    <div key={s.label} className="min-w-0 rounded-lg border border-border bg-card p-2">
                      <div className="flex items-start gap-1">
                        <p className="line-clamp-2 min-h-[1.5em] min-w-0 flex-1 text-[0.5625rem] leading-tight text-muted-foreground">{s.label}</p>
                        <span className={cn("flex size-4 shrink-0 items-center justify-center rounded", tint)}>
                          <Icon className="size-2.5" aria-hidden="true" />
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm font-bold tabular-nums text-foreground">{s.value}</p>
                      {i === 1 ? (
                        <div className="mt-1 h-1 overflow-hidden rounded-full bg-muted" aria-hidden="true">
                          <div className="h-full w-2/3 rounded-full bg-primary" />
                        </div>
                      ) : i === 3 ? (
                        <IncomeSpark />
                      ) : (
                        <p className="mt-0.5 truncate text-[0.5rem] text-muted-foreground">{s.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-1.5 grid gap-1.5 sm:grid-cols-[minmax(0,1fr)_9rem]">
                {/* Today's appointments */}
                <div className="min-w-0 rounded-lg border border-border bg-card p-2">
                  <div className="flex items-center gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-[0.6875rem] font-semibold text-foreground">{mk.queueTitle}</p>
                      <p className="truncate text-[0.5rem] text-muted-foreground">{mk.queueSub}</p>
                    </div>
                    <span className="ml-auto hidden h-5 shrink-0 items-center gap-1 rounded border border-border px-1.5 text-[0.5rem] text-foreground min-[400px]:inline-flex">
                      <CalendarDays className="size-2.5" aria-hidden="true" />
                      {mk.calendar}
                    </span>
                  </div>
                  <ul className="mt-1">
                    {mk.queue.map((q) => (
                      <li key={q.name} className="flex items-center gap-1.5 border-t border-border py-1.5">
                        <span
                          aria-hidden="true"
                          className="flex size-4 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[0.5rem] font-semibold text-primary-text"
                        >
                          {q.name.replace(/^(Md\.|মো\.)\s*/, "").charAt(0)}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[0.625rem] text-foreground">{q.name}</span>
                        <span className="hidden text-[0.5625rem] tabular-nums text-muted-foreground min-[400px]:inline">
                          {q.time}
                        </span>
                        <span
                          className={cn(
                            "shrink-0 rounded-full px-1.5 py-px text-[0.5rem] font-medium",
                            STATUS_STYLE[q.status],
                          )}
                        >
                          {mk.status[q.status as keyof typeof mk.status]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick actions */}
                <div className="hidden rounded-lg border border-border bg-card p-2 sm:block">
                  <p className="text-[0.6875rem] font-semibold text-foreground">{mk.quickTitle}</p>
                  <div className="mt-1.5 grid grid-cols-2 gap-1">
                    {mk.quick.map((label, i) => {
                      const { icon: Icon, tint } = QUICK_META[i];
                      return (
                        <div key={label} className="min-w-0 rounded-md border border-border p-1">
                          <span className={cn("flex size-4 items-center justify-center rounded", tint)}>
                            <Icon className="size-2.5" aria-hidden="true" />
                          </span>
                          <p className="mt-1 line-clamp-2 text-[0.5rem] font-medium leading-tight text-foreground">
                            {label}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingCard
        className="-bottom-10 -left-6 hidden lg:flex xl:-left-12"
        icon={<Printer className="size-4" aria-hidden="true" />}
        title={mk.floatRx}
        sub={mk.floatRxSub}
        delay={0}
      />
      <FloatingCard
        className="-right-3 -top-12 hidden sm:flex xl:-right-8"
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
    <div className="relative flex h-8 items-center border-b border-border bg-muted px-3">
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

/** Single-series sparkline of the last 7 days' income: today in full brand blue, earlier days lighter. */
function IncomeSpark() {
  const max = Math.max(...INCOME);
  const w = 70;
  const h = 14;
  const slot = w / INCOME.length;
  const barW = slot - 3;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="mt-1 h-3.5 w-full" preserveAspectRatio="none" aria-hidden="true">
      {INCOME.map((v, i) => {
        const bh = Math.max(2, (v / max) * h);
        return (
          <rect
            key={i}
            x={i * slot + 1.5}
            y={h - bh}
            width={barW}
            height={bh}
            rx={1.5}
            fill="var(--primary)"
            opacity={i === INCOME.length - 1 ? 1 : 0.35}
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
