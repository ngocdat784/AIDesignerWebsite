"use client";

import { Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
        "flex w-full flex-col items-center text-center",
        className
      )}
    >
      {/* Badge */}
      {header.badge && (
        <Badge
          variant="secondary"
          className="
            mb-5
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
          max-w-5xl
          text-5xl
          font-extrabold
          leading-[1.08]
          tracking-[-0.04em]
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
          mt-6
          max-w-2xl
          text-base
          leading-7
          text-muted-foreground
          md:text-lg
          md:leading-8
        "
      >
        {header.description}
      </p>
    </div>
  );
}