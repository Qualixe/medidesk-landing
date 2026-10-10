"use client";

import { useState } from "react";
import { ArrowRight, Check, Copy, Info, ShieldAlert } from "lucide-react";
import { AppleIcon, WindowsIcon } from "@/components/brand/os-icons";
import { buttonVariants } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/section";
import { downloads, type PlatformDownload } from "@/config/downloads";
import { pricing } from "@/config/pricing";
import { site, whatsappUrl } from "@/config/site";
import { fill, useI18n } from "@/i18n";
import { cn } from "@/lib/utils";
import { NotifyForm } from "./notify-form";

export function DownloadPage() {
  const { t, num, date } = useI18n();
  const d = t.downloadPage;
  const macReady = downloads.mac.available;

  return (
    <div className="relative isolate">
      <div
        aria-hidden="true"
        className="bg-grid absolute inset-x-0 top-0 -z-10 h-[420px] [mask-image:radial-gradient(70%_80%_at_50%_0%,#000_30%,transparent)]"
      />
      <Container className="py-16 sm:py-20">
        <header className="mx-auto max-w-2xl text-center">
          <Eyebrow>{fill(d.latest, { version: num(downloads.version), date: date(downloads.releaseDate) })}</Eyebrow>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            {d.title}
          </h1>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            {fill(d.subtitle, { days: num(pricing.trialDays) })}
          </p>
          <p className="mt-4 hidden text-sm text-muted-foreground mobile:block">{t.download.mobileNote}</p>
          <a
            href={downloads.releaseNotesUrl}
            className="mt-4 inline-flex items-center gap-1 rounded-sm text-sm font-medium text-primary-text hover:underline"
          >
            {d.releaseNotes}
            <ArrowRight className="size-4" aria-hidden="true" />
          </a>
        </header>

        {/* Platform cards — the visitor's OS is shown first */}
        <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2 [&>*]:min-w-0">
          <PlatformCard
            icon={<WindowsIcon className="size-6" />}
            name="Windows"
            reqs={d.winReqs}
            info={downloads.windows}
            action={
              <a href={downloads.windows.url} className={buttonVariants({ size: "lg", className: "w-full" })}>
                <WindowsIcon />
                {t.download.forWindows}
              </a>
            }
          />
          <PlatformCard
            className="os-mac:order-first"
            icon={<AppleIcon className="size-6" />}
            name="macOS"
            reqs={d.macReqs}
            info={downloads.mac}
            available={macReady}
            action={
              macReady ? (
                <a href={downloads.mac.url} className={buttonVariants({ size: "lg", className: "w-full" })}>
                  <AppleIcon />
                  {t.download.forMac}
                </a>
              ) : (
                <div className="flex flex-col gap-4">
                  <span
                    className={cn(
                      buttonVariants({ variant: "secondary", size: "lg" }),
                      "pointer-events-none w-full cursor-default",
                    )}
                  >
                    <AppleIcon />
                    {t.download.macSoon}
                  </span>
                  <NotifyForm className="max-w-none" />
                </div>
              )
            }
          />
        </div>

        {/* Install steps */}
        <section aria-labelledby="install-title" className="mx-auto mt-20 max-w-4xl">
          <h2 id="install-title" className="text-2xl font-semibold tracking-tight text-foreground">
            {d.installTitle}
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2 [&>*]:min-w-0">
            <InstallSteps
              icon={<WindowsIcon className="size-5" />}
              title="Windows"
              steps={d.winSteps}
              note={d.winNote}
              noteTone="warning"
            />
            <InstallSteps
              className="os-mac:order-first"
              icon={<AppleIcon className="size-5" />}
              title="macOS"
              steps={d.macSteps}
              note={d.macNote}
              noteTone="info"
            />
          </div>
        </section>

        {/* Verify */}
        <section aria-labelledby="verify-title" className="mx-auto mt-16 max-w-4xl rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8">
          <h2 id="verify-title" className="text-lg font-semibold text-foreground">
            {d.verifyTitle}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{d.verifyBody}</p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 [&>*]:min-w-0">
            <div>
              <p className="text-[0.8125rem] font-medium text-foreground">{d.verifyWindows}</p>
              <Code>{`Get-FileHash .\\${downloads.windows.fileName} -Algorithm SHA256`}</Code>
            </div>
            <div>
              <p className="text-[0.8125rem] font-medium text-foreground">{d.verifyMac}</p>
              <Code>{`shasum -a 256 ~/Downloads/${downloads.mac.fileName}`}</Code>
            </div>
          </div>
        </section>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground">
          {(() => {
            // Render the help line with real links in place of the placeholders.
            const parts = d.help.split(/(\{email\}|\{whatsapp\})/);
            return parts.map((part, i) =>
              part === "{email}" ? (
                <a key={i} href={`mailto:${site.supportEmail}`} className="font-medium text-primary-text hover:underline">
                  {site.supportEmail}
                </a>
              ) : part === "{whatsapp}" ? (
                <a key={i} href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-text hover:underline">
                  {num(site.whatsappDisplay)}
                </a>
              ) : (
                <span key={i}>{part}</span>
              ),
            );
          })()}
        </p>
      </Container>
    </div>
  );
}

