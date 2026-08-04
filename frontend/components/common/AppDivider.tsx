import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface AppDividerProps {
  label?: ReactNode;

  icon?: ReactNode;

  vertical?: boolean;

  className?: string;

  lineClassName?: string;
}

export default function AppDivider({
  label,
  icon,
  vertical = false,
  className,
  lineClassName,
}: AppDividerProps) {
  if (vertical) {
    return (
      <div
        className={cn(
          "mx-2 h-full min-h-6 w-px bg-border",
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "flex items-center gap-4",
        className
      )}
    >
      <div
        className={cn(
          "h-px flex-1 bg-border",
          lineClassName
        )}
      />

      {(label || icon) && (
        <div
          className="
            flex
            shrink-0
            items-center
            gap-2
            rounded-full
            bg-background
            px-3
            py-1
            text-xs
            font-medium
            text-muted-foreground
          "
        >
          {icon}

          {label}
        </div>
      )}

      <div
        className={cn(
          "h-px flex-1 bg-border",
          lineClassName
        )}
      />
    </div>
  );
}