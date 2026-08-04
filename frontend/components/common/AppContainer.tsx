import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export interface AppContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  size?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "full";

  padding?: boolean;
}

const sizeClasses = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  "2xl": "max-w-[90rem]",
  full: "max-w-none",
};

export default function AppContainer({
  className,
  children,
  size = "xl",
  padding = true,
  ...props
}: AppContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full",

        sizeClasses[size],

        padding &&
          "px-4 sm:px-6 lg:px-8 xl:px-10",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}