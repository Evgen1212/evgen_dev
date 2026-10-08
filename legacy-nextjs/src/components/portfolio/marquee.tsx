import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
};

export function Marquee({
  children,
  duration = 40,
  reverse = false,
  pauseOnHover = false,
  className,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "overflow-hidden marquee-fade",
        pauseOnHover && "marquee-hover-pause",
        className
      )}
    >
      <div
        className={cn("marquee-track", reverse && "reverse")}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        <div className="flex items-center shrink-0">{children}</div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MarqueeDot() {
  return (
    <span
      aria-hidden="true"
      className="mx-6 sm:mx-8 inline-block size-1.5 rounded-full bg-white/25 shrink-0"
    />
  );
}
