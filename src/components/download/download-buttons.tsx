"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Monitor } from "lucide-react";
import { AppleIcon, WindowsIcon } from "@/components/brand/os-icons";
import { buttonVariants } from "@/components/ui/button";
import { downloads } from "@/config/downloads";
import { pricing } from "@/config/pricing";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { NotifyForm } from "./notify-form";

type Tone = "default" | "inverse";

interface DownloadButtonsProps {
  tone?: Tone;
  align?: "start" | "center";
  /** Show version, sizes, requirements and the trial line. */
  showMeta?: boolean;
  /** Always stack the buttons full-width (for narrow columns). */
  stack?: boolean;
  className?: string;
}

/**
 * OS-aware download CTA. Both layouts are rendered; CSS picks one using the
 * `data-os` attribute the boot script sets on <html> before first paint,
 * so there is no flash and no hydration mismatch. Without JS, Windows is primary.
 */
export function DownloadButtons({
  tone = "default",
  align = "start",
  showMeta = true,
  stack = false,
  className,
}: DownloadButtonsProps) {
  const { t } = useI18n();
  const inverse = tone === "inverse";
  const center = align === "center";

  const row = cn(
    "flex flex-col items-stretch gap-3",
    !stack && "sm:flex-row sm:flex-wrap sm:items-start",
    !stack && center && "sm:justify-center",
  );
  const width = stack ? "w-full" : "w-full sm:w-auto";

  return (
    <div className={cn("flex flex-col gap-4", center && "items-center text-center", className)}>
      <p
        className={cn(
          "hidden max-w-md items-start gap-2 rounded-lg border px-3 py-2 text-left text-sm mobile:flex",
          inverse ? "border-transparent bg-white text-[#334155]" : "border-border bg-card text-muted-foreground",
        )}
      >
        <Monitor className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {t.download.mobileNote}
      </p>

      {/* Windows (and unknown) visitors */}
      <div className={cn(row, "os-mac:hidden")}>
        <WindowsButton tone={tone} width={width} primary />
        <MacButton tone={tone} width={width} primary={false} />
      </div>

      {/* macOS visitors */}
      <div className={cn(row, "hidden os-mac:flex")}>
        <MacButton tone={tone} width={width} primary />
        <WindowsButton tone={tone} width={width} primary={false} />
      </div>

      {showMeta && <DownloadMeta tone={tone} center={center} />}
    </div>
  );
}

function WindowsButton({ tone, primary, width }: { tone: Tone; primary: boolean; width: string }) {
  const { t } = useI18n();
  return (
    <a
      href={downloads.windows.url}
      className={buttonVariants({
        variant: buttonVariant(tone, primary),
        size: primary ? "lg" : "md",
        className: width,
      })}
    >
      <WindowsIcon />
      {t.download.forWindows}
    </a>
  );
}

function MacButton({ tone, primary, width }: { tone: Tone; primary: boolean; width: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  if (downloads.mac.available) {
    return (
      <a
        href={downloads.mac.url}
        className={buttonVariants({
          variant: buttonVariant(tone, primary),
          size: primary ? "lg" : "md",
          className: width,
        })}
      >
        <AppleIcon />
        {t.download.forMac}
      </a>
    );
  }

  // Not released yet: never a dead link. Mac visitors see the notify field straight away;
  // others can reveal it from the secondary button.
  if (primary) {
    return (
      <div className={cn("flex flex-col gap-3", width)}>
        <span
          className={cn(
            buttonVariants({ variant: tone === "inverse" ? "inverse-outline" : "secondary", size: "lg" }),
            "pointer-events-none cursor-default",
          )}
        >
          <AppleIcon />
          {t.download.macSoon}
        </span>
        <NotifyPanel tone={tone} />
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-3", width)}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={buttonVariants({
          variant: tone === "inverse" ? "inverse-outline" : "secondary",
          size: "md",
          className: "w-full",
        })}
      >
        <AppleIcon />
        {t.download.macSoon}
      </button>
      {open && <NotifyPanel tone={tone} />}
    </div>
  );
}

/** On the teal CTA band the form sits on a white panel so its small text stays readable. */
function NotifyPanel({ tone }: { tone: Tone }) {
  if (tone === "inverse") {
    return (
      <div className="rounded-xl bg-card p-3 text-left shadow-lifted">
        <NotifyForm />
      </div>
    );
  }
  return <NotifyForm className="text-left" />;
}

function buttonVariant(tone: Tone, primary: boolean) {
  if (tone === "inverse") return primary ? "inverse" : "inverse-outline";
  return primary ? "primary" : "secondary";
}

function DownloadMeta({ tone, center }: { tone: Tone; center: boolean }) {
  const { t, num, date } = useI18n();
  const inverse = tone === "inverse";
  const muted = inverse ? "text-white/85" : "text-muted-foreground";

  return (
    <div className={cn("flex flex-col gap-1.5 text-[0.8125rem]", muted, center && "items-center")}>
      <p className={cn("flex flex-wrap gap-x-2 gap-y-1", center && "justify-center")}>
        <span>{fill(t.download.version, { version: num(downloads.version) })}</span>
        <span aria-hidden="true">·</span>
        <span>{fill(t.download.released, { date: date(downloads.releaseDate) })}</span>
        <span aria-hidden="true">·</span>
        <Link
          href="/download"
          className={cn(
            "underline decoration-current/30 underline-offset-[3px] hover:decoration-current",
            inverse ? "text-white" : "text-primary-text",
          )}
        >
          {t.download.allOptions}
        </Link>
      </p>
      <p className={cn("flex flex-wrap gap-x-4 gap-y-1", center && "justify-center")}>
        <span className="inline-flex items-center gap-1.5">
          <WindowsIcon className="size-3.5" />
          {t.download.reqWindows} · {num(downloads.windows.size)}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <AppleIcon className="size-3.5" />
          {t.download.reqMac}
          {downloads.mac.available && <> · {num(downloads.mac.size)}</>}
        </span>
      </p>
      <p className={cn("inline-flex items-center gap-1.5 font-medium", inverse ? "text-white" : "text-foreground")}>
        <Check className={cn("size-4", inverse ? "text-white" : "text-primary")} aria-hidden="true" />
        {fill(t.download.trial, { days: num(pricing.trialDays) })}
      </p>
    </div>
  );
}
