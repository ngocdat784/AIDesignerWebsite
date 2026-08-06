"use client";

import { cn } from "@/lib/utils";

import HeroActions from "./HeroActions";
import HeroBackground from "./HeroBackground";
import HeroBadge from "./HeroBadge";
import HeroContent from "./HeroContent";
import HeroGradient from "./HeroGradient";
import HeroParticles from "./HeroParticles";
import HeroPreview from "./HeroPreview";
import HeroStats from "./HeroStats";
import HeroTrusted from "./HeroTrusted";

interface HeroProps {
  className?: string;
}

export default function Hero({
  className,
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden",
        className
      )}
    >
      {/* Background */}

      <HeroBackground />

      <HeroGradient />

      <HeroParticles />

      {/* Content */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-72px)]
          max-w-7xl
          flex-col
          items-center
          justify-center
          px-6
          pt-24
          pb-20
          text-center
        "
      >
        <HeroBadge />

        <HeroContent />

        <HeroActions />

        <HeroStats />

        <HeroTrusted />

        <HeroPreview />
      </div>
    </section>
  );
}