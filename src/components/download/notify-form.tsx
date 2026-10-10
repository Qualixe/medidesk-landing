"use client";

import { useId, useState } from "react";
import { Check } from "lucide-react";
import { downloads } from "@/config/downloads";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "done" | "mailto" | "error" | "invalid";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NotifyForm({ className }: { className?: string }) {
  const { t } = useI18n();
  const id = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setStatus("invalid");
      return;
    }

    const { endpoint, fallbackEmail } = downloads.notify;
    if (!endpoint) {
      const subject = encodeURIComponent("Notify me: MediDesk for macOS");
      const body = encodeURIComponent(`Please email me at ${value} when MediDesk for macOS is available.`);
      window.location.href = `mailto:${fallbackEmail}?subject=${subject}&body=${body}`;
      setStatus("mailto");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: value, platform: "macOS" }),
      });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  const message =
    status === "done"
      ? t.download.notifySuccess
      : status === "mailto"
        ? t.download.notifyMailto
        : status === "error"
          ? t.download.notifyError
          : status === "invalid"
            ? t.download.notifyInvalid
            : "";

  if (status === "done") {
    return (
      <p
        role="status"
        className={cn("flex items-start gap-2 text-sm text-success-text", className)}
      >
        <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        {message}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className={cn("w-full max-w-sm", className)}>
      <label
        htmlFor={`${id}-email`}
        className="mb-1.5 block text-[0.8125rem] font-medium text-muted-foreground"
      >
        {t.download.notifyLabel}
      </label>
      <div className="flex gap-2">
        <input
          id={`${id}-email`}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "invalid") setStatus("idle");
          }}
          placeholder={t.download.notifyPlaceholder}
          aria-invalid={status === "invalid" || undefined}
          aria-describedby={message ? `${id}-msg` : undefined}
          className="h-10 min-w-0 flex-1 rounded-lg border border-border bg-card px-3 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-primary"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="h-10 shrink-0 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? t.download.notifySending : t.download.notifyButton}
        </button>
      </div>
      <p
        id={`${id}-msg`}
        role="status"
        aria-live="polite"
        className={cn(
          "mt-1.5 min-h-0 text-[0.8125rem]",
          status === "mailto" ? "text-muted-foreground" : "text-destructive-text",
          !message && "sr-only",
        )}
      >
        {message}
      </p>
    </form>
  );
}
