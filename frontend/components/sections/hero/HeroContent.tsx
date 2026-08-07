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
        "flex flex-col items-center text-center",
        className
      )}
    >
      {/* Heading */}

      <h1
        className="
          max-w-6xl
          text-5xl
          font-extrabold
          tracking-[-0.04em]
          leading-[1.08]
          md:text-6xl
          xl:text-7xl
        "
      >
        {heroData.title}

        <span
          className="
            
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
          mt-10
          max-w-2xl
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