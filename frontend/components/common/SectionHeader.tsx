import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

import AppBadge from "./AppBadge";

interface SectionHeaderProps
  extends HTMLAttributes<HTMLDivElement> {
  title: string;

  subtitle?: string;

  badge?: ReactNode;

  align?: "left" | "center";

  maxWidth?: "sm" | "md" | "lg";

  divider?: boolean;
}

const widthClasses = {
  sm: "max-w-xl",
  md: "max-w-2xl",
  lg: "max-w-3xl",
};

export default function SectionHeader({
  title,
  subtitle,
  badge,
  align = "center",
  maxWidth = "md",
  divider = false,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-16 space-y-5",

        align === "center"
          ? "text-center mx-auto"
          : "text-left",

        widthClasses[maxWidth],

        className
      )}
      {...props}
    >
      {badge && (
        <div
          className={cn(
            align === "center"
              ? "flex justify-center"
              : "flex"
          )}
        >
          <AppBadge glow>
            {badge}
          </AppBadge>
        </div>
      )}

      <h2
        className="
          text-4xl
          font-bold
          tracking-tight
          text-balance
          md:text-5xl
        "
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="
            text-lg
            leading-8
            text-muted-foreground
          "
        >
          {subtitle}
        </p>
      )}

      {divider && (
        <div
          className={cn(
            "h-1 w-20 rounded-full bg-primary",

            align === "center"
              ? "mx-auto"
              : ""
          )}
        />
      )}
    </div>
  );
}