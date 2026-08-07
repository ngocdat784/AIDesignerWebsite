"use client";

import Link from "next/link";

import { Sparkles } from "lucide-react";

import AppButton from "@/components/common/AppButton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { marketplaceData } from "./marketplace.data";

interface MarketplaceHeaderProps {
  className?: string;
}

export default function MarketplaceHeader({
  className,
}: MarketplaceHeaderProps) {
  const { header } = marketplaceData;

  return (
    <div
      className={cn(
        `
        mb-16
        flex
        flex-col
        gap-8
        lg:flex-row
        lg:items-end
        lg:justify-between
        `,
        className
      )}
    >
      {/* Left */}

      <div className="max-w-3xl">
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

      {/* Action */}

      {header.action && (
        <Link href={header.action.href}>
          <AppButton
            variant="outline"
            className="
              rounded-xl
              px-6
            "
          >
            {header.action.text}
          </AppButton>
        </Link>
      )}
    </div>
  );
}