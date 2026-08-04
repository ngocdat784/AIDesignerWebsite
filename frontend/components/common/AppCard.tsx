import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface AppCardProps
  extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  interactive?: boolean;
  glass?: boolean;
}

export default function AppCard({
  className,
  hover = true,
  interactive = false,
  glass = false,
  children,
  ...props
}: AppCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border bg-card shadow-sm",

        "transition-all duration-300 ease-out",

        hover &&
          "hover:-translate-y-1 hover:shadow-xl hover:border-primary/20",

        interactive &&
          "cursor-pointer active:scale-[0.99]",

        glass &&
          "bg-background/70 backdrop-blur-xl",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}