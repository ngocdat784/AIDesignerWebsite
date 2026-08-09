"use client";

import FeatureCard from "./FeatureCard";
import { featuresData } from "./features.data";

interface FeaturesGridProps {
  className?: string;
}

export default function FeaturesGrid({
  className,
}: FeaturesGridProps) {
  return (
    <div
      className={`
        grid
        w-full
        grid-cols-1
        gap-6
        sm:grid-cols-2
        xl:grid-cols-3
        ${className ?? ""}
      `}
    >
      {featuresData.features.map((feature) => (
        <FeatureCard
          key={feature.title}
          feature={feature}
        />
      ))}
    </div>
  );
}