"use client";

import { useCart } from "@/hooks/useCart";

import CartHeader from "@/components/sections/cart/CartHeader";
import CartEmpty from "@/components/sections/cart/CartEmpty";
import CartList from "@/components/sections/cart/CartList";
import CartSummary from "@/components/sections/cart/CartSummary";

export default function CartPage() {
  const { items } = useCart();

  return (
    <main className="container py-10 space-y-8">
      <CartHeader />

      {items.length === 0 ? (
        <CartEmpty />
      ) : (
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <CartList />

          <CartSummary />
        </div>
      )}
    </main>
  );
}