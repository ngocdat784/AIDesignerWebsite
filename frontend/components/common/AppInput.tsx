"use client";

import type {
  ComponentProps,
  ReactNode,
} from "react";

import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface AppInputProps
  extends ComponentProps<typeof Input> {
  label?: string;

  helperText?: string;

  error?: string;

  leftIcon?: ReactNode;

  rightIcon?: ReactNode;

  loading?: boolean;

  fullWidth?: boolean;
}

export default function AppInput({
  label,

  helperText,

  error,

  leftIcon,

  rightIcon,

  loading = false,

  fullWidth = true,

  className,

  required,

  id,

  ...props
}: AppInputProps) {
  return (
    <div
      className={cn(
        "space-y-2",
        fullWidth && "w-full"
      )}
    >
      {label && (
        <label
          htmlFor={id}
          className="
            block
            text-sm
            font-semibold
            text-foreground
          "
        >
          {label}

          {required && (
            <span className="ml-1 text-destructive">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div
            className="
              pointer-events-none
              absolute
              left-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          >
            {leftIcon}
          </div>
        )}

        <Input
          id={id}
          className={cn(
            "h-11 rounded-xl transition-all duration-300",

            "border-border/70",

            "focus-visible:border-primary",

            "focus-visible:ring-2",

            "focus-visible:ring-primary/20",

            leftIcon && "pl-10",

            (rightIcon || loading) && "pr-10",

            error &&
              "border-destructive focus-visible:ring-destructive/20",

            className
          )}
          {...props}
        />

        {(loading || rightIcon) && (
          <div
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-muted-foreground
            "
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              rightIcon
            )}
          </div>
        )}
      </div>

      {(helperText || error) && (
        <p
          className={cn(
            "text-xs",

            error
              ? "text-destructive"
              : "text-muted-foreground"
          )}
        >
          {error ?? helperText}
        </p>
      )}
    </div>
  );
}