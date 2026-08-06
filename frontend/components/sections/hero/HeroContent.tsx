"use client";

import { cn } from "@/lib/utils";

import { heroData } from "./hero.data";

interface HeroContentProps {
  className?: string;
}

export default function HeroContent({
  className,
}: HeroContentProps) {
  return (
    <div
      className={cn(
        "space-y-8",
        className
      )}
    >
      {/* Heading */}

      <h1
        className="
          max-w-5xl
          text-5xl
          font-extrabold
          leading-[1.05]
          tracking-tight
          md:text-6xl
          xl:text-7xl
        "
      >
        {heroData.title}

        <span
          className="
            mt-3
            block
            bg-gradient-to-r
            from-primary
            via-primary
            to-indigo-500
            bg-clip-text
            text-transparent
          "
        >
          {heroData.highlight}
        </span>
      </h1>

      {/* Description */}

      <p
        className="
          max-w-3xl
          text-lg
          leading-8
          text-muted-foreground
          md:text-xl
        "
      >
        {heroData.description}
      </p>
    </div>
  );
}