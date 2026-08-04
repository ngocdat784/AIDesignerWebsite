import type { ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AppButtonProps
  extends ComponentProps<typeof Button> {
  loading?: boolean;
}

export default function AppButton({
  className,
  children,
  loading = false,
  disabled,
  ...props
}: AppButtonProps) {
  return (
    <Button
      disabled={disabled || loading}
      className={cn(
        // Layout
        "inline-flex items-center justify-center gap-2",

        // Shape
        "rounded-xl",

        // Motion
        "transition-all duration-300 ease-out",

        // Hover
        "hover:-translate-y-0.5 hover:shadow-lg",

        // Click
        "active:translate-y-0 active:scale-[0.98]",

        // Focus
        "focus-visible:ring-2 focus-visible:ring-primary/30",

        // Disabled
        "disabled:pointer-events-none disabled:opacity-60",

        className
      )}
      {...props}
    >
      {loading && (
        <Loader2 className="h-4 w-4 animate-spin" />
      )}

      {children}
    </Button>
  );
}