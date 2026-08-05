import { Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

interface LogoProps {
  compact?: boolean;

  className?: string;
}

export default function Logo({
  compact = false,
  className,
}: LogoProps) {
  return (
    <div
      className={cn(
        "group inline-flex items-center gap-3",
        className
      )}
    >
      <div
        className="
          flex
          h-11
          w-11
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-br
          from-primary
          via-primary
          to-violet-600
          text-primary-foreground
          shadow-lg
          transition-all
          duration-300
          group-hover:scale-105
          group-hover:rotate-3
        "
      >
        <Sparkles
          className="
            h-5
            w-5
            transition-transform
            duration-300
            group-hover:rotate-12
          "
        />
      </div>

      {!compact && (
        <div className="leading-tight">
          <p
            className="
              text-lg
              font-bold
              tracking-tight
              transition-colors
              duration-300
              group-hover:text-primary
            "
          >
            AI Designer
          </p>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            Premium Marketplace
          </p>
        </div>
      )}
    </div>
  );
}