function PlatformCard({
  icon,
  name,
  reqs,
  info,
  action,
  available = true,
  className,
}: {
  icon: React.ReactNode;
  name: string;
  reqs: string[];
  info: PlatformDownload;
  action: React.ReactNode;
  available?: boolean;
  className?: string;
}) {
  const { t, num } = useI18n();
  const d = t.downloadPage;

  return (
    <article className={cn("flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-foreground">{icon}</span>
        <div>
          <h2 className="text-lg font-semibold text-foreground">{name}</h2>
          <p className="text-[0.8125rem] text-muted-foreground">
            {fill(t.download.version, { version: num(downloads.version) })}
            {available && <> · {num(info.size)}</>}
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-[0.8125rem] font-semibold text-foreground">{d.requirements}</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {reqs.map((r) => (
            <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-7">{action}</div>

      {available && (
        <dl className="mt-6 grid gap-2 border-t border-border pt-5 text-[0.8125rem]">
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-muted-foreground">{d.file}</dt>
            <dd className="min-w-0 break-all font-mono text-[0.75rem] text-foreground">{info.fileName}</dd>
          </div>
          <div className="flex items-start gap-2">
            <dt className="w-16 shrink-0 text-muted-foreground">{d.checksum}</dt>
            <dd className="flex min-w-0 flex-1 items-start gap-2">
              <code className="min-w-0 flex-1 break-all font-mono text-[0.75rem] text-foreground">{info.sha256}</code>
              <CopyButton value={info.sha256} />
            </dd>
          </div>
        </dl>
      )}
    </article>
  );
}

function CopyButton({ value }: { value: string }) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1800);
        } catch {
          /* clipboard unavailable */
        }
      }}
      aria-label={copied ? t.downloadPage.copied : t.downloadPage.copy}
      title={t.downloadPage.copy}
      className="-mt-1 inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
    >
      {copied ? <Check className="size-4 text-success-text" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
    </button>
  );
}

function InstallSteps({
  icon,
  title,
  steps,
  note,
  noteTone,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  steps: string[];
  note: string;
  noteTone: "warning" | "info";
  className?: string;
}) {
  const { num } = useI18n();
  const NoteIcon = noteTone === "warning" ? ShieldAlert : Info;
  return (
    <article className={cn("rounded-2xl border border-border bg-card p-6 shadow-soft sm:p-8", className)}>
      <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
        {icon}
        {title}
      </h3>
      <ol className="mt-5 flex flex-col gap-4">
        {steps.map((s, i) => (
          <li key={s} className="flex gap-3 text-sm leading-relaxed text-foreground">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-semibold text-primary-text">
              {num(i + 1)}
            </span>
            <span className="pt-0.5">{s}</span>
          </li>
        ))}
      </ol>
      <p
        className={cn(
          "mt-6 flex gap-2.5 rounded-lg border p-3.5 text-[0.8125rem] leading-relaxed",
          noteTone === "warning"
            ? "border-warning/25 bg-warning/5 text-warning-text"
            : "border-info/25 bg-info/5 text-info-text",
        )}
      >
        <NoteIcon className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {note}
      </p>
    </article>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-muted px-3 py-2.5 font-mono text-[0.75rem] text-foreground">
      <code>{children}</code>
    </pre>
  );
}
