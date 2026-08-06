"use client";

import { cn } from "@/lib/utils";

import HeroGradient from "./HeroGradient";
import HeroParticles from "./HeroParticles";

interface HeroBackgroundProps {
  className?: string;

  particleCount?: number;
}

export default function HeroBackground({
  className,
  particleCount = 24,
}: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        `
        absolute
        inset-0
        -z-20
        overflow-hidden
        `,
        className
      )}
      aria-hidden="true"
    >
      {/* Gradient */}

      <HeroGradient />

      {/* Floating particles */}

      <HeroParticles
        count={particleCount}
      />

      {/* Grid overlay */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          dark:opacity-[0.06]
          bg-[linear-gradient(to_right,hsl(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground))_1px,transparent_1px)]
          bg-[size:64px_64px]
        "
      />

      {/* Radial mask */}

      <div
        className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_center,transparent_30%,hsl(var(--background))_100%)]
        "
      />
    </div>
  );
}