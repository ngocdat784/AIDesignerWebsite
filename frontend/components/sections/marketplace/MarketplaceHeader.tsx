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
        "flex w-full flex-col items-center text-center",
        className
      )}
    >
      {/* Badge */}
      {header.badge && (
        <Badge
          variant="secondary"
          className="
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
          w-full
          text-5xl
          font-extrabold
          leading-[1.08]
          tracking-[-0.04em]
          md:text-6xl
          xl:text-7xl
        "
        style={{
          maxWidth: "900px",
          marginTop: "24px",
        }}
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
          w-full
          text-lg
          leading-8
          text-muted-foreground
          md:text-xl
        "
        style={{
          maxWidth: "680px",
          marginTop: "24px",
        }}
      >
        {header.description}
      </p>

      {/* Action */}
      {header.action && (
        <div
          style={{
            marginTop: "32px",
          }}
        >
          <Link href={header.action.href}>
            <AppButton
              variant="outline"
              className="
                group
                h-14
                min-w-[200px]
                rounded-2xl
                px-10
                text-base
                font-semibold
                shadow-md
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              {header.action.text}
            </AppButton>
          </Link>
        </div>
      )}
    </div>
  );
}