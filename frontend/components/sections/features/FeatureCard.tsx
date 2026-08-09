"use client";

import Link from "next/link";

import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
      min-h-[180px]
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
          bg-gradient-to-br
          from-primary/5
          via-transparent
          to-primary/10
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      <CardContent
        className="
          relative
          flex
          h-full
          flex-col
          p-7
        "
      >
        {/* Badge */}
        {badge && (
          <Badge
            className="
              mb-4
              w-fit
              rounded-full
            "
          >
            {badge}
          </Badge>
        )}

        {/* Icon */}
        <div
          className="
            mb-5
            flex
            h-14
            w-14
            shrink-0
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
          <Icon className="h-7 w-7" />
        </div>

       {/* Title */}

<div className="mb-4 flex items-center justify-between">
  <h3
    className="
      text-2xl
      font-semibold
      tracking-tight
      leading-tight
    "
  >
    {title}
  </h3>

  {href && (
    <ArrowUpRight
      className="
        h-5
        w-5
        shrink-0
        opacity-0
        transition-all
        duration-300
        group-hover:-translate-y-1
        group-hover:translate-x-1
        group-hover:opacity-100
      "
    />
  )}
</div>

{/* Description */}

<p
  className="
    text-base
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