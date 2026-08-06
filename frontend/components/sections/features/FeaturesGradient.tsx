"use client";

import { cn } from "@/lib/utils";

interface FeaturesGradientProps {
  className?: string;
}

export default function FeaturesGradient({
  className,
}: FeaturesGradientProps) {
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
      {/* Top Gradient */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          h-40
          bg-gradient-to-b
          from-background
          to-transparent
        "
      />

      {/* Bottom Gradient */}

      <div
        className="
          absolute
          inset-x-0
          bottom-0
          h-40
          bg-gradient-to-t
          from-background
          to-transparent
        "
      />

      {/* Center Glow */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-primary/[0.04]
          blur-[160px]
        "
      />
    </div>
  );
}