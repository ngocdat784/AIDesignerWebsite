import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface TagProps {
  label: string;

  icon?: ReactNode;

  color?:
    | "default"
    | "primary"
    | "success"
    | "warning"
    | "danger";

  variant?:
    | "solid"
    | "soft"
    | "outline";

  size?: "sm" | "md" | "lg";

  clickable?: boolean;

  className?: string;

  onClick?: () => void;
}

const sizeClasses = {
  sm: "px-2 py-0.5 text-xs",

  md: "px-3 py-1 text-sm",

  lg: "px-4 py-1.5 text-base",
};

const variants = {
  default: {
    solid:
      "bg-secondary text-secondary-foreground",

    soft:
      "bg-secondary/20 text-secondary-foreground",

    outline:
      "border border-border bg-transparent",
  },

  primary: {
    solid:
      "bg-primary text-primary-foreground",

    soft:
      "bg-primary/10 text-primary",

    outline:
      "border border-primary text-primary",
  },

  success: {
    solid:
      "bg-green-600 text-white",

    soft:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",

    outline:
      "border border-green-500 text-green-600 dark:text-green-400",
  },

  warning: {
    solid:
      "bg-yellow-500 text-black",

    soft:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",

    outline:
      "border border-yellow-500 text-yellow-600 dark:text-yellow-300",
  },

  danger: {
    solid:
      "bg-red-600 text-white",

    soft:
      "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",

    outline:
      "border border-red-500 text-red-600 dark:text-red-400",
  },
};

export default function Tag({
  label,

  icon,

  color = "default",

  variant = "soft",

  size = "md",

  clickable = false,

  className,

  onClick,
}: TagProps) {
  return (
    <span
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full font-medium transition-all duration-300",

        sizeClasses[size],

        variants[color][variant],

        clickable &&
          "cursor-pointer hover:-translate-y-0.5 hover:shadow-md active:scale-95",

        className
      )}
    >
      {icon}

      {label}
    </span>
  );
}