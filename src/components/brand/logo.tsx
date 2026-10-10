import { cn } from "@/lib/utils";

/** Teal rounded square with a stethoscope-and-plus mark. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-8", className)}>
      <rect width="32" height="32" rx="8" fill="#0e8a8f" />
      <path
        d="M10 8v6a5 5 0 0 0 10 0V8"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M15 19v1.5a4.5 4.5 0 0 0 9 0V18"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="15.6" r="2.3" fill="none" stroke="#fff" strokeWidth="2" />
      <path d="M22 5.5v4M20 7.5h4" stroke="#bfeaea" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ className, markClassName }: { className?: string; markClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} />
      <span className="text-[1.0625rem] font-semibold tracking-tight text-foreground">MediDesk</span>
    </span>
  );
}
