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
    justify-center
    items-start
    gap-10
    md:gap-16
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
            flex-col
            items-center
            justify-center
            px-6
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
             text-6xl
    font-black
    leading-none
    tracking-tight
            "
          >
            {stat.value}
          </h3>

          <p
            className="
              mt-4
    text-sm
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