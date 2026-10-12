"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Languages, TriangleAlert } from "lucide-react";
import { Container } from "@/components/section";
import { site } from "@/config/site";
import { fill, useI18n } from "@/i18n";
import type { LegalBlock, LegalDocument } from "@/i18n/privacy-policy";

/**
 * Renders /privacy and /terms. The text lives in src/i18n:
 * the Privacy Policy in privacy-policy.ts and the Terms of Service in terms-of-service.ts.
 */
export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { t, date } = useI18n();
  const doc: LegalDocument = t.legal[kind];

  return (
    <Container className="max-w-3xl py-16 sm:py-20">
      {doc.placeholder && (
        <div
          role="note"
          className="mb-10 flex gap-3 rounded-xl border border-warning/30 bg-warning/5 p-4 text-sm text-warning-text"
        >
          <TriangleAlert className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">{t.legal.placeholderTitle}</p>
            <p className="mt-1">{t.legal.placeholderBody}</p>
          </div>
        </div>
      )}

      <article>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground">{doc.title}</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {fill(t.legal.lastUpdated, { date: date(doc.updated) })}
        </p>

        {doc.note && (
          <p className="mt-5 flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2.5 text-sm text-muted-foreground">
            <Languages className="size-4 shrink-0 text-primary-text" aria-hidden="true" />
            {doc.note}
          </p>
        )}

        {/* The policy is written in English; mark it so screen readers pronounce it correctly in Bangla mode. */}
        <div lang={doc.note ? "en" : undefined}>
          <div className="mt-8 flex flex-col gap-4">
            {doc.intro.map((p) => (
              <p key={p} className="text-base leading-relaxed text-foreground">
                <Rich text={p} />
              </p>
            ))}
          </div>

          {doc.summary && (
            <p className="mt-6 rounded-xl border border-primary/20 bg-accent px-4 py-3.5 text-base leading-relaxed text-foreground">
              <Rich text={doc.summary} />
            </p>
          )}

          {doc.sections.map((s) => (
            <section key={s.h} className="mt-10">
              <h2 className="text-xl font-semibold text-foreground">{s.h}</h2>
              <div className="mt-3 flex flex-col gap-4">
                {s.blocks.map((block, i) => (
                  <Block key={i} block={block} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}

function Block({ block }: { block: LegalBlock }) {
  if (typeof block === "string") {
    return (
      <p className="text-base leading-relaxed text-muted-foreground">
        <Rich text={block} />
      </p>
    );
  }
  return (
    <ul className="flex list-disc flex-col gap-2 pl-5 text-base leading-relaxed text-muted-foreground marker:text-primary">
      {block.list.map((item) => (
        <li key={item}>
          <Rich text={item} />
        </li>
      ))}
    </ul>
  );
}

/** Text with **bold** segments; `{email}` becomes the support address and `{privacy}` a link to /privacy. */
function Rich({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\{email\}|\{privacy\})/);
  return (
    <>
      {parts.map((part, i) => {
        if (part === "{email}") {
          return (
            <a key={i} href={`mailto:${site.supportEmail}`} className="font-medium text-primary-text hover:underline">
              {site.supportEmail}
            </a>
          );
        }
        if (part === "{privacy}") {
          return (
            <Link key={i} href="/privacy" className="font-medium text-primary-text hover:underline">
              Privacy Policy
            </Link>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-foreground">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
