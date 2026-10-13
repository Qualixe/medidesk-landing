"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import { LogoMark } from "@/components/brand/logo";
import { site } from "@/config/site";
import { useI18n } from "@/i18n";

/** WhatsApp brand glyph (speech bubble with a phone). */
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.42.25-.69.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35ZM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88Zm8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.41Z" />
    </svg>
  );
}

/**
 * Floating WhatsApp button (bottom-right on every page) with a small chat popup.
 * "Start chat" opens WhatsApp with the support number from src/config/site.ts.
 */
export function WhatsAppChat() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const startRef = useRef<HTMLAnchorElement>(null);

  // Escape closes the popup and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    startRef.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const chatUrl = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(t.chat.prefill)}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      <AnimatePresence>
        {open && (
          <m.div
            id={panelId}
            role="dialog"
            aria-label={t.chat.title}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-[min(20rem,calc(100vw-2rem))] origin-bottom-right overflow-hidden rounded-2xl border border-border bg-card shadow-lifted"
          >
            {/* Header */}
            <div className="flex items-center gap-3 bg-[#108043] px-4 py-3.5 text-white">
              <LogoMark className="size-10 rounded-full ring-2 ring-white/40" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{t.chat.title}</p>
                <p className="text-xs leading-snug text-white">{t.chat.status}</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label={t.chat.close}
                className="-mr-1 flex size-8 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-white"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Message */}
            <div className="bg-muted px-4 py-5">
              <div className="w-fit max-w-[85%] rounded-2xl rounded-tl-sm bg-card px-3.5 py-2.5 text-sm leading-relaxed text-foreground shadow-soft">
                <p className="font-medium">{t.chat.greeting}</p>
                <p className="mt-0.5 text-muted-foreground">{t.chat.question}</p>
              </div>
            </div>

            {/* Action */}
            <div className="p-3">
              <a
                ref={startRef}
                href={chatUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#108043] text-sm font-semibold text-white transition-colors hover:bg-[#0c6a37]"
              >
                <WhatsAppIcon className="size-[18px]" />
                {t.chat.start}
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>

      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={open ? t.chat.close : t.chat.open}
        title={open ? t.chat.close : t.chat.open}
        className="flex size-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-[0_6px_20px_rgb(16_128_67/0.4)] ring-1 ring-black/5 transition-transform duration-150 hover:scale-105 active:scale-95"
      >
        {open ? <X className="size-6" aria-hidden="true" /> : <WhatsAppIcon className="size-7" />}
      </button>
    </div>
  );
}
