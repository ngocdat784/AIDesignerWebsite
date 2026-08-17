import { cn } from "@/lib/utils";

interface PriceTagProps {
  // Giá bán hiện tại
  price: number;

  // Giá gốc trước khi giảm
  originalPrice?: number | null;

  // Alias cũ, hỗ trợ code/UI cũ
  discountPrice?: number | null;

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
  originalPrice,
  discountPrice,
  className,
  showSavings = true,
  size = "lg",
}: PriceTagProps) {
  /*
   * =========================
   * Giá hiện tại
   * =========================
   *
   * Backend:
   *
   * price = 39.99
   * originalPrice = 69.99
   * discountPrice = 39.99
   *
   * Ưu tiên price vì đây là giá bán hiện tại.
   */

  const currentPrice = price;

  /*
   * =========================
   * Giá gốc
   * =========================
   *
   * originalPrice là field chính.
   *
   * discountPrice được giữ lại
   * để tương thích với code cũ.
   */

  const oldPrice =
    originalPrice ??
    (discountPrice !== null &&
    discountPrice !== undefined &&
    discountPrice > currentPrice
      ? discountPrice
      : null);

  /*
   * =========================
   * Discount
   * =========================
   */

  const hasDiscount =
    oldPrice !== null &&
    oldPrice > currentPrice;

  const discount = hasDiscount
    ? Math.round(
        ((oldPrice - currentPrice) /
          oldPrice) *
          100,
      )
    : 0;

  /*
   * =========================
   * Savings
   * =========================
   */

  const saved = hasDiscount
    ? oldPrice - currentPrice
    : 0;

  const styles = sizeClasses[size];

  return (
    <div
      className={cn(
        "space-y-2 transition-all duration-300",
        className,
      )}
    >
      {/* Price */}

      <div
        className="
          flex
          flex-wrap
          items-end
          gap-3
        "
      >
        {/* Current price */}

        <span
          className={cn(
            "font-bold tracking-tight text-primary",
            styles.price,
          )}
        >
          ${currentPrice.toFixed(2)}
        </span>

        {/* Original price */}

        {hasDiscount && (
          <span
            className={cn(
              "text-muted-foreground line-through",
              styles.old,
            )}
          >
            ${oldPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Discount information */}

      {hasDiscount && (
        <div
          className="
            flex
            flex-wrap
            items-center
            gap-2
          "
        >
          {/* Discount badge */}

          <span
            className={cn(
              `
                rounded-full
                bg-green-500
                px-3
                py-1
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-300
                hover:scale-105
              `,
              styles.badge,
            )}
          >
            -{discount}%
          </span>

          {/* Savings */}

          {showSavings && (
            <span
              className="
                text-sm
                text-green-600
                dark:text-green-400
              "
            >
              Save ${saved.toFixed(2)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}