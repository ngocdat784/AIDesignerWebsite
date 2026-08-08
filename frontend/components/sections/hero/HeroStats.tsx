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
        flex
        flex-wrap
        items-start
        justify-center
        gap-8
        md:gap-0
        `,
        className
      )}
    >
      {heroData.stats.map((stat, index) => (
        <div
          key={stat.label}
          className={cn(
            `
            flex
            min-w-[180px]
            flex-col
            items-center
            justify-center
            px-8
            py-2
            transition-all
            duration-300
            hover:-translate-y-1
            `,
            index !== heroData.stats.length - 1 &&
              "md:border-r md:border-border/60"
          )}
        >
          <h3
            className="
              text-5xl
              font-black
              leading-none
              tracking-[-0.03em]
              md:text-6xl
            "
          >
            {stat.value}
          </h3>

          <p
            className="
              mt-3
              text-sm
              font-medium
              uppercase
              tracking-[0.18em]
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