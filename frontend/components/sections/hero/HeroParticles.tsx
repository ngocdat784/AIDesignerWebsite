"use client";

import { cn } from "@/lib/utils";

interface HeroParticlesProps {
  className?: string;

  count?: number;
}

export default function HeroParticles({
  className,
  count = 24,
}: HeroParticlesProps) {
  return (
    <div
      className={cn(
        `
        pointer-events-none
        absolute
        inset-0
        -z-10
        overflow-hidden
        `,
        className
      )}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, index) => {
        const size = 4 + (index % 4) * 2;

        const left = (index * 17) % 100;

        const delay = index * 0.8;

        const duration = 18 + (index % 6) * 3;

        const opacity = 0.15 + (index % 4) * 0.08;

        return (
          <span
            key={index}
            className="
              absolute
              rounded-full
              bg-primary
              blur-[1px]
              animate-hero-particle
            "
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              bottom: "-40px",
              opacity,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}