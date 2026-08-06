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
        py-24
        lg:py-32
        `,
        className
      )}
    >
      {/* Background */}

      <FeaturesBackground />

      {/* Gradient */}

      <FeaturesGradient />

      {/* Content */}

      <div className="relative mx-auto max-w-7xl px-6">
        <FeaturesHeader />

        <FeaturesGrid />
      </div>
    </section>
  );
}