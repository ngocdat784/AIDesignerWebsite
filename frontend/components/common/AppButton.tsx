import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type AppButtonProps = ComponentProps<typeof Button>;

export default function AppButton({
  className,
  ...props
}: AppButtonProps) {
  return (
    <Button
      className={cn(
        "rounded-xl transition-all duration-300",
        className
      )}
      {...props}
    />
  );
}