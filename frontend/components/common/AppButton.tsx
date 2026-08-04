import type { ComponentProps } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AppButtonProps
  extends ComponentProps<typeof Button> {}

export default function AppButton({
  className,
  children,
  ...props
}: AppButtonProps) {
  return (
    <Button
      className={cn(
        "rounded-xl transition-all duration-300",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}