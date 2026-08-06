"use client";

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
      className={[
        "mx-auto mb-16 max-w-3xl text-center",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
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
            px-4
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
          text-4xl
          font-bold
          tracking-tight
          md:text-5xl
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
          mx-auto
          mt-6
          max-w-2xl
          text-lg
          leading-8
          text-muted-foreground
        "
      >
        {header.description}
      </p>
    </div>
  );
}