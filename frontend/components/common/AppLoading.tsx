import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

interface AppLoadingProps {
  text?: string;

  fullscreen?: boolean;

  overlay?: boolean;

  size?: "sm" | "md" | "lg";

  className?: string;
}

const sizeClasses = {
  sm: {
    icon: "h-5 w-5",
    text: "text-sm",
  },

  md: {
    icon: "h-8 w-8",
    text: "text-base",
  },

  lg: {
    icon: "h-12 w-12",
    text: "text-lg",
  },
};

export default function AppLoading({
  text = "Loading...",

  fullscreen = false,

  overlay = false,

  size = "md",

  className,
}: AppLoadingProps) {
  const styles = sizeClasses[size];

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4",

        fullscreen &&
          "fixed inset-0 z-50 bg-background",

        overlay &&
          "absolute inset-0 z-20 rounded-2xl bg-background/80 backdrop-blur-sm",

        className
      )}
    >
      <Loader2
        className={cn(
          styles.icon,
          "animate-spin text-primary"
        )}
      />

      <p
        className={cn(
          "font-medium text-muted-foreground",
          styles.text
        )}
      >
        {text}
      </p>
    </div>
  );
}