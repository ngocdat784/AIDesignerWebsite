"use client";

import { cn } from "@/lib/utils";

import { heroData } from "./hero.data";

interface HeroStatsProps {
  className?: string;
}

export default function HeroStats({
  className,
}: HeroStatsProps) {
  return (
    <section
      className={cn(
        `
        mt-12
        grid
        grid-cols-2
        gap-5
        md:grid-cols-4
        `,
        className
      )}
    >
      {heroData.stats.map((stat) => (
        <div
          key={stat.label}
          className="
            group
            rounded-2xl
            border
            border-border/60
            bg-card/60
            p-5
            text-center
            backdrop-blur-sm
            transition-all
            duration-300
            hover:-translate-y-1
            hover:border-primary/30
            hover:bg-card
            hover:shadow-xl
            hover:shadow-primary/5
          "
        >
          <div
            className="
              text-3xl
              font-bold
              tracking-tight
              text-foreground
              transition-colors
              duration-300
              group-hover:text-primary
            "
          >
            {stat.value}
          </div>

          <p
            className="
              mt-2
              text-sm
              text-muted-foreground
            "
          >
            {stat.label}
          </p>
        </div>
      ))}
    </section>
  );
}