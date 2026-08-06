"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import type { FeatureItem } from "./types";

interface FeatureCardProps {
  feature: FeatureItem;

  className?: string;
}

export default function FeatureCard({
  feature,
  className,
}: FeatureCardProps) {
  const {
    title,
    description,
    icon: Icon,
    badge,
    href,
    highlight,
  } = feature;

  const content = (
    <Card
      className={cn(
        `
        group
        relative
        h-full
        overflow-hidden
        rounded-3xl
        border
        bg-card/70
        backdrop-blur
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-primary/30
        hover:shadow-2xl
        hover:shadow-primary/10
        `,
        highlight &&
          "border-primary shadow-lg shadow-primary/10",
        className
      )}
    >
      {/* Glow */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-gradient-to-br
          from-primary/5
          via-transparent
          to-primary/10
        "
      />

      <CardContent className="relative p-8">
        {/* Badge */}

        {badge && (
          <Badge
            className="
              mb-5
              rounded-full
            "
          >
            {badge}
          </Badge>
        )}

        {/* Icon */}

        <div
          className="
            mb-6
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-primary/10
            text-primary
            transition-all
            duration-500
            group-hover:scale-110
            group-hover:rotate-6
          "
        >
          <Icon className="h-8 w-8" />
        </div>

        {/* Title */}

        <div className="mb-3 flex items-center justify-between">
          <h3
            className="
              text-xl
              font-semibold
              tracking-tight
            "
          >
            {title}
          </h3>

          {href && (
            <ArrowUpRight
              className="
                h-5
                w-5
                opacity-0
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:-translate-y-1
                group-hover:opacity-100
              "
            />
          )}
        </div>

        {/* Description */}

        <p
          className="
            leading-7
            text-muted-foreground
          "
        >
          {description}
        </p>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="block h-full"
      >
        {content}
      </Link>
    );
  }

  return content;
}