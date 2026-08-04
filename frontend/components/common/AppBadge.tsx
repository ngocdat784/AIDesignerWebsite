import type { ComponentProps } from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface AppBadgeProps
  extends ComponentProps<typeof Badge> {
  glow?: boolean;
  pulse?: boolean;
}

export default function AppBadge({
  className,
  children,
  glow = false,
  pulse = false,
  ...props
}: AppBadgeProps) {
  return (
    <Badge
      className={cn(
        // Layout
        "inline-flex items-center gap-1.5",

        // Shape
        "rounded-full px-3 py-1.5",

        // Typography
        "text-xs font-semibold tracking-wide",

        // Animation
        "transition-all duration-300 ease-out",

        // Hover
        "hover:-translate-y-0.5 hover:shadow-md",

        // Optional effects
        glow &&
          "shadow-lg shadow-primary/20",

        pulse &&
          "animate-pulse",

        className
      )}
      {...props}
    >
      {children}
    </Badge>
  );
}