import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface RatingProps {
  value: number;

  reviewCount?: number;

  max?: number;

  size?: "sm" | "md" | "lg";

  showReviewCount?: boolean;

  showValue?: boolean;

  className?: string;
}

const sizeClasses = {
  sm: {
    icon: "h-3.5 w-3.5",
    text: "text-xs",
  },
  md: {
    icon: "h-4 w-4",
    text: "text-sm",
  },
  lg: {
    icon: "h-5 w-5",
    text: "text-base",
  },
};

export default function Rating({
  value,

  reviewCount,

  max = 5,

  size = "md",

  showReviewCount = true,

  showValue = true,

  className,
}: RatingProps) {
  const styles = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2",
        className
      )}
    >
      <div className="flex items-center gap-1">
        {Array.from({ length: max }).map((_, index) => (
          <Star
            key={index}
            className={cn(
              styles.icon,
              "transition-all duration-300",
              index < Math.round(value)
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            )}
          />
        ))}
      </div>

      {showValue && (
        <span
          className={cn(
            "font-semibold",
            styles.text
          )}
        >
          {value.toFixed(1)}
        </span>
      )}

      {showReviewCount &&
        reviewCount !== undefined && (
          <span
            className={cn(
              "text-muted-foreground",
              styles.text
            )}
          >
            ({reviewCount.toLocaleString()})
          </span>
        )}
    </div>
  );
}