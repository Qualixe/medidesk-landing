"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/section";
import { useI18n } from "@/i18n";

export default function NotFound() {
  const { t, num } = useI18n();
  return (
    <Container className="flex flex-col items-center py-28 text-center">
      <p className="text-sm font-semibold text-primary-text">{num(404)}</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">{t.notFound.title}</h1>
      <p className="mt-3 text-muted-foreground">{t.notFound.body}</p>
      <Link href="/" className={buttonVariants({ className: "mt-8" })}>
        {t.common.backHome}
      </Link>
    </Container>
  );
}
