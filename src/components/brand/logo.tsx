import Image from "next/image";
import logo from "@/app/icon.png";
import { cn } from "@/lib/utils";

/**
 * The MediDesk app icon. Source artwork: design/medidesk-logo-original.png
 * (cropped/rounded versions live in src/assets and src/app/icon.png).
 * Decorative by default — it always sits next to the "MediDesk" wordmark or a labelled link.
 */
export function LogoMark({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt=""
      width={32}
      height={32}
      priority={priority}
      unoptimized
      className={cn("size-8 shrink-0 select-none", className)}
      draggable={false}
    />
  );
}

export function Logo({
  className,
  markClassName,
  priority,
}: {
  className?: string;
  markClassName?: string;
  priority?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className={markClassName} priority={priority} />
      <span className="text-[1.0625rem] font-semibold tracking-tight text-foreground">MediDesk</span>
    </span>
  );
}
