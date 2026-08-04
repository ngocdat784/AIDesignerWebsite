"use client";

import { useCart } from "@/hooks/useCart";

import CartCoupon from "./CartCoupon";
import CartSummaryActions from "./CartSummaryActions";
import CartSummaryRow from "./CartSummaryRow";
import CartTaxNotice from "./CartTaxNotice";

export default function CartSummary() {
  const {
    subtotal,
    discount,
    total,
    items,
  } = useCart();

  const itemCount =
    items.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

  const estimatedTax =
    total * 0.1;

  return (
    <aside className="sticky top-24 h-fit rounded-2xl border p-6">

      <h2 className="mb-6 text-xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-4">

        <CartSummaryRow
          label="Items"
          value={itemCount.toString()}
        />

        <CartSummaryRow
          label="Subtotal"
          value={`$${subtotal.toFixed(2)}`}
        />

        <CartSummaryRow
          label="Discount"
          value={`-$${discount.toFixed(2)}`}
        />

        <CartSummaryRow
          label="You Saved"
          value={`$${discount.toFixed(2)}`}
        />

        <CartSummaryRow
          label="Estimated Tax"
          value={`$${estimatedTax.toFixed(2)}`}
        />

        <hr />

        <CartSummaryRow
          label="Total"
          value={`$${(
            total + estimatedTax
          ).toFixed(2)}`}
          bold
        />

      </div>

      <div className="my-6">
        <CartCoupon />
      </div>

      <CartSummaryActions />

      <div className="mt-6">
        <CartTaxNotice />
      </div>

    </aside>
  );
}