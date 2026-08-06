"use client";

import { cn } from "@/lib/utils";

interface HeroGradientProps {
  className?: string;
}

export default function HeroGradient({
  className,
}: HeroGradientProps) {
  return (
    <div
      className={cn(
        `
        pointer-events-none
        absolute
        inset-0
        -z-20
        overflow-hidden
        `,
        className
      )}
      aria-hidden="true"
    >
      {/* Main radial gradient */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-[700px]
          w-[700px]
          -translate-x-1/2
          rounded-full
          bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.20),transparent_70%)]
          blur-3xl
        "
      />

      {/* Left glow */}

      <div
        className="
          absolute
          -left-40
          top-40
          h-96
          w-96
          rounded-full
          bg-violet-500/15
          blur-[120px]
        "
      />

      {/* Right glow */}

      <div
        className="
          absolute
          -right-40
          bottom-20
          h-[420px]
          w-[420px]
          rounded-full
          bg-cyan-500/15
          blur-[140px]
        "
      />

      {/* Bottom fade */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-64
          bg-gradient-to-t
          from-background
          via-background/60
          to-transparent
        "
      />
    </div>
  );
}