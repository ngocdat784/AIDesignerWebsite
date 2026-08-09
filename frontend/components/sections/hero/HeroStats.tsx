"use client";

import { cn } from "@/lib/utils";
import { LayoutTemplate, Users, Rocket } from "lucide-react";

import { heroData } from "./hero.data";

interface HeroStatsProps {
  className?: string;
}

const statIcons = [
  LayoutTemplate,
  Users,
  Rocket,
];

export default function HeroStats({
  className,
}: HeroStatsProps) {
  return (
    <section
      className={cn(
        "flex flex-wrap items-center justify-center",
        className
      )}
    >
      {heroData.stats.map((stat, index) => {
        const Icon = statIcons[index];

        return (
          <div
            key={stat.label}
            className={cn(
              "flex items-center justify-center",
              "px-8",
              index !== heroData.stats.length - 1 &&
                "md:border-r md:border-border/60"
            )}
            style={{
              marginLeft: index === 0 ? "0px" : "20px",
              marginRight:
                index === heroData.stats.length - 1 ? "0px" : "20px",
            }}
          >
            {/* Icon */}
            <div
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary/5
              "
            >
              <Icon
                className="h-7 w-7 text-primary"
                strokeWidth={1.8}
              />
            </div>

            {/* Content */}
            <div
              className="flex flex-col"
              style={{
                marginLeft: "16px",
              }}
            >
              {/* Number */}
              <div
                className="
                  text-4xl
                  font-semibold
                  leading-none
                  tracking-tight
                  text-foreground
                "
              >
                {stat.value}
              </div>

              {/* Label */}
              <p
                className="
                  mt-3
                  text-xs
                  font-medium
                  uppercase
                  tracking-[0.18em]
                  text-primary
                "
              >
                {stat.label}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}