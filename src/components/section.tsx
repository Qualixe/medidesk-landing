import { cn } from "@/lib/utils";

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8", className)} {...props} />;
}

export function Section({ className, ...props }: React.ComponentProps<"section">) {
  return <section className={cn("py-20 sm:py-24 lg:py-32", className)} {...props} />;
}

export function Eyebrow({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 text-[0.8125rem] font-semibold uppercase tracking-[0.08em] text-primary-text",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  id,
  align = "center",
  className,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  id?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 id={id} className="mt-3 text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
