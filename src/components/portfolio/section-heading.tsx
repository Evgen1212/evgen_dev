import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  kicker?: string;
  align?: "center" | "left";
  className?: string;
};

/** Маленькая пилюля-надзаголовок секции (✦ Кейсы) */
export function SectionKicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 sm:text-xs">
      <span
        aria-hidden="true"
        className="size-1.5 rounded-full bg-gradient-to-r from-fuchsia-400 to-purple-400 shadow-[0_0_8px_rgba(217,70,239,0.8)]"
      />
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  subtitle,
  kicker,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      data-reveal
      className={cn(
        "mb-12 sm:mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {kicker && <SectionKicker>{kicker}</SectionKicker>}
      <h2 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-zinc-400">{subtitle}</p>
      )}
    </div>
  );
}
