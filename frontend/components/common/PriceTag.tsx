interface PriceTagProps {
  price: number;
  discountPrice?: number;
  className?: string;
}

export default function PriceTag({
  price,
  discountPrice,
  className = "",
}: PriceTagProps) {
  const finalPrice = discountPrice ?? price;

  const discount = discountPrice
    ? Math.round(((price - discountPrice) / price) * 100)
    : 0;

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="text-4xl font-bold text-primary">
        ${finalPrice}
      </div>

      {discountPrice && (
        <div className="flex items-center gap-3">
          <span className="text-muted-foreground line-through">
            ${price}
          </span>

          <span className="rounded-md bg-green-500 px-2 py-1 text-xs font-semibold text-white">
            {discount}% OFF
          </span>
        </div>
      )}
    </div>
  );
}