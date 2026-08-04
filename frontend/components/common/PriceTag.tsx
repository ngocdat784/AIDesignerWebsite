import { cn } from "@/lib/utils";

interface PriceTagProps {
  price: number;
  discountPrice?: number;
  className?: string;
  showSavings?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: {
    price: "text-2xl",
    old: "text-sm",
    badge: "text-[10px]",
  },
  md: {
    price: "text-3xl",
    old: "text-base",
    badge: "text-xs",
  },
  lg: {
    price: "text-4xl",
    old: "text-lg",
    badge: "text-sm",
  },
};

export default function PriceTag({
  price,
  discountPrice,
  className,
  showSavings = true,
  size = "lg",
}: PriceTagProps) {
  const finalPrice = discountPrice ?? price;

  const discount =
    discountPrice
      ? Math.round(
          ((price - discountPrice) / price) * 100
        )
      : 0;

  const saved = price - finalPrice;

  const styles = sizeClasses[size];

  return (
    <div
      className={cn(
        "space-y-2 transition-all duration-300",
        className
      )}
    >
      <div className="flex items-end gap-3 flex-wrap">
        <span
          className={cn(
            "font-bold tracking-tight text-primary",
            styles.price
          )}
        >
          ${finalPrice}
        </span>

        {discountPrice && (
          <span
            className={cn(
              "text-muted-foreground line-through",
              styles.old
            )}
          >
            ${price}
          </span>
        )}
      </div>

      {discountPrice && (
        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-full bg-green-500 px-3 py-1 font-semibold text-white shadow-sm transition-all duration-300 hover:scale-105",
              styles.badge
            )}
          >
            {discount}% OFF
          </span>

          {showSavings && (
            <span className="text-sm text-green-600 dark:text-green-400">
              Save ${saved}
            </span>
          )}
        </div>
      )}
    </div>
  );
}