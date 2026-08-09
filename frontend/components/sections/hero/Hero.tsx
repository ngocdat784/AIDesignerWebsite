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

      {/* Hero Content */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          max-w-7xl
          flex-col
          items-center
          px-6
          pb-20
          pt-10
          text-center
          md:px-8
          md:pt-14
          xl:pt-16
        "
      >
       {/* Badge */}
<HeroBadge />

{/* Heading + Description */}
<div style={{ marginTop: "32px" }}>
  <HeroContent />
</div>

{/* Actions */}
<div style={{ marginTop: "32px" }}>
  <HeroActions />
</div>

{/* Stats */}
<div style={{ marginTop: "40px" }}>
  <HeroStats />
</div>

{/* Trusted */}
<div style={{ marginTop: "32px" }}>
  <HeroTrusted />
</div>

{/* Preview */}
<div style={{ marginTop: "32px", width: "100%" }}>
  <HeroPreview />
</div>
      </div>
    </section>
  );
}