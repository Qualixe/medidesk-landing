"use client";

import {
  CalendarDays,
  ChartColumn,
  CircleDollarSign,
  FileText,
  Hourglass,
  LayoutGrid,
  Pill,
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
/** Which `mock.stats` cards the mockup shows: patients, appointments, income. */
const SHOWN_STATS = [0, 1, 3];
const STATUS_STYLE: Record<string, string> = {
  waiting: "bg-warning/10 text-warning-text",
  consult: "bg-info/10 text-info-text",
  done: "bg-success/10 text-success-text",
};
/** Daily income for the last 7 days (thousand ৳) — illustrative only. */
const INCOME = [12.4, 15.1, 9.8, 16.2, 14.0, 8.5, 18.4];

/**
 * A simplified replica of the MediDesk desktop dashboard, built in HTML/CSS:
 * sidebar, search, greeting, three stat cards and today's appointments.
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
          <div className="flex w-11 shrink-0 flex-col border-r border-border bg-card px-1.5 py-3 sm:w-36 sm:px-2.5">
            <div className="mb-3 flex items-center justify-center gap-2 sm:justify-start sm:px-1">
              <LogoMark className="size-6 rounded-md" />
              <div className="hidden min-w-0 leading-tight sm:block">
                <p className="text-[0.75rem] font-bold text-foreground">MediDesk</p>
                <p className="truncate text-[0.5625rem] text-muted-foreground">{mk.suite}</p>
              </div>
            </div>
            {mk.groups.map((group, gi) => (
              <div key={group.label} className="mt-1.5 first:mt-0">
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
            {/* Top bar: search + doctor */}
            <div className="flex h-10 items-center gap-3 border-b border-border bg-card px-3">
              <div className="flex h-6 min-w-0 flex-1 items-center gap-1.5 rounded-md border border-border bg-background px-2 text-[0.5625rem] text-muted-foreground sm:max-w-56">
                <Search className="size-3 shrink-0" aria-hidden="true" />
                <span className="truncate">{mk.search}</span>
              </div>
              <span className="ml-auto flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-solid text-[0.5625rem] font-semibold text-white">
                AR
              </span>
            </div>

            {/* Dashboard */}
            <div className="flex-1 bg-background p-3 sm:p-4">
              <div className="flex items-end gap-2">
                <div className="min-w-0">
                  <p className="text-[0.5625rem] text-muted-foreground">{mk.date}</p>
                  <p className="mt-0.5 truncate text-[0.8125rem] font-bold text-foreground sm:text-sm">{mk.greeting}</p>
                </div>
                <span className="ml-auto inline-flex h-6 shrink-0 items-center gap-1 rounded-md bg-primary-solid px-2 text-[0.5625rem] font-medium text-white shadow-soft">
                  <UserPlus className="size-3" aria-hidden="true" />
                  <span className="hidden min-[400px]:inline">{mk.newPatient}</span>
                </span>
              </div>

              {/* Stat cards */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {SHOWN_STATS.map((i) => {
                  const s = mk.stats[i];
                  const { icon: Icon, tint } = STAT_META[i];
                  return (
                    <div key={s.label} className="min-w-0 rounded-lg border border-border bg-card p-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("flex size-4 shrink-0 items-center justify-center rounded", tint)}>
                          <Icon className="size-2.5" aria-hidden="true" />
                        </span>
                        <p className="min-w-0 truncate text-[0.5625rem] text-muted-foreground">{s.label}</p>
                      </div>
                      <p className="mt-1 text-sm font-bold tabular-nums text-foreground sm:text-base">{s.value}</p>
                      {i === 3 ? (
                        <IncomeSpark />
                      ) : (
                        <p className="mt-0.5 truncate text-[0.5rem] text-muted-foreground">{s.note}</p>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Today's appointments */}
              <div className="mt-2 rounded-lg border border-border bg-card p-2.5">
                <p className="text-[0.6875rem] font-semibold text-foreground">{mk.queueTitle}</p>
                <ul className="mt-1">
                  {mk.queue.map((q) => (
                    <li key={q.name} className="flex items-center gap-2 border-t border-border py-1.5">
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
                        className={cn("shrink-0 rounded-full px-1.5 py-px text-[0.5rem] font-medium", STATUS_STYLE[q.status])}
                      >
                        {mk.status[q.status as keyof typeof mk.status]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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
