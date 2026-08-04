import type { ReactNode } from "react";

import {
  ArrowDownRight,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface StatItemProps {
  icon: ReactNode;

  value: string | number;

  label: string;

  description?: string;

  trend?: number;

  color?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger";

  className?: string;
}

const iconColors = {
  default:
    "bg-muted text-foreground",

  primary:
    "bg-primary/10 text-primary",

  success:
    "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",

  warning:
    "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",

  danger:
    "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400",
};

export default function StatItem({
  icon,

  value,

  label,

  description,

  trend,

  color = "primary",

  className,
}: StatItemProps) {
  return (
    <div
      className={cn(
  `
    rounded-2xl
    border
    bg-card
    p-6
    transition-all
    duration-300
    hover:-translate-y-1
    hover:shadow-xl
    hover:border-primary/20
  `,
  className
)}
    >
      <div className="mb-5 flex items-center justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-xl",
            iconColors[color]
          )}
        >
          {icon}
        </div>

        {trend !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold",
              trend >= 0
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            )}
          >
            {trend >= 0 ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}

            {Math.abs(trend)}%
          </div>
        )}
      </div>

      <div className="space-y-1">
        <div className="text-3xl font-bold tracking-tight">
          {value}
        </div>

        <div className="font-medium text-muted-foreground">
          {label}
        </div>

        {description && (
          <p className="pt-1 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}