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
          lg:py-28
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
          flex
          w-full
          flex-col
          items-center
          px-6
          text-center
        "
        style={{
          maxWidth: "1200px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Header */}
        <div
          className="w-full"
          style={{
            marginBottom: "64px",
          }}
        >
          <FeaturesHeader />
        </div>

        {/* Grid */}
        <div
          className="w-full"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <FeaturesGrid />
        </div>
      </div>
    </section>
  );
}