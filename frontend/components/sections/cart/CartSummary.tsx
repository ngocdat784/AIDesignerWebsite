"use client";

import AppButton from "@/components/common/AppButton";
import { useCart } from "@/hooks/useCart";

export default function CartSummary() {
  const {
    subtotal,
    discount,
    total,
  } = useCart();

  return (
    <aside className="rounded-2xl border p-6 space-y-6 h-fit sticky top-24">

      <h2 className="text-xl font-semibold">
        Order Summary
      </h2>

      <div className="space-y-3">

        <div className="flex justify-between">
          <span>Subtotal</span>

          <span>${subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span>-${discount}</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>

          <span>${total}</span>
        </div>

      </div>

      <AppButton className="w-full">
        Proceed to Checkout
      </AppButton>

    </aside>
  );
}