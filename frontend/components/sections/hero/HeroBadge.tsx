"use client";

import { cn } from "@/lib/utils";

import { heroData } from "./hero.data";

interface HeroBadgeProps {
  className?: string;
}

export default function HeroBadge({
  className,
}: HeroBadgeProps) {
  const Icon = heroData.badge.icon;

  return (
    <div
      className={cn(
        `
        group
        inline-flex
        items-center
        gap-2
        rounded-full
        border
        border-primary/20
        bg-primary/5
        px-4
        py-2
        text-sm
        font-medium
        text-primary
        backdrop-blur-sm
        transition-all
        duration-300
        hover:border-primary/40
        hover:bg-primary/10
        hover:shadow-lg
        hover:shadow-primary/10
        `,
        className
      )}
    >
      {Icon && (
        <Icon
          className="
            h-4
            w-4
            transition-transform
            duration-300
            group-hover:rotate-12
            group-hover:scale-110
          "
        />
      )}

      <span>{heroData.badge.text}</span>
    </div>
  );
}