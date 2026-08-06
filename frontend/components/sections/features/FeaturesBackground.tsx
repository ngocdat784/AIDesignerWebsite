"use client";

import { cn } from "@/lib/utils";

interface FeaturesBackgroundProps {
  className?: string;
}

export default function FeaturesBackground({
  className,
}: FeaturesBackgroundProps) {
  return (
    <div
      className={cn(
        `
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
        `,
        className
      )}
    >
      {/* Top Glow */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-primary/10
          blur-[140px]
        "
      />

      {/* Left Glow */}

      <div
        className="
          absolute
          -left-40
          top-1/3
          h-[320px]
          w-[320px]
          rounded-full
          bg-sky-500/10
          blur-[120px]
        "
      />

      {/* Right Glow */}

      <div
        className="
          absolute
          -right-40
          bottom-0
          h-[320px]
          w-[320px]
          rounded-full
          bg-violet-500/10
          blur-[120px]
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.04]
          [background-image:linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)]
          [background-size:48px_48px]
        "
      />

      {/* Radial Fade */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,transparent,rgba(0,0,0,0.03))]
          dark:bg-[radial-gradient(circle_at_top,transparent,rgba(255,255,255,0.02))]
        "
      />
    </div>
  );
}