import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface AppSectionProps
  extends HTMLAttributes<HTMLElement> {
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl";

  background?:
    | "default"
    | "muted"
    | "primary"
    | "transparent";

  animate?: boolean;
}

const spacing = {
  sm: "py-10 md:py-14",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-28 md:py-36",
};

const backgrounds = {
  default: "bg-background",
  muted: "bg-muted/30",
  primary: "bg-primary text-primary-foreground",
  transparent: "bg-transparent",
};

export default function AppSection({
  className,
  children,
  size = "lg",
  background = "default",
  animate = true,
  ...props
}: AppSectionProps) {
  return (
    <section
      className={cn(
        spacing[size],

        backgrounds[background],

        animate &&
          "transition-all duration-300",

        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}