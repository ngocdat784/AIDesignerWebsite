import type { ReactNode } from "react";

import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

import AppButton from "./AppButton";

interface AppEmptyProps {
  icon?: ReactNode;

  title?: string;

  description?: string;

  action?: ReactNode;

  compact?: boolean;

  className?: string;
}

export default function AppEmpty({
  icon,

  title = "Nothing here yet",

  description = "There is currently no data to display.",

  action,

  compact = false,

  className,
}: AppEmptyProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed bg-muted/20 text-center",

        compact
          ? "gap-4 p-8"
          : "gap-6 p-12 md:p-16",

        className
      )}
    >
      <div
        className="
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-primary/10
          text-primary
        "
      >
        {icon ?? (
          <Inbox className="h-10 w-10" />
        )}
      </div>

      <div className="space-y-2 max-w-md">
        <h3 className="text-xl font-semibold tracking-tight">
          {title}
        </h3>

        <p className="text-sm leading-6 text-muted-foreground">
          {description}
        </p>
      </div>

      {action && (
        <div className="pt-2">
          {action}
        </div>
      )}
    </div>
  );
}