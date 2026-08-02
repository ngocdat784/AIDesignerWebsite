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
  if (discountPrice) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <span className="text-2xl font-bold text-primary">
          ${discountPrice}
        </span>

        <span className="text-muted-foreground line-through">
          ${price}
        </span>
      </div>
    );
  }

  return (
    <span className={`text-2xl font-bold ${className}`}>
      ${price}
    </span>
  );
}