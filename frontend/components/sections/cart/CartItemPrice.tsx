interface Props {
  price: number;
  discountPrice?: number;
  quantity: number;
}

export default function CartItemPrice({
  price,
  discountPrice,
  quantity,
}: Props) {
  const finalPrice =
    discountPrice ?? price;

  return (
    <div className="text-right">
      <p className="text-lg font-semibold">
        ${(finalPrice * quantity).toFixed(2)}
      </p>

      {discountPrice && (
        <p className="text-sm text-muted-foreground line-through">
          ${(price * quantity).toFixed(2)}
        </p>
      )}
    </div>
  );
}