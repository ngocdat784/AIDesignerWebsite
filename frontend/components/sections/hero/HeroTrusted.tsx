"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

import { heroData } from "./hero.data";

interface HeroTrustedProps {
  className?: string;
}

export default function HeroTrusted({
  className,
}: HeroTrustedProps) {
  return (
    <section
      className={cn(
        `
        mt-12
        space-y-6
        `,
        className
      )}
    >
      <p
        className="
          text-center
          text-sm
          font-medium
          tracking-wide
          text-muted-foreground
          uppercase
        "
      >
        Trusted by creators and companies worldwide
      </p>

      <div
        className="
          flex
          flex-wrap
          items-center
          justify-center
          gap-8
          md:gap-10
        "
      >
        {heroData.trusted.map((brand) => (
          <div
            key={brand.name}
            className="
              group
              flex
              items-center
              justify-center
              opacity-60
              grayscale
              transition-all
              duration-300
              hover:scale-105
              hover:opacity-100
              hover:grayscale-0
            "
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={120}
              height={40}
              className="
                h-8
                w-auto
                object-contain
              "
            />
          </div>
        ))}
      </div>
    </section>
  );
}