"use client";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { featuresData } from "./features.data";

interface FeaturesHeaderProps {
  className?: string;
}

export default function FeaturesHeader({
  className,
}: FeaturesHeaderProps) {
  const { header } = featuresData;

 return (
  <div
    className={cn(
      `
      flex
      flex-col
      items-center
      text-center
      `,
      className
    )}
  >
    {/* Badge */}

    {header.badge && (
      <Badge
        variant="secondary"
        className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-full
          px-5
          py-2
          text-sm
          font-medium
        "
      >
        <Sparkles className="h-4 w-4" />

        {header.badge}
      </Badge>
    )}

    {/* Title */}

    <h2
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
      {header.title}

      {header.highlight && (
        <span className="block text-primary">
          {header.highlight}
        </span>
      )}
    </h2>

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
      {header.description}
    </p>
  </div>
);
}