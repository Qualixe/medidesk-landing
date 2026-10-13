"use client";

import { Check, Monitor } from "lucide-react";
import { AppleIcon, WindowsIcon } from "@/components/brand/os-icons";
import { buttonVariants } from "@/components/ui/button";
import { downloads } from "@/config/downloads";
import { pricing } from "@/config/pricing";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

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
  const macReady = downloads.mac.available;

  // Two equal columns (each as wide as the widest button), so both buttons are always the same size.
  const row = cn("grid items-start gap-3", !stack && "sm:w-fit sm:grid-cols-2");
  const width = "w-full";

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

      {/* Windows (and unknown) visitors — and everyone, while the Mac build isn't out */}
      <div className={cn(row, macReady && "os-mac:hidden")}>
        <WindowsButton tone={tone} width={width} primary />
        <MacButton tone={tone} width={width} primary={false} />
      </div>

      {/* macOS visitors, once there is a Mac build to download */}
      {macReady && (
        <div className={cn(row, "hidden os-mac:grid")}>
          <MacButton tone={tone} width={width} primary />
          <WindowsButton tone={tone} width={width} primary={false} />
        </div>
      )}

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
        size: "lg",
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

  if (downloads.mac.available) {
    return (
      <a
        href={downloads.mac.url}
        className={buttonVariants({
          variant: buttonVariant(tone, primary),
          size: "lg",
          className: width,
        })}
      >
        <AppleIcon />
        {t.download.forMac}
      </a>
    );
  }

  // Not released yet: a label, not a link, so there is never a dead download.
  return (
    <span
      className={cn(
        buttonVariants({ variant: tone === "inverse" ? "inverse-outline" : "secondary", size: "lg" }),
        "pointer-events-none cursor-default",
        width,
      )}
    >
      <AppleIcon />
      {t.download.macSoon}
    </span>
  );
}

function buttonVariant(tone: Tone, primary: boolean) {
  if (tone === "inverse") return primary ? "inverse" : "inverse-outline";
  return primary ? "primary" : "secondary";
}

function DownloadMeta({ tone, center }: { tone: Tone; center: boolean }) {
  const { t, num } = useI18n();
  const inverse = tone === "inverse";
  const muted = inverse ? "text-white/85" : "text-muted-foreground";

  return (
    <div className={cn("flex flex-col gap-1.5 text-[0.8125rem]", muted, center && "items-center")}>
      <p className={cn("inline-flex items-center gap-1.5 font-medium", inverse ? "text-white" : "text-foreground")}>
        <Check className={cn("size-4", inverse ? "text-white" : "text-primary")} aria-hidden="true" />
        {fill(t.download.trial, { days: num(pricing.trialDays) })}
      </p>
    </div>
  );
}
