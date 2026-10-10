import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium transition-[background-color,border-color,color,box-shadow,transform] duration-150 disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0 active:translate-y-px",
  {
    variants: {
      variant: {
        primary:
          "bg-primary-solid text-primary-foreground shadow-[0_1px_2px_rgb(10_110_115/0.25),inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-primary-solid-hover",
        secondary:
          "border border-border bg-card text-foreground shadow-soft hover:border-primary/40 hover:bg-accent",
        ghost: "text-foreground hover:bg-muted",
        inverse:
          "bg-white text-[#0a5a5e] shadow-[0_1px_2px_rgb(0_0_0/0.15)] hover:bg-[#eef6f6]",
        "inverse-outline":
          "border border-white/35 bg-white/5 text-white hover:border-white/60 hover:bg-white/10",
      },
      size: {
        sm: "h-9 px-3.5 text-sm [&_svg]:size-4",
        md: "h-11 px-5 text-[0.9375rem] [&_svg]:size-[18px]",
        lg: "h-14 px-6 text-base [&_svg]:size-5",
        icon: "size-9 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & ButtonVariantProps) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
