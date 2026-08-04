"use client";

import type { ReactNode } from "react";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface FilterBadgeProps {
  label: string;

  value: string;

  icon?: ReactNode;

  active?: boolean;

  color?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger";

  className?: string;

  onClick?: () => void;

  onRemove?: () => void;
}

const colorClasses = {
  default: {
    active:
      "bg-secondary text-secondary-foreground border-secondary",

    inactive:
      "bg-muted text-muted-foreground border-border",
  },

  primary: {
    active:
      "bg-primary text-primary-foreground border-primary",

    inactive:
      "bg-primary/10 text-primary border-primary/20",
  },

  success: {
    active:
      "bg-green-600 text-white border-green-600",

    inactive:
      "bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400",
  },

  warning: {
    active:
      "bg-yellow-500 text-black border-yellow-500",

    inactive:
      "bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-300",
  },

  danger: {
    active:
      "bg-red-600 text-white border-red-600",

    inactive:
      "bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400",
  },
};

export default function FilterBadge({
  label,

  value,

  icon,

  active = false,

  color = "default",

  className,

  onClick,

  onRemove,
}: FilterBadgeProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        `
          inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium transition-all duration-300
        `,

        active
          ? colorClasses[color].active
          : colorClasses[color].inactive,

        onClick &&
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:scale-95",

        className
      )}
    >
      {icon}

      <span className="opacity-70">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="
            rounded-full
            p-1
            transition-all
            duration-200
            hover:bg-black/10
            dark:hover:bg-white/10
            hover:rotate-90
          "
          aria-label={`Remove ${label}`}
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
}