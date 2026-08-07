"use client";

import { cn } from "@/lib/utils";

import FeaturesBackground from "./FeaturesBackground";
import FeaturesGradient from "./FeaturesGradient";
import FeaturesGrid from "./FeaturesGrid";
import FeaturesHeader from "./FeaturesHeader";

interface FeaturesProps {
  className?: string;
}

export default function Features({
  className,
}: FeaturesProps) {
  return (
    <section
      className={cn(
        `
        relative
        overflow-hidden
        py-28
        lg:py-36
        `,
        className
      )}
    >
      {/* Background */}
      <FeaturesBackground />

      {/* Gradient */}
      <FeaturesGradient />

      {/* Content */}
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
          text-center
        "
      >
        {/* Header */}
        <div className="mb-20 w-full">
          <FeaturesHeader />
        </div>

        {/* Grid */}
        <div className="w-full">
          <FeaturesGrid />
        </div>
      </div>
    </section>
  );
}